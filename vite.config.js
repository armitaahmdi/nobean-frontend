import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  // Determine API URL based on environment
  // In development: use localhost
  // In production: use production server
  const isDev = mode === 'development'
  const apiTarget = env.VITE_API_URL || (isDev ? 'http://localhost:8888' : 'https://www.nobean.ir')
  
  return {
    base: '/',
    plugins: [
      react(),
      // Enable with `ANALYZE=true npm run build` to open bundle analysis
      ...(process.env.ANALYZE ? [visualizer({ open: true, brotliSize: true, gzipSize: true, filename: 'dist/stats.html' })] : [])
    ],
    server: {
      port: 5173,
      host: true,
      // Disable caching in development
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      // Only proxy in development mode
      ...(isDev && {
        proxy: {
          '/api': {
            target: apiTarget,
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, '/api')
          },
          '/uploads': {
            target: apiTarget,
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/uploads/, '/uploads')
          }
        }
      })
    },
    build: {
      target: 'es2019',
      cssCodeSplit: true,
      sourcemap: false,
      // Force file names to include hash for cache busting
      rollupOptions: {
        output: {
          // Add hash to filenames for cache busting
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            redux: ['@reduxjs/toolkit', 'react-redux'],
            charts: ['chart.js', 'react-chartjs-2'],
            motion: ['framer-motion'],
            ui: ['react-icons', '@heroicons/react', 'swiper'],
            excel: ['xlsx'],
          }
        }
      },
      chunkSizeWarningLimit: 900
    }
  }
})
