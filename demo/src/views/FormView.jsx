import React, { useRef, useState } from 'react'
import { Alert, Button, DatePicker, Form, Grid } from 'tabler-react'
import { categoryOptions } from '../data.js'
import { Result, Scenario } from '../shared.jsx'

const initialDate = new Date(2026, 9, 15)

export default function FormView() {
  const dateRef = useRef(null)
  const offsetRef = useRef(null)
  const [previousDay, setPreviousDay] = useState('default')
  const [restriction, setRestriction] = useState('current')
  const [name, setName] = useState('Cartera de prueba')
  const [category, setCategory] = useState(categoryOptions[1])
  const [enabled, setEnabled] = useState(true)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const save = event => {
    event.preventDefault()
    const date = dateRef.current?.value
    if (!name.trim() || !category || !date || Number.isNaN(date.getTime())) {
      setError('Introduce un nombre, una clasificación y una fecha válida.'); setResult(null); return
    }
    setError('')
    setResult({ name: name.trim(), category: category.label, date: date.toLocaleDateString('es-ES'), enabled })
  }
  const reset = () => {
    setName('Cartera de prueba'); setCategory(categoryOptions[1]); setEnabled(true)
    dateRef.current?.reset(); setError(''); setResult(null)
  }
  return <Grid.Row><Grid.Col lg={8}>
    <Scenario title="Configuración de una cartera" description="Edita los campos, busca una clasificación y selecciona una fecha. La fecha admite como máximo hoy, tanto al escribir como al seleccionar. Guardar valida el formulario y muestra sus valores; no se envía nada a un servidor." components={['Form', 'DatePicker', 'Button', 'Alert']}>
      <Form onSubmit={save}>
        <div className="form-group"><label className="field-label">Nombre de la cartera<Form.Input name="portfolioName" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre de prueba" invalid={!!error && !name.trim()} /></label></div>
        <Form.Group label="Clasificación (react-select)"><Form.SelectReact inputId="demo-classification" aria-label="Clasificación de la cartera" value={category} onChange={setCategory} options={categoryOptions} isClearable placeholder="Busca una clasificación…" /></Form.Group>
        <div className="form-group"><label className="field-label">Fecha de referencia<DatePicker ref={dateRef} date={initialDate} dateIni={initialDate} today fromMonth={new Date(2025, 0, 1)} toMonth={new Date(2026, 11, 31)} /></label></div>
        <Form.Group><Form.Checkbox name="enabled" label="Incluir la cartera en el informe" checked={enabled} onChange={e => setEnabled(e.target.checked)} /></Form.Group>
        {error && <Alert type="danger">{error}</Alert>}
        <div className="action-row"><Button type="submit" color="primary" icon="check">Guardar configuración</Button><Button type="button" color="secondary" onClick={reset}>Restablecer</Button></div>
      </Form>
    </Scenario>
    <Scenario title="Límites y días deshabilitados" description="Por defecto el límite es hoy, también al escribir. Histórico y Futuro usan el 15/10/2026 como límite explícito inclusivo. Los otros modos prueban días deshabilitados. Los ejemplos con límite explícito navegan entre septiembre y noviembre de 2026." components={['DatePicker', 'Form']}>
      <div className="form-group"><label className="field-label">Restricción del calendario<Form.Select value={restriction} onChange={event => setRestriction(event.target.value)}>
        <option value="current">Hasta hoy (predeterminado)</option>
        <option value="historic">Histórico hasta el 15 de octubre</option>
        <option value="future">Futuro desde el 15 de octubre</option>
        <option value="weekends">Fines de semana deshabilitados</option>
        <option value="all">Todos los días deshabilitados</option>
      </Form.Select></label></div>
      <label className="field-label">Fecha con restricciones<DatePicker key={restriction} date={restriction === 'current' ? new Date() : initialDate} dateIni={restriction === 'current' ? new Date() : initialDate} today
        fromMonth={restriction === 'current' ? undefined : new Date(2026, 8, 1)} toMonth={restriction === 'current' ? undefined : new Date(2026, 10, 1)} lastDate={restriction === 'current' ? undefined : initialDate}
        isHistoric={restriction !== 'future'} disabled={restriction === 'all' ? true : restriction === 'weekends' ? { dayOfWeek: [0, 6] } : false} /></label>
    </Scenario>
  </Grid.Col><Grid.Col lg={4}>
    <Scenario title="Resultado del formulario" description="Estos valores se leen del estado de Form y de la referencia pública de DatePicker." components={['Card', 'Text']}>
      <Result>{result ? <><strong>Configuración guardada localmente</strong><dl className="result-values"><dt>Nombre</dt><dd>{result.name}</dd><dt>Clasificación</dt><dd>{result.category}</dd><dt>Fecha</dt><dd>{result.date}</dd><dt>Informe</dt><dd>{result.enabled ? 'Incluida' : 'Excluida'}</dd></dl></> : 'Todavía no has guardado una configuración.'}</Result>
      <p className="muted mt-4">Prueba también una fecha inválida, vaciar el nombre, borrar la selección y restablecer los valores.</p>
    </Scenario>
    <Scenario title="Fecha inicial y días anteriores" description="Cambia el desplazamiento y pulsa Restablecer fecha para aplicar el nuevo valor. La fecha base es el 15/10/2026; el valor por defecto resta un día." components={['DatePicker', 'Form', 'Button']}>
      <div className="form-group"><label className="field-label">Días anteriores<Form.Select name="previousDay" value={previousDay} onChange={e => setPreviousDay(e.target.value)}>
        <option value="default">Por defecto (1 día)</option><option value="0">0 días</option><option value="1">1 día</option><option value="3">3 días</option>
      </Form.Select></label></div>
      <div className="form-group"><label className="field-label">Fecha calculada<DatePicker ref={offsetRef} dateIni={initialDate} previousDay={previousDay === 'default' ? undefined : Number(previousDay)} /></label></div>
      <Button type="button" color="secondary" onClick={() => offsetRef.current?.reset()}>Restablecer fecha</Button>
    </Scenario>
  </Grid.Col></Grid.Row>
}
