const assert = require('node:assert/strict')
const { before, after, afterEach, test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')

// The same interaction suite runs against the built package on React 19 and
// against the packed package installed in a separate React 18 consumer.
const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
let window, React, createRoot, components, MemoryRouter, container, root
let errors = []
const originalError = console.error

before(async () => {
  const { Window } = await import('happy-dom')
  window = new Window({ url: 'http://localhost/' })
  for (const key of ['window', 'document', 'navigator', 'Node', 'Element', 'HTMLElement', 'SVGElement',
    'MutationObserver', 'ResizeObserver', 'IntersectionObserver', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame']) {
    const value = key === 'window' ? window : window[key]
    Object.defineProperty(globalThis, key, { configurable: true, value: typeof value === 'function' && /^[a-z]/.test(key) ? value.bind(window) : value })
  }
  // Happy DOM has no layout engine. Give focus-trap visible rectangles; actual
  // edge collisions and scroll/resize geometry are checked in the browser demo.
  window.HTMLElement.prototype.getClientRects = function () { return [this.getBoundingClientRect()] }
  window.HTMLElement.prototype.getBoundingClientRect = () => new window.DOMRect(100, 100, 150, 40)
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  React = consumerRequire('react')
  createRoot = consumerRequire('react-dom/client').createRoot
  components = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')
  MemoryRouter = consumerRequire('react-router-dom').MemoryRouter
  console.error = (...args) => { errors.push(args.map(String).join(' ')); originalError(...args) }
})

afterEach(async () => {
  if (root) await React.act(async () => root.unmount())
  container?.remove()
  root = null
  const currentErrors = errors
  errors = []
  assert.deepEqual(currentErrors, [], 'No debe haber errores ni avisos de React')
})
after(() => { console.error = originalError; window.happyDOM.abort() })

async function render(element) {
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
  await React.act(async () => { root.render(element); await new Promise(resolve => setTimeout(resolve, 30)) })
}
async function click(element) {
  assert.ok(element, 'El control debe existir')
  await React.act(async () => { element.focus(); element.click(); await new Promise(resolve => setTimeout(resolve, 30)) })
}
async function key(element, value) {
  await React.act(async () => element.dispatchEvent(new window.KeyboardEvent('keydown', { key: value, bubbles: true })))
}

test('Dropdown abre, ejecuta callbacks, cierra por Escape y clic fuera sin enviar formularios', async () => {
  const { Dropdown } = components
  let actions = 0, submissions = 0
  await render(React.createElement('form', { onSubmit: event => { event.preventDefault(); submissions++ } },
    React.createElement(Dropdown, { triggerContent: 'Abrir', itemsObject: [{ value: 'Acción', onClick: () => actions++ }] })))
  const trigger = container.querySelector('button')
  assert.equal(trigger.getAttribute('aria-expanded'), 'false')
  await click(trigger)
  assert.equal(trigger.getAttribute('aria-expanded'), 'true')
  assert.ok(container.querySelector('.dropdown-menu.show'))
  await click(container.querySelector('.dropdown-item'))
  assert.equal(actions, 1)
  assert.equal(container.querySelector('.dropdown-menu'), null)
  await click(trigger)
  await key(trigger, 'Escape')
  assert.equal(container.querySelector('.dropdown-menu'), null)
  await click(trigger)
  await React.act(async () => document.body.dispatchEvent(new window.MouseEvent('mousedown', { bubbles: true })))
  assert.equal(container.querySelector('.dropdown-menu'), null)
  assert.equal(submissions, 0)
})

test('Dropdown.Menu conserva rootRef, style, show y todas las posiciones públicas', async () => {
  const { Dropdown } = components
  const triggerRef = React.createRef(), menuRef = React.createRef()
  const positions = ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'auto', 'auto-start', 'auto-end']
  function example(position, show) {
    return React.createElement(Dropdown, null,
      React.createElement(Dropdown.Trigger, { rootRef: triggerRef }, 'Referencia'),
      React.createElement(Dropdown.Menu, { position, show, arrow: true, arrowPosition: 'right', rootRef: menuRef, style: { zIndex: 1234 } }, 'Contenido'))
  }
  await render(example('bottom', true))
  assert.equal(triggerRef.current, container.querySelector('button'))
  for (const position of positions) {
    await React.act(async () => { root.render(example(position, true)); await new Promise(resolve => setTimeout(resolve, 10)) })
    assert.equal(menuRef.current, container.querySelector('.dropdown-menu'))
    assert.equal(menuRef.current.style.zIndex, '1234')
    assert.match(menuRef.current.dataset.placement, /^(top|right|bottom|left)(-start|-end)?$/)
    assert.equal(menuRef.current.style.position, 'absolute')
    assert.equal(menuRef.current.style.right, 'auto', 'La alineación CSS heredada no debe estirar el menú')
    assert.ok(menuRef.current.classList.contains('dropdown-menu-right'))
  }
  await React.act(async () => root.render(example('bottom', false)))
  assert.equal(menuRef.current, null)
})

test('Button.Dropdown mantiene callback y rootRef, no muta dropdownProps y cierra fuera', async () => {
  const { Button, Dropdown } = components
  const dropdownProps = Object.freeze({ position: 'bottom-end' })
  const rootRef = React.createRef()
  let calls = 0
  await render(React.createElement(Button.Dropdown, { value: 'Botón', rootRef, dropdownProps, onClick: () => calls++ },
    React.createElement(Dropdown.Item, null, 'Elemento')))
  await click(rootRef.current)
  assert.equal(calls, 1)
  assert.equal(rootRef.current.type, 'button')
  assert.ok(container.querySelector('.dropdown-menu'))
  await React.act(async () => document.body.dispatchEvent(new window.PointerEvent('pointerdown', { bubbles: true })))
  assert.equal(container.querySelector('.dropdown-menu'), null)
})

test('Dos desplegables y un disparador personalizado mantienen referencias independientes', async () => {
  const { Button, Dropdown } = components
  let calls = 0
  await render(React.createElement('div', null,
    React.createElement(Dropdown, { trigger: React.createElement(Button, { onClick: () => calls++ }, 'Personalizado'), itemsObject: [{ value: 'Primero' }] }),
    React.createElement(Dropdown, { triggerContent: 'Segundo', itemsObject: [{ value: 'Segundo' }] })))
  const buttons = container.querySelectorAll('button')
  await click(buttons[0])
  await click(buttons[1])
  assert.equal(calls, 1)
  assert.equal(container.querySelectorAll('.dropdown-menu').length, 2)
})

test('Nav.Item abre un submenú inferido y mantiene el menú vertical sin posicionamiento flotante', async () => {
  const { Nav } = components
  await render(React.createElement(Nav, null,
    React.createElement(Nav.Item, { value: 'Horizontal', subItemsObjects: [{ value: 'Hijo', to: '#hijo' }] }),
    React.createElement(Nav.Item, { value: 'Vertical', vertical: true, subItemsObjects: [{ value: 'Hijo vertical', to: '#vertical' }] })))
  await click(container.querySelectorAll('.nav-link-item')[0])
  assert.ok(container.querySelector('.dropdown-menu[data-placement]'))
  await key(container.querySelector('.nav-link-item'), 'Escape')
  assert.equal(container.querySelector('.dropdown-menu'), null)
  await click(container.querySelectorAll('.nav-link-item')[1])
  const vertical = container.querySelector('.nav-item.dropdown > .show')
  assert.ok(vertical)
  assert.equal(vertical.style.position, '')
})

test('NavBarMenu posiciona sus submenús, navega, ejecuta callbacks y cierra por selección y Escape', async () => {
  const { NavBarMenu } = components
  let calls = 0
  await render(React.createElement(MemoryRouter, null, React.createElement(NavBarMenu, { items: [
    { value: 'Páginas', icon: 'layers', subItems: [
      { value: 'Formulario', to: '/formulario', LinkComponent: true, onClick: () => calls++ },
    ] },
  ] })))
  const trigger = container.querySelector('button')
  await click(trigger)
  assert.ok(container.querySelector('.dropdown-menu[data-placement]'))
  const link = container.querySelector('a')
  assert.equal(link.getAttribute('href'), '/formulario')
  await click(link)
  assert.equal(calls, 1)
  assert.equal(container.querySelector('.dropdown-menu'), null)
  await click(trigger)
  assert.ok(container.querySelector('a').classList.contains('active'))
  await key(trigger, 'Escape')
  assert.equal(container.querySelector('.dropdown-menu'), null)
})

test('Tooltip conserva ref y handlers, asocia la ayuda al foco y cierra con Escape y blur', async () => {
  const { Tooltip } = components
  const ref = React.createRef()
  let focusCalls = 0
  await render(React.createElement(Tooltip, { content: 'Ayuda', placement: 'auto-start' },
    React.createElement('button', { ref, onFocus: () => focusCalls++ }, 'Ayuda')))
  const trigger = container.querySelector('button')
  assert.equal(ref.current, trigger)
  await React.act(async () => { trigger.focus(); await new Promise(resolve => setTimeout(resolve, 30)) })
  const tooltip = container.querySelector('[role=tooltip]')
  assert.ok(tooltip)
  assert.equal(trigger.getAttribute('aria-describedby'), tooltip.id)
  assert.equal(focusCalls, 1)
  assert.ok(tooltip.classList.contains('bs-tooltip-' + tooltip.dataset.placement.split('-')[0]))
  await key(trigger, 'Escape')
  assert.equal(container.querySelector('[role=tooltip]'), null)
  await React.act(async () => trigger.blur())
  assert.equal(container.querySelector('[role=tooltip]'), null)
})

test('Tooltip admite Button y Tag de la biblioteca y conserva sus rootRef', async () => {
  const { Button, Tag, Tooltip } = components
  for (const Component of [Button, Tag]) {
    const rootRef = React.createRef()
    await render(React.createElement(Tooltip, { content: 'Ayuda del componente' },
      React.createElement(Component, { rootRef, tabIndex: 0 }, 'Referencia')))
    assert.ok(rootRef.current instanceof HTMLElement)
    await React.act(async () => {
      rootRef.current.dispatchEvent(new window.MouseEvent('mouseenter', { bubbles: false }))
      rootRef.current.dispatchEvent(new window.MouseEvent('mouseover', { bubbles: true }))
      await new Promise(resolve => setTimeout(resolve, 30))
    })
    assert.ok(container.querySelector('[role=tooltip]'))
    await React.act(async () => root.unmount())
    root = null
    container.remove()
  }
})

test('DatePicker abre, selecciona fecha, devuelve foco y cierra por Escape y clic fuera', async () => {
  const { DatePicker } = components
  const ref = React.createRef()
  await render(React.createElement(DatePicker, { ref, dateIni: new Date(2026, 9, 15) }))
  const trigger = container.querySelector('button')
  await click(trigger)
  assert.ok(container.querySelector('[role=dialog][data-placement]'))
  const day = container.querySelector('.rdp-day:not([disabled])')
  assert.ok(day)
  await click(day)
  assert.equal(container.querySelector('[role=dialog]'), null)
  assert.ok(document.activeElement === trigger, 'El foco debe volver al botón del calendario')
  assert.ok(ref.current.value instanceof Date)
  await click(trigger)
  await key(document.activeElement, 'Escape')
  assert.equal(container.querySelector('[role=dialog]'), null)
  await click(trigger)
  await React.act(async () => document.body.dispatchEvent(new window.MouseEvent('mousedown', { bubbles: true })))
  assert.equal(container.querySelector('[role=dialog]'), null)
})
