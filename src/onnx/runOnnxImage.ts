import * as ort from 'onnxruntime-web'

type ImageTensorLayout = 'NCHW' | 'NHWC'

type ModelRunResult = {
  outputName: string
  outputType: string
  outputDims: readonly number[]
  topIndices?: number[]
  topValues?: number[]
  raw?: ort.Tensor
}

let sessionPromise: Promise<ort.InferenceSession> | null = null

function pickImageSizeFromDims(dims: readonly number[], layout: ImageTensorLayout): number {
  // Typical: NCHW [1,3,H,W] or NHWC [1,H,W,3]
  const h = layout === 'NCHW' ? dims[2] : dims[1]
  const w = layout === 'NCHW' ? dims[3] : dims[2]
  const hh = typeof h === 'number' && Number.isFinite(h) && h > 0 ? h : 224
  const ww = typeof w === 'number' && Number.isFinite(w) && w > 0 ? w : 224
  return Math.min(hh, ww)
}

function detectLayoutFromDims(dims: readonly number[]): ImageTensorLayout {
  if (dims.length === 4 && dims[1] === 3) return 'NCHW'
  if (dims.length === 4 && dims[3] === 3) return 'NHWC'
  return 'NCHW'
}

async function loadImageElement(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file)
  try {
    const img = new Image()
    img.decoding = 'async'
    img.src = url
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('Не удалось загрузить изображение.'))
    })
    return img
  } finally {
    URL.revokeObjectURL(url)
  }
}

function drawToSquareCanvas(img: HTMLImageElement, size: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D context not available.')

  // Center-crop to square then resize (like common vision preprocessing)
  const sw = img.naturalWidth
  const sh = img.naturalHeight
  const s = Math.min(sw, sh)
  const sx = Math.floor((sw - s) / 2)
  const sy = Math.floor((sh - s) / 2)

  ctx.drawImage(img, sx, sy, s, s, 0, 0, size, size)
  return canvas
}

function imageDataToTensor(
  imageData: ImageData,
  layout: ImageTensorLayout,
  inputType: ort.Tensor.Type
): ort.Tensor {
  const { data, width, height } = imageData

  if (inputType === 'uint8') {
    const out = new Uint8Array(width * height * 3)
    for (let i = 0, j = 0; i < data.length; i += 4) {
      out[j++] = data[i] // R
      out[j++] = data[i + 1] // G
      out[j++] = data[i + 2] // B
    }
    const dims = layout === 'NCHW' ? [1, 3, height, width] : [1, height, width, 3]
    if (layout === 'NCHW') {
      // Convert RGB interleaved -> planar
      const planar = new Uint8Array(width * height * 3)
      const area = width * height
      for (let p = 0; p < area; p++) {
        planar[p] = out[p * 3]
        planar[area + p] = out[p * 3 + 1]
        planar[2 * area + p] = out[p * 3 + 2]
      }
      return new ort.Tensor('uint8', planar, dims)
    }
    return new ort.Tensor('uint8', out, dims)
  }

  // default float32 [0..1]
  const out = new Float32Array(width * height * 3)
  for (let i = 0, j = 0; i < data.length; i += 4) {
    out[j++] = data[i] / 255
    out[j++] = data[i + 1] / 255
    out[j++] = data[i + 2] / 255
  }

  const dims = layout === 'NCHW' ? [1, 3, height, width] : [1, height, width, 3]
  if (layout === 'NCHW') {
    const planar = new Float32Array(width * height * 3)
    const area = width * height
    for (let p = 0; p < area; p++) {
      planar[p] = out[p * 3]
      planar[area + p] = out[p * 3 + 1]
      planar[2 * area + p] = out[p * 3 + 2]
    }
    return new ort.Tensor('float32', planar, dims)
  }
  return new ort.Tensor('float32', out, dims)
}

function topK(values: Float32Array, k: number): { indices: number[]; scores: number[] } {
  const idx = Array.from(values, (_, i) => i)
  idx.sort((a, b) => values[b] - values[a])
  const top = idx.slice(0, Math.max(1, Math.min(k, idx.length)))
  return { indices: top, scores: top.map((i) => values[i]) }
}

export async function runOnnxModelOnImage(params: {
  modelUrl: string
  file: File
  topK?: number
}): Promise<ModelRunResult> {
  const { modelUrl, file } = params

  if (!sessionPromise) {
    ort.env.wasm.wasmPaths = '/onnxruntime/'
    ort.env.wasm.numThreads = Math.min(4, navigator.hardwareConcurrency || 1)
    sessionPromise = ort.InferenceSession.create(modelUrl, {
      executionProviders: ['wasm'],
    })
  }

  const session = await sessionPromise
  const inputName = session.inputNames?.[0]
  const inputMeta = session.inputMetadata?.[0]
  if (!inputName || !inputMeta) throw new Error('Model has no inputs.')

  const inputShape = inputMeta.isTensor ? inputMeta.shape : []
  const inputDims = inputShape.map((d) => (typeof d === 'number' ? d : -1))
  const layout = detectLayoutFromDims(inputDims)
  const size = pickImageSizeFromDims(inputDims, layout)
  const inputType: ort.Tensor.Type = (inputMeta.isTensor ? inputMeta.type : 'float32') || 'float32'

  const img = await loadImageElement(file)
  const canvas = drawToSquareCanvas(img, size)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D context not available.')

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const inputTensor = imageDataToTensor(imageData, layout, inputType)

  const feeds: Record<string, ort.Tensor> = { [inputName]: inputTensor }
  const results = await session.run(feeds)

  const outputName = Object.keys(results)[0]
  if (!outputName) throw new Error('Model returned no outputs.')
  const output = results[outputName]

  const result: ModelRunResult = {
    outputName,
    outputType: output.type,
    outputDims: output.dims,
    raw: output,
  }

  if (output.type === 'float32' && output.data instanceof Float32Array) {
    const { indices, scores } = topK(output.data, params.topK ?? 5)
    result.topIndices = indices
    result.topValues = scores
  }

  return result
}
