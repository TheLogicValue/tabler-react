import { mkdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const project = fileURLToPath(new URL('../', import.meta.url))
const formatHost = { getCanonicalFileName: file => file, getCurrentDirectory: () => project, getNewLine: () => '\n' }
let cachedSignature, cachedDeclarations

function check(diagnostics) {
  if (diagnostics.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, formatHost))
}

export function declarationConfig() {
  const file = join(project, 'tsconfig.build.json')
  const { config, error } = ts.readConfigFile(file, ts.sys.readFile)
  if (error) check([error])
  const parsed = ts.parseJsonConfigFileContent(config, ts.sys, project)
  check(parsed.errors)
  return parsed
}

export function buildTypes() {
  const { fileNames, options } = declarationConfig()
  const inputs = [...fileNames, ...['tsconfig.json', 'tsconfig.build.json', 'package-lock.json'].map(file => join(project, file))]
  const signature = JSON.stringify([options, inputs.map(file => { const stat = statSync(file); return [file, stat.mtimeMs, stat.size] })])
  if (signature !== cachedSignature) {
    const program = ts.createProgram(fileNames, options)
    check(ts.getPreEmitDiagnostics(program))
    const declarations = new Map()
    const result = program.emit(undefined, (file, code) => {
      // CSS is extracted at runtime; its source paths are not published.
      declarations.set(file, code.replace(/^import ["'][^"']+\.css["'];\r?\n/gm, ''))
    }, undefined, true)
    check(result.diagnostics)
    if (result.emitSkipped) throw new Error('No se pudieron generar las declaraciones de la biblioteca.')
    declarations.set(join(options.outDir, 'style.css.d.ts'), 'export {};\n')
    cachedDeclarations = declarations
    cachedSignature = signature
  }
  // Each Vite output can clean dist in watch mode. Restore declarations after
  // either format, reusing one semantic check while the inputs stay unchanged.
  for (const [file, declaration] of cachedDeclarations) {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, declaration)
  }
  console.log('Declaraciones TypeScript generadas en dist/.')
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) buildTypes()
