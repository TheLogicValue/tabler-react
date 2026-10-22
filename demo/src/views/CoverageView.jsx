import React from 'react'
import { Alert, Badge, Grid, Table } from 'tabler-react'
import usage from '../usage.json'
import { testedComponents } from '../data.js'
import { Scenario } from '../shared.jsx'

const checks = [
  ['Tablas y datos', 'Buscar un fondo, ordenar ESG, filtrar una columna, paginar, seleccionar una fila y descargar CSV.'],
  ['Formularios y fechas', 'Editar el nombre, buscar una clasificación, abrir el calendario, guardar, probar una fecha inválida y restablecer.'],
  ['Interacciones', 'Confirmar y cancelar el modal, usar los dos estilos de menú, probar los controles de tarjeta y cabecera con Intro/Espacio sin enviar el formulario, alternar ambas variantes de pestañas y entrar con/sin permiso.'],
  ['Gráficos y estados', 'Cambiar periodo, revisar tooltips/leyendas y alternar carga, vacío, error y reintento.'],
]

export default function CoverageView() {
  return <>
    <Alert type="info">La presencia de un componente en la demo indica cobertura del ejemplo, no que todas sus variantes o todos los flujos de un consumidor estén certificados.</Alert>
    <Grid.Row><Grid.Col lg={7}><Scenario title="Cobertura de componentes" description={`Referencia del ${usage.analyzedOn}: ${usage.files} archivos de un consumidor. Se cuenta cada componente una vez por archivo importador; se excluyen los tests.`} components={['Table', 'Badge']}>
      <Table responsive striped><Table.Header><Table.Row><Table.ColHeader>Componente / hook</Table.ColHeader><Table.ColHeader>Archivos</Table.ColHeader><Table.ColHeader>En la demo</Table.ColHeader></Table.Row></Table.Header>
        <Table.Body>{usage.components.map(({ name, files }) => <Table.Row key={name}><Table.Col><code>{name}</code></Table.Col><Table.Col>{files}</Table.Col><Table.Col><Badge color={testedComponents.includes(name) ? 'success' : 'secondary'}>{testedComponents.includes(name) ? 'Incluido' : 'Pendiente'}</Badge></Table.Col></Table.Row>)}</Table.Body>
      </Table>
    </Scenario></Grid.Col><Grid.Col lg={5}>
      <Scenario title="Guion de comprobación" description="Repite este recorrido después de actualizar dependencias o recompilar la biblioteca." components={[]}>
        <ol className="test-plan">{checks.map(([title, text]) => <li key={title}><strong>{title}</strong><p>{text}</p></li>)}</ol>
        <p className="muted">La demo no utiliza API, autenticación ni datos reales de ningún consumidor. AG Grid usa únicamente Community. Accordion se añade como prueba adicional.</p>
      </Scenario>
    </Grid.Col></Grid.Row>
  </>
}
