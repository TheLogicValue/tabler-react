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

test('Icon mantiene los siete callbacks en su raíz y Text reenvía eventos nativos', async () => {
  const { Icon, Text } = components
  const events = []
  const record = name => event => events.push([name, event.currentTarget.tagName])
  for (const link of [false, true]) {
    const props = Object.fromEntries(['onClick', 'onMouseEnter', 'onMouseLeave', 'onPointerEnter', 'onPointerLeave', 'onFocus', 'onBlur'].map(name => [name, record(name)]))
    const example = React.createElement(Icon, { ...props, name: 'check', link })
    if (!root) await render(example)
    else await React.act(async () => root.render(example))
    const element = container.firstElementChild
    events.length = 0
    await React.act(async () => {
      element.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
      element.dispatchEvent(new window.MouseEvent('mouseover', { bubbles: true, relatedTarget: document.body }))
      element.dispatchEvent(new window.MouseEvent('mouseout', { bubbles: true, relatedTarget: document.body }))
      element.dispatchEvent(new window.PointerEvent('pointerover', { bubbles: true, relatedTarget: document.body }))
      element.dispatchEvent(new window.PointerEvent('pointerout', { bubbles: true, relatedTarget: document.body }))
      element.dispatchEvent(new window.FocusEvent('focusin', { bubbles: true }))
      element.dispatchEvent(new window.FocusEvent('focusout', { bubbles: true }))
    })
    assert.deepEqual(events, Object.keys(props).map(name => [name, link ? 'A' : 'I']))
  }
  await React.act(async () => root.render(React.createElement(Text, { RootComponent: 'button', type: 'button', onClick: record('textClick') }, 'Acción')))
  await click(container.querySelector('button'))
  assert.deepEqual(events.at(-1), ['textClick', 'BUTTON'])
})

test('Avatar y las raíces nativas de Button conservan callbacks y referencias', async () => {
  const { Avatar, Button } = components
  for (const variant of ['avatar', 'button', 'input', 'a']) {
    const calls = []
    const names = ['onClick', 'onMouseEnter', 'onMouseLeave', 'onPointerEnter', 'onPointerLeave', ...(variant === 'avatar' ? [] : ['onFocus', 'onBlur'])]
    const handlers = Object.fromEntries(names.map(name => [name, event => calls.push([name, event.currentTarget.tagName])]))
    const rootRef = React.createRef()
    const element = variant === 'avatar' ? React.createElement(Avatar, handlers, 'AB')
      : React.createElement(Button, { ...handlers, RootComponent: variant, type: variant === 'a' ? undefined : 'button', rootRef }, variant === 'input' ? undefined : 'Acción')
    if (!root) await render(element)
    else await React.act(async () => root.render(element))
    const target = container.firstElementChild
    if (variant !== 'avatar') assert.equal(rootRef.current, target)
    await React.act(async () => {
      target.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
      target.dispatchEvent(new window.MouseEvent('mouseover', { bubbles: true, relatedTarget: document.body }))
      target.dispatchEvent(new window.MouseEvent('mouseout', { bubbles: true, relatedTarget: document.body }))
      target.dispatchEvent(new window.PointerEvent('pointerover', { bubbles: true, relatedTarget: document.body }))
      target.dispatchEvent(new window.PointerEvent('pointerout', { bubbles: true, relatedTarget: document.body }))
      target.dispatchEvent(new window.FocusEvent('focusin', { bubbles: true }))
      target.dispatchEvent(new window.FocusEvent('focusout', { bubbles: true }))
    })
    assert.deepEqual(calls, names.map(name => [name, variant === 'avatar' ? 'SPAN' : variant.toUpperCase()]))
    await React.act(async () => root.unmount())
    root = null
    container.remove()
    assert.equal(rootRef.current, null)
  }
})

test('Dropdown conserva refs de disparadores forwardRef y memo y el callback original', async () => {
  const { Dropdown } = components
  const Forwarded = React.forwardRef(function Forwarded(props, ref) { return React.createElement('button', { ...props, ref, type: 'button' }, 'Disparador') })
  for (const Trigger of [Forwarded, React.memo(Forwarded)]) {
    const ref = React.createRef()
    let calls = 0
    await render(React.createElement(Dropdown, { trigger: React.createElement(Trigger, { ref, onClick: () => calls++ }), itemsObject: [{ value: 'Opción' }] }))
    assert.equal(ref.current, container.querySelector('button'))
    await click(ref.current)
    assert.equal(calls, 1)
    assert.ok(container.querySelector('.dropdown-menu'))
    await key(ref.current, 'Escape')
    assert.equal(container.querySelector('.dropdown-menu'), null)
    await React.act(async () => root.unmount())
    root = null
    container.remove()
    assert.equal(ref.current, null)
  }
})

test('Alert ejecuta sus callbacks, se cierra y no envía el formulario', async () => {
  const { Alert } = components
  let dismissed = 0, clicked = 0, submitted = 0
  await render(React.createElement('form', { onSubmit: event => { event.preventDefault(); submitted++ } },
    React.createElement(Alert, { type: 'warning', isDismissible: true, onDismissClick: () => dismissed++, onClick: () => clicked++ }, 'Aviso')))
  await click(container.querySelector('button[aria-label="Close alert"]'))
  assert.equal(container.querySelector('[role="alert"]'), null)
  assert.equal(dismissed, 1)
  assert.equal(clicked, 1)
  assert.equal(submitted, 0)
})

test('Notificaciones y cuenta conservan presets, callbacks y prioridad de children', async () => {
  const { Notification, AccountDropdown } = components
  let marked = 0, actions = 0
  await render(React.createElement('div', null,
    React.createElement(Notification.Tray, { unread: true, markAllAsRead: () => marked++, notificationsObjects: [{ message: 'Aviso del objeto', time: 'Ahora', unread: true }] }),
    React.createElement(AccountDropdown, { name: 'Ana', options: ['profile', 'divider', { value: 'Acción propia', onClick: () => actions++ }] })))
  await click(container.querySelectorAll('button')[0])
  assert.ok(container.textContent.includes('Aviso del objeto'))
  await click([...container.querySelectorAll('a')].find(element => element.textContent === 'Mark all as read'))
  assert.equal(marked, 1)
  await click(container.querySelectorAll('button')[1])
  assert.equal(container.querySelector('a[href="/profile"]').textContent.trim(), 'Profile')
  assert.ok(container.querySelector('.dropdown-divider'))
  await click([...container.querySelectorAll('a')].find(element => element.textContent === 'Acción propia'))
  assert.equal(actions, 1)
  await React.act(async () => root.render(React.createElement(Notification.Tray, { notificationsObjects: [{ message: 'Ignorado' }] }, React.createElement(Notification, { message: 'Hijo prioritario' }))))
  await click(container.querySelector('button'))
  assert.ok(container.textContent.includes('Hijo prioritario'))
  assert.equal(container.textContent.includes('Ignorado'), false)
})

test('Nav actualiza la ruta activa mediante RouterContextProvider tras navegar', async () => {
  const { Nav, RouterContextProvider } = components
  const { Link, useLocation } = consumerRequire('react-router-dom')
  // Keep Nav's legacy exact contract; React Router 7 adapters must consume it.
  const RouterLink = React.forwardRef(function RouterLink({ exact, ...props }, ref) {
    return React.createElement(Link, { ...props, ref })
  })
  function Context({ callback }) { return React.createElement(RouterContextProvider, { callback, location: useLocation() }) }
  await render(React.createElement(MemoryRouter, { initialEntries: ['/first'] },
    React.createElement(Nav, { routerContextComponentType: Context, itemsObjects: [{ value: 'Primero', to: '/first', LinkComponent: RouterLink }, { value: 'Segundo', to: '/second', LinkComponent: RouterLink }] })))
  assert.equal(container.querySelector('a.active').textContent, 'Primero')
  await click(container.querySelector('a[href="/second"]'))
  assert.equal(container.querySelector('a.active').textContent, 'Segundo')
})

test('Site.Wrapper alterna la navegación móvil y libera su listener de resize', async () => {
  const { Site } = components
  const width = window.innerWidth
  window.innerWidth = 800
  let added = 0, removed = 0, listener
  const add = window.addEventListener.bind(window), remove = window.removeEventListener.bind(window)
  window.addEventListener = (type, callback, options) => { if (type === 'resize') { added++; listener = callback } return add(type, callback, options) }
  window.removeEventListener = (type, callback, options) => { if (type === 'resize' && callback === listener) removed++; return remove(type, callback, options) }
  try {
    const props = { headerProps: { darkImageUrl: '/logo.svg' }, navProps: { itemsObjects: [{ value: 'Inicio', to: '/' }] }, footerProps: {}, vertical: true }
    await render(React.createElement(Site.Wrapper, props, 'Contenido'))
    const nav = () => container.querySelector('.header.p-0')
    assert.equal(nav().classList.contains('collapse'), true)
    await click(container.querySelector('button[aria-label="Toggle navigation"]'))
    assert.equal(nav().classList.contains('collapse'), false)
    await React.act(async () => { window.innerWidth = 1200; window.dispatchEvent(new window.Event('resize')) })
    assert.ok(container.querySelector('.wrapper .navbar-vertical'))
    await React.act(async () => { window.innerWidth = 800; window.dispatchEvent(new window.Event('resize')) })
    assert.ok(container.querySelector('button[aria-label="Toggle navigation"]'))
    assert.equal(added, 1)
    await React.act(async () => root.unmount())
    root = null
    assert.equal(removed, 1)
    await React.act(async () => window.dispatchEvent(new window.Event('resize')))
  } finally { window.innerWidth = width; window.addEventListener = add; window.removeEventListener = remove }
})

test('NavBarMenu admite hojas sin destino, sin icono e índices de ruta inexistentes', async () => {
  const { NavBarMenu } = components
  await render(React.createElement(MemoryRouter, null, React.createElement(NavBarMenu, { rootIndex: 99, items: [{ value: 'Etiqueta' }, { value: 'Ruta', to: '/details', LinkComponent: true }] })))
  assert.ok(container.textContent.includes('Etiqueta'))
  assert.equal(container.querySelector('a[href="/details"]').textContent, 'Ruta')
  assert.equal(container.querySelector('i.fe-undefined'), null)
})

async function changeControl(element, value, type = 'input') {
  await React.act(async () => {
    const prototype = element.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : element.tagName === 'SELECT' ? window.HTMLSelectElement.prototype : window.HTMLInputElement.prototype
    Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value)
    element.dispatchEvent(new window.Event(type, { bubbles: true }))
  })
}

test('Los campos Form entregan eventos nativos, controlan el rango y conectan la referencia de Switch', async () => {
  const { Form } = components
  const ref = React.createRef(), calls = []
  function Fields() {
    const [name, setName] = React.useState('Inicial')
    const [checked, setChecked] = React.useState(false)
    return React.createElement(Form, { onSubmit: event => event.preventDefault() },
      React.createElement(Form.Input, { name: 'name', value: name, onChange: event => { calls.push(event.currentTarget.tagName); setName(event.currentTarget.value) } }),
      React.createElement(Form.Textarea, { name: 'note', onChange: event => calls.push(event.currentTarget.tagName) }),
      React.createElement(Form.Select, { name: 'kind', onChange: event => calls.push(event.currentTarget.tagName) }, React.createElement('option', { value: 'a' }, 'A'), React.createElement('option', { value: 'b' }, 'B')),
      React.createElement(Form.Switch, { ref, checked, onChange: event => setChecked(event.currentTarget.checked) }),
      React.createElement(Form.Ratio, { defaultValue: 3, min: 0, max: 10 }))
  }
  await render(React.createElement(Fields))
  await changeControl(container.querySelector('[name=name]'), 'Nuevo')
  await changeControl(container.querySelector('textarea'), 'Nota')
  await changeControl(container.querySelector('select'), 'b', 'change')
  await click(ref.current)
  assert.equal(ref.current.checked, true)
  assert.equal(container.querySelector('[name=name]').value, 'Nuevo')
  assert.deepEqual(calls, ['INPUT', 'TEXTAREA', 'SELECT'])
  await changeControl(container.querySelector('[type=range]'), '7')
  assert.equal(container.querySelector('[type=number]').value, '7')
})

test('Form.FileInput informa la selección y admite el evento con una lista de archivos vacía', async () => {
  let changes = 0
  await render(React.createElement(components.Form.FileInput, { label: 'Elegir', onChange: () => changes++ }))
  const input = container.querySelector('input')
  const file = new window.File(['a,b'], 'datos.csv', { type: 'text/csv' })
  await React.act(async () => {
    Object.defineProperty(input, 'files', { configurable: true, value: [file] })
    input.dispatchEvent(new window.Event('change', { bubbles: true }))
  })
  assert.equal(container.querySelector('label').textContent, 'datos.csv')
  await React.act(async () => {
    Object.defineProperty(input, 'files', { configurable: true, value: [] })
    input.dispatchEvent(new window.Event('change', { bubbles: true }))
  })
  assert.equal(container.querySelector('label').textContent, 'Elegir')
  assert.equal(changes, 2)
})

test('Form.DatePicker actualiza día, mes y año sin mutar la fecha recibida', async () => {
  const initial = new Date(Date.UTC(2026, 9, 15, 12)), timestamp = initial.getTime(), dates = []
  await render(React.createElement(components.Form.DatePicker, { defaultDate: initial, minYear: 2025, maxYear: 2026, format: 'dd/mm/yyyy', onChange: date => dates.push(date) }))
  const selects = container.querySelectorAll('select')
  assert.deepEqual([...selects].map(select => select.value), ['15', '9', '2026'])
  await changeControl(selects[0], '12', 'change')
  await changeControl(selects[1], '8', 'change')
  await changeControl(selects[2], '2025', 'change')
  assert.equal(dates.length, 3)
  assert.equal(dates[2].getFullYear(), 2025)
  assert.equal(dates[2].getMonth(), 8)
  assert.equal(dates[2].getDate(), 12)
  assert.equal(initial.getTime(), timestamp)
})

test('Form.SelectReact devuelve opciones y metadatos y mantiene el placeholder deshabilitado', async () => {
  const { Form } = components
  const options = [{ value: 'a', label: 'Alpha', id: 1 }, { value: 'b', label: 'Beta', id: 2 }]
  const ref = React.createRef(), changes = []
  function Selection({ disabled = false }) {
    const [value, setValue] = React.useState(null)
    return React.createElement(Form.SelectReact, { inputId: 'country', options, value, selectRef: ref, isDisabled: disabled, disabledValue: 'No disponible', menuIsOpen: !disabled, onChange: (option, action) => { changes.push([option, action.action]); setValue(option) } })
  }
  await render(React.createElement(Selection))
  await click(container.querySelector('input'))
  const option = [...document.querySelectorAll('[role=option]')].find(option => option.textContent === 'Beta')
  assert.ok(option, 'El menú debe mostrar las opciones al enfocar el selector')
  await click(option)
  assert.deepEqual(changes, [[options[1], 'select-option']])
  assert.deepEqual(ref.current.getValue(), [options[1]])
  await React.act(async () => root.render(React.createElement(Selection, { disabled: true })))
  assert.deepEqual(ref.current.getValue(), [])
  assert.ok(container.textContent.includes('No disponible'))
})

test('Form.SelectMultiple selecciona y deselecciona todas las opciones sin devolver el marcador interno', async () => {
  const { Form } = components
  const options = [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }], changes = []
  function Selection() {
    const [value, setValue] = React.useState([])
    return React.createElement(Form.SelectMultiple, { options, value, name: 'elementos', placeholder: 'Elegir', onChange: (selected, action) => { changes.push([selected, action.action]); setValue(selected) } })
  }
  await render(React.createElement(Selection))
  await click(container.querySelector('button'))
  const all = () => [...document.querySelectorAll('[role=option]')].find(option => option.textContent === 'Seleccionar todos')
  await click(all())
  assert.deepEqual(changes[0][0], options)
  if (!all()) await click(container.querySelector('button'))
  await click(all())
  assert.deepEqual(changes[1][0], [])
})

test('Modal y useModal conservan apertura, estados y callbacks sin enviar el formulario', async () => {
  const { Modal, useModal } = components
  let submissions = 0, accepted = 0
  function Example() {
    const modal = useModal()
    return React.createElement('form', { onSubmit: event => { event.preventDefault(); submissions++ } },
      React.createElement('button', { type: 'button', onClick: () => { modal.changeModal('ready'); modal.openModal() } }, 'Abrir'),
      modal.showModal && React.createElement(Modal, { type: 2, body: modal.stateBody, onClose: modal.closeModal, onCancel: modal.closeModal, onAccept: () => { accepted++; modal.closeModal() } }, 'Contenido'))
  }
  await render(React.createElement(Example))
  await click(container.querySelector('button'))
  assert.ok(container.querySelector('.modal.show'))
  await click(container.querySelector('.modal-footer button'))
  assert.equal(accepted, 1)
  assert.equal(container.querySelector('.modal'), null)
  await click(container.querySelector('button'))
  await click(container.querySelector('.modal-header button'))
  assert.equal(container.querySelector('.modal'), null)
  assert.equal(submissions, 0)
})

test('Tabs, useTabs y ModalDoc conservan el cambio de panel, la referencia y los callbacks', async () => {
  const { Tabs, Tab, useTabs, ModalDoc } = components
  const ref = React.createRef()
  const panels = () => ['Uno', 'Dos'].map(title => React.createElement(Tab, { key: title, title }, 'Contenido ' + title))
  await render(React.createElement(Tabs, { ref, initialTab: 'Uno' }, panels()))
  assert.equal(ref.current.activeTab, 'Uno')
  await click([...container.querySelectorAll('.nav-link-item')].find(link => link.textContent === 'Dos'))
  assert.equal(ref.current.activeTab, 'Dos')
  assert.ok(container.textContent.includes('Contenido Dos'))
  assert.equal(container.textContent.includes('Contenido Uno'), false)
  function HookExample() { const { Tabs: HookTabs } = useTabs(); return React.createElement(HookTabs, { initialTab: 'Uno' }, panels()) }
  await React.act(async () => root.render(React.createElement(HookExample)))
  await click([...container.querySelectorAll('.nav-link-item')].find(link => link.textContent === 'Dos'))
  assert.ok(container.textContent.includes('Contenido Dos'))
  let accepted = 0
  await React.act(async () => root.render(React.createElement(ModalDoc, { pathname: '/', initialTab: 'Uno', items: [{ title: 'Uno', children: 'Documento uno' }, { title: 'Dos', children: 'Documento dos' }], onAccept: () => accepted++ })))
  await click([...container.querySelectorAll('.nav-link-item')].find(link => link.textContent === 'Dos'))
  assert.ok(container.textContent.includes('Documento dos'))
  await click(container.querySelector('.modal-footer button'))
  assert.equal(accepted, 1)
})

test('Card conserva plegado, pantalla completa, cierre y su referencia sin enviar formularios', async () => {
  const { Card } = components
  const ref = React.createRef()
  let submissions = 0
  const example = (key, props) => React.createElement('form', { onSubmit: event => { event.preventDefault(); submissions++ } },
    React.createElement(Card, { key, ref, title: 'Prueba', body: 'Contenido', isCollapsible: true, isClosable: true, isFullscreenable: true, ...props }))
  await render(example('initial', { isCollapsed: true }))
  const card = () => container.querySelector('.card')
  assert.equal(card().classList.contains('card-collapsed'), true)
  await click(container.querySelector('[aria-label="Collapse card"]'))
  assert.equal(card().classList.contains('card-collapsed'), false)
  await React.act(async () => root.render(example('initial', { isCollapsed: true, isClosed: true })))
  assert.ok(card(), 'isClosed solo inicializa el estado; no lo controla tras el montaje')
  assert.equal(card().classList.contains('card-collapsed'), false)
  await click(container.querySelector('[aria-label="Toggle fullscreen"]'))
  assert.equal(card().classList.contains('card-fullscreen'), true)
  await click(container.querySelector('[aria-label="Toggle fullscreen"]'))
  assert.equal(card().classList.contains('card-fullscreen'), false)
  await React.act(async () => ref.current.handleCollapseOnClick())
  assert.equal(card().classList.contains('card-collapsed'), true)
  await click(container.querySelector('[aria-label="Close card"]'))
  assert.equal(card(), null)
  await React.act(async () => ref.current.handleCloseOnClick())
  assert.ok(card(), 'Se conserva el método público de la instancia')
  await React.act(async () => ref.current.handleFullscreenOnClick())
  assert.equal(card().classList.contains('card-fullscreen'), true)
  await React.act(async () => root.render(example('closed', { isClosed: true })))
  assert.equal(card(), null, 'Una instancia nueva respeta isClosed inicial')
  assert.equal(submissions, 0)
})

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
  const day = container.querySelector('.rdp-day_button:not([disabled])')
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


function calendarDay(isoDate) {
  const button = container.querySelector('[data-day="' + isoDate + '"] button');
  assert.ok(button, 'Debe existir el día ' + isoDate);
  return button;
}
function disabledDay(button) {
  return button.disabled || button.getAttribute('aria-disabled') === 'true';
}
async function typeDate(value) {
  const input = container.querySelector('.DayPicker input');
  await React.act(async () => {
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(input, value);
    input.dispatchEvent(new window.Event('input', { bubbles: true }));
  });
}

test('DatePicker conserva los límites inclusivos del histórico y fromMonth/toMonth', async () => {
  const { DatePicker } = components;
  await render(React.createElement(DatePicker, {
    date: new Date(2026, 9, 15), dateIni: new Date(2026, 9, 15), today: true,
    fromMonth: new Date(2026, 8, 1), toMonth: new Date(2026, 9, 1), lastDate: new Date(2026, 9, 20),
  }));
  await click(container.querySelector('.DayPicker button'));
  assert.ok(!disabledDay(calendarDay('2026-10-20')));
  assert.ok(disabledDay(calendarDay('2026-10-21')));
  assert.equal(container.querySelector('.rdp-button_next').getAttribute('aria-disabled'), 'true');
  await click(container.querySelector('.rdp-button_previous'));
  assert.match(container.querySelector('.rdp-caption_label').textContent, /septiembre 2026/i);
  assert.equal(container.querySelector('.rdp-button_previous').getAttribute('aria-disabled'), 'true');
});

test('DatePicker conserva el límite inferior del modo futuro', async () => {
  const { DatePicker } = components;
  await render(React.createElement(DatePicker, {
    date: new Date(2026, 9, 15), dateIni: new Date(2026, 9, 15), today: true,
    isHistoric: false, lastDate: new Date(2026, 9, 10),
  }));
  await click(container.querySelector('.DayPicker button'));
  assert.ok(disabledDay(calendarDay('2026-10-09')));
  assert.ok(!disabledDay(calendarDay('2026-10-10')));
  assert.ok(!disabledDay(calendarDay('2026-10-20')));
});

test('DatePicker respeta disabled personalizado y permite deshabilitar todos los días', async () => {
  const { DatePicker } = components;
  const props = { date: new Date(2026, 9, 15), dateIni: new Date(2026, 9, 15), today: true };
  await render(React.createElement(DatePicker, { ...props, disabled: { dayOfWeek: [0, 6] } }));
  await click(container.querySelector('.DayPicker button'));
  assert.ok(disabledDay(calendarDay('2026-10-24')));
  assert.ok(!disabledDay(calendarDay('2026-10-23')), 'El matcher explícito conserva su prioridad sobre el histórico');
  await React.act(async () => root.render(React.createElement(DatePicker, { ...props, disabled: true })));
  const days = [...container.querySelectorAll('.rdp-day_button')];
  assert.ok(days.length > 0);
  assert.ok(days.every(disabledDay));
});

test('DatePicker mantiene las fechas locales, el castellano y la referencia pública al seleccionar', async () => {
  const { DatePicker } = components;
  const ref = React.createRef();
  await render(React.createElement(DatePicker, {
    ref, dateIni: new Date(2026, 2, 30), previousDay: 1, lastDate: new Date(2026, 11, 31),
  }));
  assert.equal(container.querySelector('.DayPicker input').value, '29/03/2026');
  await click(container.querySelector('.DayPicker button'));
  assert.match(container.querySelector('.rdp-caption_label').textContent, /marzo 2026/i);
  assert.equal(calendarDay('2026-03-29').parentElement.getAttribute('aria-selected'), 'true');
  await click(calendarDay('2026-03-29'));
  assert.equal(container.querySelector('.DayPicker input').value, '', 'Pulsar la fecha seleccionada conserva la deselección');
  await click(calendarDay('2026-03-29'));
  assert.equal(container.querySelector('.DayPicker input').value, '29/03/2026');
  assert.equal(ref.current.value.getFullYear(), 2026);
  assert.equal(ref.current.value.getMonth(), 2);
  assert.equal(ref.current.value.getDate(), 29);
});

test('DatePicker procesa escritura válida e inválida y reset restaura campo y selección', async () => {
  const { DatePicker } = components;
  const ref = React.createRef();
  await render(React.createElement(DatePicker, {
    ref, date: new Date(2026, 9, 15), dateIni: new Date(2026, 9, 15), today: true,
    lastDate: new Date(2026, 11, 31),
  }));
  await typeDate('12/10/2026');
  assert.equal(ref.current.value.getDate(), 12);
  await click(container.querySelector('.DayPicker button'));
  assert.equal(calendarDay('2026-10-12').parentElement.getAttribute('aria-selected'), 'true');
  await click(calendarDay('2026-10-11'));
  await React.act(async () => ref.current.reset());
  assert.equal(container.querySelector('.DayPicker input').value, '15/10/2026');
  await click(container.querySelector('.DayPicker button'));
  assert.equal(calendarDay('2026-10-15').parentElement.getAttribute('aria-selected'), 'true');
  await key(document.activeElement, 'Escape');
  await typeDate('31/02/2026');
  assert.ok(Number.isNaN(ref.current.value.getTime()));
  await React.act(async () => ref.current.reset());
  assert.equal(ref.current.value.getDate(), 15);
});


test('DatePicker permite hoy y rechaza mañana tanto en calendario como al escribir', async t => {
  t.mock.timers.enable({ apis: ['Date'], now: new Date(2026, 9, 23, 0, 5).getTime() });
  const ref = React.createRef();
  await render(React.createElement('form', null, React.createElement(components.DatePicker, {
    ref, dateIni: new Date(2026, 9, 15), previousDay: 3,
  })));
  assert.equal(container.querySelector('input').value, '12/10/2026');
  await typeDate('23/10/2026');
  assert.equal(ref.current.value.getDate(), 23);
  await click(container.querySelector('.DayPicker button'));
  assert.ok(!disabledDay(calendarDay('2026-10-23')), 'Hoy no depende de dateIni ni previousDay');
  assert.ok(disabledDay(calendarDay('2026-10-24')));
  await key(document.activeElement, 'Escape');
  await typeDate('24/10/2026');
  const input = container.querySelector('input');
  assert.ok(Number.isNaN(ref.current.value.getTime()));
  assert.equal(input.getAttribute('aria-invalid'), 'true');
  assert.match(container.querySelector('[role=alert]').textContent, /23\/10\/2026/);
  assert.equal(document.getElementById(input.getAttribute('aria-describedby')), container.querySelector('[role=alert]'));
  assert.equal(input.validity.customError, true);
  assert.equal(container.querySelector('form').checkValidity(), false);
  await click(container.querySelector('.DayPicker button'));
  assert.notEqual(calendarDay('2026-10-24').parentElement.getAttribute('aria-selected'), 'true');
  await key(document.activeElement, 'Escape');
  await typeDate('23/10/2026');
  assert.equal(input.getAttribute('aria-invalid'), null);
  assert.equal(input.checkValidity(), true);
  assert.equal(container.querySelector('[role=alert]'), null);
});

test('DatePicker conserva lastDate explícito y revalida al cambiar el límite', async t => {
  t.mock.timers.enable({ apis: ['Date'], now: new Date(2026, 9, 23, 18).getTime() });
  const ref = React.createRef();
  const props = { ref, date: new Date(2026, 9, 15), dateIni: new Date(2026, 9, 15), today: true };
  await render(React.createElement(components.DatePicker, { ...props, lastDate: new Date(2026, 10, 10) }));
  await typeDate('24/10/2026');
  assert.equal(ref.current.value.getDate(), 24, 'Un límite explícito puede permitir fechas futuras');
  await React.act(async () => root.render(React.createElement(components.DatePicker, { ...props, lastDate: new Date(2026, 9, 20) })));
  assert.ok(Number.isNaN(ref.current.value.getTime()));
  assert.equal(container.querySelector('input').checkValidity(), false);
  await typeDate('20/10/2026');
  assert.equal(ref.current.value.getDate(), 20, 'El límite es inclusivo');
  await click(container.querySelector('.DayPicker button'));
  assert.ok(!disabledDay(calendarDay('2026-10-20')));
  assert.ok(disabledDay(calendarDay('2026-10-21')));
  await key(document.activeElement, 'Escape');
  await typeDate('21/10/2026');
  assert.ok(Number.isNaN(ref.current.value.getTime()));
  await React.act(async () => root.render(React.createElement(components.DatePicker, { ...props, lastDate: new Date(2026, 9, 21) })));
  assert.equal(ref.current.value.getDate(), 21);
  await click(container.querySelector('.DayPicker button'));
  assert.equal(calendarDay('2026-10-21').parentElement.getAttribute('aria-selected'), 'true');
  await key(document.activeElement, 'Escape');
  await React.act(async () => ref.current.reset());
  assert.equal(ref.current.value.getDate(), 15);
  assert.equal(container.querySelector('input').checkValidity(), true);
});

test('DatePicker aplica al texto los mismos matchers disabled y el límite del modo futuro', async () => {
  const ref = React.createRef();
  const props = { ref, date: new Date(2026, 9, 15), dateIni: new Date(2026, 9, 15), today: true };
  const examples = [
    { restrictions: { isHistoric: false, lastDate: new Date(2026, 9, 15) }, allowed: '15/10/2026', blocked: '14/10/2026', iso: '2026-10-14' },
    { restrictions: { disabled: { dayOfWeek: [0, 6] } }, allowed: '23/10/2026', blocked: '24/10/2026', iso: '2026-10-24' },
    { restrictions: { disabled: [new Date(2026, 9, 20)] }, allowed: '19/10/2026', blocked: '20/10/2026', iso: '2026-10-20' },
    { restrictions: { disabled: day => day.getDate() === 20 }, allowed: '19/10/2026', blocked: '20/10/2026', iso: '2026-10-20' },
    { restrictions: { disabled: true }, blocked: '20/10/2026', iso: '2026-10-20' },
  ];
  await render(React.createElement(components.DatePicker, props));
  for (const example of examples) {
    await React.act(async () => root.render(React.createElement(components.DatePicker, { ...props, ...example.restrictions })));
    if (example.allowed) {
      await typeDate(example.allowed);
      assert.ok(!Number.isNaN(ref.current.value.getTime()));
      assert.equal(container.querySelector('input').checkValidity(), true);
    }
    await typeDate(example.blocked);
    assert.ok(Number.isNaN(ref.current.value.getTime()));
    assert.equal(container.querySelector('input').checkValidity(), false);
    await click(container.querySelector('.DayPicker button'));
    assert.ok(disabledDay(calendarDay(example.iso)));
    await key(document.activeElement, 'Escape');
  }
});

test('DatePicker actualiza el límite al pasar la medianoche local con la página abierta', async t => {
  t.mock.timers.enable({ apis: ['Date', 'setTimeout'], now: new Date(2026, 9, 23, 23, 59, 59).getTime() });
  const ref = React.createRef();
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  await React.act(async () => root.render(React.createElement(components.DatePicker, { ref, today: true })));
  await typeDate('24/10/2026');
  assert.ok(Number.isNaN(ref.current.value.getTime()));
  await React.act(async () => t.mock.timers.tick(2000));
  assert.equal(ref.current.value.getDate(), 24);
  assert.equal(container.querySelector('input').getAttribute('aria-invalid'), null);
  assert.equal(container.querySelector('input').checkValidity(), true);
});
