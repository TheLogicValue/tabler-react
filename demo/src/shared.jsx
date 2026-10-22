import React from 'react'
import { Alert, Badge, Button, Card } from 'tabler-react'

export function ComponentList({ names }) {
  return <div className="component-list" aria-label="Componentes de este ejemplo">
    {names.map(name => <Badge key={name} color="secondary">{name}</Badge>)}
  </div>
}

export function Scenario({ title, description, components, children }) {
  return <Card className="scenario">
    <Card.Header><Card.Title>{title}</Card.Title></Card.Header>
    <Card.Body>
      <p className="scenario-description">{description}</p>
      <ComponentList names={components} />
      {children}
    </Card.Body>
  </Card>
}

export class ScenarioBoundary extends React.Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) return <Alert type="danger">
      <strong>Este ejemplo ha detectado un error de integración.</strong>
      <pre>{this.state.error.message}</pre>
      <Button type="button" color="secondary" onClick={() => this.setState({ error: null })}>Reintentar ejemplo</Button>
    </Alert>
    return this.props.children
  }
}

export function Result({ children }) {
  return <div className="demo-result" role="status" aria-live="polite">{children}</div>
}
