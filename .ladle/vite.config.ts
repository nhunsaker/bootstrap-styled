import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config for Ladle docs (distinct from the playground's vite.config.ts
// which has root:'playground'). Ladle uses this via .ladle/config.mjs viteConfig.
export default defineConfig({
  plugins: [react()],
  // Serve public/ as static files. The logo SVG lives at public/transparent-logo.svg
  // → reachable at /bootstrap-styled/transparent-logo.svg in both dev and Pages.
  publicDir: 'public',
})
