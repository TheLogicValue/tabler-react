import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Accordion, Alert, Button, Card, Dropdown, Form, Grid, Modal, Nav, ProtectedRoute, Site, Tab, Tabs, Tooltip, useModal, useTabs } from 'tabler-react'
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

function FloatingExamples() {
  const [position, setPosition] = useState('bottom-start')
  const [action, setAction] = useState('Prueba varios menús de forma independiente.')
  const positions = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end', 'auto', 'auto-start', 'auto-end']
  return <Scenario title="Posicionamiento con Floating UI" description="Cambia la posición, abre los menús y desplaza la página o redimensiona la ventana. Comprueba el ajuste a los bordes, Escape y el clic fuera. Las ayudas se abren con el ratón o al recibir foco con Tab." components={['Dropdown', 'Button.Dropdown', 'Nav', 'Tooltip']}>
    <Form.Group label="Posición de prueba"><Form.Select value={position} onChange={event => setPosition(event.target.value)}>
      {positions.map(value => <option key={value} value={value}>{value}</option>)}
    </Form.Select></Form.Group>
    <div className="action-row mb-4" style={{ justifyContent: 'space-between' }}>
      <Dropdown type="button" triggerContent="Menú con posición" color="secondary" position={position} arrow arrowPosition={position.endsWith('end') ? 'right' : 'left'} itemsObject={[
        { value: 'Acción del menú posicionado', onClick: () => setAction('Menú posicionado: acción ejecutada.') },
      ]} />
      <Button.Dropdown value="Button.Dropdown" color="secondary" dropdownProps={{ position, arrow: true }}>
        <Dropdown.Item onClick={() => setAction('Button.Dropdown: acción ejecutada.')}>Acción del botón desplegable</Dropdown.Item>
      </Button.Dropdown>
      <Dropdown trigger={<Button type="button" color="secondary">Disparador personalizado</Button>} position={position}
        itemsObject={[{ value: 'Acción personalizada', onClick: () => setAction('Disparador personalizado: acción ejecutada.') }]} />
      <Tooltip content="Ayuda de Floating UI" placement={position}><button type="button" className="btn btn-secondary">Ayuda con posición</button></Tooltip>
    </div>
    <Nav><Nav.Item value="Submenú horizontal" position={position} subItemsObjects={[
      { value: 'Opción horizontal', to: '#/interacciones', onClick: () => setAction('Navegación horizontal: opción seleccionada.') },
    ]} /></Nav>
    <Nav vertical itemsObjects={[{ value: 'Submenú vertical', subItems: [{ value: 'Opción vertical', to: '#/interacciones' }] }]} />
    <Result>{action}</Result>
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
      <Scenario title="Menú desplegable y acordeón" description="Comprueba el posicionamiento del menú con Floating UI y despliega el detalle." components={['Dropdown', 'Accordion', 'Icon']}>
        <Dropdown type="button" color="secondary" triggerContent="Acciones de prueba" toggle itemsObject={[
          { value: 'Marcar como revisado', icon: 'check', onClick: e => { e.preventDefault(); setMenuAction('Fondo marcado como revisado.') } },
          { value: 'Preparar informe', icon: 'file-text', onClick: e => { e.preventDefault(); setMenuAction('Informe ficticio preparado.') } },
        ]} />
        <Result>{menuAction}</Result>
        <Accordion accordionButton="Ver detalle de la prueba"><p>El acordeón abre y cierra este contenido usando su estado interno.</p></Accordion>
      </Scenario>
    </Grid.Col></Grid.Row>
    <ActionControls />
    <FloatingExamples />
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
