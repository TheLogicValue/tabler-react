const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')
const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
const React = consumerRequire('react')
const { renderToStaticMarkup } = consumerRequire('react-dom/server')
const { Header, Avatar, Button, ButtonModal, Dropdown, Spinner } = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')
const render = (Component, props, children) => renderToStaticMarkup(React.createElement(Component, props, children))

test('Header conserva niveles, raíces y márgenes de H1 a H6', () => {
  assert.equal(render(Header, { size: 3, className: 'consumer', id: 'ignored' }, 'Título'), '<div class="h3 consumer">Título</div>')
  assert.equal(render(Header, { RootComponent: 'section' }, 'Título'), '<section class="h1">Título</section>')
  for (let level = 1; level <= 6; level++) {
    assert.equal(Header['H' + level].displayName, 'Header.H' + level)
    assert.equal(render(Header['H' + level], { className: 'consumer', size: 1 }, 'Título'), `<h${level} class="h${level} mt-0 mb-4 consumer">Título</h${level}>`)
  }
})

test('Avatar conserva estilos del consumidor, icono, estado y listas', () => {
  const style = Object.freeze({ backgroundImage: 'none', width: 32 })
  assert.equal(render(Avatar, { imageURL: '/photo.svg', style, status: 'green', icon: 'user', color: 'blue' }, 'AB'), '<span class="avatar avatar-blue" style="background-image:none;width:32px"><i class="fe fe-user"></i><span class="avatar-status bg-green"></span>AB</span>')
  assert.equal(render(Avatar, { imageURL: '/photo.svg', size: 'lg', placeholder: true, id: 'ignored' }), '<span class="avatar avatar-lg avatar-placeholder" style="background-image:url(/photo.svg)"></span>')
  assert.equal(render(Avatar.List, { stacked: true, className: 'consumer' }, 'Avatares'), '<div class="avatar-list avatar-list-stacked consumer">Avatares</div>')
  assert.deepEqual(style, { backgroundImage: 'none', width: 32 })
})

test('Button conserva HTML de botones, entradas, enlaces y el reenvío de Button.List', () => {
  // Captured from the public bundle before the migration.
  assert.equal(render(Button, { color: 'primary', type: 'button', icon: 'check', pill: true }, 'Guardar'), '<button class="btn btn-primary btn-pill" type="button"><i class="fe fe-check mr-2"></i>Guardar</button>')
  assert.equal(render(Button, { RootComponent: 'input', type: 'button', value: 'Guardar', color: 'primary' }), '<input class="btn btn-primary btn-icon" type="button" value="Guardar"/>')
  assert.equal(render(Button, { RootComponent: 'a', href: '/details', target: '_blank', rel: 'noopener', download: 'report.csv' }, 'Detalle'), '<a class="btn" href="/details" target="_blank" rel="noopener" download="report.csv">Detalle</a>')
  assert.equal(render(Button, { loading: true, social: 'github', icon: 'check', id: 'ignored' }), '<button class="btn btn-github btn-icon btn-loading"><i class="fa fa-github"></i></button>')
  assert.equal(render(Button.List, { align: 'right', id: 'actions' }, 'Acciones'), '<div class="btn-list text-right" id="actions">Acciones</div>')
})

test('Button conserva el contrato de raíz personalizada y ButtonModal alterna con Spinner', () => {
  let received
  const onClick = () => undefined
  function ConsumerLink(props) { received = props; return React.createElement('a', { href: props.to, className: props.className }, props.children) }
  assert.equal(render(Button, { RootComponent: ConsumerLink, to: '/details', rootRef: React.createRef(), onClick, id: 'ignored' }, 'Detalle'), '<a href="/details" class="btn">Detalle</a>')
  assert.equal(received.onClick, onClick)
  assert.equal(received.rootRef, undefined)
  assert.equal(received.id, undefined)
  assert.equal(render(ButtonModal, { text: 'Guardar', color: 'primary' }), '<button class="btn btn-lg btn-primary btn-square" type="button">Guardar</button>')
  assert.equal(render(ButtonModal, { spin: true, width: '2rem', height: 32 }), render(Spinner, { width: '2rem', height: 32 }))
  assert.match(render(Spinner), /height="26" width="26"/)
})

test('Dropdown conserva variantes, estilo vertical y composición de sus items', () => {
  assert.equal(render(Dropdown, { flex: 'sm', triggerContent: 'Menú' }), '<div class="dropdown d-{flex}-flex"><button type="button" class="tabler-action tabler-dropdown-trigger dropdown-toggle" aria-expanded="false" aria-haspopup="true">Menú</button></div>')
  assert.equal(render(Dropdown.Menu, { vertical: true, show: true, style: { zIndex: 7 } }, 'Vertical'), '<div class="dropdown-menu-left show" style="z-index:7">Vertical</div>')
  assert.equal(render(Dropdown.Menu, { vertical: true, show: false }, 'Oculto'), '')
  assert.equal(render(Dropdown.Item, { to: '/details', badge: 'Nuevo', badgeType: 'success', icon: 'check', value: 'Detalle' }), '<a class="dropdown-item" href="/details"><span class="float-right"><span class="badge badge-success">Nuevo</span></span><i class="fe fe-check dropdown-icon"></i> Detalle</a>')
  assert.equal(render(Dropdown.ItemDivider, {}, 'Fin'), '<div class="dropdown-divider">Fin</div>')
  let received
  function ConsumerLink(props) { received = props; return React.createElement('a', { href: props.to }, props.children) }
  render(Dropdown.Item, { RootComponent: ConsumerLink, to: '/details', useExact: true }, 'Detalle')
  assert.equal(received.to, '/details')
  assert.equal(received.exact, true)
})
