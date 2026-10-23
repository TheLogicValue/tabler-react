import React, { Suspense, lazy } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Badge, Button, Card, Grid, Icon, NavBarMenu, Page, Spinner, Text } from 'tabler-react'
import usage from './usage.json'
import catalog from './library-exports.json'
import documentationDates from '../docs/metadata.json'
import { testedComponents } from './data.js'
import { ComponentList, ScenarioBoundary } from './shared.jsx'

const DataView = lazy(() => import('./views/DataView.jsx'))
const FormView = lazy(() => import('./views/FormView.jsx'))
const InteractionView = lazy(() => import('./views/InteractionView.jsx'))
const ChartView = lazy(() => import('./views/ChartView.jsx'))
const CoverageView = lazy(() => import('./views/CoverageView.jsx'))
const DocumentationView = lazy(() => import('./views/DocumentationView.jsx'))

const pages = [
  { to: '/', value: 'Resumen', icon: 'grid', description: 'Los componentes de Tabler, en un entorno de prueba independiente.' },
  { to: '/datos', value: 'Tablas y datos', icon: 'list', description: 'Búsqueda, filtros, ordenación, selección y exportación con AG Grid Community.' },
  { to: '/formulario', value: 'Formularios y fechas', icon: 'edit-3', description: 'Campos controlados, react-select, calendario y validación.' },
  { to: '/interacciones', value: 'Interacciones', icon: 'sliders', description: 'Modales, pestañas, menús y permisos de navegación.' },
  { to: '/graficos', value: 'Gráficos y estados', icon: 'bar-chart-2', description: 'ECharts, carga, ausencia de datos y recuperación de errores.' },
  { to: '/documentacion', value: 'Documentación', icon: 'book-open', description: 'Guías de uso, propiedades, callbacks y código de los componentes.' },
  { to: '/cobertura', value: 'Cobertura de componentes', icon: 'check-square', description: 'Qué componentes se incluyen y cómo repetir las comprobaciones.' },
]

const navigationItems = [
  { ...pages[0], LinkComponent: true },
  { value: 'Componentes', icon: 'layers', subItems: pages.slice(1, 4).map(page => ({ ...page, LinkComponent: true })) },
  ...pages.slice(4).map(page => ({ ...page, LinkComponent: true })),
]

function Overview() {
  return <>
    <div className="intro-panel">
      <div><span className="eyebrow">COMPONENTES EN ACCIÓN</span>
        <h2>Prueba los flujos que ya utilizas.</h2>
        <p>Una cartera ficticia para comprobar la biblioteca local: consulta datos, cambia filtros, edita una configuración y abre sus gráficos.</p>
        <div className="action-row"><Link className="btn btn-primary" to="/datos">Explorar tablas <Icon name="arrow-right" /></Link><Link className="btn btn-secondary" to="/cobertura">Ver cobertura</Link></div>
      </div>
      <div className="intro-diagram" aria-label="Flujo de la demo">
        <div><Icon name="package" /><strong>Tabler</strong><small>Biblioteca local</small></div>
        <span className="diagram-arrow">→</span>
        <div><Icon name="monitor" /><strong>Demo Tabler</strong><small>Consumidor Vite 7</small></div>
      </div>
    </div>
    <Grid.Row className="demo-card-row">
      {[
        [usage.files, 'archivos del consumidor de referencia', 'layers'],
        [`${testedComponents.length} / ${catalog.exports.length}`, 'exports públicos con ejemplo', 'check-circle'],
        ['Community', 'AG Grid sin licencia Enterprise', 'database'],
        ['Sin API', 'datos ficticios y cambios locales', 'shield'],
      ].map(([number, label, icon]) => <Grid.Col key={label} width={12} sm={6} lg={3}>
        <Card className="metric-card"><Card.Body><Icon name={icon} /><strong>{number}</strong><span>{label}</span></Card.Body></Card>
      </Grid.Col>)}
    </Grid.Row>
    <Grid.Row className="demo-card-row">
      <Grid.Col width={12} lg={8}>
        <Card className="journey-card" title="Recorrido recomendado"><Card.Body>
          <div className="journey-list">{pages.slice(1, 5).map((page, i) => <Link key={page.to} to={page.to}>
            <span className="journey-number">0{i + 1}</span><div><strong>{page.value}</strong><p>{page.description}</p></div><Icon name="arrow-up-right" />
          </Link>)}</div>
        </Card.Body></Card>
      </Grid.Col>
      <Grid.Col width={12} lg={4}>
        <Card title="Los más utilizados"><Card.Body>
          <p className="muted">Archivos que los importan en el consumidor de referencia.</p>
          {usage.components.slice(0, 7).map(({ name, files }) => <div className="usage-row" key={name}>
            <div><span>{name}</span><strong>{files}</strong></div><div className="usage-track"><span style={{ width: `${files / 75 * 100}%` }} /></div>
          </div>)}
        </Card.Body></Card>
      </Grid.Col>
    </Grid.Row>
    <Card title="Qué estás comprobando"><Card.Body>
      <Text>Los ejemplos importan la salida compilada de la biblioteca. Así se prueban sus exports, estilos, fuentes y dependencias compartidas como en un consumidor.</Text>
      <ComponentList names={['Page', 'Grid', 'Card', 'Button', 'Text', 'Icon', 'NavBarMenu']} />
      <Button color="secondary" type="button" onClick={() => window.location.reload()}>Reiniciar la demo</Button>
    </Card.Body></Card>
  </>
}

export default function App() {
  const { pathname } = useLocation()
  const current = pages.find(page => page.to === pathname || (page.to !== '/' && pathname.startsWith(`${page.to}/`))) || pages[0]
  const updatedOn = current.to === '/documentacion' ? documentationDates.documentationUpdatedOn
    : current.to === '/cobertura' ? documentationDates.coverageUpdatedOn : null
  return <Page className="demo-shell">
    <header className="demo-header"><div className="demo-container demo-header-inner">
      <Link to="/" className="brand"><span className="brand-mark">t.</span><span>tabler<span className="brand-divider">/</span><strong>laboratorio tabler</strong></span></Link>
      <div className="build-tags"><span className="local-dot" />Biblioteca {__LIBRARY_VERSION__}<Badge color="secondary">Vite {__DEMO_VITE_VERSION__}</Badge></div>
    </div></header>
    <nav className="demo-nav" aria-label="Ejemplos de componentes"><div className="demo-container"><NavBarMenu items={navigationItems} /></div></nav>
    <main><Page.Content title={current.value} subTitle={current.description} options={updatedOn && <span className="demo-updated-on">Última actualización: <time dateTime={updatedOn}>{updatedOn.split('-').reverse().join('/')}</time></span>}>
      <ScenarioBoundary key={current.to}>
        <Suspense fallback={<div className="route-loading"><Spinner /> Preparando ejemplo…</div>}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/datos" element={<DataView />} />
            <Route path="/formulario" element={<FormView />} />
            <Route path="/interacciones/*" element={<InteractionView />} />
            <Route path="/graficos" element={<ChartView />} />
            <Route path="/cobertura" element={<CoverageView />} />
            <Route path="/documentacion" element={<DocumentationView />} />
            <Route path="/documentacion/:name" element={<DocumentationView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ScenarioBoundary>
    </Page.Content></main>
    <footer className="demo-container demo-footer"><span>Datos ficticios · Sin conexión a una API · Sin persistencia</span><span>Biblioteca y demo con compilaciones independientes</span></footer>
  </Page>
}
