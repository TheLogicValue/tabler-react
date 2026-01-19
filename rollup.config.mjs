
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'

const config = {
  input: 'src/index.js',
  output: [
    { file: 'dist/index.js', format: 'cjs', exports: 'named', sourcemap: true },
    { file: 'dist/index.es.js', format: 'es', sourcemap: true },
  ],
  external: ['react', 'react-dom', 'react-router-dom', '@popperjs/core', 'react-popper'],
  plugins: [
    external(),
    babel({
      babelHelpers: 'runtime',
      exclude: /node_modules/,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: ['@babel/preset-env', '@babel/preset-flow'],
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-json-strings',
      ],
    }),
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']
    }),
    commonjs(),
    postcss({ modules: false }),
    url(),
    terser(),
  ],
}

export default config
