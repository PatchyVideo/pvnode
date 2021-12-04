import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true,
  },
  external: [/node_modules/],
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    typescript({
      target: 'es2019',
      include: ['src/**/*.ts'],
      esModuleInterop: true,
    }),
    commonjs({
      extensions: ['.js'],
    }),
    json(),
  ],
}
