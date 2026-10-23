const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')

const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
const React = consumerRequire('react')
const { renderToStaticMarkup } = consumerRequire('react-dom/server')
const library = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')
const render = (Component, props, children) => renderToStaticMarkup(React.createElement(Component, props, children))

test('StandaloneFormPage conserva logo, clase y contenido con su estructura de acceso', () => {
  const html = render(library.StandaloneFormPage, { imageURL: '/logo.svg', page: 'custom' }, React.createElement('p', null, 'Contenido'))
  for (const name of ['page custom', 'page-single', 'container', 'row', 'col col-login mx-auto', 'text-center mb-6']) assert.ok(html.includes(`class="${name}"`))
  assert.match(html, /<img src="\/logo.svg" class="h-6" alt="logo"/)
  assert.match(html, /<p>Contenido<\/p>/)
  const defaults = render(library.StandaloneFormPage, {})
  assert.match(defaults, /class="page "/)
  assert.match(defaults, /<img class="h-6" alt="logo"/)
})

test('DefaultErrorPage mantiene textos predeterminados y detalles opcionales', () => {
  const defaults = render(library.DefaultErrorPage, {})
  for (const text of ['Error', 'Sorry an unkown error occurred', 'Go back']) assert.ok(defaults.includes(text))
  assert.doesNotMatch(defaults, /<h4/)
  const custom = render(library.DefaultErrorPage, { title: 'Fallo', subtitle: 'No disponible', details: 'Inténtalo de nuevo', action: 'Volver' })
  for (const text of ['Fallo', 'No disponible', 'Inténtalo de nuevo', 'Volver']) assert.ok(custom.includes(text))
  assert.match(custom, /fe fe-arrow-left/)
  assert.doesNotMatch(render(library.DefaultErrorPage, { details: '' }), /<h4/)
})

test('Las seis páginas de error conservan sus textos y permiten reemplazarlos', () => {
  const messages = {
    400: 'We are sorry but your request contains bad syntax and cannot be fulfilled...',
    401: 'We are sorry but you are not authorized to access this page...',
    403: 'We are sorry but you do not have permission to access this page...',
    404: 'We are sorry but the page you have requested can not be found...',
    500: 'We are sorry but your request contains bad syntax and cannot be fulfilled...',
    503: 'This page is temporarily unavailable.  Please reload your browser...',
  }
  for (const [status, details] of Object.entries(messages)) {
    const Component = library['Error' + status + 'Page']
    const defaults = render(Component, {})
    for (const text of [status, 'Oops... You just found an error page...', details, 'Go back']) assert.ok(defaults.includes(text), status + ': ' + text)
    assert.equal(render(Component, { title: 'Personalizado', subtitle: 'Título', details: '', action: 'Regresar' }), render(library.DefaultErrorPage, { title: 'Personalizado', subtitle: 'Título', details: '', action: 'Regresar' }))
  }
})

test('LoginPage conserva el export sin filtro touched, clase login e hijos fuera del formulario', () => {
  const values = Object.freeze({ email: 'ana@example.com', password: 'secret' })
  const errors = Object.freeze({ email: 'Correo inválido', password: 'Contraseña inválida' })
  const html = render(library.LoginPage, { imageURL: '/logo.svg', action: '/acceso', method: 'post', values, errors, onChange: () => {}, strings: { title: 'Acceso', buttonText: 'Entrar', emailLabel: 'Correo' } }, React.createElement('p', null, 'Ayuda'))
  assert.match(html, /class="page login"/)
  assert.match(html, /<form(?=[^>]*class="card")(?=[^>]*action="\/acceso")(?=[^>]*method="post")(?=[^>]*autoComplete="off")/)
  for (const text of ['Correo inválido', 'Contraseña inválida', 'Acceso', 'Entrar', 'Correo', 'ana@example.com', 'secret']) assert.ok(html.includes(text))
  assert.match(html, /<input(?=[^>]*name="email")(?=[^>]*type="text")/)
  assert.match(html, /<input(?=[^>]*name="password")(?=[^>]*type="password")/)
  assert.match(html, /<\/form><p>Ayuda<\/p>/)
  assert.equal(values.email, 'ana@example.com')
})

test('Las plantillas de cuenta conservan defaults y el fallback de strings vacíos', () => {
  for (const [Component, title, button] of [[library.LoginPage, 'Login to your Account', 'Login'], [library.RegisterPage, 'Create New Account', 'Create Account'], [library.ForgotPasswordPage, 'Forgot Password', 'Request Password Change']]) {
    const defaults = render(Component, {})
    assert.ok(defaults.includes(title) && defaults.includes(button))
    assert.equal(render(Component, { strings: { title: '', buttonText: '' } }), defaults)
  }
})

test('RegisterPage filtra los errores tocados sin convertir value de terms en checked', () => {
  const props = { values: Object.freeze({ name: 'Ana', email: 'ana@example.com', password: 'secret', terms: 'accepted' }), errors: Object.freeze({ name: 'Nombre inválido', email: 'Correo inválido', password: 'Contraseña inválida', terms: 'Condiciones pendientes' }), touched: Object.freeze({ name: true, password: false, email: true, terms: true }), onChange: () => {}, strings: { termsLabel: 'Aceptar política' } }
  const html = render(library.RegisterPage, props, 'Hijo ignorado')
  assert.ok(html.includes('Nombre inválido') && html.includes('Correo inválido') && html.includes('Aceptar política'))
  assert.doesNotMatch(html, /Contraseña inválida|Condiciones pendientes|Hijo ignorado|checked=/)
  assert.match(html, /<input(?=[^>]*name="terms")(?=[^>]*type="checkbox")(?=[^>]*value="accepted")/)
  assert.doesNotMatch(render(library.RegisterPage, { ...props, touched: {} }), /Nombre inválido|Correo inválido/)
  assert.equal(props.errors.name, 'Nombre inválido')
})

test('ForgotPasswordPage filtra email por touched y personaliza instrucciones y logo', () => {
  const props = { imageURL: '/logo.svg', values: { email: 'ana@example.com' }, errors: { email: 'Revisar el correo' }, onChange: () => {}, strings: { instructions: 'Instrucciones propias', buttonText: 'Solicitar' } }
  const untouched = render(library.ForgotPasswordPage, props, 'Hijo ignorado')
  assert.doesNotMatch(untouched, /Revisar el correo|Hijo ignorado|name="password"/)
  const touched = render(library.ForgotPasswordPage, { ...props, touched: { email: true } })
  for (const text of ['Revisar el correo', 'Instrucciones propias', 'Solicitar', 'ana@example.com', '/logo.svg']) assert.ok(touched.includes(text))
  assert.equal((touched.match(/<input /g) || []).length, 1)
})
