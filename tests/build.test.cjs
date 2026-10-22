const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const postcss = require('postcss')

test('El CSS publicado mantiene todas las fuentes locales y no utiliza el hack *display', () => {
  const file = path.resolve(__dirname, '../dist/style.css')
  const css = fs.readFileSync(file, 'utf8')
  assert.doesNotMatch(css, /\*display\s*:/)
  const assets = new Set()
  postcss.parse(css, { from: file }).walkDecls(declaration => {
    for (const match of declaration.value.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)) {
      const url = match[1]
      if (/^(data:|https?:|#|\/)/.test(url)) continue
      const asset = path.resolve(path.dirname(file), url.split(/[?#]/)[0])
      assert.ok(fs.existsSync(asset), `Falta el recurso ${url} referenciado por dist/style.css`)
      assets.add(asset)
    }
  })
  assert.equal(assets.size, 4, 'Se deben publicar los cuatro formatos de fuente Feather')
})
