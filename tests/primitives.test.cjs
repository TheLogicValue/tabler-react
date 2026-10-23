const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')

const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
const React = consumerRequire('react')
const { renderToStaticMarkup } = consumerRequire('react-dom/server')
const { Icon, Container, Text, Tag, Stamp, Progress, Loader, LoaderZone, LoaderNoData, Dimmer, colors } = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')
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

test('Tag conserva sus variantes, complementos y la raíz personalizada del consumidor', () => {
  assert.equal(render(Tag, { color: 'blue', rounded: true, className: 'consumer', id: 'ignored' }, 'Atlas'), '<span class="tag expanded tag-rounded tag-blue consumer">Atlas</span>')
  assert.equal(render(Tag, { link: true, href: '/atlas' }, 'Atlas'), '<a class="tag expanded" href="/atlas">Atlas</a>')
  const html = render(Tag, { avatar: '/avatar.svg', addOn: 3, addOnIcon: 'check', addOnColor: 'green', remove: true }, 'Atlas')
  assert.match(html, /class="tag-avatar avatar" style="background-image:url\(\/avatar.svg\)"/)
  assert.match(html, /<span class="tag-addon tag-green"><i class="fe fe-check"><\/i>3<\/span>/)
  assert.match(html, /<a class="tag-addon"><i class="fe fe-x"><\/i><\/a>/)
  assert.equal(render(Tag.List, { className: 'consumer' }, 'Etiquetas'), '<div class="tags consumer">Etiquetas</div>')
  assert.equal(render(Tag.AddOn, { link: true, href: '/atlas', icon: 'check' }, 'Ver'), '<a class="tag-addon" href="/atlas"><i class="fe fe-check"></i>Ver</a>')
  let received
  const handler = () => undefined
  function ConsumerRoot(props) { received = props; return React.createElement('a', { href: props.to, className: props.className }, props.children) }
  assert.equal(render(Tag, { RootComponent: ConsumerRoot, to: '/atlas', color: 'blue', onClick: handler, 'aria-describedby': 'help' }, 'Atlas'), '<a href="/atlas" class="tag expanded tag-blue">Atlas</a>')
  assert.equal(received.to, '/atlas')
  assert.equal(received.onClick, handler)
  assert.equal(received['aria-describedby'], 'help')
  render(Tag.AddOn, { RootComponent: ConsumerRoot, to: '/addon', color: 'blue', onClick: handler }, 'Ver')
  assert.equal(received.to, '/addon')
  assert.equal(received.onClick, handler)
  assert.equal(received.className, undefined, 'AddOn mantiene el alcance heredado del reenvío a raíces personalizadas')
})

test('Stamp, Progress y Dimmer conservan su HTML y sus límites de reenvío', () => {
  assert.equal(render(Stamp, { icon: 'check', color: 'green', size: 'sm', id: 'ignored' }, '7'), '<span class="stamp stamp-sm bg-green"><i class="fe fe-check"></i>7</span>')
  assert.equal(render(Stamp, {}, '7'), '<span class="stamp stamp-md">7</span>')
  assert.equal(render(Progress, { size: 'sm', className: 'consumer' }, React.createElement(Progress.Bar, { width: 125, color: 'green' })), '<div class="progress progress-sm consumer"><div class="progress-bar bg-green" style="width:125%"></div></div>')
  assert.equal(render(Progress.Bar, {}), '<div class="progress-bar" style="width:0%"></div>')
  assert.equal(render(Dimmer, { active: true, loader: true, id: 'ignored' }, 'Contenido'), '<div class="dimmer active"><div class="loader"></div><div class="dimmer-content">Contenido</div></div>')
  assert.equal(render(Dimmer.Content, { className: 'consumer' }, 'Contenido'), '<div class="dimmer-content consumer">Contenido</div>')
})

test('Los Loader conservan valores predeterminados y admiten alturas numéricas y fraccionarias', () => {
  assert.equal(render(Loader, { className: 'consumer', id: 'ignored' }, 'Cargando'), '<div class="loader consumer">Cargando</div>')
  assert.equal(render(LoaderNoData, { height: 240 }), '<div style="height:240px;align-items:center;display:flex;justify-content:center;background-color:#fff">No data</div>')
  assert.match(render(LoaderNoData, { height: '3rem', title: React.createElement('strong', null, 'Vacío'), backgroundColor: 'red' }), /background-color:red"><strong>Vacío<\/strong>/)
  for (const [height, expected] of [[240, '239.687'], ['240px', '239.687px'], ['3rem', '2.687rem'], ['3.5rem', '3.187rem'], ['.5em', '0.187em'], ['calc(100% - 1rem)', 'calc(100% - 1rem)']]) {
    const html = render(LoaderZone, { width: '100%', height, title: 'Cargando zona' })
    assert.match(html, /class="loading-zone"/)
    assert.match(html, /width="100%"/)
    assert.ok(html.includes(`<title id=`) && html.includes('>Cargando zona</title>'))
    assert.match(html, /padding:0.125rem 0.313rem/)
    const rectangle = html.match(/<clipPath\b[^>]*>(<rect\b[^>]*>)/)?.[1]
    assert.ok(rectangle?.includes(`height="${expected}"`), `${height}: ${rectangle}`)
  }
})

test('colors conserva la paleta completa y permite claves del consumidor', () => {
  assert.equal(Object.keys(colors).length, 97)
  assert.equal(colors.blue, '#467fcf')
  assert.equal(colors['gray-dark-lightest'], '#ebebec')
  assert.ok(Object.values(colors).every(value => /^#[0-9a-f]{6}$/.test(value)))
  assert.equal(Object.isFrozen(colors), false)
  try { colors['consumer-color'] = '#123456'; assert.equal(colors['consumer-color'], '#123456') }
  finally { delete colors['consumer-color'] }
})
