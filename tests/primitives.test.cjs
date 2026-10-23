const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')

const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
const React = consumerRequire('react')
const { renderToStaticMarkup } = consumerRequire('react-dom/server')
const { Icon, Container, Text } = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')
const render = (Component, props, children) => renderToStaticMarkup(React.createElement(Component, props, children))

test('Icon conserva ambas raíces, títulos y prioridad de familias de iconos', () => {
  assert.equal(Icon.displayName, 'Icon')
  assert.equal(render(Icon, { name: 'check', title: 'Listo' }), '<i class="fe fe-check" title="Listo"></i>')
  assert.equal(render(Icon, { name: 'download', link: true, isAriaHidden: true, color: 'primary', size: 'big', prefix: 'custom' }), '<a class="icon" aria-hidden="true"><i class="custom custom-download color-primary icon-size-big"></i></a>')
  assert.equal(render(Icon, { name: 'visa', prefix: 'custom', flag: true, payment: true, className: 'consumer', link: true, title: 'Tarjeta' }), '<a class="icon" title="Tarjeta"><i class="payment payment-visa consumer"></i></a>')
  assert.equal(render(Icon, { name: 'es', prefix: 'custom', flag: true, isAriaHidden: true, href: '/ignored' }), '<i class="flag flag-es"></i>')
})

test('Container conserva el contenedor y su contrato acotado de propiedades', () => {
  assert.equal(render(Container, { className: 'consumer', id: 'ignored' }, 'Contenido'), '<div class="container consumer">Contenido</div>')
  assert.equal(render(Container, {}, null), '<div class="container"></div>')
})

test('Text conserva las clases, la raíz y las propiedades nativas reenviadas', () => {
  // HTML captured from the public bundle before the migration.
  assert.equal(render(Text, { RootComponent: 'a', href: '#details', align: 'center', transform: 'uppercase', tracking: 'wide', leading: 'tight', muted: true, color: 'primary', size: 'sm', wrap: true, className: 'consumer' }, 'Contenido'), '<a class="text-wrap p-lg-6 text-primary sm text-muted text-center text-uppercase tracking-wide leading-tight consumer" href="#details" align="center" transform="uppercase" tracking="wide" leading="tight">Contenido</a>')
  assert.equal(render(Text, { id: 'intro', 'aria-live': 'polite' }, 'Contenido'), '<div class="" id="intro" aria-live="polite">Contenido</div>')
})

test('Text conserva los props del componente raíz del consumidor y la prioridad de variantes', () => {
  let received
  const onClick = () => undefined
  function ConsumerRoot(props) { received = props; return React.createElement('span', null, props.children) }
  assert.equal(render(Text, { RootComponent: ConsumerRoot, destination: '/details', onClick, align: 'right', left: true, transform: 'capitalize', uppercase: true, tracking: 'wide', trackingTight: true, leading: 'loose', leadingNone: true }, 'Contenido'), '<span>Contenido</span>')
  assert.equal(received.className, 'text-right text-capitalize tracking-wide leading-loose')
  assert.equal(received.destination, '/details')
  assert.equal(received.onClick, onClick)
  assert.equal(received.left, true, 'Las variantes continúan reenviándose como antes de la migración')
  render(Text, { RootComponent: ConsumerRoot, left: true, center: true, lowercase: true, uppercase: true, trackingTight: true, trackingNormal: true, leadingNone: true, leadingTight: true })
  assert.equal(received.className, 'text-left text-lowercase tracking-tight leading-none')
})

test('Text.Small conserva su identidad, raíz small y propiedades limitadas', () => {
  assert.equal(Text.displayName, 'Text')
  assert.equal(Text.Small.displayName, 'Text.Small')
  assert.equal(render(Text.Small, { muted: true, color: 'red', wrap: true, className: 'note', RootComponent: 'a', href: '/ignored', size: 'ignored' }, 'Contenido'), '<small class="text-wrap p-lg-6 text-red sm text-muted note">Contenido</small>')
  assert.equal(render(Text.Small, {}, 'Nota'), '<small class="sm">Nota</small>')
})
