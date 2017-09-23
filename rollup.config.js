import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

const env = process.env.NODE_ENV;

export default {
  input: 'src/index.js',
  output: {
    file: 'es/index.js',
    format: 'es'
  },
  external: [
    'react',
    'prop-types'
  ],
  plugins: [
    resolve({ jsnext: true }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    commonjs()
  ]
};
