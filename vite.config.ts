import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only review playground (not part of the published package). Serves
// `playground/`, which imports components straight from `src/`.
export default defineConfig({
  plugins: [react()],
  root: 'playground',
  server: { port: 5174 },
})
