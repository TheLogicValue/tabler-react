import React, { useRef, useState } from 'react'
import { Button, DatePicker, Tooltip } from 'tabler-react'
import { CodeBlock } from './Markdown.jsx'

function ButtonPlayground() {
  const [color, setColor] = useState('primary'), [disabled, setDisabled] = useState(false), [clicks, setClicks] = useState(0)
  return <>
    <div className="docs-controls"><label>Color<select className="form-control" value={color} onChange={event => setColor(event.target.value)}>{['primary', 'secondary', 'success', 'danger'].map(value => <option key={value}>{value}</option>)}</select></label><label><input type="checkbox" checked={disabled} onChange={event => setDisabled(event.target.checked)} /> Deshabilitado</label></div>
    <div className="docs-preview"><Button type="button" color={color} disabled={disabled} onClick={() => setClicks(value => value + 1)}>Probar botón</Button><p role="status">onClick: {clicks} llamadas.</p></div>
    <CodeBlock code={'<Button type="button" color="' + color + '" disabled={' + disabled + '} onClick={handleClick}>\n  Probar botón\n</Button>'} />
  </>
}

function TooltipPlayground() {
  const [placement, setPlacement] = useState('top'), [content, setContent] = useState('Ayuda de prueba')
  return <><div className="docs-controls"><label>Posición<select className="form-control" value={placement} onChange={event => setPlacement(event.target.value)}>{['top', 'bottom', 'left', 'right', 'auto'].map(value => <option key={value}>{value}</option>)}</select></label><label>Contenido<input className="form-control" value={content} onChange={event => setContent(event.target.value)} /></label></div>
    <div className="docs-preview"><Tooltip content={content} placement={placement}><Button type="button" color="secondary">Pasa el ratón o usa Tab</Button></Tooltip></div>
    <CodeBlock code={'<Tooltip content={' + JSON.stringify(content) + '} placement="' + placement + '">\n  <Button type="button">Ayuda</Button>\n</Tooltip>'} />
  </>
}

function DatePlayground() {
  const ref = useRef(null)
  const [historic, setHistoric] = useState(true), [previousDay, setPreviousDay] = useState(1), [message, setMessage] = useState('Lee la referencia después de elegir o escribir una fecha.')
  return <><div className="docs-controls"><label><input type="checkbox" checked={historic} onChange={event => setHistoric(event.target.checked)} /> Limitar hasta hoy</label><label>Días anteriores<select className="form-control" value={previousDay} onChange={event => setPreviousDay(Number(event.target.value))}>{[0, 1, 3].map(value => <option key={value} value={value}>{value}</option>)}</select></label></div>
    <div className="docs-preview"><DatePicker key={previousDay + ':' + historic} ref={ref} previousDay={previousDay} isHistoric={historic} /><div className="action-row"><Button type="button" color="secondary" onClick={() => { const value = ref.current.value; setMessage(Number.isNaN(value.getTime()) ? 'ref.current.value: Invalid Date' : 'ref.current.value: ' + value.toLocaleDateString('es-ES')) }}>Leer referencia</Button><Button type="button" color="secondary" onClick={() => { ref.current.reset(); setMessage('reset() ejecutado.') }}>Restablecer fecha</Button></div><p role="status">{message}</p></div>
    <CodeBlock code={'const dateRef = useRef(null);\n\n<DatePicker ref={dateRef} previousDay={' + previousDay + '} isHistoric={' + historic + '} />\n\n// Lee un Date o Invalid Date; reset() restablece la fecha inicial.\nconst value = dateRef.current.value;\ndateRef.current.reset();'} />
  </>
}

export default function Playground({ name }) {
  if (name === 'Button') return <ButtonPlayground />
  if (name === 'Tooltip') return <TooltipPlayground />
  if (name === 'DatePicker') return <DatePlayground />
  return null
}
