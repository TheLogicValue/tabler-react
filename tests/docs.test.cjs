const assert = require('node:assert/strict')
const { test } = require('node:test')
const fs = require('node:fs')
const path = require('node:path')
const { transformSync, parseSync } = require('@babel/core')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const library = require('../dist/index.js')
const project = path.resolve(__dirname, '..')
const read = file => JSON.parse(fs.readFileSync(path.join(project, file), 'utf8'))
const index = read('demo/src/component-docs-index.json')
const document = name => read('demo/src/docs/generated/' + name + '.json')

test('Las fichas corresponden al paquete público y sus subcomponentes existen', () => {
  assert.deepEqual(Object.keys(index).sort(), Object.keys(library).sort())
  for (const name of Object.keys(index)) {
    const doc = document(name)
    assert.equal(doc.name, name)
    assert.ok(fs.existsSync(path.join(project, doc.implementation)))
    assert.ok(doc.implementationCode.length)
    assert.equal(new Set(doc.props.map(prop => prop.name)).size, doc.props.length)
    for (const subcomponent of doc.subcomponents) assert.notEqual(library[name][subcomponent], undefined, name + '.' + subcomponent)
  }
})

test('La extracción sigue reexports, wrappers y tipos Flow y TypeScript', () => {
  assert.equal(document('Modal').implementation, 'src/components/Modal/Modal.tsx')
  assert.ok(document('RegisterPage').props.some(prop => prop.name === 'values'))
  assert.ok(document('FormTextInput').props.some(prop => prop.name === 'name'))
  assert.ok(document('Grid').childApis.find(child => child.name === 'Col').props.some(prop => prop.name === 'lg'))
  assert.equal(document('Grid').implementation, 'src/components/Grid/Grid.react.tsx')
  const gridRow = document('Grid').childApis.find(child => child.name === 'Row')
  const gridCol = document('Grid').childApis.find(child => child.name === 'Col')
  assert.equal(gridRow.source, 'src/components/Grid/GridRow.react.tsx')
  assert.equal(gridCol.source, 'src/components/Grid/GridCol.react.tsx')
  assert.equal(gridRow.props.length, 7)
  assert.equal(gridCol.props.length, 36)
  assert.equal(gridRow.props.find(prop => prop.name === 'gutters').default, '""')
  assert.equal(gridCol.props.find(prop => prop.name === 'xl2Auto').type, 'boolean | number')
  assert.ok(document('AGGridTable').members.includes('api'))
  assert.ok(document('DatePicker').members.includes('reset'))
  assert.equal(document('Badge').implementation, 'src/components/Badge/Badge.react.tsx')
  assert.equal(document('Badge').props.find(prop => prop.name === 'children').type, 'React.ReactNode')
  assert.equal(document('Badge').props.find(prop => prop.name === 'color').default, '"primary"')
  assert.deepEqual(document('Badge').props.map(prop => prop.name).sort(), ['children', 'className', 'color'])
  assert.equal(document('Icon').implementation, 'src/components/Icon/Icon.react.tsx')
  assert.equal(document('Icon').props.find(prop => prop.name === 'title').type, 'string')
  assert.equal(document('Icon').props.find(prop => prop.name === 'onPointerEnter').type, 'React.PointerEventHandler<HTMLElement>')
  assert.equal(document('Container').implementation, 'src/components/Container.react.tsx')
  assert.equal(document('Container').props.length, 2)
  assert.equal(document('Text').implementation, 'src/components/Text/Text.react.tsx')
  assert.equal(document('Text').props.length, 25)
  assert.ok(document('Text').rest)
  const small = document('Text').childApis.find(child => child.name === 'Small')
  assert.equal(small.source, 'src/components/Text/TextSmall.react.tsx')
  assert.equal(small.props.length, 5)
  const card = document('Card')
  assert.equal(card.implementation, 'src/components/Card/Card.react.tsx')
  assert.equal(card.props.length, 17)
  assert.equal(card.childApis.length, 9)
  for (const child of card.childApis) {
    assert.equal(child.source, `src/components/Card/Card${child.name}.react.tsx`)
    assert.ok(child.props.every(prop => prop.type), 'Todas las propiedades de Card.' + child.name + ' deben tener un tipo extraído')
  }
  const action = card.childApis.find(child => child.name === 'OptionsItem')
  assert.equal(action.props.find(prop => prop.name === 'onClick').type, 'React.MouseEventHandler<HTMLButtonElement>')
  const page = document('Page')
  assert.equal(page.implementation, 'src/components/Page/Page.react.tsx')
  assert.equal(page.props.length, 2)
  assert.equal(page.childApis.length, 8)
  for (const child of page.childApis) {
    const name = child.name === 'Sidebar' ? 'SideBar' : child.name
    assert.equal(child.source, `src/components/Page/Page${name}.react.tsx`)
    assert.ok(child.props.every(prop => prop.type), 'Todas las propiedades de Page.' + child.name + ' deben tener un tipo extraído')
  }
  assert.equal(page.childApis.find(child => child.name === 'Sidebar').props.find(prop => prop.name === 'headerProps').type, 'PageSidebarHeaderProps')
  const header = document('Header')
  assert.equal(header.implementation, 'src/components/Header/Header.react.tsx')
  assert.equal(header.childApis.length, 6)
  assert.ok(header.childApis.every(child => child.source.endsWith('.tsx') && child.props.length === 2))
  assert.equal(document('Avatar').implementation, 'src/components/Avatar/Avatar.react.tsx')
  assert.equal(document('Avatar').props.find(prop => prop.name === 'style').type, 'React.CSSProperties')
  const button = document('Button')
  assert.equal(button.implementation, 'src/components/Button/Button.react.tsx')
  assert.equal(button.props.find(prop => prop.name === 'type').type, '"button" | "submit" | "reset"')
  assert.ok(button.props.find(prop => prop.name === 'RootComponent').type.includes('"input"'))
  assert.ok(button.props.find(prop => prop.name === 'RootComponent').type.includes('"a"'))
  assert.equal(button.childApis.find(child => child.name === 'Dropdown').source, 'src/components/Button/ButtonDropdown.react.tsx')
  assert.equal(document('Dropdown').childApis.length, 4)
  assert.ok(document('Dropdown').childApis.every(child => child.source.endsWith('.tsx') && child.props.every(prop => prop.type)))
  assert.equal(document('ButtonModal').implementation, 'src/components/Button/ButtonModal.tsx')
  assert.equal(document('Spinner').implementation, 'src/components/IconAnimate/Spinner.tsx')
  for (const name of ['Alert', 'Nav', 'Site', 'Notification', 'AccountDropdown', 'List']) {
    const doc = document(name)
    assert.equal(doc.implementation, `src/components/${name}/${name}.react.tsx`)
    assert.ok(doc.childApis.every(child => child.source.endsWith('.tsx') && child.props.every(prop => prop.type)))
  }
  assert.equal(document('NavBarMenu').implementation, 'src/components/NavBar/NavBarMenu.tsx')
  assert.equal(document('NavBarMenu').props.find(prop => prop.name === 'items').type, 'ReadonlyArray<NavBarMenuItem>')
  assert.equal(document('Alert').props.find(prop => prop.name === 'onClick').type, 'React.MouseEventHandler<HTMLDivElement>')
  assert.equal(document('Nav').childApis.find(child => child.name === 'Link').props.find(prop => prop.name === 'rootRef').type, 'React.Ref<HTMLAnchorElement>')
  assert.equal(document('Site').childApis.find(child => child.name === 'Wrapper').props.find(prop => prop.name === 'headerProps').optional, false)
  assert.equal(document('RouterContextProvider').implementation, 'src/helpers/RouterContextProvider.react.tsx')
  assert.equal(document('RouterContextProvider').props.find(prop => prop.name === 'location').type, 'RouterLocation')
  assert.equal(button.props.find(prop => prop.name === 'aria-label').type, 'React.AriaAttributes["aria-label"]')
  const form = document('Form')
  assert.equal(form.implementation, 'src/components/Form/Form.react.tsx')
  assert.equal(form.childApis.length, 28)
  assert.ok(form.childApis.every(child => child.source.endsWith('.tsx') && child.props.every(prop => prop.type)))
  assert.equal(form.props.find(prop => prop.name === 'autoComplete').default, '"off"')
  assert.equal(form.childApis.find(child => child.name === 'Textarea').props.find(prop => prop.name === 'onChange').type, 'React.ChangeEventHandler<HTMLTextAreaElement>')
  const legacyCalendar = form.childApis.find(child => child.name === 'DatePicker')
  assert.equal(legacyCalendar.props.find(prop => prop.name === 'minYear').default, '1897')
  assert.equal(legacyCalendar.props.find(prop => prop.name === 'defaultDate').optional, true)
  for (const name of ['FormCard', 'FormTextInput', 'FormCheckboxInput']) assert.equal(document(name).implementation, `src/forms/${name}.react.tsx`)
  assert.equal(document('DatePicker').implementation, 'src/components/DatePicker/DatePicker.react.tsx')
  assert.equal(document('DatePicker').props.find(prop => prop.name === 'disabled').type, 'Matcher | Matcher[]')
  assert.ok(document('Tabs').members.includes('activeTab'))
  assert.equal(document('Tab').implementation, 'src/components/Tabs/Tab.react.tsx')
  assert.equal(document('useModal').implementation, 'src/components/Modal/Hooks/useModal.ts')
  assert.equal(document('ModalDoc').props.find(prop => prop.name === 'items').type, 'readonly ModalDocItem[]')
  assert.equal(document('AGGridTable').implementation, 'src/components/AGGridTable/AGGridTable.react.tsx')
  assert.ok(document('AGGridTable').props.find(prop => prop.name === 'dataColumn').type.includes('AGGridColumn<TData>'))
  assert.deepEqual(document('AGGridPagination').members.sort(), ['firstPage', 'noData', 'page'])
  for (const name of ['BarChart', 'LineChart', 'PieChart', 'DoughnutChart', 'RadarChart']) {
    const chart = document(name)
    assert.equal(chart.implementation, `src/components/Chart/${name}.tsx`)
    assert.ok(chart.props.every(prop => prop.type), 'Todas las propiedades de ' + name + ' deben tener tipo')
  }
  assert.ok(!document('DoughnutChart').props.some(prop => prop.name === 'center'), 'Omit debe excluir las opciones que ese wrapper no admite')
  assert.equal(document('Table').childApis.length, 5)
  assert.ok(document('Table').childApis.every(child => child.source.endsWith('.tsx') && child.props.every(prop => prop.type)))
  for (const name of ['TableLoader', 'BarChartLoader', 'PieChartLoader']) assert.ok(document(name).props.find(prop => prop.name === 'width').type)
  for (const name of ['Tooltip', 'Tag', 'Stamp', 'Progress', 'Loader', 'Dimmer']) {
    const doc = document(name)
    assert.equal(doc.implementation, `src/components/${name}/${name}.react.tsx`)
    assert.ok(doc.props.every(prop => prop.type), name + ': todas las propiedades deben tener tipo')
    assert.ok(doc.childApis.every(child => child.source.endsWith('.tsx') && child.props.every(prop => prop.type)))
  }
  assert.equal(document('colors').implementation, 'src/colors.ts')
  assert.equal(document('LoaderZone').implementation, 'src/components/Loader/LoaderZone.tsx')
  assert.equal(document('LoaderZone').props.find(prop => prop.name === 'height').type, 'string | number')
  assert.equal(document('LoaderZone').props.find(prop => prop.name === 'height').optional, false)
  assert.equal(document('LoaderNoData').implementation, 'src/components/Loader/LoaderNodata.tsx')
  assert.equal(document('LoaderNoData').props.find(prop => prop.name === 'title').type, 'React.ReactNode')
  assert.equal(document('Tag').childApis.length, 2)
  assert.equal(document('Tag').props.find(prop => prop.name === 'rootRef').type, 'React.Ref<T>')
  assert.equal(document('Tooltip').props.find(prop => prop.name === 'children').type, 'React.ReactElement<TooltipTriggerProps>')
  for (const [name, implementation] of [
    ['Accordion', 'src/components/Accordion/Accordion.react.tsx'],
    ['Breadcrumb', 'src/components/Breadcrumb/Breadcrumb.react.tsx'],
    ['SearchBar', 'src/components/SearchBar/SearchBar.tsx'],
    ['useSearchBar', 'src/components/SearchBar/useSearchBar.ts'],
    ['ProtectedRoute', 'src/components/ProtectedRoute/ProtectedRoute.tsx'],
  ]) {
    const doc = document(name)
    assert.equal(doc.implementation, implementation)
    assert.ok(doc.props.every(prop => prop.type), name + ': todas las propiedades deben tener tipo')
  }
  assert.equal(document('Accordion').props.find(prop => prop.name === 'collapseDefault').default, 'true')
  assert.ok(document('Breadcrumb').props.find(prop => prop.name === 'crumbs').type.includes('BreadcrumbCrumb<TPath>'))
  assert.equal(document('SearchBar').props.find(prop => prop.name === 'onKeyUp').type, 'React.KeyboardEventHandler<HTMLInputElement>')
  assert.equal(document('SearchBar').props.find(prop => prop.name === 'onClick').optional, false)
  assert.deepEqual(document('useSearchBar').members.sort(), ['filter', 'handleChangeFilter', 'setFilter'])
  assert.equal(document('ProtectedRoute').props.find(prop => prop.name === 'redirectTo').type, 'To')
  assert.equal(document('ProtectedRoute').props.find(prop => prop.name === 'replace').default, 'true')
})

function walk(node, visit) {
  if (!node || typeof node !== 'object') return
  if (Array.isArray(node)) { node.forEach(item => walk(item, visit)); return }
  if (node.type) visit(node)
  for (const [key, value] of Object.entries(node)) if (!['loc', 'leadingComments', 'trailingComments'].includes(key)) walk(value, visit)
}
function nameParts(node) {
  return node.type === 'JSXIdentifier' ? [node.name] : node.type === 'JSXMemberExpression' ? [...nameParts(node.object), node.property.name] : []
}

test('Los ejemplos de las guías tienen sintaxis válida y no usan subcomponentes inexistentes', () => {
  for (const name of Object.keys(index)) {
    const guide = document(name).guide
    if (!guide) continue
    for (const example of [guide.example, ...(guide.examples ?? []).map(item => item.code)]) {
      const ast = parseSync(example, { babelrc: false, configFile: false, parserOpts: { plugins: ['jsx', 'flow'] } })
      walk(ast, node => {
        if (node.type !== 'JSXOpeningElement') return
        const parts = nameParts(node.name)
        if (!Object.hasOwn(library, parts[0])) return
        let value = library[parts[0]]
        for (const member of parts.slice(1)) {
          value = value?.[member]
          assert.notEqual(value, undefined, name + ': ' + parts.join('.'))
        }
      })
    }
  }
})

test('Los ejemplos Markdown muestran HTML y JSX como texto sin ejecutarlos', () => {
  const file = path.join(project, 'demo/src/docs/Markdown.jsx')
  const { code } = transformSync(fs.readFileSync(file, 'utf8'), {
    filename: file, babelrc: false, configFile: false,
    presets: [['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }], '@babel/preset-react'],
  })
  const module = { exports: {} }
  new Function('require', 'module', 'exports', code)(require, module, module.exports)
  const html = renderToStaticMarkup(React.createElement(module.exports.default, {
    text: '# Ejemplo\n\n<script>throw new Error("No ejecutar")</script>\n\n```jsx\n<img src="x" onError={dangerous()} />\n```',
  }))
  assert.doesNotMatch(html, /<script>|<img\b/)
  assert.match(html, /&lt;script&gt;/)
  assert.match(html, /&lt;img/)
  assert.match(html, /Copiar código/)
})
