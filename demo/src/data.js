// All records are synthetic and independent of any backend or real data.
export const funds = [
  { id: 'DEMO-001', name: 'Atlas Global', category: 'Artículo 8', score: 7.8, coverage: 94, assets: 128 },
  { id: 'DEMO-002', name: 'Brisa Sostenible', category: 'Artículo 9', score: 8.6, coverage: 98, assets: 86 },
  { id: 'DEMO-003', name: 'Cedro Europa', category: 'Artículo 8', score: 6.9, coverage: 87, assets: 164 },
  { id: 'DEMO-004', name: 'Delta Transición', category: 'Artículo 9', score: 8.1, coverage: 96, assets: 73 },
  { id: 'DEMO-005', name: 'Eclipse Mixto', category: 'Artículo 6', score: 5.3, coverage: 72, assets: 112 },
  { id: 'DEMO-006', name: 'Faro Climático', category: 'Artículo 9', score: 8.9, coverage: 99, assets: 95 },
  { id: 'DEMO-007', name: 'Horizonte Renta', category: 'Artículo 8', score: 7.1, coverage: 91, assets: 204 },
  { id: 'DEMO-008', name: 'Ítaca Flexible', category: 'Artículo 6', score: 5.8, coverage: 78, assets: 68 },
  { id: 'DEMO-009', name: 'Junco Impacto', category: 'Artículo 9', score: 8.4, coverage: 97, assets: 57 },
  { id: 'DEMO-010', name: 'Luna Patrimonio', category: 'Artículo 8', score: 7.4, coverage: 90, assets: 143 },
  { id: 'DEMO-011', name: 'Marea Dinámica', category: 'Artículo 8', score: 6.5, coverage: 84, assets: 91 },
  { id: 'DEMO-012', name: 'Norte Equilibrio', category: 'Artículo 6', score: 5.9, coverage: 80, assets: 105 },
]

const exampleComponents = {
  '/': ['Grid', 'Button', 'Card', 'Page', 'Text', 'Icon', 'NavBarMenu', 'Badge'],
  '/datos': ['Table', 'AGGridTable'],
  '/formulario': ['Form', 'DatePicker'],
  '/interacciones': ['Tab', 'Modal', 'Tabs', 'useModal', 'useTabs', 'Dropdown', 'ProtectedRoute', 'Site', 'Tooltip', 'Nav', 'ModalDoc', 'ModalSplash', 'Accordion'],
  '/graficos': ['TableLoader', 'LoaderZone', 'LoaderNoData', 'Spinner', 'BarChart', 'Alert', 'LineChart', 'PieChart', 'DoubleCard', 'PieChartLoader', 'RadarChart'],
}

export const componentExamplePaths = Object.fromEntries(Object.entries(exampleComponents)
  .flatMap(([path, components]) => components.map(name => [name, path])))
export const testedComponents = Object.keys(componentExamplePaths)

export const categoryOptions = ['Artículo 6', 'Artículo 8', 'Artículo 9'].map(value => ({ value, label: value }))
