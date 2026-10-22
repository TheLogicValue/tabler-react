const assert = require('node:assert/strict')
const { test } = require('node:test')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const { Card, DatePicker, Dropdown, Form, Site } = require('../dist/index.js')

function dateValue(props) {
  const html = renderToStaticMarkup(React.createElement(DatePicker, props))
  const match = html.match(/<input\b[^>]*\bvalue="([^"]*)"/)
  assert.ok(match, 'DatePicker debe renderizar el campo de fecha')
  return match[1]
}

test('DatePicker aplica el día anterior por defecto y permite un desplazamiento cero', () => {
  const dateIni = new Date(2026, 9, 15)
  assert.equal(dateValue({ dateIni }), '14/10/2026')
  assert.equal(dateValue({ dateIni, previousDay: null }), '14/10/2026')
  assert.equal(dateValue({ dateIni, previousDay: 0 }), '15/10/2026')
  assert.equal(dateValue({ dateIni, previousDay: 3 }), '12/10/2026')
  assert.equal(dateValue({ dateIni, today: true, previousDay: 3 }), '15/10/2026')
})

test('DatePicker respeta una fecha explícita y no modifica la fecha recibida', () => {
  const dateIni = new Date(2026, 9, 15)
  const timestamp = dateIni.getTime()
  assert.equal(dateValue({ dateIni, date: new Date(2026, 9, 20), previousDay: 3 }), '20/10/2026')
  assert.equal(dateIni.getTime(), timestamp)
})

test('Dos DatePicker sin dateIni no acumulan desplazamientos entre instancias', () => {
  const first = dateValue({ previousDay: 2 })
  assert.equal(dateValue({ previousDay: 2 }), first)
  dateValue({ previousDay: 7 })
  assert.equal(dateValue({ previousDay: 2 }), first)
})

test('Form.Textarea conserva maxlength de la API y Form.Help emite atributos data válidos', () => {
  const textarea = renderToStaticMarkup(React.createElement(Form.Textarea, { maxlength: 25 }))
  assert.match(textarea, /maxlength="25"/i)
  const help = renderToStaticMarkup(React.createElement(Form.Help, { message: 'Ayuda' }))
  assert.match(help, /data-toggle="popover"/)
  assert.match(help, /data-placement="top"/)
  assert.match(help, /data-content="Ayuda"/)
})

test('Los controles de tarjeta, desplegable y cabecera no envían el formulario que los contiene', () => {
  const html = renderToStaticMarkup(React.createElement('form', null,
    ...['collapse', 'close', 'fullscreen'].map(type => React.createElement(Card.OptionsItem, { key: type, type })),
    React.createElement(Dropdown, { triggerContent: 'Abrir menú' }),
    React.createElement(Dropdown, { type: 'button', triggerContent: 'Abrir menú con botón' }),
    React.createElement(Site.Header, { href: '/inicio', imageURL: '/logo.svg', alt: 'Tabler' }),
  ))
  const buttons = [...html.matchAll(/<button\b[^>]*>/g)].map(match => match[0])
  assert.equal(buttons.length, 6)
  assert.ok(buttons.every(button => /\btype="button"/.test(button)))
  for (const label of ['Collapse card', 'Close card', 'Toggle fullscreen', 'Toggle navigation']) {
    assert.ok(html.includes(`aria-label="${label}"`))
  }
  assert.match(html, /<a[^>]*href="\/inicio"/)
})

test('Card.OptionsItem conserva las clases, el data-toggle y permite personalizar su etiqueta', () => {
  const html = renderToStaticMarkup(React.createElement(Card.OptionsItem, {
    type: 'close', className: 'consumer-control', 'aria-label': 'Cerrar panel',
  }))
  assert.match(html, /class="[^"]*card-options-remove[^"]*consumer-control"/)
  assert.match(html, /data-toggle="card-remove"/)
  assert.match(html, /aria-label="Cerrar panel"/)
})
