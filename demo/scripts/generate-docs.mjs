import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { moduleInfo, resolveExport, resolveSubcomponent, extractApi } from './docs-source.mjs'

const project = fileURLToPath(new URL('../../', import.meta.url))
const readJson = path => JSON.parse(readFileSync(resolve(project, path), 'utf8'))
const catalog = readJson('demo/src/library-exports.json')
const guides = readJson('demo/docs/guides.json')
const libraryPackage = readJson('package.json'), demoPackage = readJson('demo/package.json')
const libraryLock = readJson('package-lock.json'), demoLock = readJson('demo/package-lock.json')
function integrationVersions(name) {
  const packages = ['AGGridTable', 'AGGridPagination'].includes(name)
    ? ['ag-grid-community', 'ag-grid-react', 'ag-grid-enterprise']
    : ['BarChart', 'LineChart', 'PieChart', 'DoughnutChart', 'RadarChart'].includes(name)
      ? ['echarts', 'echarts-for-react'] : []
  return packages.map(name => ({
    name,
    role: libraryPackage.peerDependencies?.[name] ? (libraryPackage.peerDependenciesMeta?.[name]?.optional ? 'Peer opcional' : 'Peer: lo aporta el consumidor') : 'Dependencia de la biblioteca',
    libraryRange: libraryPackage.peerDependencies?.[name] ?? libraryPackage.dependencies?.[name],
    libraryVersion: libraryLock.packages['node_modules/' + name]?.version ?? null,
    demoVersion: demoLock.packages['node_modules/' + name]?.version ?? null,
    demoRange: demoPackage.dependencies?.[name] ?? null,
  }))
}
const documents = {}, index = {}
const generated = resolve(project, 'demo/src/docs/generated')
if (!process.argv.includes('--check')) mkdirSync(generated, { recursive: true })
for (const entry of catalog.exports) {
  const info = resolveExport(resolve(project, entry.source), entry.name)
  const api = extractApi(info)
  const folder = dirname(info.file)
  const legacy = readdirSync(folder).filter(file => file === 'README.md' || /\.examples?(?:\.broken)?\.md$/.test(file)).map(file => ({
    name: file, source: relative(project, resolve(folder, file)).replaceAll('\\', '/'),
    markdown: readFileSync(resolve(folder, file), 'utf8').replaceAll('\r\n', '\n'),
  }))
  // Ensure every parsed definition is valid even when it has no Flow props.
  moduleInfo(info.file)
  const guide = guides[entry.name]
  for (const override of guide?.props ?? []) {
    const property = api.props.find(item => item.name === override.name)
    if (property) Object.assign(property, override)
    else api.props.push(override)
  }
  const childApis = api.subcomponents.map(name => {
    const child = resolveSubcomponent(info, name)
    return child ? { name, source: relative(project, child.file).replaceAll('\\', '/'), ...extractApi(child) } : null
  }).filter(Boolean)
  documents[entry.name] = { ...entry, implementation: relative(project, info.file).replaceAll('\\', '/'), implementationCode: info.code, ...api, childApis, legacy, dependencies: integrationVersions(entry.name), guide: guide ?? null }
  index[entry.name] = { name: entry.name, kind: entry.kind, summary: guide?.summary ?? 'Referencia de API extraída de las fuentes.', status: guide ? 'documented' : 'api', properties: api.props.length, examples: legacy.length }
}
for (const name of Object.keys(guides)) if (!documents[name]) throw new Error('Guía sin export público: ' + name)

const outputs = [[resolve(project, 'demo/src/component-docs-index.json'), index], ...Object.entries(documents).map(([name, value]) => [resolve(generated, name + '.json'), value])]
for (const [output, value] of outputs) {
  const content = JSON.stringify(value, null, 2) + '\n'
  if (process.argv.includes('--check')) {
    if (!existsSync(output) || readFileSync(output, 'utf8') !== content) throw new Error('Fichas desactualizadas. Ejecuta npm run demo:docs.')
  } else writeFileSync(output, content)
}
if (existsSync(generated)) for (const filename of readdirSync(generated)) {
  if (filename.endsWith('.json') && !documents[filename.slice(0, -5)]) {
    if (process.argv.includes('--check')) throw new Error('Ficha obsoleta: ' + filename)
    unlinkSync(resolve(generated, filename))
  }
}
console.log('Fichas ' + (process.argv.includes('--check') ? 'verificadas' : 'generadas') + ': ' + Object.keys(documents).length + '. Guías de uso: ' + Object.keys(guides).length + '.')
