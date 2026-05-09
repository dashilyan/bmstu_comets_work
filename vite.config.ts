import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Добавьте эту строку
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
