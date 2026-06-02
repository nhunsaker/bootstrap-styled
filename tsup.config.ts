import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // Keep peers external — the consumer brings React + styled-components.
  // @floating-ui/react is a real dependency, also left external (installed by
  // the consumer's package manager via our dependencies).
  external: ['react', 'react-dom', 'styled-components', '@floating-ui/react'],
})
