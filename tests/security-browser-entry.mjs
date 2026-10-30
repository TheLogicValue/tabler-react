import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import * as lib from 'tabler-react'
import { Link, MemoryRouter } from 'react-router-dom'
import fixtures from './security-fixtures.cjs'

const h = React.createElement
const cases = fixtures(React, lib, function RoutingLink({ to, children, className, onClick }) {
  return h(Link, { to, className, onClick }, children)
})
function tree(url) {
  return h(MemoryRouter, null, h('div', null,
    ...cases.map(([name, create]) => h('section', { key: name }, create(url))),
    h(lib.Dropdown, { key: 'dropdown', triggerContent: 'Menu', itemsObject: [{ value: 'Open', to: url }] }),
    h(lib.NavBarMenu, { key: 'navbar', items: [{ value: 'Menu', subItems: [{ value: 'Open', to: url, LinkComponent: true }] }] })
  ))
}
const pause = () => new Promise(resolve => setTimeout(resolve, 60))
window.exerciseSecurity = async ({ mode, url, html }) => {
  const host = document.createElement('div')
  document.body.append(host)
  let root
  if (mode !== 'client') host.innerHTML = html
  if (mode === 'client') { root = createRoot(host); root.render(tree(url)) }
  if (mode === 'hydrate') root = hydrateRoot(host, tree(url))
  await pause()
  const cssInjected = [...host.querySelectorAll('[style]')].some(element =>
    element.style.position === 'fixed' || element.style.zIndex === '999999')
  const menuDestinations = []
  if (mode !== 'server') {
    for (const button of host.querySelectorAll('button[aria-haspopup]')) {
      button.click(); await pause()
      for (const anchor of host.querySelectorAll('.dropdown-menu a')) {
        menuDestinations.push(anchor.getAttribute('href'))
        anchor.click(); await pause()
      }
    }
  }
  const anchors = [...host.querySelectorAll('a')]
  const destinations = [...menuDestinations, ...anchors.map(anchor => anchor.getAttribute('href'))]
  const before = location.href
  for (const anchor of anchors) anchor.click()
  await pause()
  const result = { destinations, cssInjected, executed: window.__securityExecuted === true, navigated: location.href !== before,
    count: destinations.length, menuCount: menuDestinations.length }
  root?.unmount()
  host.remove()
  return result
}
