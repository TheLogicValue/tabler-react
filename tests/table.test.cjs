const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')
const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
const React = consumerRequire('react')
const { renderToStaticMarkup } = consumerRequire('react-dom/server')
const { Table, TableLoader, BarChartLoader, PieChartLoader } = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')

test('Table conserva estilos, composición y atributos nativos sin filtrar los datos al DOM', () => {
  const rows = Object.freeze([Object.freeze({ key: 'a', item: [{ content: 'Atlas', alignContent: 'right' }] })])
  const html = renderToStaticMarkup(React.createElement(Table, { id: 'funds', cards: true, striped: true, responsive: true, highlightRowOnHover: true, hasOutline: true, verticalAlign: 'center', headeritems: [{ content: 'Nombre' }], bodyitems: rows }))
  assert.match(html, /^<div class="table-responsive"><table class="table card-table table-striped table-hover table-outline table-vcenter" id="funds">/)
  assert.match(html, /<th class="">Nombre<\/th>/)
  assert.match(html, /<td class="text-right">Atlas<\/td>/)
  assert.doesNotMatch(html, /headeritems=|bodyitems=|\[object Object\]/)
  assert.equal(rows[0].item[0].content, 'Atlas')
})

test('Los cinco subcomponentes de Table mantienen raíces y los atributos que realmente reenvían', () => {
  const html = renderToStaticMarkup(React.createElement(Table, null,
    React.createElement(Table.Header, { title: 'Cabecera' }, React.createElement(Table.Row, { id: 'head' }, React.createElement(Table.ColHeader, { colSpan: 2, alignContent: 'center' }, 'Fondo'))),
    React.createElement(Table.Body, { id: 'rows' }, React.createElement(Table.Row, null, React.createElement(Table.Col, { colSpan: 2, alignContent: 'right', id: 'ignored' }, 'Atlas')))))
  assert.match(html, /<thead class="" title="Cabecera"><tr class="" id="head">/)
  assert.match(html, /<th class="text-center" colspan="2">Fondo/i)
  assert.match(html, /<tbody class="" id="rows">/)
  assert.match(html, /<td class="text-right" colspan="2">Atlas/i)
  assert.doesNotMatch(html, /ignored/)
})

test('Los tres esqueletos conservan SVG y opciones del consumidor', () => {
  for (const Component of [TableLoader, BarChartLoader, PieChartLoader]) {
    const html = renderToStaticMarkup(React.createElement(Component, { width: 600, height: 200, uniqueKey: 'loading', title: 'Cargando', speed: 2, animate: false }))
    assert.match(html, /^<svg\b/)
    assert.match(html, /<svg\b[^>]*width="600"/)
    assert.match(html, /<svg\b[^>]*height="200"/)
    assert.match(html, /Cargando/)
    assert.match(html, /<rect\b/)
  }
})
