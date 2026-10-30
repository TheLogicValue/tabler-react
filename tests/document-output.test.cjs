const assert = require('node:assert/strict')
const { test } = require('node:test')
const path = require('node:path')

test('documentation output rejects path traversal and absolute paths', async () => {
  const { documentOutputPath } = await import('../demo/scripts/document-output.mjs')
  const directory = path.resolve('demo/src/docs/generated')
  for (const name of ['../outside', '../../outside', '..\\outside', '/tmp/outside', 'C:\\outside', 'a/b', 'a\\b', '', null, 'bad\u0000name']) {
    assert.throws(() => documentOutputPath(directory, name), undefined, String(name))
  }
  for (const name of ['Tag', 'Button', 'Tag.AddOn', '__proto__']) {
    assert.equal(documentOutputPath(directory, name), path.join(directory, name + '.json'))
  }
})
