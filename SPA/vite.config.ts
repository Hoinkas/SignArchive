import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@contexts': fileURLToPath(new URL('./contexts', import.meta.url)),
      '@shared': fileURLToPath(new URL('./shared', import.meta.url)),
      '@renderer': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
