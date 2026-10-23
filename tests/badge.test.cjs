const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')

const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
const React = consumerRequire('react')
const { renderToStaticMarkup } = consumerRequire('react-dom/server')
const { Badge } = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')

test('Badge mantiene su API JavaScript y HTML después de migrar a TypeScript', () => {
  const render = (props, children) => renderToStaticMarkup(React.createElement(Badge, props, children))
  assert.equal(render({}, 'Estado'), '<span class="badge badge-primary">Estado</span>')
  assert.equal(render({ color: 'success', className: 'consumer-badge' }, 'Listo'), '<span class="badge badge-success consumer-badge">Listo</span>')
  assert.equal(render({ color: '' }, 0), '<span class="badge">0</span>')
  assert.equal(render({ color: 'custom-color' }, React.createElement('strong', null, 'Seguro <script>')), '<span class="badge badge-custom-color"><strong>Seguro &lt;script&gt;</strong></span>')
  assert.equal(render({}, undefined), '<span class="badge badge-primary"></span>')
})
