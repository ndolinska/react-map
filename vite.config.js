import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    })],
  base: '/react-map/',
  server: {
    proxy: {
      '/react-map': {
        target: 'https://nominatim.openstreetmap.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/react-map/, ''),
        headers: {
          'User-Agent': 'Map-Student-Project',
          'Accept-Language': 'pl'
        }
      }
    }
  }
})
