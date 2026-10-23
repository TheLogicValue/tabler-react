const assert = require('node:assert/strict')
const { before, after, afterEach, test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')

const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
let window, React, createRoot, AGGridTable, AGGridPagination, root, container

before(async () => {
  const { Window } = await import('happy-dom')
  window = new Window({ url: 'http://localhost/' })
  for (const key of ['window', 'document', 'navigator', 'HTMLElement', 'Node']) {
    Object.defineProperty(globalThis, key, { configurable: true, value: key === 'window' ? window : window[key] })
  }
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  React = consumerRequire('react')
  createRoot = consumerRequire('react-dom/client').createRoot
  AGGridTable = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js').AGGridTable
  AGGridPagination = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js').AGGridPagination
})

afterEach(async () => {
  if (root) await React.act(async () => root.unmount())
  container?.remove()
  root = null
})
after(() => window.happyDOM.abort())

async function render(element) {
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
  await React.act(async () => root.render(element))
}

// Inspect the integration boundary without replacing AG Grid with business logic.
// Real selection, editing and pinned rows are exercised in the browser demo.
function gridDouble() {
  let received
  const calls = []
  const api = {
    deselectAll: () => calls.push('deselect'),
    exportDataAsCsv: options => calls.push(options),
    getDisplayedRowAtIndex: index => ({ data: { id: index } }),
    flashCells: options => calls.push(options),
  }
  const Grid = React.forwardRef((props, ref) => {
    received = props
    const handle = React.useRef({})
    React.useImperativeHandle(ref, () => handle.current, [])
    React.useEffect(() => { handle.current.api = api }, [])
    return React.createElement('div')
  })
  return { Grid, api, calls, get props() { return received } }
}

test('AGGridTable entrega las opciones nativas y conserva las columnas y su prioridad', async () => {
  const grid = gridDouble()
  const onPaginationChanged = () => {}, postSortRows = () => {}
  const pinned = [{ id: 'total' }]
  const columns = Object.freeze([Object.freeze({ header: 'Peso', item: 'weight', sortable: true })])
  await render(React.createElement(AGGridTable, {
    AgGridReact: grid.Grid, pinnedTopRowData: pinned, rowHeight: 44,
    overlayLoadingTemplate: '<span>Cargando</span>', onPaginationChanged, postSortRows,
    suppressHorizontalScroll: false, alwaysShowHorizontalScroll: true,
    alwaysShowVerticalScroll: true, suppressRowTransform: true,
    sortable: false, resizable: false, suppressMovable: true,
    defaultColDef: { resizable: true, filter: true }, dataColumn: columns,
    quickFilterText: 'Atlas',
  }))
  assert.equal(grid.props.pinnedTopRowData, pinned)
  assert.equal(grid.props.rowHeight, 44)
  assert.equal(grid.props.overlayLoadingTemplate, '<span>Cargando</span>')
  assert.equal(grid.props.onPaginationChanged, onPaginationChanged)
  assert.equal(grid.props.postSortRows, postSortRows)
  assert.equal(grid.props.suppressHorizontalScroll, false)
  assert.equal(grid.props.alwaysShowHorizontalScroll, true)
  assert.equal(grid.props.alwaysShowVerticalScroll, true)
  assert.equal(grid.props.suppressRowTransform, true)
  assert.equal(grid.props.quickFilterText, 'Atlas')
  assert.deepEqual(grid.props.defaultColDef, { sortable: false, resizable: true, suppressMovable: true, filter: true })
  assert.equal(grid.props.columnDefs[0].sortable, true)
  assert.equal(grid.props.columnDefs[0].field, 'weight')
  assert.equal(grid.props.rowSelection.mode, 'singleRow')
})

test('AGGridTable conserva los callbacks nativos y los alias, y la API que aparece tras el montaje', async () => {
  const grid = gridDouble(), ref = React.createRef(), calls = []
  await render(React.createElement(AGGridTable, {
    AgGridReact: grid.Grid, ref,
    onGrid: event => calls.push(['aliasReady', event]), onGridReady: event => calls.push(['ready', event]),
    onRowClick: data => calls.push(['rowData', data]), onRowClicked: event => calls.push(['row', event]),
    onCellClick: event => calls.push(['aliasCell', event]), onCellClicked: event => calls.push(['cell', event]),
  }))
  const event = { data: { id: 'row' }, api: grid.api }
  await React.act(async () => {
    grid.props.onGridReady(event)
    grid.props.onRowClicked(event)
    grid.props.onCellClicked(event)
  })
  assert.deepEqual(calls, [['aliasReady', event], ['ready', event], ['rowData', event.data], ['row', event], ['aliasCell', event], ['cell', event]])
  assert.equal(ref.current.api, grid.api)
  assert.deepEqual(ref.current.getDisplayedRowAtIndex(3), { data: { id: 3 } })
})

test('Limpiar solo modifica la tabla correspondiente y no envía el formulario', async () => {
  const first = gridDouble(), second = gridDouble()
  let submissions = 0
  await render(React.createElement('form', { onSubmit: event => { event.preventDefault(); submissions++ } },
    ...[first, second].map((grid, key) => React.createElement(AGGridTable, {
      key, AgGridReact: grid.Grid, search: true, downloadCSV: true,
      listBtn: true, deselectAllBtn: true,
    }))))
  const inputs = container.querySelectorAll('input')
  await React.act(async () => {
    inputs[0].value = 'Atlas'
    inputs[0].dispatchEvent(new window.Event('input', { bubbles: true }))
    inputs[1].value = 'Brisa'
    inputs[1].dispatchEvent(new window.Event('input', { bubbles: true }))
  })
  const clear = container.querySelectorAll('button#clearDataTables')
  await React.act(async () => clear[1].click())
  assert.deepEqual([...inputs].map(input => input.value), ['Atlas', ''])
  assert.equal(first.props.quickFilterText, 'Atlas')
  assert.equal(second.props.quickFilterText, '')
  assert.deepEqual(first.calls, [])
  assert.deepEqual(second.calls, ['deselect'])
  assert.equal(submissions, 0)
  assert.ok([...container.querySelectorAll('button')].every(button => button.type === 'button'))
  await React.act(async () => container.querySelector('.downloadCSV').click())
  assert.deepEqual(first.calls, [{ fileName: 'Export' }])
})

test('La limpieza heredada sigue disponible oculta y funciona sin buscador', async () => {
  const grid = gridDouble()
  await render(React.createElement(AGGridTable, {
    AgGridReact: grid.Grid, listBtn: true, deselectAllBtn: true,
    deselectAllOptions: { text: 'Limpiar', hidden: true },
  }))
  assert.equal(container.querySelector('input'), null)
  const button = container.querySelector('button#clearDataTables')
  assert.ok(button.classList.contains('d-none'))
  await React.act(async () => button.click())
  assert.deepEqual(grid.calls, ['deselect'])
})

test('El filtro personalizado conserva el control de la búsqueda', async () => {
  const grid = gridDouble(), calls = []
  await render(React.createElement(AGGridTable, {
    AgGridReact: grid.Grid, search: true,
    onHandleChangeFilter: event => calls.push(event.target.value),
  }))
  const input = container.querySelector('input')
  await React.act(async () => {
    input.value = 'consulta externa'
    input.dispatchEvent(new window.Event('input', { bubbles: true }))
  })
  assert.deepEqual(calls, ['consulta externa'])
  assert.equal(input.value, 'consulta externa')
  assert.equal(grid.props.quickFilterText, '')
})

test('Las columnas agrupadas conservan las opciones nativas y solo traducen un nivel de subItems', async () => {
  const grid = gridDouble()
  const formatter = params => String(params.value)
  const language = { noRowsToShow: 'Vacío' }
  const column = Object.freeze({ header: 'Grupo', marryChildren: true, minWidth: 80, subItems: [
    Object.freeze({ header: 'Peso', item: 'weight', key: 'weight-col', minWidth: 40, headerTooltip: '  Peso local  ', valueFormatter: formatter, editable: true }),
  ] })
  await render(React.createElement(AGGridTable, { AgGridReact: grid.Grid, dataColumn: [column], minWidth: 100, flex: 2, autoHeaderTooltip: true, language }))
  const definition = grid.props.columnDefs[0]
  assert.equal(definition.marryChildren, true)
  assert.equal(definition.minWidth, 100)
  assert.equal(definition.flex, 2)
  assert.equal(definition.headerTooltip, 'Grupo')
  assert.equal(definition.children[0].field, 'weight')
  assert.equal(definition.children[0].colId, 'weight-col')
  assert.equal(definition.children[0].minWidth, 40)
  // The child's explicit native headerTooltip retains priority over the fallback.
  assert.equal(definition.children[0].headerTooltip, '  Peso local  ')
  assert.equal(definition.children[0].valueFormatter, formatter)
  assert.equal(grid.props.localeText, language)
})

test('El paginador externo sincroniza la API, los límites y el rango de la última página', async () => {
  const ref = React.createRef(), calls = []
  const controles = { current: { api: {
    paginationGoToPage: page => calls.push(['page', page]),
    paginationGoToNextPage: () => calls.push(['next']),
    paginationGoToPreviousPage: () => calls.push(['previous']),
  } } }
  let submissions = 0
  await render(React.createElement('form', { onSubmit: event => { event.preventDefault(); submissions++ } },
    React.createElement(AGGridPagination, { ref, controles, pagesSizes: [20, 20, 5], totalPages: 3, totalElements: 45, pageSize: 20, lastPage: 3 })))
  const button = name => container.querySelector('[aria-label="' + name + '"]')
  assert.equal(button('Previous Page').disabled, true)
  await React.act(async () => button('Next Page').click())
  assert.equal(ref.current.page, 2)
  await React.act(async () => button('Last Page').click())
  assert.equal(ref.current.page, 3)
  assert.deepEqual(calls, [['next'], ['page', 2]])
  assert.match(container.querySelector('.ag-paging-row-summary-panel').textContent, /41\s*to\s*45\s*de\s*45/)
  assert.equal(button('Next Page').disabled, true)
  await React.act(async () => ref.current.noData())
  assert.equal(ref.current.page, 2)
  await React.act(async () => button('First Page').click())
  assert.equal(ref.current.page, 1)
  assert.deepEqual(calls.slice(-2), [['previous'], ['page', 0]])
  assert.equal(submissions, 0)
})

test('El paginador no accede a una API o unos tamaños ausentes y permite alcanzar lastPage', async () => {
  const controles = { current: null }, ref = React.createRef(), calls = []
  await render(React.createElement(AGGridPagination, { ref, controles, totalPages: 2, totalElements: 28 }))
  await React.act(async () => { for (const button of container.querySelectorAll('button')) button.click() })
  assert.equal(ref.current.page, 1)
  controles.current = { api: { paginationGoToNextPage: () => calls.push('next') } }
  await React.act(async () => root.render(React.createElement(AGGridPagination, { ref, controles, totalPages: 2, totalElements: 28, pagesSizes: [20, 8], lastPage: 2 })))
  await React.act(async () => container.querySelector('[aria-label="Next Page"]').click())
  assert.equal(ref.current.page, 2)
  assert.deepEqual(calls, ['next'])
})
