import React from 'react'
import { Link } from 'react-router-dom'
import { Alert, Badge, Table } from 'tabler-react'
import usage from '../usage.json'
import { componentExamplePaths, testedComponents } from '../data.js'
import { Scenario } from '../shared.jsx'

const checks = [
  ['Tablas y datos', 'Buscar un fondo, ordenar ESG, filtrar una columna, paginar, seleccionar una fila y descargar CSV.'],
  ['Formularios y fechas', 'Editar el nombre, buscar una clasificación, abrir el calendario, guardar, probar una fecha inválida y restablecer.'],
  ['Interacciones', 'Confirmar y cancelar el modal; abrir ModalDoc con dos pestañas y una sección, confirmar su lectura y cerrar con X o Escape. Mostrar ModalSplash, cerrarlo manualmente y probar el cierre automático. Usar ambos estilos de menú, Button.Dropdown y el disparador personalizado; probar las posiciones y ayudas con ratón/Tab, Escape, clic fuera, scroll y redimensionado. Abrir los submenús horizontal y vertical. Probar controles sin enviar el formulario, pestañas y rutas con/sin permiso.'],
  ['Gráficos y estados', 'Cambiar periodo y comprobar los dos valores de DoubleCard y las cinco dimensiones de RadarChart. Revisar tooltips/leyendas y alternar carga, vacío, error y reintento; en Cargando debe aparecer también PieChartLoader.'],
]

export default function CoverageView() {
  const included = usage.components.filter(({ name }) => testedComponents.includes(name)).length
  return <>
    <Alert type="info">La presencia de un componente en la demo indica cobertura del ejemplo, no que todas sus variantes o todos los flujos de un consumidor estén certificados.</Alert>
    <p><strong>{included} de {usage.components.length} componentes y hooks del inventario incluidos.</strong> Usa «Ver ejemplo» para abrir la página donde puedes probar cada uno.</p>
    <Scenario title="Cobertura de componentes" description={`Referencia del ${usage.analyzedOn}: ${usage.files} archivos de un consumidor. Se cuenta cada componente una vez por archivo importador; se excluyen los tests.`} components={['Table', 'Badge']}>
      <Table responsive striped><Table.Header><Table.Row><Table.ColHeader>Componente / hook</Table.ColHeader><Table.ColHeader>Archivos</Table.ColHeader><Table.ColHeader>En la demo</Table.ColHeader><Table.ColHeader>Ejemplo</Table.ColHeader></Table.Row></Table.Header>
        <Table.Body>{usage.components.map(({ name, files }) => <Table.Row key={name}><Table.Col><code>{name}</code></Table.Col><Table.Col>{files}</Table.Col><Table.Col><Badge color={testedComponents.includes(name) ? 'success' : 'secondary'}>{testedComponents.includes(name) ? 'Incluido' : 'Pendiente'}</Badge></Table.Col><Table.Col>{componentExamplePaths[name] && <Link to={componentExamplePaths[name]} aria-label={`Ver ejemplo de ${name}`}>Ver ejemplo</Link>}</Table.Col></Table.Row>)}</Table.Body>
      </Table>
    </Scenario>
      <Scenario title="Guion de comprobación" description="Repite este recorrido después de actualizar dependencias o recompilar la biblioteca." components={[]}>
        <ol className="test-plan">{checks.map(([title, text]) => <li key={title}><strong>{title}</strong><p>{text}</p></li>)}</ol>
        <p className="muted">La demo no utiliza API, autenticación ni datos reales de ningún consumidor. AG Grid usa únicamente Community. Accordion se añade como prueba adicional.</p>
      </Scenario>
  </>
}
