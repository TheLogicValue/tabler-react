import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { transformAsync } from '@babel/core'
import { defineConfig, esmExternalRequirePlugin, normalizePath } from 'vite'

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const sourceDirectory = normalizePath(fileURLToPath(new URL('./src/', import.meta.url)))
const peers = Object.keys(packageJson.peerDependencies)
// Keep the chart engine visible to the consumer's bundler so it can split its
// modules, instead of embedding ECharts inside the library's single entry file.
const externals = [...peers, 'echarts-for-react']

export default defineConfig({
  base: './',
  // The library has no HTML entry point. Only src/index.js enters the build.
  publicDir: false,
  plugins: [
    // Bundled CommonJS dependencies also require React. Convert those external
    // requires to imports in ESM so the package runs in browsers without require.
    // This plugin owns external resolution for both roots and peer subpaths.
    esmExternalRequirePlugin({
      external: externals.flatMap(dependency => [dependency, new RegExp('^' + dependency + '/')]),
    }),
    {
      name: 'tabler-flow-and-jsx',
      enforce: 'pre',
      async transform(code, id) {
        if (!normalizePath(id).startsWith(sourceDirectory) || !/\.jsx?$/.test(id)) return

        // Strip Flow and compile JSX before Vite parses the .js source files.
        return transformAsync(code, {
          filename: id,
          babelrc: false,
          configFile: false,
          sourceMaps: true,
          presets: [
            ['@babel/preset-env', { modules: false }],
            ['@babel/preset-react', { runtime: 'classic' }],
            '@babel/preset-flow',
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-transform-json-strings',
          ],
        })
      },
    },
  ],
  resolve: { dedupe: ['react', 'react-dom'] },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'tabler-external-fonts',
          Once(root) {
            // Library mode normally inlines assets. Keep the existing font files
            // and relative URLs so consumers can process the stylesheet as before.
            root.walkDecls(declaration => {
              declaration.value = declaration.value.replace(
                /(\.\/fonts\/feather\/[^?"')]+)\?/g,
                '$1?no-inline&',
              )
            })
          },
        },
      ],
    },
  },
  build: {
    target: 'es2015',
    sourcemap: true,
    minify: 'terser',
    cssMinify: false,
    lib: {
      entry: fileURLToPath(new URL('./src/index.js', import.meta.url)),
      formats: ['es', 'cjs'],
      fileName: format => format === 'es' ? 'index.es.js' : 'index.js',
      cssFileName: 'style',
    },
    rolldownOptions: {
      output: {
        exports: 'named',
        assetFileNames: asset => asset.names.some(name => name.startsWith('feather-webfont.'))
          ? 'fonts/feather/[name][extname]'
          : '[name][extname]',
      },
    },
  },
})
