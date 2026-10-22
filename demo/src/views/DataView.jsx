import React, { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-balham.css'
import { AGGridTable, Badge, Form, Tab, Table, Tabs } from 'tabler-react'
import { funds } from '../data.js'
import { Result, Scenario } from '../shared.jsx'

function SimpleTable({ rows }) {
  return <Table responsive striped highlightRowOnHover>
    <Table.Header><Table.Row>{['Fondo ficticio', 'Clasificación', 'Puntuación ESG', 'Cobertura'].map(name => <Table.ColHeader key={name}>{name}</Table.ColHeader>)}</Table.Row></Table.Header>
    <Table.Body>{rows.map(row => <Table.Row key={row.id}><Table.Col>{row.name}</Table.Col><Table.Col>{row.category}</Table.Col><Table.Col>{row.score}</Table.Col><Table.Col>{row.coverage}%</Table.Col></Table.Row>)}</Table.Body>
  </Table>
}

export default function DataView() {
  const [category, setCategory] = useState('Todas')
  const [selected, setSelected] = useState(null)
  const [headerHelp, setHeaderHelp] = useState(false)
  const rows = useMemo(() => funds.filter(row => category === 'Todas' || row.category === category), [category])
  const columns = useMemo(() => [
    { header: 'Fondo ficticio', item: 'name', minWidth: 180 },
    { header: 'Clasificación', item: 'category', minWidth: 130 },
    { header: 'Puntuación ESG', item: 'score', filter: 'agNumberColumnFilter', minWidth: 140 },
    { header: 'Cobertura', item: 'coverage', filter: 'agNumberColumnFilter', minWidth: 120, valueFormatter: p => `${p.value}%` },
    { header: 'Patrimonio (M€)', item: 'assets', filter: 'agNumberColumnFilter', minWidth: 150 },
  ], [])
  return <>
    <Scenario title="Explorador de fondos" description="Escribe en Buscar, ordena una columna, abre su filtro y selecciona una fila. El icono de descarga genera un CSV con los datos visibles." components={['AGGridTable', 'Form', 'Table', 'Tabs', 'Tab']}>
      <div className="filter-row"><label className="filter-label">Clasificación
        <Form.Select name="category" value={category} onChange={e => { setCategory(e.target.value); setSelected(null) }}>
          {['Todas', 'Artículo 6', 'Artículo 8', 'Artículo 9'].map(value => <option key={value}>{value}</option>)}
        </Form.Select>
      </label><Badge color="secondary">{rows.length} registros ficticios</Badge></div>
      <Form.Group><Form.Checkbox name="headerHelp" label="Mostrar ayuda en las cabeceras" checked={headerHelp} onChange={e => setHeaderHelp(e.target.checked)} /></Form.Group>
      <Tabs initialTab="AG Grid Community">
        <Tab title="AG Grid Community"><div className="grid-demo">
          <AGGridTable AgGridReact={AgGridReact} dataRow={rows} dataColumn={columns}
            autoHeaderTooltip={headerHelp} enableBrowserTooltips
            search downloadCSV textFileCSV="fondos-demo.csv" pageSize={5}
            paginationPageSizeSelector={[5, 10, 20]}
            defaultColDef={{ sortable: true, filter: true, resizable: true }}
            rowSelection={{ mode: 'singleRow', enableClickSelection: true, checkboxes: false }}
            onRowClick={setSelected} getRowId={p => p.data.id} />
        </div></Tab>
        <Tab title="Table de Tabler"><SimpleTable rows={rows} /></Tab>
      </Tabs>
      <Result>{selected ? <>Fila seleccionada: <strong>{selected.name}</strong> · ESG {selected.score} · Cobertura {selected.coverage}%</> : 'Selecciona una fila para comprobar el callback onRowClick.'}</Result>
    </Scenario>
    <div className="demo-note"><strong>Community:</strong> esta demo no importa ag-grid-enterprise ni utiliza filtros o funciones que requieran licencia.</div>
  </>
}
