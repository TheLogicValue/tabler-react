const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')

const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
const React = consumerRequire('react')
const { renderToStaticMarkup } = consumerRequire('react-dom/server')
const { Card } = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')
const render = (Component, props, children) => renderToStaticMarkup(React.createElement(Component, props, children))

test('Card conserva composición automática, prioridades y estado inicial', () => {
  // HTML captured from the public bundle before migrating Card to TypeScript.
  assert.equal(render(Card, { title: 'Título', body: 'Cuerpo', footer: 'Pie', statusColor: 'blue', statusSide: true, alert: 'Aviso', alertColor: 'warning', className: 'consumer' }, 'Alternativa'), '<div class="card consumer"><div class="card-status bg-blue card-status-left"></div><div class="card-header"><h3 class="card-title">Título</h3></div><div class="card-alert alert alert-warning mb-0">Aviso</div><div class="card-body">Cuerpo</div><div class="card-footer">Pie</div></div>')
  assert.equal(render(Card, { RootComponent: 'section', aside: true }, 'Contenido'), '<section class="card aside">Contenido</section>')
  assert.equal(render(Card, { body: 0, isCollapsed: true }, 'Alternativa'), '<div class="card card-collapsed">Alternativa</div>')
  assert.equal(render(Card, { isClosed: true, title: 'Cerrada' }, 'Contenido'), '')
  assert.equal(render(Card, { alert: 'No visible sin color' }, 'Contenido'), '<div class="card">Contenido</div>')
  assert.equal(render(Card, { title: 'Solo ampliar', isFullscreenable: true }), '<div class="card"><div class="card-header"><h3 class="card-title">Solo ampliar</h3></div></div>')
})

test('Los nueve subcomponentes de Card conservan identidad, HTML y clases', () => {
  const cases = [
    ['Header', { backgroundURL: '/map.svg', className: 'consumer' }, 'Cabecera', '<div class="card-header consumer" style="background-image:url(/map.svg)">Cabecera</div>'],
    ['Title', { RootComponent: 'h2', className: 'consumer' }, 'Título', '<h2 class="card-title consumer">Título</h2>'],
    ['Body', {}, 'Cuerpo', '<div class="card-body">Cuerpo</div>'],
    ['Options', {}, 'Acciones', '<div class="card-options">Acciones</div>'],
    ['Status', { color: 'blue', side: true }, 'Estado', '<div class="card-status bg-blue card-status-left">Estado</div>'],
    ['Alert', { color: 'warning' }, 'Aviso', '<div class="card-alert alert alert-warning mb-0">Aviso</div>'],
    ['Footer', {}, 'Pie', '<div class="card-footer">Pie</div>'],
    ['Map', { placeholder: '/map.svg' }, 'Mapa', '<div class="card-map card-map-placeholder" style="background-image:url(/map.svg)">Mapa</div>'],
    ['OptionsItem', {}, 'Ignorado', '<button type="button" class="tabler-action" data-toggle="" aria-label="Card action"><i class="fe fe-"></i></button>'],
  ]
  for (const [name, props, children, expected] of cases) {
    assert.equal(Card[name].displayName, 'Card.' + name)
    assert.equal(render(Card[name], { ...props, id: 'not-forwarded' }, children), expected)
  }
  assert.equal(render(Card.OptionsItem, { type: 'fullscreen', icon: 'check', 'aria-label': 'Ampliar' }), '<button type="button" class="tabler-action card-options-fullscreen" data-toggle="card-remove" aria-label="Ampliar"><i class="fe fe-check"></i></button>')
})

test('Card y Card.Title solo suministran className y children a una raíz personalizada', () => {
  let received
  function ConsumerRoot(props) { received = props; return React.createElement('article', props) }
  assert.equal(render(Card, { RootComponent: ConsumerRoot, id: 'ignored', className: 'consumer' }, 'Contenido'), '<article class="card consumer">Contenido</article>')
  assert.deepEqual(Object.keys(received).sort(), ['children', 'className'])
  assert.equal(render(Card.Title, { RootComponent: ConsumerRoot, id: 'ignored' }, 'Título'), '<article class="card-title">Título</article>')
  assert.deepEqual(received, { className: 'card-title', children: 'Título' })
})

test('Los estilos opcionales de Card.Header y Card.Map admiten URL ausente o vacía', () => {
  for (const url of [undefined, '']) {
    assert.equal(render(Card.Header, { backgroundURL: url }, 'Cabecera'), '<div class="card-header">Cabecera</div>')
    assert.equal(render(Card.Map, { placeholder: url }, 'Mapa'), '<div class="card-map">Mapa</div>')
  }
})
