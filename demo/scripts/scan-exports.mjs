import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseSync } from '@babel/core'

const project = fileURLToPath(new URL('../../', import.meta.url))
const output = new URL('../src/library-exports.json', import.meta.url)
const entries = new Map()
const visited = new Set()

function resolveSource(parent, specifier) {
  const path = resolve(dirname(parent), specifier)
  const file = [path, `${path}.js`, resolve(path, 'index.js')].find(candidate => existsSync(candidate) && /\.js$/.test(candidate))
  if (!file) throw new Error(`No se puede resolver ${specifier} desde ${parent}`)
  return file
}

function register(name, source) {
  const path = relative(project, source).replaceAll('\\', '/')
  const kind = name.startsWith('use') ? 'Hook'
    : ['colors', 'OverlayLoading'].includes(name) ? 'Utilidad'
      : path.includes('/page_templates/') ? 'Plantilla'
        : name === 'RouterContextProvider' ? 'Proveedor' : 'Componente'
  entries.set(name, { name, kind, source: path })
}

function scan(file) {
  if (visited.has(file)) return
  visited.add(file)
  const ast = parseSync(readFileSync(file, 'utf8'), {
    filename: file, babelrc: false, configFile: false,
    parserOpts: { sourceType: 'module', plugins: ['jsx', 'flow'] },
  })
  for (const node of ast.program.body) {
    if (node.exportKind === 'type') continue
    if (node.type === 'ExportAllDeclaration') {
      scan(resolveSource(file, node.source.value))
    } else if (node.type === 'ExportNamedDeclaration') {
      for (const specifier of node.specifiers) {
        if (specifier.exportKind === 'type') continue
        register(specifier.exported.name ?? specifier.exported.value, node.source ? resolveSource(file, node.source.value) : file)
      }
      if (node.declaration) {
        if (node.declaration.id?.name) register(node.declaration.id.name, file)
        else for (const declaration of node.declaration.declarations ?? []) {
          if (declaration.id.type !== 'Identifier') throw new Error(`Export desestructurado sin clasificar en ${file}`)
          register(declaration.id.name, file)
        }
      }
    }
  }
}

scan(resolve(project, 'src/index.js'))
const result = JSON.stringify({
  entry: 'src/index.js',
  exports: [...entries.values()].sort((a, b) => a.name.localeCompare(b.name, 'en')),
}, null, 2) + '\n'

if (process.argv.includes('--check')) {
  if (!existsSync(output) || readFileSync(output, 'utf8') !== result) {
    throw new Error('El catálogo de exports no está actualizado. Ejecuta npm run demo:inventory.')
  }
  console.log(`Catálogo verificado: ${entries.size} exports públicos.`)
} else {
  writeFileSync(output, result)
  console.log(`Catálogo actualizado: ${entries.size} exports públicos.`)
}
