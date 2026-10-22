import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig, version } from 'vite'
import { bundleBudget } from './scripts/bundle-budget.mjs'

const libraryRoot = fileURLToPath(new URL('../', import.meta.url))
const library = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const entry = fileURLToPath(new URL('../dist/index.es.js', import.meta.url))

if (!existsSync(entry)) {
  throw new Error('Primero compila la biblioteca desde la raíz: npm run build.')
}

export default defineConfig({
  root: fileURLToPath(new URL('./', import.meta.url)),
  base: './',
  plugins: [bundleBudget()],
  // Read the actual build, including watch updates, without installing a copy
  // of the parent repository inside this nested consumer.
  resolve: {
    alias: [
      { find: /^echarts-for-react$/, replacement: fileURLToPath(new URL('./src/echarts-engine.js', import.meta.url)) },
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
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // The budget plugin enforces 500 kB for application/chart chunks and 1 MB
    // only for the isolated, generated AG Grid 32 vendor module.
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      onwarn(warning, warn) {
        // React Router's RSC directive has no meaning in this client-only SPA.
        // Keep every other warning visible, including directives from other code.
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client') && /\/node_modules\/react-router\//.test(warning.id?.replaceAll('\\', '/') ?? '')) return
        warn(warning)
      },
      output: {
        onlyExplicitManualChunks: true,
        manualChunks(id) {
          const moduleId = id.replaceAll('\\', '/')
          if (moduleId.includes('/node_modules/zrender/')) return 'chart-renderer'
          if (moduleId.includes('/node_modules/echarts/')) return 'chart-engine'
          if (/\/node_modules\/(react|react-dom|scheduler)\//.test(moduleId)) return 'react-runtime'
          if (/\/node_modules\/ag-grid-(community|react)\//.test(moduleId)) return 'vendor-ag-grid'
        },
      },
    },
  },
})
