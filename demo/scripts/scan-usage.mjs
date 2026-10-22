import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { parseSync } from '@babel/core'

const source = process.argv[2]
if (!source) throw new Error('Uso: node demo/scripts/scan-usage.mjs <ruta-al-src-del-consumidor>')

const counts = new Map()
let files = 0
function scan(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filename = join(directory, entry.name)
    if (entry.isDirectory()) {
      if (!['node_modules', '__tests__', 'tests', 'dist', 'build'].includes(entry.name)) scan(filename)
      continue
    }
    if (!/\.[jt]sx?$/.test(entry.name) || /\.(test|spec)\.[jt]sx?$/.test(entry.name)) continue
    const code = readFileSync(filename, 'utf8')
    if (!code.includes('tabler-react')) continue
    const ast = parseSync(code, {
      filename, babelrc: false, configFile: false,
      parserOpts: { sourceType: 'unambiguous', plugins: ['jsx', ...(/\.tsx?$/.test(entry.name) ? ['typescript'] : [])] },
    })
    const imported = new Set()
    for (const node of ast.program.body) {
      if (node.type !== 'ImportDeclaration' || node.source.value !== 'tabler-react') continue
      for (const specifier of node.specifiers) imported.add(specifier.imported?.name ?? 'default')
    }
    if (imported.size) files++
    for (const name of imported) counts.set(name, (counts.get(name) ?? 0) + 1)
  }
}

scan(resolve(source))
const result = {
  source: 'Proyecto consumidor de referencia',
  analyzedOn: new Date().toISOString().slice(0, 10),
  files,
  components: [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name, files]) => ({ name, files })),
}
writeFileSync(new URL('../src/usage.json', import.meta.url), JSON.stringify(result, null, 2) + '\n')
console.log(`Inventario actualizado: ${files} archivos, ${counts.size} componentes/hooks.`)
