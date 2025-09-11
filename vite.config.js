import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.nobean.ir',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path
      },
      '/uploads': {
        target: 'https://api.nobean.ir',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path
      }
    }
  }
})
