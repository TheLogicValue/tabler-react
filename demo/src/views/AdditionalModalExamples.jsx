import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button, Form, Grid, ModalDoc, ModalSplash } from 'tabler-react'
import splashImage from '../assets/tabler-splash.svg'
import { Result, Scenario } from '../shared.jsx'

// Keep focus, Escape and background interaction within the demo's open dialog.
// The library components retain their public API and render inside this host.
function DemoDialog({ label, className = '', onClose, children }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement
    dialog.showModal()
    return () => {
      dialog.close()
      if (opener?.isConnected) opener.focus()
    }
  }, [])
  return createPortal(<dialog ref={dialogRef} className={`demo-overlay ${className}`} aria-label={label}
    onCancel={event => { event.preventDefault(); onClose() }}>
    {children}
  </dialog>, document.body)
}

const documentSections = [
  { title: 'Guía de uso', value: 'guide', children: <>
    <h3>Guía del informe de prueba</h3>
    <p>Este documento es ficticio y se muestra sin cargar archivos ni servicios externos.</p>
    <ol><li>Selecciona una cartera en Tablas y datos.</li><li>Configura la fecha del informe.</li><li>Revisa los gráficos y confirma la lectura de esta guía.</li></ol>
  </> },
  { title: 'Funciones', value: 'features', children: <>
    <h3>Funciones disponibles</h3>
    <p>La segunda pestaña permite comprobar el cambio de contenido dentro de ModalDoc.</p>
    <ul><li>Filtrado y exportación con AG Grid Community.</li><li>Validación de fechas y formularios.</li><li>Comparación de indicadores en gráficos.</li></ul>
  </> },
]

export default function AdditionalModalExamples() {
  const [documentMode, setDocumentMode] = useState('tabs')
  const [showDocument, setShowDocument] = useState(false)
  const [documentResult, setDocumentResult] = useState('Documento pendiente de abrir.')
  const [showSplash, setShowSplash] = useState(false)
  const [autoClose, setAutoClose] = useState(false)
  const [splashResult, setSplashResult] = useState('Pantalla de carga pendiente de abrir.')
  const closeDocument = () => { setShowDocument(false); setDocumentResult('Documento cerrado sin confirmar.') }
  const closeSplash = () => { setShowSplash(false); setSplashResult('Pantalla de carga cerrada manualmente.') }

  useEffect(() => {
    if (!showSplash || !autoClose) return
    const timeout = setTimeout(() => {
      setShowSplash(false)
      setSplashResult('Carga ficticia finalizada: cierre automático a los 3 segundos.')
    }, 3000)
    return () => clearTimeout(timeout)
  }, [showSplash, autoClose])

  return <Grid.Row className="demo-card-row">
    <Grid.Col width={12} lg={6}>
      <Scenario title="Documentación con ModalDoc" description="Abre la guía con dos pestañas o una sola sección. Cambia de pestaña, confirma la lectura o cierra con X o Escape; el resultado aparece debajo." components={['ModalDoc']}>
        <label className="field-label">Presentación del documento<Form.Select value={documentMode} onChange={event => setDocumentMode(event.target.value)}>
          <option value="tabs">Dos pestañas</option><option value="single">Una sección</option>
        </Form.Select></label>
        <div className="action-row mt-3"><Button type="button" color="primary" icon="file-text" onClick={() => setShowDocument(true)}>Abrir documento</Button></div>
        <Result>{documentResult}</Result>
        {showDocument && <DemoDialog label="Documento de prueba" onClose={closeDocument}>
          <ModalDoc className="demo-document-modal" items={documentSections} initialTab="Guía de uso"
            pathname={documentMode === 'tabs' ? '/' : '/detalle'} show bodyHeight="min(360px, 50vh)"
            acceptText="Confirmar lectura" onClose={closeDocument}
            onAccept={() => { setShowDocument(false); setDocumentResult('Lectura del documento confirmada correctamente.') }} />
        </DemoDialog>}
      </Scenario>
    </Grid.Col>
    <Grid.Col width={12} lg={6}>
      <Scenario title="Pantalla de carga con ModalSplash" description="Muestra la imagen local y la animación de carga. Puedes cerrar con el botón o Escape, o activar el cierre automático para simular una carga de 3 segundos." components={['ModalSplash']}>
        <Form.Checkbox label="Cerrar automáticamente a los 3 segundos" checked={autoClose} onChange={event => setAutoClose(event.target.checked)} />
        <div className="action-row mt-3"><Button type="button" color="secondary" icon="loader" onClick={() => { setSplashResult('Carga ficticia en curso.'); setShowSplash(true) }}>Mostrar pantalla de carga</Button></div>
        <Result>{splashResult}</Result>
        {showSplash && <DemoDialog label="Carga de prueba" className="demo-splash-dialog" onClose={closeSplash}>
          <ModalSplash image={splashImage} alt="Laboratorio Tabler: preparando la vista de prueba" />
          <Button type="button" color="secondary" className="demo-overlay-close" onClick={closeSplash}>Cerrar pantalla de carga</Button>
        </DemoDialog>}
      </Scenario>
    </Grid.Col>
  </Grid.Row>
}
