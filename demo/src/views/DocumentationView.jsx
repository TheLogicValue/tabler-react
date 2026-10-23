import React, { lazy, Suspense, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, Badge, Table } from 'tabler-react'
import documents from '../component-docs-index.json'
import { componentExamplePaths } from '../data.js'
import { Scenario } from '../shared.jsx'
import Markdown, { CodeBlock } from '../docs/Markdown.jsx'
import Playground from '../docs/Playground.jsx'
import { propDescriptions } from '../docs/prop-descriptions.js'

const loaders = import.meta.glob('../docs/generated/*.json', { import: 'default' })
const pages = Object.fromEntries(Object.entries(loaders).map(([path, load]) => [path.split('/').at(-1).slice(0, -5), lazy(async () => {
  const doc = await load()
  return { default: function DocumentationPage() { return <DocDetail doc={doc} /> } }
})]))

function DocIndex() {
  const [search, setSearch] = useState('')
  const entries = Object.values(documents).filter(item => item.name.toLowerCase().includes(search.trim().toLowerCase()))
  return <Scenario title="Fichas de la biblioteca" description="Consulta el uso, la API actual, los subcomponentes y los ejemplos. Documentar un componente y disponer de una demostración visual son estados independientes." components={[]}>
    <label className="filter-label">Buscar ficha<input className="form-control" type="search" placeholder="Por ejemplo: DatePicker" value={search} onChange={event => setSearch(event.target.value)} /></label>
    <p className="muted docs-index-count">{entries.length} de {Object.keys(documents).length} fichas.</p>
    <div className="docs-index">{entries.map(item => <Link key={item.name} to={'/documentacion/' + item.name} className="docs-index-entry"><strong>{item.name}</strong><span>{item.summary}</span><small>{item.kind} · {componentExamplePaths[item.name] ? 'Con ejemplo visual' : 'Sin ejemplo visual'}</small></Link>)}</div>
    {entries.length === 0 && <p role="status">No hay fichas que coincidan con la búsqueda.</p>}
  </Scenario>
}

export default function DocumentationView() {
  const { name } = useParams()
  if (!name) return <DocIndex />
  const Document = Object.hasOwn(documents, name) ? pages[name] : null
  if (!Document) return <Alert type="warning">No existe una ficha para este nombre. <Link to="/documentacion">Volver al catálogo</Link></Alert>
  return <Suspense fallback={<p role="status">Cargando ficha…</p>}><Document /></Suspense>
}

function DocDetail({ doc }) {
  const { name } = doc
  const guide = doc.guide
  return <div className="component-documentation">
    <div className="docs-navigation"><Link to="/documentacion">← Todas las fichas</Link><Link to="/cobertura">Ver cobertura</Link>{componentExamplePaths[name] && <Link to={componentExamplePaths[name]}>Abrir ejemplo visual</Link>}</div>
    <Scenario title={name} description={guide?.summary ?? 'Referencia de la API actual. La guía de comportamiento está pendiente de redacción.'} components={[]}>
      <div className="action-row"><Badge color={guide ? 'success' : 'secondary'}>{guide ? 'Guía y API' : 'API disponible'}</Badge><Badge color={componentExamplePaths[name] ? 'success' : 'secondary'}>{componentExamplePaths[name] ? 'Con ejemplo visual' : 'Sin ejemplo visual'}</Badge><span className="muted">{doc.kind}</span></div>
      {doc.dependencies.length > 0 && <section className="docs-integration"><h3>Versiones de integración</h3><p className="muted">Versiones fijadas en los package-lock.json de la biblioteca y la demo al generar esta ficha. npm ci instala esas versiones; cada consumidor mantiene su propio lock y debe respetar los rangos declarados.</p><Table responsive striped><Table.Header><Table.Row>{['Paquete', 'Uso', 'Rango biblioteca', 'Lock biblioteca', 'Demo (lock)'].map(title => <Table.ColHeader key={title}>{title}</Table.ColHeader>)}</Table.Row></Table.Header><Table.Body>{doc.dependencies.map(item => <Table.Row key={item.name}><Table.Col><code>{item.name}</code></Table.Col><Table.Col>{item.role}</Table.Col><Table.Col><code>{item.libraryRange}</code></Table.Col><Table.Col>{item.libraryVersion ?? 'Sin instalar'}</Table.Col><Table.Col>{item.demoVersion ?? 'No instalado'}</Table.Col></Table.Row>)}</Table.Body></Table>{name.startsWith('AGGrid') ? <p>La demo utiliza AG Grid Community; no instala ni registra Enterprise. El consumidor aporta AgGridReact y configura los módulos, las opciones y la licencia cuando utilice funciones Enterprise.</p> : <p>La demo utiliza un motor modular de ECharts, configurado en demo/src/echarts-engine.js. El consumidor puede definir su propia configuración; los componentes reciben los datos y las opciones descritos en esta ficha.</p>}</section>}
      <CodeBlock code={'import { ' + name + ' } from "tabler-react";\nimport "tabler-react/style.css";'} language="js" />
      {guide && <><h3>Cómo funciona</h3><ul className="docs-behavior">{guide.behavior.map((item, index) => <li key={index}>{item}</li>)}</ul><h3>Uso</h3><p className="muted">Los fragmentos muestran la integración. Importa también los hooks de React y los componentes auxiliares utilizados; valores y handlers corresponden al estado y la lógica de tu aplicación.</p><CodeBlock code={guide.example} /></>}
      {guide?.examples?.map(example => <section key={example.title} className="docs-additional-example"><h3>{example.title}</h3><p className="muted">{example.description}</p><CodeBlock code={example.code} /></section>)}
      {['Button', 'Tooltip', 'DatePicker'].includes(name) && <section className="docs-playground"><h3>Prueba las propiedades</h3><p className="muted">Modifica los controles, comprueba el resultado y consulta el código actualizado.</p><Playground key={name} name={name} /></section>}
    </Scenario>
    <Scenario title={doc.kind === 'Utilidad' ? 'Firma y parámetros' : 'Propiedades'} description="Referencia extraída de la implementación actual y sus anotaciones Flow. Los valores indicados son los declarados en el código; las anotaciones heredadas pueden no cubrir todas las variantes. Las funciones y las referencias se explican también en la guía." components={[]}>
      {guide?.parameters && <CodeBlock code={guide.parameters} language="js" />}
      {doc.props.length ? <Table responsive striped><Table.Header><Table.Row>{['Propiedad', 'Tipo declarado', 'Requisito', 'Predeterminado', 'Descripción'].map(title => <Table.ColHeader key={title}>{title}</Table.ColHeader>)}</Table.Row></Table.Header><Table.Body>{doc.props.map(prop => <Table.Row key={prop.name}><Table.Col><code>{prop.name}</code></Table.Col><Table.Col><code>{prop.type ?? 'Sin tipo declarado'}</code></Table.Col><Table.Col>{prop.optional === undefined ? 'Consultar uso' : prop.optional ? 'Opcional / según variante' : 'Requerida según tipo'}</Table.Col><Table.Col><code>{prop.default ?? 'Sin valor declarado'}</code></Table.Col><Table.Col>{prop.description || propDescriptions[prop.name] || 'Propiedad específica del componente; consulta la guía y la implementación.'}</Table.Col></Table.Row>)}</Table.Body></Table> : <p>La función no declara propiedades propias mediante un objeto desestructurado o un tipo local. Consulta su firma, la guía y las opciones que reenvía.</p>}
      {doc.rest && <p className="muted">Se detectan propiedades adicionales reenviadas o recogidas en un objeto rest. Su alcance depende de la implementación; no implica que cualquier atributo llegue al DOM.</p>}
      {doc.members.length > 0 && <><h3>Referencia o resultado público</h3><div className="docs-members">{doc.members.map(member => <code key={member}>{member}</code>)}</div><p className="muted">Consulta la guía para distinguir getters, métodos y valores devueltos.</p></>}
      {doc.subcomponents.length > 0 && <><h3>Subcomponentes</h3><div className="docs-members">{doc.subcomponents.map(member => <code key={member}>{name}.{member}</code>)}</div><p className="muted">La ficha del componente principal agrupa estas variantes; no certifica que todas tengan un ejemplo visual.</p></>}
      {doc.childApis.map(child => <details key={child.name} className="docs-details"><summary>API de {name}.{child.name}</summary><p><code>{child.source}</code></p><Table responsive striped><Table.Header><Table.Row><Table.ColHeader>Propiedad</Table.ColHeader><Table.ColHeader>Tipo</Table.ColHeader><Table.ColHeader>Predeterminado</Table.ColHeader><Table.ColHeader>Descripción</Table.ColHeader></Table.Row></Table.Header><Table.Body>{child.props.map(prop => <Table.Row key={prop.name}><Table.Col><code>{prop.name}</code></Table.Col><Table.Col><code>{prop.type ?? 'Sin tipo declarado'}</code></Table.Col><Table.Col><code>{prop.default ?? 'Sin valor declarado'}</code></Table.Col><Table.Col>{prop.description || propDescriptions[prop.name] || 'Consulta la composición del componente principal y el archivo indicado.'}</Table.Col></Table.Row>)}</Table.Body></Table></details>)}
    </Scenario>
    {doc.legacy.length > 0 && <Scenario title="Ejemplos Markdown heredados" description="Material de esta familia de componentes conservado del repositorio original. Puede incluir propiedades antiguas: contrasta cada ejemplo con la guía y la API actual. Se muestra como texto y código; no se ejecuta." components={[]}>
      {doc.legacy.map(item => <details key={item.source} className="docs-details"><summary>{item.name}</summary>{item.name.includes('.broken.') && <Alert type="warning">El archivo original está marcado como incompleto o incorrecto. Se conserva como referencia histórica; utiliza la guía actual para integrar el componente.</Alert>}<Markdown text={item.markdown} /></details>)}
    </Scenario>}
    <Scenario title="Implementación actual" description="Código de la versión local utilizada para generar esta ficha. Permite consultar cómo se aplican las propiedades, los callbacks y los estilos. Se muestra como texto, sin ejecutarlo." components={[]}>
      <p><code>{doc.implementation}</code></p><details className="docs-details"><summary>Ver código fuente</summary><CodeBlock code={doc.implementationCode} language="js / JSX / Flow" /></details>
    </Scenario>
  </div>
}
