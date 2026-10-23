import { existsSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { parseSync } from '@babel/core'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export function parseSource(code, filename) {
  return parseSync(code, {
    filename, babelrc: false, configFile: false,
    parserOpts: { sourceType: 'module', plugins: ['jsx', ...(/\.tsx?$/.test(filename) ? ['typescript'] : [])] },
  })
}

export function resolveSourceFile(parent, specifier) {
  const base = resolve(dirname(parent), specifier)
  const candidates = [base, ...extensions.map(extension => base + extension), ...extensions.map(extension => resolve(base, 'index' + extension))]
  const file = candidates.find(candidate => existsSync(candidate) && statSync(candidate).isFile() && /\.[jt]sx?$/.test(candidate))
  if (!file) throw new Error(`No se puede resolver ${specifier} desde ${parent}`)
  return file
}
