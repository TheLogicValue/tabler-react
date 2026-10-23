import { readFileSync } from 'node:fs'
import { parseSource, resolveSourceFile as resolveFile } from './source-parser.mjs'

const cache = new Map()
export function moduleInfo(file) {
  if (cache.has(file)) return cache.get(file)
  const code = readFileSync(file, 'utf8').replaceAll('\r\n', '\n')
  const ast = parseSource(code, file)
  const info = { file, code, ast, bindings: new Map(), imports: new Map(), types: new Map() }
  cache.set(file, info)
  for (const statement of ast.program.body) {
    if (statement.type === 'ImportDeclaration') for (const specifier of statement.specifiers) {
      info.imports.set(specifier.local.name, { source: statement.source.value, name: specifier.imported?.name ?? 'default' })
    }
    const declaration = statement.declaration ?? statement
    if (declaration.type === 'TypeAlias') info.types.set(declaration.id.name, declaration.right)
    if (declaration.type === 'TSTypeAliasDeclaration') info.types.set(declaration.id.name, declaration.typeAnnotation)
    if (declaration.type === 'TSInterfaceDeclaration') info.types.set(declaration.id.name, declaration)
    if (declaration.type === 'VariableDeclaration') for (const item of declaration.declarations) {
      if (item.id.type === 'Identifier') info.bindings.set(item.id.name, item.init)
    }
    else if (declaration.id?.name) info.bindings.set(declaration.id.name, declaration)
  }
  return info
}

export function resolveExport(file, name, seen = new Set()) {
  const key = file + ':' + name
  if (seen.has(key)) throw new Error('Export circular: ' + key)
  seen.add(key)
  const info = moduleInfo(file)
  function local(identifier) {
    if (info.imports.has(identifier)) {
      const imported = info.imports.get(identifier)
      return resolveExport(resolveFile(file, imported.source), imported.name, seen)
    }
    const node = info.bindings.get(identifier)
    if (!node) throw new Error('No se encuentra ' + identifier + ' en ' + file)
    return { ...info, node, localName: identifier }
  }
  for (const statement of info.ast.program.body) {
    if (statement.exportKind === 'type') continue
    if (name === 'default' && statement.type === 'ExportDefaultDeclaration') {
      return statement.declaration.type === 'Identifier' ? local(statement.declaration.name)
        : { ...info, node: statement.declaration, localName: statement.declaration.id?.name }
    }
    if (statement.type !== 'ExportNamedDeclaration') continue
    if (statement.declaration?.id?.name === name) return local(name)
    if (statement.declaration?.declarations?.some(item => item.id.name === name)) return local(name)
    for (const specifier of statement.specifiers) if ((specifier.exported.name ?? specifier.exported.value) === name) {
      return statement.source ? resolveExport(resolveFile(file, statement.source.value), specifier.local.name, seen) : local(specifier.local.name)
    }
  }
  if (name !== 'default') return resolveExport(file, 'default', seen)
  throw new Error('Export no encontrado: ' + key)
}

function walk(node, visit) {
  if (!node || typeof node !== 'object') return
  if (Array.isArray(node)) { node.forEach(item => walk(item, visit)); return }
  if (node.type) visit(node)
  for (const [key, child] of Object.entries(node)) if (!['loc', 'leadingComments', 'trailingComments', 'innerComments', 'tokens'].includes(key)) walk(child, visit)
}

export function extractApi(info) {
  const text = (node, owner = info) => node ? owner.code.slice(node.start, node.end) : ''
  const props = new Map(), defaults = new Map(), subcomponents = new Set(), members = new Set()
  let rest = false
  function property(name, values = {}) { props.set(name, { name, ...props.get(name), ...values }) }
  function typeProperties(type, seen = new Set(), owner = info) {
    if (!type) return
    if (['TypeAnnotation', 'TSTypeAnnotation'].includes(type.type)) return typeProperties(type.typeAnnotation, seen, owner)
    const reference = type.type === 'GenericTypeAnnotation' ? type.id : type.type === 'TSTypeReference' ? type.typeName : type.type === 'TSExpressionWithTypeArguments' ? type.expression : null
    if (reference?.type === 'Identifier' && !seen.has(owner.file + ':' + reference.name)) {
      seen.add(owner.file + ':' + reference.name)
      if (owner.types.has(reference.name)) return typeProperties(owner.types.get(reference.name), seen, owner)
      const imported = owner.imports.get(reference.name)
      if (imported?.source.startsWith('.')) {
        const dependency = moduleInfo(resolveFile(owner.file, imported.source))
        return typeProperties(dependency.types.get(imported.name), seen, dependency)
      }
      return
    }
    if (['UnionTypeAnnotation', 'IntersectionTypeAnnotation', 'TSUnionType', 'TSIntersectionType'].includes(type.type)) type.types.forEach(item => typeProperties(item, new Set(seen), owner))
    if (type.type === 'TSInterfaceDeclaration') {
      for (const parent of type.extends ?? []) typeProperties(parent, new Set(seen), owner)
      return typeProperties(type.body, seen, owner)
    }
    if (['TSTypeLiteral', 'TSInterfaceBody'].includes(type.type)) for (const item of type.members ?? type.body) {
      if (item.type !== 'TSPropertySignature') continue
      const name = item.key.name ?? item.key.value
      const description = (item.leadingComments ?? []).map(comment => comment.value.replace(/\*/g, '').trim()).join(' ')
      const previous = props.get(name)
      property(name, { type: item.typeAnnotation ? text(item.typeAnnotation.typeAnnotation, owner) : undefined, optional: Boolean(item.optional || previous?.optional), description: description || previous?.description || '' })
    }
    if (type.type === 'ObjectTypeAnnotation') for (const item of type.properties) {
      if (item.type === 'ObjectTypeSpreadProperty') typeProperties(item.argument, new Set(seen), owner)
      else if (item.key) {
        const name = item.key.name ?? item.key.value
        const description = (item.leadingComments ?? []).map(comment => comment.value.replace(/\*/g, '').trim()).join(' ')
        const previous = props.get(name)
        property(name, { type: text(item.value, owner), optional: Boolean(item.optional || previous?.optional), description: description || previous?.description || '' })
      }
    }
  }
  function pattern(node) {
    if (!node) return
    if (node.type === 'AssignmentPattern') return pattern(node.left)
    typeProperties(node.typeAnnotation)
    if (node.type !== 'ObjectPattern') return
    for (const item of node.properties) {
      if (item.type === 'RestElement') { rest = true; continue }
      const name = item.key.name ?? item.key.value
      property(name)
      if (item.value.type === 'AssignmentPattern') defaults.set(name, text(item.value.right))
    }
  }
  let target = info.node
  if (target.type === 'CallExpression') target = target.arguments.find(item => ['ArrowFunctionExpression', 'FunctionExpression'].includes(item.type)) ?? target
  if (target.type === 'CallExpression') target = target.arguments.map(item => info.bindings.get(item.name)).find(item => item && ['FunctionDeclaration', 'ArrowFunctionExpression', 'FunctionExpression'].includes(item.type)) ?? target
  if (target.params) pattern(target.params[0])
  if (target.type === 'ClassDeclaration') typeProperties(target.superTypeParameters?.params[0])
  const parameter = target.params?.[0]?.name
  walk(target, node => {
    if (node.type === 'MemberExpression' && node.object.name === parameter && !node.computed && parameter) property(node.property.name)
    if (node.type === 'JSXSpreadAttribute' && node.argument.name === parameter && parameter) rest = true
    if (node.type === 'VariableDeclarator' && node.id.type === 'ObjectPattern') {
      const fromProps = node.init?.type === 'Identifier' && node.init.name === parameter
      const fromClass = node.init?.type === 'MemberExpression' && node.init.object.type === 'ThisExpression' && node.init.property.name === 'props'
      if (fromProps || fromClass) pattern(node.id)
    }
    if (node.type === 'ClassProperty' && node.static && !['defaultProps', 'displayName', 'propTypes'].includes(node.key.name)) subcomponents.add(node.key.name)
    if (node.type === 'CallExpression' && (node.callee.name === 'useImperativeHandle' || node.callee.property?.name === 'useImperativeHandle')) {
      walk(node.arguments[1], child => {
        if (child.type === 'ReturnStatement' && child.argument?.type === 'ObjectExpression') child.argument.properties.forEach(item => members.add(item.key?.name ?? item.key?.value))
      })
    }
  })
  for (const statement of info.ast.program.body) walk(statement, node => {
    if (node.type !== 'AssignmentExpression' || node.left.type !== 'MemberExpression' || node.left.object.name !== info.localName) return
    const name = node.left.property.name
    if (name === 'defaultProps' && node.right.type === 'ObjectExpression') for (const item of node.right.properties) defaults.set(item.key.name ?? item.key.value, text(item.value))
    else if (!['displayName', 'propTypes'].includes(name)) subcomponents.add(name)
  })
  if (info.localName?.startsWith('use') && target.body?.type === 'BlockStatement') {
    const returned = target.body.body.findLast(node => node.type === 'ReturnStatement')?.argument
    if (returned?.type === 'ObjectExpression') returned.properties.forEach(item => members.add(item.key?.name ?? item.key?.value))
  }
  for (const [name, value] of defaults) property(name, { default: value, optional: true })
  return { props: [...props.values()], subcomponents: [...subcomponents].filter(Boolean), members: [...members].filter(Boolean), rest }
}

export function resolveSubcomponent(info, name) {
  let identifier
  walk(info.node, node => {
    if (node.type === 'ClassProperty' && node.static && node.key.name === name) identifier = node.value?.name
  })
  for (const statement of info.ast.program.body) walk(statement, node => {
    if (node.type === 'AssignmentExpression' && node.left.type === 'MemberExpression' && node.left.object.name === info.localName && node.left.property.name === name) identifier = node.right.name
  })
  if (!identifier) return null
  const imported = info.imports.get(identifier)
  if (imported?.source.startsWith('.')) return resolveExport(resolveFile(info.file, imported.source), imported.name)
  const node = info.bindings.get(identifier)
  return node ? { ...info, node, localName: identifier } : null
}
