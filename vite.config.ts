import {
  defineConfig,
  mergeConfig,
} from 'vite'

import dts from 'vite-plugin-dts'

import { join, resolve } from 'node:path'

import {
  name,
} from './package.json'

import basic from './vite.config.basic'

export default mergeConfig(basic, defineConfig({
  build: {
    lib: {
      name,
      formats: ['es', 'cjs'],
      entry: {
        'index': resolve(__dirname, './src/index.ts'),
      },
      fileName: (format, name) => `${name}.${{
        es: 'mjs',
        cjs: 'cjs',
      }[format as 'es' | 'cjs']}`,
    },
    minify: false,
    rollupOptions: {
      output: {
        exports: 'named',
        dir: join(__dirname, '/dist'),
        chunkFileNames: '[name].[format].js',
      },
    },
  },

  plugins: [
    dts({
      exclude: [
        'scripts/**/*.*',
        'tests/**/*.*',
      ],
      insertTypesEntry: true,
      staticImport: true,
    }),
  ],
}))