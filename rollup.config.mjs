import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import terser from "@rollup/plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const config = {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
    {
      file: "dist/index.es.js",
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
      plugins: ["@babel/plugin-transform-json-strings"]
    }),
    resolve(),
    commonjs(),
  ],
};

export default config;
