const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')
const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
const React = consumerRequire('react')
const { renderToStaticMarkup } = consumerRequire('react-dom/server')
const { Alert, List, Nav, Site, Notification, AccountDropdown, Button, Accordion, Breadcrumb, SearchBar } = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')
const render = (Component, props, children) => renderToStaticMarkup(React.createElement(Component, props, children))

test('Alert conserva variantes, avatar, icono y enlace; cerrar es una acción accesible', () => {
  const html = render(Alert, { type: 'warning', icon: 'bell', isDismissible: true }, 'Aviso')
  assert.match(html, /class="alert alert-warning alert-icon alert-dismissible" role="alert"/)
  assert.match(html, /<button[^>]*aria-label="Close alert"[^>]*type="button"/)
  assert.match(html, /<i class="fe fe-bell mr-2"><\/i>Aviso/)
  assert.match(render(Alert, { type: 'success', avatar: '/avatar.svg', hasExtraSpace: true }, 'Correcto'), /mt-5 mb-6 alert-avatar/)
  assert.equal(render(Alert.Link, { href: '/details', className: 'consumer' }, 'Detalle'), '<a class="alert-link consumer" href="/details">Detalle</a>')
  assert.match(render(Button, { type: 'button', 'aria-label': 'Cerrar' }), /aria-label="Cerrar"/)
})

test('List conserva sus tres subcomponentes y la opción heredada seperated', () => {
  assert.equal(render(List, { seperated: true, inline: true }, 'Lista'), '<ul class="list list-seperated list-inline">Lista</ul>')
  assert.equal(render(List.Item, { inline: true }, 'Uno'), '<li class="list-inline-item">Uno</li>')
  assert.equal(render(List.Group, { transparent: true, isCardBody: true }, 'Grupo'), '<div class="list-group mb-0 list-group-transparent card-list-group">Grupo</div>')
  assert.equal(render(List.GroupItem, { to: '/details', action: true, active: true }, 'Detalle'), '<a class="list-group-item list-group-item-action active" href="/details">Detalle</a>')
})

test('Nav conserva items activos, submenús, prioridades y enlaces personalizados', () => {
  const html = render(Nav, { itemsObjects: [{ value: 'Inicio', to: '/', active: true }, { value: 'Más', subItems: [{ value: 'Detalle', to: '/details' }] }] })
  assert.equal(html, '<ul class="nav nav-tabs"><li class="nav-item"><a class="nav-link-item active" href="/"><span class="nav-link-title">Inicio</span></a></li><li class="nav-item"><a class="nav-link-item"><span class="nav-link-title">Más</span><i class="fe fe-chevron-down text-right"></i></a></li></ul>')
  assert.equal(render(Nav, { items: React.createElement('li', null, 'Directo'), itemsObjects: [{ value: 'Ignorado' }] }, 'Ignorado'), '<ul class="nav nav-tabs"><li>Directo</li></ul>')
  assert.equal(render(Nav.Submenu, { className: 'consumer' }, 'Submenú'), '<div class="nav nav-submenu consumer">Submenú</div>')
  let received
  function ConsumerLink(props) { received = props; return React.createElement('a', { href: props.to }, props.children) }
  render(Nav.Link, { RootComponent: ConsumerLink, to: '/details', useExact: true }, 'Detalle')
  assert.equal(received.exact, true)
  assert.equal(received.to, '/details')
  assert.equal(render(Nav.SubItem, { value: 'Valor' }, 'Ignorado'), '<a class="dropdown-item">Valor</a>')
})

test('Site conserva composición transparente, cabecera personalizada, logo, navegación y pie', () => {
  assert.equal(render(Site, {}, 'Directo'), 'Directo')
  assert.equal(render(Site.Header, {}, 'Personalizada'), '<div class="header"><div class="container"><div class="d-flex">Personalizada</div></div></div>')
  assert.equal(render(Site.Logo, { href: '/home', alt: 'Logo' }), '<a class="header-brand" href="/home"><img class="header-brand-img" alt="Logo"/></a>')
  const vertical = render(Site.Nav, { vertical: true, itemsObjects: [{ value: 'Inicio', to: '/' }] })
  assert.match(vertical, /^<div class="collapse navbar-collapse" id="navbar-menu">/)
  assert.match(vertical, /<ul class="nav navbar-nav pt-lg-3">/)
  assert.match(render(Site.Footer, { note: 'Nota', copyright: 'Derechos', links: ['Uno', 'Dos'] }), /<li class="">Uno<\/li><li class="">Dos<\/li>/)
  assert.equal(render(Site.Footer, {}), '')
})

test('Notification y AccountDropdown conservan sus datos y composición de disparador', () => {
  assert.equal(render(Notification, { message: 'Hola', time: 'Ahora' }), '<div>Hola<div class="small">Ahora</div></div>')
  const html = render(AccountDropdown, { name: 'Ana', description: 'Equipo', avatarImage: React.createElement('span', null, 'AB'), options: ['profile', 'divider', 'logout'] })
  assert.match(html, /<span>AB<\/span>/)
  assert.match(html, /<span class="text-default">Ana<\/span>/)
  assert.match(html, /<small class="text-muted d-block mt-1">Equipo<\/small>/)
  assert.match(html, /aria-expanded="false"/)
})

test('Accordion conserva el estado inicial y Breadcrumb mantiene la selección en el consumidor', () => {
  const closed = render(Accordion, { accordionButton: 'Detalles', id: 'ignored' }, 'Contenido')
  assert.match(closed, /<button type="button" class="accordion-button">Detalles<\/button>/)
  assert.match(closed, /class="accordion-collapse collapse"/)
  assert.doesNotMatch(closed, /ignored/)
  assert.match(render(Accordion, { accordionButton: 'Detalles', collapseDefault: false }, 'Contenido'), /class="accordion-collapse collapse show"/)
  const html = render(Breadcrumb, { crumbs: [{ name: 'Inicio', path: '/' }, { name: React.createElement('strong', null, 'Datos'), path: '/datos' }], selected: () => undefined })
  assert.match(html, /<ul class="list breadcrumb">/)
  assert.match(html, /<button type="button" class="btn btn-link ">Inicio<\/button>/)
  assert.match(html, /<button type="button" class="btn btn-link disabled"><strong>Datos<\/strong><\/button>/)
  assert.doesNotMatch(html, /href=|disabled=""/)
  assert.doesNotThrow(() => render(Breadcrumb, { crumbs: [], selected: () => undefined }))
})

test('SearchBar conserva las clases del consumidor, el placeholder y su campo no controlado', () => {
  const html = render(SearchBar, { classes: ['consumer', { active: true, inactive: false }], onKeyUp: () => undefined, onClick: () => undefined, value: 'ignored' })
  assert.match(html, /class="form-group input-search-bar consumer active"/)
  assert.match(html, /placeholder="Search for\.\.\."/)
  assert.match(html, /<button[^>]*type="button"/)
  assert.doesNotMatch(html, /value=|ignored|inactive/)
  assert.match(render(SearchBar, { placeholder: 'Buscar fondos', onKeyUp: () => undefined, onClick: () => undefined }), /placeholder="Buscar fondos"/)
})
