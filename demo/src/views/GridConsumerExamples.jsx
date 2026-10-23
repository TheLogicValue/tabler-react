import React, { useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { AGGridTable, Button, Form, Grid } from 'tabler-react'
import { funds } from '../data.js'
import { Result, Scenario } from '../shared.jsx'

const selection = { mode: 'multiRow', checkboxes: true, headerCheckbox: false, enableClickSelection: true, enableSelectionWithoutKeys: true }
const selectionColumns = [
  { header: 'Fondo ficticio', item: 'name', minWidth: 170 },
  { header: 'ESG', item: 'score', minWidth: 90, filter: 'agNumberColumnFilter' },
]

function SelectionExample({ title, rows }) {
  const host = useRef(null)
  const [selected, setSelected] = useState([])
  const [hidden, setHidden] = useState(false)
  const [submissions, setSubmissions] = useState(0)
  return <Scenario title={title} description="Filtra, marca varios fondos y limpia la selección. El botón externo también funciona si ocultas el botón de la tabla." components={['AGGridTable', 'Form', 'Button']}>
    <form onSubmit={event => { event.preventDefault(); setSubmissions(value => value + 1) }}>
      <Form.Group><Form.Checkbox label="Ocultar el botón interno" checked={hidden} onChange={event => setHidden(event.target.checked)} /></Form.Group>
      <div className="grid-demo" ref={host}>
        <AGGridTable AgGridReact={AgGridReact} dataRow={rows} dataColumn={selectionColumns}
          search pageSize={3} paginationPageSizeSelector={[3, 6]}
          defaultColDef={{ filter: true, resizable: true }} rowSelection={selection}
          getRowId={params => params.data.id} rowHeight={42}
          onSelectionChanged={event => setSelected(event.api.getSelectedRows().map(row => row.name))}
          listBtn deselectAllBtn deselectAllOptions={{ text: 'Limpiar tabla', hidden }} />
      </div>
      <div className="grid-example-actions">
        <Button type="button" color="secondary" onClick={() => host.current.querySelector('button#clearDataTables').click()}>Limpiar desde fuera</Button>
      </div>
      <Result>{selected.length ? `Seleccionados: ${selected.join(', ')}` : 'Sin fondos seleccionados.'} · Envíos del formulario: {submissions}</Result>
    </form>
  </Scenario>
}

const initialPortfolio = () => funds.slice(0, 4).map((fund, index) => ({ ...fund, weight: [40, 30, 20, 10][index] }))

function PortfolioExample() {
  const grid = useRef(null)
  const [rows, setRows] = useState(initialPortfolio)
  const [sortable, setSortable] = useState(false)
  const [lastAction, setLastAction] = useState('Edita un peso con doble clic y confirma con Intro.')
  const [ready, setReady] = useState(false)
  const [selected, setSelected] = useState(0)
  const total = useMemo(() => [{ id: 'total', name: 'Total de la cartera', weight: rows.reduce((sum, row) => sum + row.weight, 0), assets: rows.reduce((sum, row) => sum + row.assets, 0) }], [rows])
  const columns = useMemo(() => [
    { header: 'Fondo ficticio', item: 'name', minWidth: 200 },
    { header: 'Distribución', subItems: [
      { header: 'Peso editable (%)', item: 'weight', minWidth: 160, editable: params => !params.node.rowPinned,
        cellEditor: 'agNumberCellEditor', cellEditorParams: { min: 0, max: 100 },
        valueFormatter: params => `${params.value}%`, cellClassRules: { 'demo-grid-weight': params => !params.node.rowPinned && params.value >= 30 } },
      { header: 'Patrimonio (M€)', item: 'assets', minWidth: 170, filter: 'agNumberColumnFilter' },
    ] },
  ], [])
  return <Scenario title="Cartera editable y fila de totales" description="La demo calcula los totales y decide qué celdas se editan. La fila superior está fijada; selecciona otras filas y prueba Limpiar sin buscador. La ordenación está desactivada inicialmente." components={['AGGridTable', 'Form', 'Button']}>
    <Form.Group><Form.Checkbox label="Permitir ordenar las columnas" checked={sortable} onChange={event => setSortable(event.target.checked)} /></Form.Group>
    <div className="grid-demo">
      <AGGridTable ref={grid} AgGridReact={AgGridReact} dataRow={rows} dataColumn={columns}
        pinnedTopRowData={total} rowHeight={44} sortable={sortable} resizable
        defaultColDef={{ filter: true }} rowSelection={selection} getRowId={params => params.data.id}
        readOnlyEdit onCellEditRequest={event => {
          const weight = Number(event.newValue)
          if (!Number.isFinite(weight) || weight < 0 || weight > 100) return
          setRows(current => current.map(row => row.id === event.data.id ? { ...row, weight } : row))
          setLastAction(`${event.data.name}: peso actualizado a ${weight}%.`)
        }}
        onGridReady={() => setReady(true)}
        onCellClicked={event => setLastAction(`Celda pulsada: ${event.colDef.field} · ${event.value}`)}
        onSelectionChanged={event => setSelected(event.api.getSelectedRows().length)}
        getRowStyle={params => params.node.rowPinned ? { fontWeight: 'bold' } : undefined}
        listBtn deselectAllBtn deselectAllOptions={{ text: 'Limpiar selección', hidden: false }} />
    </div>
    <div className="grid-example-actions">
      <Button type="button" color="secondary" onClick={() => { setRows(initialPortfolio()); setLastAction('Pesos restablecidos.') }}>Restablecer pesos</Button>
      <Button type="button" color="secondary" onClick={() => { const row = grid.current.getDisplayedRowAtIndex(0); setLastAction(`Primera fila mediante la referencia: ${row?.data.name ?? 'sin datos'}. API disponible: ${Boolean(grid.current.api)}.`) }}>Consultar primera fila</Button>
    </div>
    <Result>Tabla {ready ? 'preparada' : 'cargando'} · {selected} seleccionados · Peso total: {total[0].weight}%. {lastAction}</Result>
  </Scenario>
}

export default function GridConsumerExamples() {
  return <>
    <PortfolioExample />
    <Grid.Row cards className="demo-card-row grid-consumer-row">
      <Grid.Col width={12} lg={6}><SelectionExample title="Selección de fondos A" rows={funds.slice(0, 6)} /></Grid.Col>
      <Grid.Col width={12} lg={6}><SelectionExample title="Selección de fondos B" rows={funds.slice(6)} /></Grid.Col>
    </Grid.Row>
  </>
}
