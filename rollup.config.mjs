import babel from "@rollup/plugin-babel"
import url from "@rollup/plugin-url"
import terser from "@rollup/plugin-terser"
import external from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

import pkg from "./package.json" assert {
  type: 'json',
  // integrity: 'sha384-ABC123'
};

const config ={
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: false,
    }),
    url(),
    terser(),
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs()
  ],
}

export default config