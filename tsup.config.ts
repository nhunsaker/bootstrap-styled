import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // Keep peers external — the consumer brings React + styled-components.
  external: ['react', 'react-dom', 'styled-components'],
})
