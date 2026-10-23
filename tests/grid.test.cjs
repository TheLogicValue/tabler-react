const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')

const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
const React = consumerRequire('react')
const { renderToStaticMarkup } = consumerRequire('react-dom/server')
const { Grid } = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')
const render = (Component, props, children) => renderToStaticMarkup(React.createElement(Component, props, children))

test('Grid conserva sus subcomponentes y devuelve los hijos sin añadir DOM', () => {
  assert.equal(Grid.displayName, 'Grid')
  assert.equal(Grid.Row.displayName, 'Grid.Row')
  assert.equal(Grid.Col.displayName, 'Grid.Col')
  assert.equal(render(Grid, {}, [React.createElement('span', { key: 'a' }, 'A'), React.createElement('span', { key: 'b' }, 'B')]), '<span>A</span><span>B</span>')
  assert.equal(render(Grid, {}, 0), '0')
  assert.equal(render(Grid, {}, null), '')
  assert.equal(render(Grid, {}, undefined), '')
})

test('Grid.Row mantiene el HTML de partida y las variantes de tarjetas y alineación', () => {
  // Captured from the public bundle before the migration, including duplicate row.
  assert.equal(render(Grid.Row, {}, 'Fila'), '<div class="row row">Fila</div>')
  assert.equal(render(Grid.Row, { cards: true, deck: true, gutters: 'sm', alignItems: 'center', justifyContent: 'between', className: 'consumer-row' }, 'Fila'), '<div class="row row row-cards row-deck gutters-sm align-items-center justify-content-between consumer-row">Fila</div>')
  for (const gutters of ['xs', 'sm', 'md', 'lg']) assert.equal(render(Grid.Row, { gutters }, null), `<div class="row row gutters-${gutters}"></div>`)
  assert.equal(render(Grid.Row, { gutters: '', id: 'not-forwarded', title: 'not-forwarded' }, null), '<div class="row row"></div>')
})

test('Grid.Col mantiene anchos, offsets y auto heredados sin cambiar las clases CSS', () => {
  assert.equal(render(Grid.Col, {}, 'Columna'), '<div class="col">Columna</div>')
  assert.equal(render(Grid.Col, { width: 12, sm: 6, lg: 4, offsetMd: 1, className: 'consumer-col' }, 'Columna'), '<div class="col col-12 col-sm-6 col-lg-4 offset-md-1 consumer-col">Columna</div>')
  assert.equal(render(Grid.Col, { ignoreCol: true, md: 6, auto: true }, 'Columna'), '<div class="col-md-6 col-auto">Columna</div>')
  assert.equal(render(Grid.Col, { xl2Auto: 1, xl3Auto: 0, xl8Auto: true }, 'Columna'), '<div class="col col-2xl-auto col-8xl-auto">Columna</div>')
  assert.equal(render(Grid.Col, { width: 0, offset: 0, xl2Auto: false, id: 'not-forwarded' }, null), '<div class="col"></div>')
  const widths = { width: 12, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xl2: 6, xl3: 7, xl4: 8, xl6: 9, xl8: 10 }
  const offsets = { offset: 1, offsetXs: 2, offsetSm: 3, offsetMd: 4, offsetLg: 5, offsetXl: 6, offsetXl2: 7, offsetXl3: 8, offsetXl4: 9, offsetXl6: 10, offsetXl8: 11 }
  const autos = { auto: true, xsAuto: true, smAuto: true, mdAuto: true, lgAuto: true, xlAuto: true, xl2Auto: 1, xl3Auto: true, xl4Auto: 1, xl6Auto: true, xl8Auto: 1 }
  assert.equal(render(Grid.Col, { ...widths, ...offsets, ...autos, className: 'consumer-col' }, 'Columna'), '<div class="col col-12 col-xs-1 col-xs-auto col-sm-2 col-sm-auto col-md-3 col-md-auto col-lg-4 col-lg-auto col-xl-5 col-xl-auto col-2xl-6 col-2xl-auto col-3xl-7 col-3xl-auto col-4xl-8 col-4xl-auto col-6xl-9 col-6xl-auto col-8xl-10 col-8xl-auto col-auto offset-1 offset-xs-2 offset-sm-3 offset-md-4 offset-lg-5 offset-xl-6 offset-2xl-7 offset-3xl-8 offset-4xl-9 offset-6xl-10 offset-8xl-11 consumer-col">Columna</div>')
})
