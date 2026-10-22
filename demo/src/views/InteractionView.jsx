import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Accordion, Alert, Button, Card, Dropdown, Form, Grid, Modal, ProtectedRoute, Site, Tab, Tabs, useModal, useTabs } from 'tabler-react'
import { Result, Scenario } from '../shared.jsx'

function HookTabs() {
  const { Tabs: HookTabsComponent, selectedTitle } = useTabs()
  return <><HookTabsComponent initialTab="Resumen del fondo">
    <Tab title="Resumen del fondo">Pestaña inicial del hook useTabs.</Tab>
    <Tab title="Histórico">El histórico ficticio se ha abierto correctamente.</Tab>
  </HookTabsComponent><Result>Pestaña activa: {selectedTitle ?? 'Resumen del fondo'}</Result></>
}

function ActionControls() {
  const [cardRevision, setCardRevision] = useState(0)
  const [navigationOpen, setNavigationOpen] = useState(false)
  const [submissions, setSubmissions] = useState(0)
  const [action, setAction] = useState('Sin acción del menú.')
  return <Scenario title="Controles de tarjeta y cabecera" description="Usa Tab, Intro y Espacio para probar estos controles. Ninguno debe enviar el formulario. El botón de navegación de Site.Header aparece por debajo de 992 px." components={['Card', 'Dropdown', 'Site']}>
    <form onSubmit={event => { event.preventDefault(); setSubmissions(value => value + 1) }}>
      <Dropdown triggerContent="Acciones con aspecto de enlace" itemsObject={[
        { value: 'Comprobar acción del enlace', onClick: event => { event.preventDefault(); setAction('Acción del menú ejecutada.') } },
      ]} />
      <Result>{action}</Result>
      <Card key={cardRevision} title="Tarjeta de prueba" body="Contenido para plegar, maximizar y cerrar." isCollapsible isClosable isFullscreenable />
      <Button type="button" color="secondary" onClick={() => setCardRevision(value => value + 1)}>Restaurar tarjeta</Button>
      <div className="demo-site-header mt-4"><Site.Header href="#/interacciones" alt="Tabler" imageURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='32'%3E%3Ctext x='0' y='23' font-size='22' fill='%231c3550'%3ETabler%3C/text%3E%3C/svg%3E" onMenuToggleClick={() => setNavigationOpen(value => !value)} /></div>
      <Result>Navegación de prueba: {navigationOpen ? 'abierta' : 'cerrada'}. Envíos del formulario: {submissions}.</Result>
    </form>
  </Scenario>
}

export default function InteractionView() {
  const modal = useModal()
  const [message, setMessage] = useState('Abre el modal y confirma o cancela la operación.')
  const [allowed, setAllowed] = useState(false)
  const [menuAction, setMenuAction] = useState('Ninguna acción seleccionada.')
  return <>
    <Grid.Row><Grid.Col lg={6}>
      <Scenario title="Confirmación con Modal + useModal" description="Prueba apertura, confirmación, cancelación y el botón de cierre. La operación modifica únicamente el mensaje de esta demo." components={['Modal', 'useModal', 'Button']}>
        <Button color="primary" type="button" icon="external-link" onClick={modal.openModal}>Abrir confirmación</Button>
        <Result>{message}</Result>
        {modal.showModal && <Modal show title="Confirmar actualización de prueba" type={2} acceptText="Confirmar actualización" cancelText="Cancelar"
          onClose={() => { modal.closeModal(); setMessage('Modal cerrado sin cambios.') }}
          onCancel={() => { modal.closeModal(); setMessage('Operación cancelada.') }}
          onAccept={() => { modal.closeModal(); setMessage('Actualización ficticia confirmada correctamente.') }}>
          <p>Se actualizaría la configuración de <strong>Atlas Global</strong>.</p><p>Este ejemplo modifica únicamente el estado local de la demo.</p>
        </Modal>}
      </Scenario>
    </Grid.Col><Grid.Col lg={6}>
      <Scenario title="Menú desplegable y acordeón" description="Comprueba el posicionamiento del menú con Popper y despliega el detalle." components={['Dropdown', 'Accordion', 'Icon']}>
        <Dropdown type="button" color="secondary" triggerContent="Acciones de prueba" toggle itemsObject={[
          { value: 'Marcar como revisado', icon: 'check', onClick: e => { e.preventDefault(); setMenuAction('Fondo marcado como revisado.') } },
          { value: 'Preparar informe', icon: 'file-text', onClick: e => { e.preventDefault(); setMenuAction('Informe ficticio preparado.') } },
        ]} />
        <Result>{menuAction}</Result>
        <Accordion accordionButton="Ver detalle de la prueba"><p>El acordeón abre y cierra este contenido usando su estado interno.</p></Accordion>
      </Scenario>
    </Grid.Col></Grid.Row>
    <ActionControls />
    <Scenario title="Pestañas con componente y hook" description="Prueba los dos patrones de pestañas de la biblioteca. Cambia la pestaña interior de cada ejemplo." components={['Tabs', 'Tab', 'useTabs']}>
      <Tabs initialTab="Componente Tabs">
        <Tab title="Componente Tabs"><Tabs initialTab="Datos generales"><Tab title="Datos generales">Datos generales del fondo ficticio.</Tab><Tab title="Métricas ESG">Puntuación ESG: 7,8 · Cobertura: 94%.</Tab></Tabs></Tab>
        <Tab title="Hook useTabs"><HookTabs /></Tab>
      </Tabs>
    </Scenario>
    <Scenario title="Ruta protegida" description="Intenta entrar sin permiso y después actívalo. ProtectedRoute debe redirigir o mostrar el contenido anidado mediante Outlet." components={['ProtectedRoute', 'Form', 'Alert']}>
      <Form.Checkbox label="Permitir acceso a la ruta de prueba" checked={allowed} onChange={e => setAllowed(e.target.checked)} />
      <div className="action-row mt-3"><Link className="btn btn-secondary" to="/interacciones/privado">Entrar en ruta protegida</Link><Link className="btn btn-link" to="/interacciones">Volver al inicio</Link></div>
      <div className="route-example"><Routes>
        <Route element={<ProtectedRoute isAllowed={allowed} redirectTo="/interacciones/sin-acceso" />}><Route path="privado" element={<Alert type="success">Acceso permitido: contenido privado de prueba.</Alert>} /></Route>
        <Route path="sin-acceso" element={<Alert type="warning">Acceso denegado: ProtectedRoute ha redirigido correctamente.</Alert>} />
        <Route index element={<Result>La ruta de prueba está preparada.</Result>} />
      </Routes></div>
    </Scenario>
  </>
}
