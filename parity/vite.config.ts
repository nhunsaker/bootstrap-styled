import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// Parity harness dev server. Serves `parity/` (this dir) as root so the
// vendored oracle under `parity/oracle/` is reachable at `./oracle/*`, and
// imports bootstrap-styled straight from `../src`.
export default defineConfig({
  plugins: [react()],
  root: fileURLToPath(new URL('.', import.meta.url)),
  server: { port: 5178, strictPort: true },
})
