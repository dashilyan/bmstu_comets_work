import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-onnxruntime-mjs',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/onnxruntime/') && req.url.endsWith('.mjs')) {
            const filename = path.basename(req.url)
            const filePath = path.resolve(
              __dirname,
              `node_modules/onnxruntime-web/dist/${filename}`,
            )
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'application/javascript')
              res.end(fs.readFileSync(filePath))
              return
            }
          }
          next()
        })
      },
    },
  ],
  optimizeDeps: {
    exclude: ['onnxruntime-web'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
