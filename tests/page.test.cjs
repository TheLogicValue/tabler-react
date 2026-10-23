const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')

const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
const React = consumerRequire('react')
const { renderToStaticMarkup } = consumerRequire('react-dom/server')
const { Page } = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')
const render = (Component, props, children) => renderToStaticMarkup(React.createElement(Component, props, children))

test('Page conserva sus ocho subcomponentes públicos y los contenedores básicos', () => {
  assert.deepEqual(Object.keys(Page).sort(), ['Main', 'Content', 'Header', 'ContentWithSidebar', 'Card', 'Title', 'MapHeader', 'Sidebar'].sort())
  for (const name of Object.keys(Page)) assert.equal(Page[name].displayName, 'Page.' + name)
  assert.equal(render(Page, { className: 'consumer', id: 'ignored' }, 'Página'), '<div class="page consumer">Página</div>')
  assert.equal(render(Page.Main, { className: 'ignored' }, 'Principal'), '<div class="page-main">Principal</div>')
  assert.equal(render(Page.Title, { className: 'consumer', id: 'ignored' }, 'Título'), '<h1 class="page-title consumer">Título</h1>')
  assert.equal(render(Page.MapHeader, { className: 'ignored' }, 'Mapa'), '<div class="map-header">Mapa</div>')
})

test('Page.Header y Page.Content mantienen cabecera, vuelta, opciones y auxiliares internos', () => {
  // Captured from the public bundle before migrating Page to TypeScript.
  const props = { title: 'Título', subTitle: 'Subtítulo', back: React.createElement('button', { type: 'button' }, 'Volver'), options: React.createElement('button', { type: 'button' }, 'Guardar') }
  const header = '<div class="page-header"><span class="page-back"><button type="button">Volver</button></span><h1 class="page-title">Título</h1><div class="page-subtitle">Subtítulo</div><div class="page-options d-flex"><button type="button">Guardar</button></div>'
  assert.equal(render(Page.Header, props, 'Extra'), header + 'Extra</div>')
  assert.equal(render(Page.Content, { ...props, className: 'consumer' }, 'Contenido'), '<div class="page-content consumer"><div class="container">' + header + '</div>Contenido</div></div>')
  assert.equal(render(Page.Content, {}, 'Contenido'), '<div class="page-content"><div class="container">Contenido</div></div>')
  assert.equal(render(Page.Content, { title: '', subTitle: '' }, 'Contenido'), '<div class="page-content"><div class="container">Contenido</div></div>')
  assert.equal(render(Page.Header, { className: 'ignored' }, 'Extra'), '<div class="page-header">Extra</div>')
})

test('Page.ContentWithSidebar conserva la cabecera y distribución de columnas', () => {
  assert.equal(render(Page.ContentWithSidebar, { header: 'Cabecera', sidebar: 'Lateral', className: 'ignored' }, 'Contenido'), '<div class="page-content"><div class="container">Cabecera<div class="row row"><div class="col col-lg-3 order-lg-1 mb-4">Lateral</div><div class="col col-lg-9">Contenido</div></div></div></div>')
})

test('Page.Card mantiene Card, su raíz personalizada y las posiciones de header y footer', () => {
  const props = { title: 'Tarjeta', RootComponent: 'article', header: React.createElement('strong', null, 'Extra'), footer: React.createElement('small', null, 'Pie'), id: 'ignored' }
  assert.equal(render(Page.Card, props, 'Contenido'), '<div class="my-3 my-md-5"><div class="container"><div class="row row"><div class="col col-12"><article class="card"><div class="card-header"><h3 class="card-title">Tarjeta</h3></div><strong>Extra</strong><div class="card-body">Contenido</div><small>Pie</small></article></div></div></div></div>')
  assert.equal(render(Page.Card, {}, 0), '<div class="my-3 my-md-5"><div class="container"><div class="row row"><div class="col col-12"><div class="card"><div class="card-body">0</div></div></div></div></div></div>')
})

test('Page.Sidebar conserva el contrato de logo, navegación y atributos Bootstrap', () => {
  // React 19 adds a resource preload; React 18 renders the same sidebar without it.
  const html = render(Page.Sidebar, { headerProps: { darkImageUrl: '/logo.svg', darkImageURL: '/ignored.svg' }, nav: React.createElement('nav', null, 'Navegación') }).replace(/^<link\b[^>]*>/, '')
  assert.equal(html, '<div class="navbar navbar-vertical navbar-expand-lg navbar-dark"><div class="container-fluid"><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu"><span class="navbar-toggler-icon"></span></button><h1 class="navbar-brand navbar-brand-autodark"><a href="."><img src="/logo.svg" width="120px" alt="Tabler" class="navbar-brand-image"/></a></h1><nav>Navegación</nav></div></div>')
  assert.doesNotMatch(render(Page.Sidebar, { headerProps: {}, nav: null }), /src=|<nav/)
})
