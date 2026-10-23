const assert = require('node:assert/strict')
const { test } = require('node:test')
const fs = require('node:fs')
const path = require('node:path')
const { transformSync, parseSync } = require('@babel/core')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const library = require('../dist/index.js')
const project = path.resolve(__dirname, '..')
const read = file => JSON.parse(fs.readFileSync(path.join(project, file), 'utf8'))
const index = read('demo/src/component-docs-index.json')
const document = name => read('demo/src/docs/generated/' + name + '.json')

test('Las fichas corresponden al paquete público y sus subcomponentes existen', () => {
  assert.deepEqual(Object.keys(index).sort(), Object.keys(library).sort())
  for (const name of Object.keys(index)) {
    const doc = document(name)
    assert.equal(doc.name, name)
    assert.ok(fs.existsSync(path.join(project, doc.implementation)))
    assert.ok(doc.implementationCode.length)
    assert.equal(new Set(doc.props.map(prop => prop.name)).size, doc.props.length)
    for (const subcomponent of doc.subcomponents) assert.notEqual(library[name][subcomponent], undefined, name + '.' + subcomponent)
  }
})

test('La extracción sigue reexports, wrappers y tipos Flow y TypeScript', () => {
  assert.equal(document('Modal').implementation, 'src/components/Modal/Modal.js')
  assert.ok(document('RegisterPage').props.some(prop => prop.name === 'values'))
  assert.ok(document('FormTextInput').props.some(prop => prop.name === 'name'))
  assert.ok(document('Grid').childApis.find(child => child.name === 'Col').props.some(prop => prop.name === 'lg'))
  assert.equal(document('Grid').implementation, 'src/components/Grid/Grid.react.tsx')
  const gridRow = document('Grid').childApis.find(child => child.name === 'Row')
  const gridCol = document('Grid').childApis.find(child => child.name === 'Col')
  assert.equal(gridRow.source, 'src/components/Grid/GridRow.react.tsx')
  assert.equal(gridCol.source, 'src/components/Grid/GridCol.react.tsx')
  assert.equal(gridRow.props.length, 7)
  assert.equal(gridCol.props.length, 36)
  assert.equal(gridRow.props.find(prop => prop.name === 'gutters').default, '""')
  assert.equal(gridCol.props.find(prop => prop.name === 'xl2Auto').type, 'boolean | number')
  assert.ok(document('AGGridTable').members.includes('api'))
  assert.ok(document('DatePicker').members.includes('reset'))
  assert.equal(document('Badge').implementation, 'src/components/Badge/Badge.react.tsx')
  assert.equal(document('Badge').props.find(prop => prop.name === 'children').type, 'React.ReactNode')
  assert.equal(document('Badge').props.find(prop => prop.name === 'color').default, '"primary"')
  assert.deepEqual(document('Badge').props.map(prop => prop.name).sort(), ['children', 'className', 'color'])
  assert.equal(document('Icon').implementation, 'src/components/Icon/Icon.react.tsx')
  assert.equal(document('Icon').props.find(prop => prop.name === 'title').type, 'string')
  assert.equal(document('Icon').props.find(prop => prop.name === 'onPointerEnter').type, 'React.PointerEventHandler<HTMLElement>')
  assert.equal(document('Container').implementation, 'src/components/Container.react.tsx')
  assert.equal(document('Container').props.length, 2)
  assert.equal(document('Text').implementation, 'src/components/Text/Text.react.tsx')
  assert.equal(document('Text').props.length, 25)
  assert.ok(document('Text').rest)
  const small = document('Text').childApis.find(child => child.name === 'Small')
  assert.equal(small.source, 'src/components/Text/TextSmall.react.tsx')
  assert.equal(small.props.length, 5)
  const card = document('Card')
  assert.equal(card.implementation, 'src/components/Card/Card.react.tsx')
  assert.equal(card.props.length, 17)
  assert.equal(card.childApis.length, 9)
  for (const child of card.childApis) {
    assert.equal(child.source, `src/components/Card/Card${child.name}.react.tsx`)
    assert.ok(child.props.every(prop => prop.type), 'Todas las propiedades de Card.' + child.name + ' deben tener un tipo extraído')
  }
  const action = card.childApis.find(child => child.name === 'OptionsItem')
  assert.equal(action.props.find(prop => prop.name === 'onClick').type, 'React.MouseEventHandler<HTMLButtonElement>')
})

function walk(node, visit) {
  if (!node || typeof node !== 'object') return
  if (Array.isArray(node)) { node.forEach(item => walk(item, visit)); return }
  if (node.type) visit(node)
  for (const [key, value] of Object.entries(node)) if (!['loc', 'leadingComments', 'trailingComments'].includes(key)) walk(value, visit)
}
function nameParts(node) {
  return node.type === 'JSXIdentifier' ? [node.name] : node.type === 'JSXMemberExpression' ? [...nameParts(node.object), node.property.name] : []
}

test('Los ejemplos de las guías tienen sintaxis válida y no usan subcomponentes inexistentes', () => {
  for (const name of Object.keys(index)) {
    const guide = document(name).guide
    if (!guide) continue
    for (const example of [guide.example, ...(guide.examples ?? []).map(item => item.code)]) {
      const ast = parseSync(example, { babelrc: false, configFile: false, parserOpts: { plugins: ['jsx', 'flow'] } })
      walk(ast, node => {
        if (node.type !== 'JSXOpeningElement') return
        const parts = nameParts(node.name)
        if (!Object.hasOwn(library, parts[0])) return
        let value = library[parts[0]]
        for (const member of parts.slice(1)) {
          value = value?.[member]
          assert.notEqual(value, undefined, name + ': ' + parts.join('.'))
        }
      })
    }
  }
})

test('Los ejemplos Markdown muestran HTML y JSX como texto sin ejecutarlos', () => {
  const file = path.join(project, 'demo/src/docs/Markdown.jsx')
  const { code } = transformSync(fs.readFileSync(file, 'utf8'), {
    filename: file, babelrc: false, configFile: false,
    presets: [['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }], '@babel/preset-react'],
  })
  const module = { exports: {} }
  new Function('require', 'module', 'exports', code)(require, module, module.exports)
  const html = renderToStaticMarkup(React.createElement(module.exports.default, {
    text: '# Ejemplo\n\n<script>throw new Error("No ejecutar")</script>\n\n```jsx\n<img src="x" onError={dangerous()} />\n```',
  }))
  assert.doesNotMatch(html, /<script>|<img\b/)
  assert.match(html, /&lt;script&gt;/)
  assert.match(html, /&lt;img/)
  assert.match(html, /Copiar código/)
})
