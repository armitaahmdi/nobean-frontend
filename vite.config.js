import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'https://www.nobean.ir',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
      '/uploads': {
        target: 'https://www.nobean.ir',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/uploads/, '/uploads')
      }
    }
  }
})
