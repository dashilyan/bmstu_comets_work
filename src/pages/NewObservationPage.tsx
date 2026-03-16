import { useEffect, useMemo, useRef, useState } from 'react'
import { runOnnxModelOnImage } from '../onnx/runOnnxImage'

type UploadedImage = {
  file: File
  url: string
  time: string
}

type FormState = {
  telescopeModel: string
  cameraModel: string
  geo: string
  comment: string
  brightness: string
  comaSize: string
}

const MAX_IMAGES = 10
const MODEL_URL = '/models/model.onnx'

type NewObservationPageProps = {
  onOpenObservationDetails?: () => void
}

export function NewObservationPage({ onOpenObservationDetails }: NewObservationPageProps) {
  const [images, setImages] = useState<UploadedImage[]>([])
  const imagesRef = useRef<UploadedImage[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [form, setForm] = useState<FormState>({
    telescopeModel: '',
    cameraModel: '',
    geo: '',
    comment: '',
    brightness: '',
    comaSize: '',
  })

  const [isRunning, setIsRunning] = useState(false)
  const [runError, setRunError] = useState<string | null>(null)
  const [runResult, setRunResult] = useState<string | null>(null)

  useEffect(() => {
    imagesRef.current = images
  }, [images])

  useEffect(() => {
    return () => {
      // Clean up any remaining object URLs on unmount
      for (const img of imagesRef.current) URL.revokeObjectURL(img.url)
    }
  }, [])

  const activeImage = images[activeIndex]?.file

  const photoCountLabel = useMemo(() => `${images.length}/${MAX_IMAGES}`, [images.length])

  function onPickFiles(files: FileList | null) {
    if (!files) return
    setRunError(null)
    setRunResult(null)

    setImages((prev) => {
      const next = [...prev]
      for (const f of Array.from(files)) {
        if (next.length >= MAX_IMAGES) break
        next.push({ file: f, url: URL.createObjectURL(f), time: '' })
      }
      return next
    })
  }

  function updateImageTime(idx: number, time: string) {
    setImages((prev) => prev.map((img, i) => (i === idx ? { ...img, time } : img)))
  }

  function removeImage(idx: number) {
    const lenBefore = images.length
    setImages((prev) => {
      const next = prev.slice()
      const [removed] = next.splice(idx, 1)
      if (removed) URL.revokeObjectURL(removed.url)
      return next
    })
    setActiveIndex((current) => {
      const lenAfter = Math.max(0, lenBefore - 1)
      if (lenAfter === 0) return 0
      if (idx < current) return Math.max(0, current - 1)
      if (idx === current) return Math.min(current, lenAfter - 1)
      return current
    })
    setRunError(null)
    setRunResult(null)
  }

  async function onSubmit() {
    setRunError(null)
    setRunResult(null)

    if (!activeImage) {
      setRunError('Сначала добавьте хотя бы одну фотографию.')
      return
    }

    setIsRunning(true)
    try {
      const r = await runOnnxModelOnImage({ modelUrl: MODEL_URL, file: activeImage, topK: 5 })

      if (r.topIndices && r.topValues) {
        const lines = r.topIndices.map((idx, i) => `#${i + 1}: class ${idx} (score ${r.topValues![i].toFixed(4)})`)
        setRunResult(`Модель отработала. Выход: ${r.outputName} [${r.outputType}] dims=${JSON.stringify(r.outputDims)}\n${lines.join('\n')}`)
      } else {
        setRunResult(`Модель отработала. Выход: ${r.outputName} [${r.outputType}] dims=${JSON.stringify(r.outputDims)}`)
      }
    } catch (e) {
      setRunError(e instanceof Error ? e.message : 'Ошибка запуска модели.')
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="app-topbar">
        <div className="container py-3 d-flex align-items-center justify-content-between">
          <div className="app-brand fs-3">Cometica</div>
          <nav className="d-flex gap-4">
            <a className="app-link" href="#">
              FAQ
            </a>
            <a className="app-link" href="#">
              Лидеры
            </a>
            <a
              className="app-link"
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onOpenObservationDetails?.()
              }}
            >
              Наблюдения
            </a>
            <a className="app-link" href="#">
              Кометы
            </a>
            <a className="app-link" href="#">
              Профиль
            </a>
          </nav>
        </div>
      </header>

      <main className="container flex-grow-1 py-4">
        <div className="app-surface p-4 p-md-5">
          <div className="app-breadcrumb mb-2">Главная / Профиль / Создание наблюдения</div>
          <div className="d-flex align-items-end justify-content-between flex-wrap gap-3 mb-4">
            <div className="app-title fs-2 text-uppercase">Создание нового наблюдения</div>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="app-section-title text-uppercase">Добавьте фотографии</div>
            <div className="text-white-50">{photoCountLabel}</div>
          </div>

          <div className="app-surface app-surface--thin p-3 mb-4">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
              <div className="text-white-50">Выберите до {MAX_IMAGES} фото. Клик по превью — выбрать активное.</div>
              <label className="btn btn-sm btn-outline-light">
                Добавить фото
                <input
                  className="d-none"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => onPickFiles(e.target.files)}
                />
              </label>
            </div>

            <div className="row g-3">
              {Array.from({ length: Math.max(5, Math.min(MAX_IMAGES, images.length || 5)) }).map((_, idx) => {
                const img = images[idx]
                const isActive = idx === activeIndex
                return (
                  <div className="col-6 col-md-4 col-lg-2" key={idx}>
                    {img ? (
                      <div>
                        <div className="position-relative mb-2">
                          <button
                            type="button"
                            className={`photo-slot ${isActive ? 'border border-2 border-light' : ''}`}
                            onClick={() => setActiveIndex(idx)}
                            title="Выбрать"
                          >
                            <img src={img.url} alt={`upload-${idx}`} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-dark position-absolute top-0 end-0 m-1"
                            onClick={() => removeImage(idx)}
                            aria-label="Удалить"
                            title="Удалить"
                          >
                            ×
                          </button>
                        </div>
                        <input
                          type="time"
                          className="form-control form-control-sm app-input"
                          value={img.time}
                          onChange={(e) => updateImageTime(idx, e.target.value)}
                          placeholder="Время"
                        />
                      </div>
                    ) : (
                      <div className="photo-slot photo-slot--empty text-white-50">+</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-lg-6">
              <div className="app-section-title text-uppercase mb-3">Укажите параметры наблюдения</div>

              <div className="mb-3">
                <div className="text-white-50 mb-1">Модель телескопа</div>
                <input
                  className="form-control app-input"
                  value={form.telescopeModel}
                  onChange={(e) => setForm((p) => ({ ...p, telescopeModel: e.target.value }))}
                />
              </div>

              <div className="mb-3">
                <div className="text-white-50 mb-1">Модель фотокамеры</div>
                <input
                  className="form-control app-input"
                  value={form.cameraModel}
                  onChange={(e) => setForm((p) => ({ ...p, cameraModel: e.target.value }))}
                />
              </div>

              <div className="mb-3">
                <div className="text-white-50 mb-1">Географические координаты</div>
                <input
                  className="form-control app-input"
                  value={form.geo}
                  onChange={(e) => setForm((p) => ({ ...p, geo: e.target.value }))}
                />
              </div>

              <div className="mb-3">
                <div className="text-white-50 mb-1">Комментарии</div>
                <textarea
                  className="form-control app-input"
                  rows={3}
                  value={form.comment}
                  onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
                />
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="app-section-title text-uppercase mb-3">Укажите параметры кометы</div>

              <div className="mb-3">
                <div className="text-white-50 mb-1">Яркость</div>
                <input
                  className="form-control app-input"
                  value={form.brightness}
                  onChange={(e) => setForm((p) => ({ ...p, brightness: e.target.value }))}
                />
              </div>

              <div className="mb-3">
                <div className="text-white-50 mb-1">Размер комы</div>
                <input
                  className="form-control app-input"
                  value={form.comaSize}
                  onChange={(e) => setForm((p) => ({ ...p, comaSize: e.target.value }))}
                />
              </div>

              <div className="mt-4">
                <button className="btn btn-outline-light px-4 py-2" type="button" onClick={onSubmit} disabled={isRunning}>
                  {isRunning ? 'Распознаю…' : 'Сохранить наблюдение'}
                </button>
              </div>

              {(runError || runResult) && (
                <div className="mt-3">
                  {runError && <div className="alert alert-danger mb-2">{runError}</div>}
                  {runResult && (
                    <pre className="app-surface app-surface--thin p-3 mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                      {runResult}
                    </pre>
                  )}
                  <div className="text-white-50 mt-2" style={{ fontSize: '0.9rem' }}>
                    Модель берётся из <code className="text-white">public/models/model.onnx</code>.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="container py-3 text-white-50" style={{ fontSize: '0.9rem' }}>
        Фон: <code className="text-white">public/background.jpg</code>
      </footer>
    </div>
  )
}
