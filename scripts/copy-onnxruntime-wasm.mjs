import { copyFileSync, mkdirSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = join(__dirname, '../node_modules/onnxruntime-web/dist')
const dest = join(__dirname, '../public/onnxruntime')

mkdirSync(dest, { recursive: true })

for (const file of readdirSync(src)) {
  if (file.endsWith('.wasm') || file.endsWith('.mjs')) {
    copyFileSync(join(src, file), join(dest, file))
  }
}

console.log('onnxruntime-web assets copied to public/onnxruntime/')
