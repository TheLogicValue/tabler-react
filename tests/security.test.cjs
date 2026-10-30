const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')
const consumer = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
const React = consumer('react')
const { renderToStaticMarkup } = consumer('react-dom/server')
const { MemoryRouter } = consumer('react-router-dom')
const lib = consumer(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')
const cases = require('./security-fixtures.cjs')(React, lib, function ConsumerLink({ to, href, children, className }) {
  assert.ok(to === undefined || !/^[\s\S]*javascript:/i.test(to), 'Unsafe URL reached consumer routing root')
  return React.createElement('a', { href: to ?? href, className }, children)
})
const unsafe = [
  "javascript:void(document.title='executed')", 'JaVaScRiPt:alert(1)', '  javascript:alert(1)',
  '\tjavascript:alert(1)', 'java\nscript:alert(1)', 'java\rscript:alert(1)', 'java\tscript:alert(1)',
  '\u0000javascript:alert(1)', 'data:text/html,<script>alert(1)</script>', 'vbscript:msgbox(1)',
  'file:///etc/passwd', 'blob:https://example.com/id', 'custom:action',
]
const safe = ['/details', '../details', './details', '?page=2', '#details', 'details', '//example.com/path',
  'https://example.com/path?q=1', 'http://example.com', 'mailto:help@example.com', 'tel:+34123456789']
function render(element) { return renderToStaticMarkup(React.createElement(MemoryRouter, null, element)) }
for (const [name, create] of cases) {
  test(`security: ${name} rejects unsafe destinations before rendering`, () => {
    for (const url of unsafe) assert.doesNotMatch(render(create(url)), /<a\b[^>]*\bhref=/i, name + ': ' + JSON.stringify(url))
  })
  test(`security: ${name} preserves legitimate navigation`, () => {
    for (const url of safe) assert.match(render(create(url)), /<a\b[^>]*\bhref=/i, name + ': ' + url)
  })
}

test('security: CSS image URLs cannot add declarations to server-rendered styles', async () => {
  const { Window } = await import('happy-dom')
  const window = new Window()
  const payload = 'x);position:fixed;inset:0;z-index:999999;/*'
  window.document.body.innerHTML = render(React.createElement('span', { style: { backgroundImage: `url(${payload})` } }))
  assert.equal(window.document.body.firstElementChild.style.position, 'fixed', 'Positive control must detect CSS injection')
  const examples = [
    React.createElement(lib.Avatar, { imageURL: payload }),
    React.createElement(lib.Tag, { avatar: payload }),
    React.createElement(lib.BlogCard, { aside: true, imgSrc: payload, avatarImgSrc: payload }),
    React.createElement(lib.Card.Header, { backgroundURL: payload }),
    React.createElement(lib.Card.Map, { placeholder: payload }),
  ]
  for (const element of examples) {
    window.document.body.innerHTML = render(element)
    const styles = window.document.querySelectorAll('[style]')
    assert.ok(styles.length)
    for (const node of styles) {
      assert.equal(node.style.position, '')
      assert.equal(node.style.zIndex, '')
      assert.doesNotMatch(node.getAttribute('style'), /url\(x\);/)
    }
  }
  await window.happyDOM.abort()
})
