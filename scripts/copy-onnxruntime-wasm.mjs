import { copyFileSync, mkdirSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = join(__dirname, '../node_modules/onnxruntime-web/dist')
const dest = join(__dirname, '../public/onnxruntime')

mkdirSync(dest, { recursive: true })

// Only copy .wasm files — .mjs files are served from node_modules via Vite middleware
for (const file of readdirSync(src)) {
  if (file.endsWith('.wasm')) {
    copyFileSync(join(src, file), join(dest, file))
  }
}

console.log('onnxruntime-web wasm assets copied to public/onnxruntime/')
