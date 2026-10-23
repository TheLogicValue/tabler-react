const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')

const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
const React = consumerRequire('react')
const { renderToStaticMarkup } = consumerRequire('react-dom/server')
const { BlogCard, ContactCard, DoubleCard, ProgressCard, StampCard, StatsCard, StoreCard, TabbedCard, GalleryCard, PricingCard, Timeline, Tab } = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')
const render = (Component, props, children) => renderToStaticMarkup(React.createElement(Component, props, children))

test('BlogCard conserva ambas variantes y corrige la URL CSS del avatar', () => {
  for (const aside of [false, true]) {
    const html = render(BlogCard, { title: 'Publicación', description: 'Resumen', imgSrc: '/post.svg', avatarImgSrc: '/avatar.svg', imgAlt: 'Portada', postHref: '/post', profileHref: '/perfil', authorName: 'Ana', date: 'Ahora', iconHref: '/favorito', aside, titleUrl: '/ignored-title', imgUrl: '/ignored-image', avatarUrl: '/ignored-avatar' }, 'Hijo ignorado')
    assert.match(html, /background-image:url\(\/avatar.svg\)/)
    assert.match(html, /href="\/post"/)
    assert.match(html, /href="\/perfil" class="text-default">Ana/)
    assert.match(html, /href="\/favorito"/)
    assert.match(html, /class="fe fe-heart"/)
    assert.doesNotMatch(html, /ignored-|Hijo ignorado/)
    if (aside) {
      assert.match(html, /class="card card-aside"/)
      assert.match(html, /class="card-aside-column" style="background-image:url\(\/post.svg\)"/)
      assert.doesNotMatch(html, /card-img-top/)
    } else assert.match(html, /<img class="card-img-top" src="\/post.svg" alt="Portada"/)
  }
})

test('ContactCard mantiene mapa, dirección, detalles readonly y ambas descripciones', () => {
  const detail = Object.freeze({ title: 'Correo', content: React.createElement('a', { href: 'mailto:equipo@example.com' }, 'Equipo') })
  const details = Object.freeze([detail])
  const html = render(ContactCard, { cardTitle: 'Contacto', name: 'Ana', avatar: true, objectURL: '/avatar.svg', address: Object.freeze({ line1: 'Oficina', line2: 'Planta 2' }), details, description: { title: 'Acerca de', content: 'Descripción propia' }, map: React.createElement('span', null, 'Mapa del consumidor'), mapPlaceholder: '/map.svg', className: 'consumer' }, 'Contenido adicional')
  for (const text of ['Contacto', 'Ana', 'Oficina<br/>Planta 2', 'Descripción propia', 'Acerca de', 'Contenido adicional', 'Mapa del consumidor']) assert.ok(html.includes(text), text)
  assert.match(html, /background-image:url\(\/map.svg\)/)
  assert.match(html, /class="avatar avatar-md"/)
  assert.match(html, /href="mailto:equipo@example.com"/)
  assert.equal(detail.title, 'Correo')
  assert.match(render(ContactCard, { description: 'Texto simple' }), />Description<\/h6><p>Texto simple<\/p>/)
  assert.doesNotMatch(render(ContactCard, {}), /<address|card-map/)
})

test('DoubleCard conserva nodos, valores numéricos, etiquetas y clases heredadas', () => {
  const html = render(DoubleCard, { title: 'Cobertura', firstValue: 94, firstlabel: 'Cartera', secondValue: React.createElement('span', null, '80%'), secondlabel: 'Referencia', className: 'consumer' }, 'Extra')
  assert.match(html, /^<div class="card consumer">/)
  assert.match(html, /class="double-card-text null"><b>94<\/b>/)
  assert.match(html, /class="double-card-text"><b><span>80%<\/span><\/b>/)
  assert.ok(html.includes('Cartera') && html.includes('Referencia') && html.endsWith('Extra</div>'))
  assert.match(render(DoubleCard, { classColorValue: 'success', firstValue: '94%' }), /class="double-card-text text-success"/)
})

test('ProgressCard y StampCard mantienen la composición de sus componentes básicos', () => {
  const progress = render(ProgressCard, { header: 'Cobertura', content: '125%', progressWidth: 125, progressColor: 'green', className: 'consumer' })
  assert.match(progress, /^<div class="card consumer">/)
  assert.match(progress, /class="h5">Cobertura/)
  assert.match(progress, /class="progress progress-sm"/)
  assert.match(progress, /class="progress-bar bg-green" style="width:125%"/)
  const stamp = render(StampCard, { header: '12 informes', footer: 'Disponibles', icon: 'file', color: 'blue', className: 'consumer' }, 'Extra')
  assert.match(stamp, /^<div class="card p-3 consumer">/)
  assert.match(stamp, /class="stamp stamp-md bg-blue mr-3"/)
  assert.match(stamp, /class="fe fe-file"/)
  assert.ok(stamp.includes('12 informes') && stamp.includes('Disponibles') && stamp.includes('Extra'))
})

test('StatsCard mantiene signo, colores, iconos y chart únicamente en layout 2', () => {
  for (const [movement, text, color, icon] of [[4.2, '+4.2%', 'green', 'chevron-up'], [0, '0%', 'yellow', 'minus'], [-2, '-2%', 'red', 'chevron-down']]) {
    for (const layout of [1, 2]) {
      const html = render(StatsCard, { movement, total: '1.200', label: 'Registros', layout, chart: React.createElement('span', null, 'Gráfico del consumidor') })
      assert.ok(html.includes(text) && html.includes('1.200') && html.includes('Registros'))
      assert.ok(html.includes('text-' + color))
      if (layout === 1) { assert.ok(html.includes('fe-' + icon)); assert.doesNotMatch(html, /Gráfico del consumidor/) }
      else assert.match(html, /class="card-chart-bg"><span>Gráfico del consumidor<\/span>/)
    }
  }
})

test('StoreCard conserva presentación y botón fijo sin añadir un contrato de compra', () => {
  const html = render(StoreCard, { title: 'Producto', subtitle: 'Descripción', price: '12 €', imgUrl: '/product.svg', imgAlt: 'Producto' }, 'Hijo ignorado')
  assert.match(html, /<img src="\/product.svg" alt="Producto"/)
  assert.ok(html.includes('Producto') && html.includes('Descripción') && html.includes('12 €'))
  assert.match(html, /<button class="btn btn-primary"><i class="fe fe-plus"><\/i>Add to cart<\/button>/)
  assert.doesNotMatch(html, /Hijo ignorado/)
})

test('GalleryCard mantiene sus cinco subcomponentes y los destinos de raíces personalizadas', () => {
  assert.equal(render(GalleryCard, { className: 'consumer' }, 'Imagen'), '<div class="card p-3 consumer">Imagen</div>')
  assert.equal(render(GalleryCard.Footer, { className: 'ignored' }, 'Pie'), '<div class="d-flex align-items-center px-2">Pie</div>')
  assert.equal(render(GalleryCard.IconGroup, { className: 'consumer' }, 'Iconos'), '<div class="ml-auto text-muted consumer">Iconos</div>')
  assert.equal(render(GalleryCard.Details, { fullName: null, dateString: null }, 'Manual'), 'Manual')
  assert.equal(render(GalleryCard.Details, {}, 'Extra'), '<div><div></div><small class="d-block text-muted"> </small> </div>Extra')
  const image = render(GalleryCard.Image, { src: '/image.svg', alt: 'Imagen', href: '/imagen', className: 'consumer' })
  assert.match(image, /<a class="mb-3" href="\/imagen"><img src="\/image.svg" alt="Imagen" class="rounded consumer"/)
  assert.match(render(GalleryCard.IconItem, { name: 'eye', label: 'Ver', right: true, href: '/imagen' }), /class="icon d-none d-md-inline-block ml-3" href="\/imagen"/)
  let received
  function ConsumerLink(props) { received = props; return React.createElement('a', { href: props.to, className: props.className }, props.children) }
  for (const [Component, props, expectedClass] of [[GalleryCard.Image, { src: '/image.svg', alt: 'Imagen' }, 'mb-3'], [GalleryCard.IconItem, { name: 'eye', label: 'Ver' }, 'icon']]) {
    render(Component, { ...props, RootComponent: ConsumerLink, to: '/consumer', href: '/ignored' })
    assert.equal(received.to, '/consumer')
    assert.equal(received.className, expectedClass)
    assert.equal(received.href, undefined)
  }
})

test('PricingCard conserva las cinco variantes, active y el alcance del botón', () => {
  const html = render(PricingCard, { active: true, category: 'Plan', className: 'ignored' }, React.createElement(PricingCard.Price, null, '10 €'))
  assert.equal(html, '<div class="card"><div class="card-status bg-green"></div><div class="card-body text-center"><div class="card-category">Plan</div><div class="display-3 my-4">10 €</div></div></div>')
  assert.equal(render(PricingCard.Category, { className: 'consumer' }, 'Plan'), '<div class="card-category consumer">Plan</div>')
  assert.equal(render(PricingCard.AttributeList, { className: 'consumer' }, 'Característica'), '<ul class="list-unstyled leading-loose consumer">Característica</ul>')
  assert.match(render(PricingCard.AttributeItem, { available: true, hasIcon: true }, 'Disponible'), /class="fe fe-check text-success mr-2"/)
  assert.match(render(PricingCard.AttributeItem, { hasIcon: true }, 'No disponible'), /class="fe fe-x text-danger mr-2"/)
  assert.equal(render(PricingCard.AttributeItem, {}, 'Texto'), '<li> Texto </li>')
  assert.equal(render(PricingCard.Button, { active: true, href: '/planes', onClick: () => undefined }, 'Ver'), '<div class="text-center mt-6"><a class="btn btn-green btn-block" href="/planes" role="button">Ver</a></div>')
  assert.equal(render(PricingCard.Button, {}, 'Ver'), '<div class="text-center mt-6"><a class="btn btn-secondary btn-block">Ver</a></div>')
})

test('TabbedCard conserva la tarjeta, las cabeceras y el panel inicial', () => {
  const panels = ['Uno', 'Dos'].map(title => React.createElement(Tab, { title, key: title }, 'Contenido ' + title))
  const html = render(TabbedCard, { initialTab: 'Dos' }, panels)
  assert.match(html, /^<div class="card"><div class="card-header">/)
  assert.match(html, /class="card-header tab-header"/)
  assert.ok(html.includes('Contenido Dos'))
  assert.doesNotMatch(html, /Contenido Uno/)
  const missing = render(TabbedCard, { initialTab: 'Ausente' }, panels)
  assert.doesNotMatch(missing, /Contenido Uno|Contenido Dos/)
})

test('Timeline conserva los cinco subcomponentes, la composición y las condiciones heredadas', () => {
  assert.equal(render(Timeline, { className: 'consumer' }, 'Eventos'), '<ul class="timeline consumer">Eventos</ul>')
  assert.equal(render(Timeline.ItemBadge, { color: 'green', className: 'consumer' }, '1'), '<div class="timeline-badge bg-green consumer">1</div>')
  assert.equal(render(Timeline.ItemTime, { active: true, className: 'consumer' }, '10:00'), '<div class="timeline-time text-muted-black consumer">10:00</div>')
  assert.equal(render(Timeline.ItemTitle, {}, 'Título'), 'Título')
  assert.equal(render(Timeline.ItemTitle, { active: true }, 'Título'), '<strong>Título</strong>')
  assert.equal(render(Timeline.ItemTitle, {}, 0), '')
  assert.equal(render(Timeline.ItemDescription, {}, 'Descripción'), '<small class="d-block text-muted">Descripción</small>')
  assert.equal(render(Timeline.Item, { active: true, badgeColor: 'green', description: 'Texto', time: '10:00' }, 'Título'), '<li class="timeline-item"><div class="timeline-badge bg-green"></div><div><strong>Título</strong><small class="d-block text-muted">Texto</small></div>Título<div class="timeline-time text-muted-black">10:00</div></li>')
  assert.doesNotMatch(render(Timeline.Item, { description: 'Sin título' }, React.createElement('span', null, 'Manual')), /Sin título/)
  assert.match(render(Timeline.Item, { title: 'Explícito' }, 'Hijo'), /ExplícitoHijo/)
})
