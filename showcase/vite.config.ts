import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ukázka běží jen lokálně (`npm run showcase`) a nikam se nenasazuje.
// Kořen je složka showcase/, knihovna se importuje relativně ze ../src.
export default defineConfig({
  plugins: [react()],
  server: { port: 5199, strictPort: false },
  build: { outDir: '../dist-showcase', emptyOutDir: true },
})
