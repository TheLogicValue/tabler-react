import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const project = fileURLToPath(new URL('../', import.meta.url))
const npmCli = process.env.npm_execpath
if (!npmCli) throw new Error('Ejecuta este guion mediante npm run test:react18.')
const fixture = mkdtempSync(join(tmpdir(), 'tabler-react18-'))
const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'))
function run(args, cwd = project, options = {}) {
  const result = spawnSync(process.execPath, args, { cwd, encoding: 'utf8', ...options })
  if (result.error || result.status !== 0) throw new Error(result.error?.message || result.stderr || result.stdout || `El comando terminó con código ${result.status}`)
  return result.stdout
}
const [packed] = JSON.parse(run([npmCli, 'pack', '--ignore-scripts', '--json', '--pack-destination', fixture]))
writeFileSync(join(fixture, 'package.json'), JSON.stringify({
  name: 'tabler-react18-consumer', private: true,
  dependencies: {
    'tabler-react': `file:./${packed.filename}`,
    react: '18.3.1', 'react-dom': '18.3.1',
    ...Object.fromEntries(['ag-grid-community', 'ag-grid-react', 'react-router-dom'].map(name =>
      [name, lock.packages[`node_modules/${name}`].version])),
  },
}, null, 2))
console.log(`Consumidor aislado con React 18: ${fixture}`)
// Install the packed library as a normal consumer, checking peer compatibility.
run([npmCli, 'install', '--ignore-scripts', '--legacy-peer-deps=false', '--no-audit', '--no-fund'], fixture, { stdio: 'inherit' })
run(['--test', '--test-timeout=30000', 'tests/floating.test.cjs', 'tests/ag-grid.test.cjs', 'tests/badge.test.cjs', 'tests/grid.test.cjs', 'tests/primitives.test.cjs', 'tests/card.test.cjs', 'tests/page.test.cjs'], project, {
  stdio: 'inherit',
  env: { ...process.env, TABLER_TEST_PACKAGE_DIR: join(fixture, 'node_modules', 'tabler-react') },
})
