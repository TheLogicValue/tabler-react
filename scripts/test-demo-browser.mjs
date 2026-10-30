import assert from 'node:assert/strict'
import { chromium } from 'playwright'

// Start the demo separately with npm --prefix demo run dev.
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const errors = []
  page.on('response', response => { if (response.status() >= 400) console.error(`HTTP ${response.status()}: ${response.url()}`) })
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto(process.env.DEMO_URL || 'http://127.0.0.1:5174/')
  await page.getByRole('heading', { name: 'Prueba los flujos que ya utilizas.' }).waitFor()
  async function componentsPage(name) {
    await page.getByRole('navigation', { name: 'Ejemplos de componentes' }).getByText('Componentes', { exact: true }).click()
    await page.getByRole('navigation', { name: 'Ejemplos de componentes' }).getByText(name, { exact: true }).click()
    await page.getByRole('heading', { name, exact: true }).waitFor()
    await page.locator('.route-loading').waitFor({ state: 'detached' })
  }
  await componentsPage('Interacciones')
  await page.getByRole('button', { name: /Abrir confirmación/ }).click()
  await page.getByRole('button', { name: 'Confirmar actualización', exact: true }).click()
  await page.getByText('Actualización ficticia confirmada correctamente.', { exact: true }).waitFor()
  await page.getByRole('button', { name: /Acciones de prueba/ }).click()
  await page.getByText('Marcar como revisado', { exact: true }).click()
  await page.getByText('Fondo marcado como revisado.', { exact: true }).waitFor()
  console.log('Demo: navigation, modal confirmation and dropdown callback passed')
  await componentsPage('Formularios y fechas')
  await page.getByRole('textbox', { name: 'Nombre de la cartera', exact: true }).fill('Revisión de seguridad')
  await page.getByRole('button', { name: /Guardar configuración/ }).click()
  await page.getByText('Configuración guardada localmente', { exact: true }).waitFor()
  await page.getByText('Revisión de seguridad', { exact: true }).waitFor()
  console.log('Demo: form editing and submission passed')
  for (const name of ['Gráficos y estados', 'Documentación', 'Cobertura de componentes']) {
    await page.getByRole('navigation', { name: 'Ejemplos de componentes' }).getByText(name, { exact: true }).click()
    await page.getByRole('heading', { name, exact: true }).waitFor()
    await page.locator('.route-loading').waitFor({ state: 'detached' })
    const content = {
      'Gráficos y estados': 'Evolución de la cobertura',
      'Documentación': 'Guías de integración',
      'Cobertura de componentes': 'Guion de comprobación',
    }
    await page.getByRole('heading', { name: content[name], exact: true }).waitFor()
    console.log('Demo: route ' + name + ' passed')
  }
  assert.deepEqual(errors, [], 'Demo browser errors')
  if (process.env.DEMO_SCREENSHOT) await page.screenshot({ path: process.env.DEMO_SCREENSHOT, fullPage: true })
} finally {
  await browser.close()
}
