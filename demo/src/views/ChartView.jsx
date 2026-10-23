import React, { useState } from 'react'
import { Alert, BarChart, Button, DoubleCard, Form, Grid, LineChart, LoaderNoData, LoaderZone, PieChart, PieChartLoader, RadarChart, Spinner, TableLoader } from 'tabler-react'
import { Result, Scenario, ScenarioBoundary } from '../shared.jsx'

const colors = ['#3676c8', '#21a48a', '#e5ae45']
const minMax = (value, boundary) => boundary === 'min' ? 0 : Math.ceil(value.max / 10) * 10
const formatter = value => `${value}%`
const radarDimensions = ['Ambiental', 'Social', 'Gobierno', 'Transparencia', 'Cobertura']

function Charts({ period }) {
  const data = period === '2026' ? [61, 68, 72, 79, 85, 94] : [48, 54, 60, 66, 72, 81]
  const profile = period === '2026' ? [94, 87, 91, 82, 94] : [81, 76, 79, 70, 81]
  return <>
    <Grid.Row className="demo-card-row"><Grid.Col width={12} lg={5}>
    <Scenario className="comparison-scenario" title="Resumen comparativo con DoubleCard" description="Cambia el periodo para actualizar los dos valores de la tarjeta y sus etiquetas. La tarjeta utiliza también su contenido adicional para explicar la comparación." components={['DoubleCard']}>
      <DoubleCard className="demo-comparison-card" title={`Cobertura al cierre de ${period}`} firstValue={`${data.at(-1)}%`} firstlabel="Cartera de prueba"
        secondValue={period === '2026' ? '80%' : '68%'} secondlabel="Referencia" classColorValue="success">
        <p className="muted demo-double-card-note">Comparación ficticia entre la cartera y su referencia para el periodo seleccionado.</p>
      </DoubleCard>
    </Scenario>
    </Grid.Col><Grid.Col width={12} lg={7}>
    <Scenario title="Perfil de indicadores con RadarChart" description="Compara las cinco dimensiones, cambia el periodo y oculta o muestra una serie desde la leyenda. Pasa el cursor sobre el perfil para revisar sus valores." components={['RadarChart']}>
      <div className="demo-radar-chart"><RadarChart series={[profile, [80, 82, 85, 78, 80]]} seriesDataName={['Cartera', 'Referencia']}
        indicator={radarDimensions.map(name => ({ name, max: 100 }))} colors={colors} complete height="300px"
        tooltipFormatter={item => `${item.marker}${item.name}<br/>${radarDimensions.map((name, index) => `${name}: ${item.value[index]}%`).join('<br/>')}`} /></div>
      <Result>Perfil de la cartera en {period}: {radarDimensions.map((name, index) => `${name}: ${profile[index]}%`).join(' · ')}.</Result>
    </Scenario>
    </Grid.Col></Grid.Row>
    <Scenario title="Evolución de la cobertura" description="Cambia el periodo y pasa el cursor por los puntos para probar el tooltip. La leyenda permite mostrar u ocultar series." components={['LineChart']}>
      <LineChart lines={[{ name: 'Cartera', data, color: colors[0] }, { name: 'Referencia', data: [55, 59, 64, 68, 73, 80], color: colors[1] }]}
        height="290px" complete selectedOptions={['Cartera', 'Referencia']} getLegend={{ Cartera: true, Referencia: true }}
        xAxisData={['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']} yAxisMinInterval={10} yAxisFormatter={formatter} yAxisMinMax={minMax}
        tooltipFormatter={items => items.map(item => `${item.marker}${item.seriesName}: ${item.value}%`).join('<br/>')} />
    </Scenario>
    <Grid.Row className="demo-card-row"><Grid.Col width={12} lg={6}><Scenario title="Cobertura por dimensión" description="Barras comparativas con el adaptador de ECharts de la biblioteca." components={['BarChart']}>
      <BarChart series={[period === '2026' ? [94, 87, 91] : [81, 76, 79]]} seriesName={['Cartera']} xAxisData={['Ambiental', 'Social', 'Gobierno']} colors={colors} complete height="270px" yAxisFormatter={formatter} yAxisMinMax={minMax} tooltipFormatter={item => `${item.name}: ${item.value}%`} />
    </Scenario></Grid.Col><Grid.Col width={12} lg={6}><Scenario title="Distribución de la cartera" description="Gráfico circular con leyenda y tooltip interactivos." components={['PieChart']}>
      <PieChart series={[3, 5, 4]} seriesDataName={['Artículo 6', 'Artículo 8', 'Artículo 9']} colors={colors} complete height="270px" tooltipFormatter={item => `${item.name}: ${item.value} fondos (${item.percent}%)`} />
    </Scenario></Grid.Col></Grid.Row>
  </>
}

export default function ChartView() {
  const [state, setState] = useState('ready')
  const [period, setPeriod] = useState('2026')
  return <>
    <div className="chart-controls"><label className="filter-label">Periodo<Form.Select value={period} onChange={e => setPeriod(e.target.value)}><option>2026</option><option>2025</option></Form.Select></label>
      <div className="action-row" aria-label="Estado del ejemplo">{[['ready', 'Con datos'], ['loading', 'Cargando'], ['empty', 'Sin datos'], ['error', 'Error simulado']].map(([value, label]) => <Button type="button" key={value} color={state === value ? 'primary' : 'secondary'} onClick={() => setState(value)}>{label}</Button>)}</div>
    </div>
    {state === 'ready' && <ScenarioBoundary><Charts period={period} /></ScenarioBoundary>}
    {state === 'loading' && <Scenario title="Estado de carga" description="El estado permanece visible hasta que elijas otro, para facilitar la revisión visual. El esqueleto circular representa la carga del gráfico y su leyenda." components={['TableLoader', 'PieChartLoader', 'LoaderZone', 'Spinner']}>
      <div className="loading-line"><Spinner /><span>Cargando datos ficticios…</span></div><LoaderZone width="100%" height="3rem" title="Cargando resumen" />
      <Grid.Row><Grid.Col width={12} lg={7}><div className="table-loader"><TableLoader title="Cargando tabla" /></div></Grid.Col>
        <Grid.Col width={12} lg={5}><div className="pie-chart-loader"><PieChartLoader uniqueKey="demo-pie-loader" title="Cargando gráfico circular" /></div></Grid.Col></Grid.Row>
    </Scenario>}
    {state === 'empty' && <Scenario title="Estado sin datos" description="Comprueba el mensaje vacío y vuelve a Con datos para recuperar los gráficos." components={['LoaderNoData']}><LoaderNoData height="260px" title="No hay datos para los filtros seleccionados." /></Scenario>}
    {state === 'error' && <Scenario title="Recuperación de un error" description="Este error es intencional y no realiza peticiones de red." components={['Alert', 'Button']}><Alert type="danger">No se ha podido cargar la información ficticia.</Alert><Button color="primary" type="button" onClick={() => setState('ready')}>Reintentar carga</Button><Result>Reintentar debe recuperar los gráficos.</Result></Scenario>}
  </>
}
