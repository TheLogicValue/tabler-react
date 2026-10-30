import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'node:http'
import { build } from 'vite'
import { chromium } from 'playwright'

const project = fileURLToPath(new URL('../', import.meta.url))
const consumerPath = process.env.TABLER_TEST_PACKAGE_DIR ? resolve(process.env.TABLER_TEST_PACKAGE_DIR, '../..') : project
const consumer = createRequire(join(consumerPath, 'package.json'))
const React = consumer('react')
const { renderToString } = consumer('react-dom/server')
const { MemoryRouter, Link } = consumer('react-router-dom')
const lib = consumer(process.env.TABLER_TEST_PACKAGE_DIR || join(project, 'dist/index.js'))
const fixtures = createRequire(import.meta.url)('../tests/security-fixtures.cjs')
function RoutingLink({ to, children, className, onClick }) {
  return React.createElement(Link, { to, className, onClick }, children)
}
const cases = fixtures(React, lib, RoutingLink)
function markup(url) {
  const h = React.createElement
  return renderToString(h(MemoryRouter, null, h('div', null,
    ...cases.map(([name, create]) => h('section', { key: name }, create(url))),
    h(lib.Dropdown, { key: 'dropdown', triggerContent: 'Menu', itemsObject: [{ value: 'Open', to: url }] }),
    h(lib.NavBarMenu, { key: 'navbar', items: [{ value: 'Menu', subItems: [{ value: 'Open', to: url, LinkComponent: true }] }] })
  )))
}
const output = mkdtempSync(join(tmpdir(), 'tabler-security-browser-'))
assert.equal(dirname(output), resolve(tmpdir()), 'Temporary build must stay within the system temp directory')
let browser, server
try {
  await build({ configFile: false, root: project, logLevel: 'error',
    define: { 'process.env.NODE_ENV': JSON.stringify('production') },
    resolve: { alias: [
      { find: /^tabler-react$/, replacement: process.env.TABLER_TEST_PACKAGE_DIR ? join(process.env.TABLER_TEST_PACKAGE_DIR, 'dist/index.es.js') : join(project, 'dist/index.es.js') },
      ...['react', 'react-dom', 'react-router-dom'].map(name => ({ find: new RegExp('^' + name + '(?=/|$)'), replacement: dirname(consumer.resolve(name + '/package.json')) })),
    ] },
    build: { outDir: output, emptyOutDir: true, minify: false,
      commonjsOptions: { include: [/node_modules/, /security-fixtures\.cjs$/] },
      lib: { entry: join(project, 'tests/security-browser-entry.mjs'), formats: ['es'], fileName: () => 'browser.js' } },
  })
  const bundle = readFileSync(join(output, 'browser.js'))
  server = createServer((request, response) => {
    if (request.url === '/browser.js') { response.setHeader('Content-Type', 'text/javascript'); response.end(bundle) }
    else if (request.url?.startsWith('/pixel')) { response.writeHead(204); response.end() }
    else { response.setHeader('Content-Type', 'text/html'); response.end('<!doctype html><title>Security test</title><script type="module" src="/browser.js"></script>') }
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) })
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', error => { errors.push(error.message); console.error(error.message) })
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto(`http://127.0.0.1:${server.address().port}/`)
  await page.waitForFunction(() => typeof window.exerciseSecurity === 'function')
  assert.equal(await page.evaluate(async () => {
    const anchor = document.createElement('a')
    anchor.href = 'javascript:void(window.__positiveControl=true)'
    document.body.append(anchor)
    anchor.click()
    await new Promise(resolve => setTimeout(resolve, 60))
    anchor.remove()
    return window.__positiveControl === true
  }), true, 'Browser must execute the positive control to validate the XSS detector')
  const bad = ["javascript:void(window.__securityExecuted=true)", " JaVaScRiPt:void(window.__securityExecuted=true)", "java\nscript:void(window.__securityExecuted=true)", 'data:text/html,<script>parent.__securityExecuted=true</script>']
  for (const mode of ['server', 'client', 'hydrate']) {
    for (const url of [...bad, '#safe']) {
      const result = await page.evaluate(options => window.exerciseSecurity(options), { mode, url, html: mode === 'client' ? '' : markup(url) })
      assert.ok(result.count >= cases.length, JSON.stringify(result))
      assert.equal(result.executed, false, `${mode}: executable destination`)
      assert.equal(result.cssInjected, false, `${mode}: image URL introduced CSS declarations`)
      if (url !== '#safe') {
        assert.ok(result.destinations.every(value => value === null), `${mode}: ${JSON.stringify(result)}`)
        assert.equal(result.navigated, false, `${mode}: blocked destination navigated`)
      } else assert.ok(result.destinations.every(value => value?.endsWith('#safe')), `${mode}: legitimate links lost`)
      if (mode !== 'server') assert.ok(result.menuCount >= 2, `${mode}: dropdown paths were not exercised`)
      console.log(`React ${React.version}: ${mode}, ${url === '#safe' ? 'valid links' : 'blocked URL'}: ${result.count} links checked`)
    }
  }
  assert.deepEqual(errors, [], 'Browser errors or hydration failures')
} finally {
  await browser?.close()
  if (server) await new Promise(resolve => server.close(resolve))
  rmSync(output, { recursive: true, force: true })
}
