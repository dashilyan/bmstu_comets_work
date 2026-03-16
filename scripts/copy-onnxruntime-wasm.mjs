import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const distDir = path.join(projectRoot, 'node_modules', 'onnxruntime-web', 'dist')
const outDir = path.join(projectRoot, 'public', 'onnxruntime')

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function copyFile(src, dst) {
  fs.copyFileSync(src, dst)
}

function main() {
  if (!fs.existsSync(distDir)) {
    console.warn('[copy-onnxruntime-wasm] onnxruntime-web dist not found:', distDir)
    return
  }

  ensureDir(outDir)

  const files = fs
    .readdirSync(distDir)
    .filter((f) => /^ort-wasm-.*\.(wasm|mjs)$/.test(f))

  if (files.length === 0) {
    console.warn('[copy-onnxruntime-wasm] no ort-wasm assets found in:', distDir)
    return
  }

  for (const f of files) {
    copyFile(path.join(distDir, f), path.join(outDir, f))
  }

  console.log(`[copy-onnxruntime-wasm] copied ${files.length} file(s) to public/onnxruntime/`)
}

main()
