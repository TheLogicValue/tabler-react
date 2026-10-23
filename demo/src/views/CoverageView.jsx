import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Badge, Table } from 'tabler-react'
import usage from '../usage.json'
import catalog from '../library-exports.json'
import documentation from '../component-docs-index.json'
import { componentExamplePaths } from '../data.js'
import { Scenario } from '../shared.jsx'

const checks = [
  ['Tablas y datos', 'Buscar un fondo, ordenar ESG, filtrar una columna, paginar, seleccionar una fila y descargar CSV.'],
  ['Formularios y fechas', 'Editar el nombre, buscar una clasificación, abrir el calendario, guardar, probar una fecha inválida y restablecer.'],
  ['Interacciones', 'Confirmar y cancelar el modal; abrir ModalDoc con dos pestañas y una sección, confirmar su lectura y cerrar con X o Escape. Mostrar ModalSplash, cerrarlo manualmente y probar el cierre automático. Usar ambos estilos de menú, Button.Dropdown y el disparador personalizado; probar las posiciones y ayudas con ratón/Tab, Escape, clic fuera, scroll y redimensionado. Abrir los submenús horizontal y vertical. Probar controles sin enviar el formulario, pestañas y rutas con/sin permiso.'],
  ['Gráficos y estados', 'Cambiar periodo y comprobar los dos valores de DoubleCard y las cinco dimensiones de RadarChart. Revisar tooltips/leyendas y alternar carga, vacío, error y reintento; en Cargando debe aparecer también PieChartLoader.'],
]

export default function CoverageView() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [docStatus, setDocStatus] = useState('all')
  const included = catalog.exports.filter(({ name }) => componentExamplePaths[name]).length
  const documented = catalog.exports.filter(({ name }) => documentation[name]?.status === 'documented').length
  const usageCounts = new Map(usage.components.map(({ name, files }) => [name, files]))
  const rows = catalog.exports.filter(({ name }) => {
    const covered = Boolean(componentExamplePaths[name])
    return name.toLowerCase().includes(search.trim().toLowerCase()) &&
      (status === 'all' || (status === 'covered' ? covered : !covered)) &&
      (docStatus === 'all' || (docStatus === 'documented' ? documentation[name]?.status === 'documented' : documentation[name]?.status !== 'documented'))
  })
  return <>
    <Alert type="info">La presencia de un componente en la demo indica cobertura del ejemplo, no que todas sus variantes o todos los flujos de un consumidor estén certificados.</Alert>
    <p><strong>{included} de {catalog.exports.length} exports públicos con ejemplo · {catalog.exports.length - included} sin cubrir.</strong> Usa «Ver ejemplo» para abrir una demostración existente.</p>
    <p><strong>{documented} fichas con guía de uso y API.</strong> La documentación se puede consultar aunque el componente no tenga un ejemplo visual.</p>
    <Scenario title="Cobertura de componentes" description="Catálogo completo de las exportaciones de src/index.ts: componentes, plantillas, proveedor, hooks y utilidades. Los subcomponentes, como Card.Header o Grid.Col, se agrupan bajo su componente principal. Los exports sin un ejemplo propio se marcan como Sin cubrir." components={['Table', 'Badge']}>
      <div className="filter-row coverage-filters">
        <label className="filter-label">Buscar por nombre<input className="form-control" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Por ejemplo: Avatar" /></label>
        <label className="filter-label">Estado<select className="form-control" value={status} onChange={event => setStatus(event.target.value)}><option value="all">Todos</option><option value="covered">Con ejemplo</option><option value="pending">Sin cubrir</option></select></label>
        <label className="filter-label">Documentación<select className="form-control" value={docStatus} onChange={event => setDocStatus(event.target.value)}><option value="all">Todas las fichas</option><option value="documented">Guía y API</option><option value="api">Solo API / guía pendiente</option></select></label>
      </div>
      <p className="muted">Mostrando {rows.length} de {catalog.exports.length} exports. «Archivos de referencia» mide importaciones en {usage.files} archivos de un consumidor, analizados el {usage.analyzedOn}; no determina la cobertura. Un 0 indica que no se observó en esa muestra.</p>
      <Table responsive striped><Table.Header><Table.Row><Table.ColHeader>Export público</Table.ColHeader><Table.ColHeader>Tipo</Table.ColHeader><Table.ColHeader>Archivos de referencia</Table.ColHeader><Table.ColHeader>En la demo</Table.ColHeader><Table.ColHeader>Ejemplo</Table.ColHeader><Table.ColHeader>Documentación</Table.ColHeader></Table.Row></Table.Header>
        <Table.Body>{rows.map(({ name, kind }) => <Table.Row key={name}><Table.Col><code>{name}</code></Table.Col><Table.Col>{kind}</Table.Col><Table.Col>{usageCounts.get(name) ?? 0}</Table.Col><Table.Col><Badge color={componentExamplePaths[name] ? 'success' : 'secondary'}>{componentExamplePaths[name] ? 'Con ejemplo' : 'Sin cubrir'}</Badge></Table.Col><Table.Col>{componentExamplePaths[name] ? <Link to={componentExamplePaths[name]} aria-label={`Ver ejemplo de ${name}`}>Ver ejemplo</Link> : 'Sin ejemplo'}</Table.Col><Table.Col><div className="coverage-doc-link"><Badge color={documentation[name]?.status === 'documented' ? 'success' : 'secondary'}>{documentation[name]?.status === 'documented' ? 'Guía y API' : 'API'}</Badge><Link to={'/documentacion/' + name} aria-label={'Ver ficha de ' + name}>Ver ficha</Link></div></Table.Col></Table.Row>)}</Table.Body>
      </Table>
      {rows.length === 0 && <p role="status">No hay exports que coincidan con estos filtros.</p>}
    </Scenario>
      <Scenario title="Guion de comprobación" description="Repite este recorrido después de actualizar dependencias o recompilar la biblioteca." components={[]}>
        <ol className="test-plan">{checks.map(([title, text]) => <li key={title}><strong>{title}</strong><p>{text}</p></li>)}</ol>
        <p className="muted">La demo no utiliza API, autenticación ni datos reales de ningún consumidor. AG Grid usa únicamente Community. Accordion se añade como prueba adicional.</p>
      </Scenario>
  </>
}
