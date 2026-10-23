import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const project = fileURLToPath(new URL('../', import.meta.url))
const compiler = join(project, 'node_modules/typescript/bin/tsc')

function run(args, cwd, options = {}) {
  const result = spawnSync(process.execPath, args, { cwd, encoding: 'utf8', ...options })
  if (result.error || result.status !== 0) throw new Error(result.error?.message || result.stdout + result.stderr || 'Falló la comprobación del paquete.')
  return result.stdout
}

export function checkPackageTypes(fixture) {
  const source = readFileSync(join(project, 'tests/types/PublicAPI.tsx'), 'utf8')
    .replaceAll('"../../src/Tabler.css"', '"tabler-react/style.css"')
    .replaceAll('"../../src"', '"tabler-react"')
  writeFileSync(join(fixture, 'consumer.tsx'), source)
  writeFileSync(join(fixture, 'consumer.mts'), 'import { Button, type MouseEvents } from "tabler-react";\nexport const button: typeof Button = Button;\nexport const events: MouseEvents<HTMLButtonElement> = { onClick: event => event.currentTarget.disabled };\n')
  writeFileSync(join(fixture, 'consumer.cts'), 'import Tabler = require("tabler-react");\nexport const button: typeof Tabler.Button = Tabler.Button;\nexport const props: Tabler.CardProps = { title: "Tarjeta" };\n')
  const common = ['--strict', '--noEmit', '--jsx', 'react', '--target', 'ES2022', '--esModuleInterop', '--skipLibCheck', 'false', '--noUncheckedSideEffectImports', '--types', 'react']
  run([compiler, ...common, '--module', 'ESNext', '--moduleResolution', 'Bundler', 'consumer.tsx'], fixture)
  run([compiler, ...common, '--module', 'NodeNext', '--moduleResolution', 'NodeNext', 'consumer.mts', 'consumer.cts'], fixture)
  console.log('Paquete instalado: tipos, genéricos, eventos, CSS, ESM y CommonJS correctos.')
}

async function testReact19() {
  const npmCli = process.env.npm_execpath
  if (!npmCli) throw new Error('Ejecuta esta comprobación mediante npm run test:types o npm run check.')
  const fixture = mkdtempSync(join(tmpdir(), 'tabler-package-types-'))
  const lock = JSON.parse(readFileSync(join(project, 'package-lock.json'), 'utf8'))
  const [pack] = JSON.parse(run([npmCli, 'pack', '--ignore-scripts', '--json', '--pack-destination', fixture], project))
  assert.ok(pack.files.some(file => file.path === 'dist/index.d.ts'))
  assert.ok(pack.files.some(file => file.path === 'dist/style.css.d.ts'))
  assert.ok(pack.files.every(file => !/^(src|demo|tests|flow-typed)\//.test(file.path)))
  writeFileSync(join(fixture, 'package.json'), JSON.stringify({
    name: 'tabler-types-consumer', private: true,
    dependencies: {
      'tabler-react': `file:./${pack.filename}`,
      ...Object.fromEntries(['react', 'react-dom', '@types/react', '@types/react-dom', 'ag-grid-community', 'ag-grid-react', 'react-router-dom'].map(name => [name, lock.packages['node_modules/' + name].version])),
    },
  }, null, 2))
  console.log('Consumidor TypeScript aislado con React 19: ' + fixture)
  run([npmCli, 'install', '--ignore-scripts', '--legacy-peer-deps=false', '--prefer-offline', '--no-audit', '--no-fund'], fixture, { stdio: 'inherit' })
  checkPackageTypes(fixture)
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) await testReact19()
