import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import strip from "@rollup/plugin-strip";
import json from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";
import copy from 'rollup-plugin-copy';

export default defineConfig([
  {
    input: "src/main.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()]
  },
  {
    input: "src/main.ts",
    output: [{ file: "dist/index.mjs", format: "es" }],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        babelHelpers: "bundled",
        presets: [["@babel/preset-env", { modules: false, loose: true }]],
        exclude: "node_modules/**",
      }),
      typescript(),
      strip(),
      json(),
      copy({
        targets: [{
          dest: ['dist/public'],
          src: ['public/*'],
        }],
        expandDirectories: false
      }),
    ],
  }
]);
