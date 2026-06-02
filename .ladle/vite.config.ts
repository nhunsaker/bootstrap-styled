import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config for Ladle docs (distinct from the playground's vite.config.ts
// which has root:'playground'). Ladle uses this via .ladle/config.mjs viteConfig.
export default defineConfig({
  plugins: [react()],
  // Serve the project root as public files so assets/ is reachable at
  // /bootstrap-styled/assets/* in both dev and the GitHub Pages build.
  publicDir: '.',
})
