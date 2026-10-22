import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig, version } from 'vite'

const libraryRoot = fileURLToPath(new URL('../', import.meta.url))
const library = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const entry = fileURLToPath(new URL('../dist/index.es.js', import.meta.url))

if (!existsSync(entry)) {
  throw new Error('Primero compila la biblioteca desde la raíz: npm run build.')
}

export default defineConfig({
  root: fileURLToPath(new URL('./', import.meta.url)),
  base: './',
  // Read the actual build, including watch updates, without installing a copy
  // of the parent repository inside this nested consumer.
  resolve: {
    alias: [
      { find: /^tabler-react\/style\.css$/, replacement: fileURLToPath(new URL('../dist/style.css', import.meta.url)) },
      { find: /^tabler-react$/, replacement: entry },
    ],
    dedupe: [...Object.keys(library.peerDependencies), 'react-router'],
  },
  define: {
    __LIBRARY_VERSION__: JSON.stringify(library.version),
    __DEMO_VITE_VERSION__: JSON.stringify(version),
  },
  server: { fs: { allow: [libraryRoot] } },
  build: { outDir: 'dist', emptyOutDir: true },
})
