import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { runOnnxModelOnImage } from '../onnx/runOnnxImage'
import { AppHeader } from '../components/AppHeader'
import { useApiWithFallback } from '../hooks/useApiWithFallback'
import { api } from '../api/api'
import { MOCK_COMETS, MOCK_TELESCOPES } from '../data/mockData'
import type { ApiComet, ApiTelescope } from '../api/types'

type UploadedImage = { file: File; url: string; time: string }

type FormState = {
  cometId: string
  telescopeId: string
  telescopeModel: string
  cameraModel: string
  focalLength: string
  pixelSize: string
  centerRA: string
  centerDec: string
  location: string
  observer: string
  brightness: string
  comaSize: string
  tailLength: string
  notes: string
}

const MAX_IMAGES = 10
const MODEL_URL = '/models/model.onnx'

const inputStyle: React.CSSProperties = {
  width: '100%', height: '48px', backgroundColor: 'rgba(255,255,255,0.1)',
  border: 'none', borderRadius: '24px', padding: '0 20px', fontSize: '16px',
  color: '#fff', outline: 'none', fontFamily: 'Naga',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none' as const,
}

const labelStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga',
}

export function NewObservationPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.remove('main-page')
    return () => {}
  }, [])

  const [images, setImages] = useState<UploadedImage[]>([])
  const imagesRef = useRef<UploadedImage[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [form, setForm] = useState<FormState>({
    cometId: '', telescopeId: '', telescopeModel: '', cameraModel: '',
    focalLength: '', pixelSize: '', centerRA: '', centerDec: '',
    location: '', observer: '', brightness: '', comaSize: '', tailLength: '', notes: '',
  })

  const [isRunning, setIsRunning] = useState(false)
  const [runError, setRunError] = useState<string | null>(null)
  const [runResult, setRunResult] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const { data: comets } = useApiWithFallback<ApiComet[]>(() => api.getComets(), MOCK_COMETS)
  const { data: telescopes } = useApiWithFallback<ApiTelescope[]>(() => api.getTelescopes(), MOCK_TELESCOPES)

  useEffect(() => { imagesRef.current = images }, [images])
  useEffect(() => {
    return () => { for (const img of imagesRef.current) URL.revokeObjectURL(img.url) }
  }, [])

  const activeImage = images[activeIndex]?.file
  const photoCountLabel = useMemo(() => `${images.length}/${MAX_IMAGES}`, [images.length])

  function setF<K extends keyof FormState>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }))
  }

  function onPickFiles(files: FileList | null) {
    if (!files) return
    setRunError(null); setRunResult(null)
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
    setRunError(null); setRunResult(null)
  }

  async function onSubmit() {
    setRunError(null); setRunResult(null); setSubmitSuccess(false)

    if (!activeImage) { setRunError('Сначала добавьте хотя бы одну фотографию.'); return }
    if (!form.focalLength || !form.pixelSize || !form.centerRA || !form.centerDec) {
      setRunError('Для расчета координат необходимо заполнить: фокусное расстояние, размер пикселя, координаты центра поля.')
      return
    }
    if (!form.cometId) { setRunError('Выберите комету из списка.'); return }
    if (!form.telescopeId) { setRunError('Выберите телескоп из списка.'); return }

    setIsRunning(true)
    try {
      // Run ONNX model
      let onnxResult = ''
      try {
        const r = await runOnnxModelOnImage({ modelUrl: MODEL_URL, file: activeImage, topK: 5 })
        if (r.topIndices && r.topValues) {
          const lines = r.topIndices.map((idx, i) => `#${i + 1}: class ${idx} (score ${r.topValues![i].toFixed(4)})`)
          onnxResult = `Модель: ${r.outputName} dims=${JSON.stringify(r.outputDims)}\n${lines.join('\n')}`
        } else {
          onnxResult = `Модель отработала. Выход: ${r.outputName}`
        }
      } catch {
        onnxResult = 'Модель ONNX недоступна (файл модели не найден)'
      }

      // Submit to backend
      const formData = new FormData()
      formData.append('comet_id', form.cometId)
      formData.append('telescope_id', form.telescopeId)
      formData.append('date_obs', new Date().toISOString())
      formData.append('coordinates', `${form.centerRA} / ${form.centerDec}`)
      formData.append('notes', form.notes)
      formData.append('is_public', 'false')
      if (form.brightness) formData.append('brightness', form.brightness)
      if (form.comaSize) formData.append('coma', form.comaSize)
      for (const img of images) formData.append('photos', img.file)

      try {
        const obs = await api.createObservation(formData)
        setRunResult(`${onnxResult}\n\nНаблюдение #${obs.id} создано успешно!`)
        setSubmitSuccess(true)
        setTimeout(() => navigate('/obs-table'), 2000)
      } catch {
        setRunResult(`${onnxResult}\n\n(Сервер недоступен — наблюдение не сохранено на сервере)`)
      }
    } catch (e) {
      setRunError(e instanceof Error ? e.message : 'Ошибка при обработке.')
    } finally {
      setIsRunning(false)
    }
  }

  const cardBorder: React.CSSProperties = {
    position: 'absolute', inset: 0, borderRadius: '32px', padding: '1px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '48px auto 0' }}>
        <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px', fontFamily: 'Naga' }}>
          Главная / Профиль / Создание наблюдения
        </div>
        <h1 style={{ fontSize: '36px', color: '#fff', textTransform: 'uppercase', margin: 0, fontFamily: 'Lemon Milk' }}>
          Создание нового наблюдения
        </h1>
      </div>

      <main className="flex-grow-1">
        <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '40px auto 64px' }}>

          {/* Photo upload */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '24px', color: '#fff', textTransform: 'uppercase', margin: 0, fontFamily: 'Lemon Milk' }}>
                Добавить фотографии
              </h2>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', fontFamily: 'Naga' }}>{photoCountLabel}</span>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ cursor: 'pointer' }}>
                <div style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px', position: 'relative', color: '#fff', fontSize: '16px', fontFamily: 'Naga' }}>
                  <div style={cardBorder} />
                  <span>+ Добавить фото</span>
                </div>
                <input className="d-none" type="file" accept="image/*" multiple onChange={(e) => onPickFiles(e.target.files)} style={{ display: 'none' }} />
              </label>
              <span style={{ marginLeft: '16px', color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: 'Naga' }}>до {MAX_IMAGES} фото</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
              {Array.from({ length: Math.max(5, Math.min(MAX_IMAGES, images.length || 5)) }).map((_, idx) => {
                const img = images[idx]
                const isActive = idx === activeIndex
                return (
                  <div key={idx} style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '24px', border: isActive ? '2px solid rgba(255,255,255,0.8)' : '2px solid transparent' }}>
                    {img ? (
                      <>
                        <div style={{ position: 'relative', marginBottom: '12px' }}>
                          <div onClick={() => setActiveIndex(idx)} style={{ width: '100%', aspectRatio: '1', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <img src={img.url} alt={`upload-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <button onClick={() => removeImage(idx)} style={{ position: 'absolute', top: '8px', right: '8px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                        </div>
                        <div>
                          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', display: 'block', marginBottom: '4px', fontFamily: 'Naga' }}>Время съемки (UTC.мс) *</label>
                          <input type="text" placeholder="ЧЧ:ММ:СС.ссс" value={img.time} onChange={(e) => updateImageTime(idx, e.target.value)} style={{ width: '100%', height: '36px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '18px', padding: '0 12px', fontSize: '14px', color: '#fff', outline: 'none', fontFamily: 'Naga' }} />
                        </div>
                      </>
                    ) : (
                      <div style={{ width: '100%', aspectRatio: '1', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '32px' }}>+</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Form fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginTop: '64px' }}>
            {/* Left column */}
            <div>
              <h2 style={{ fontSize: '24px', color: '#fff', textTransform: 'uppercase', marginBottom: '24px', fontFamily: 'Lemon Milk' }}>Параметры съемки</h2>
              <div style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontFamily: 'Naga' }}>* Обязательные поля</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Comet select */}
                <div>
                  <label style={labelStyle}>Комета *</label>
                  <div style={{ position: 'relative' }}>
                    <select value={form.cometId} onChange={setF('cometId')} style={selectStyle}>
                      <option value="">— выберите комету —</option>
                      {comets.map((c) => <option key={c.id} value={c.id} style={{ backgroundColor: '#1a1f2a' }}>{c.official_name}</option>)}
                    </select>
                    <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '12px', pointerEvents: 'none' }}>▼</div>
                  </div>
                </div>

                {/* Telescope select */}
                <div>
                  <label style={labelStyle}>Телескоп *</label>
                  <div style={{ position: 'relative' }}>
                    <select value={form.telescopeId} onChange={setF('telescopeId')} style={selectStyle}>
                      <option value="">— выберите телескоп —</option>
                      {telescopes.map((t) => <option key={t.id} value={t.id} style={{ backgroundColor: '#1a1f2a' }}>{t.model_name}</option>)}
                    </select>
                    <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '12px', pointerEvents: 'none' }}>▼</div>
                  </div>
                </div>

                {/* RA */}
                <div>
                  <label style={labelStyle}>Прямое восхождение центра поля (RA) *</label>
                  <input type="text" placeholder="чч:мм:сс.сс" value={form.centerRA} onChange={setF('centerRA')} style={inputStyle} />
                </div>

                {/* Dec */}
                <div>
                  <label style={labelStyle}>Склонение центра поля (Dec) *</label>
                  <input type="text" placeholder="±гг:мм:сс.сс" value={form.centerDec} onChange={setF('centerDec')} style={inputStyle} />
                </div>

                {/* Focal */}
                <div>
                  <label style={labelStyle}>Фокусное расстояние (мм) *</label>
                  <input type="text" placeholder="например: 1000" value={form.focalLength} onChange={setF('focalLength')} style={inputStyle} />
                </div>

                {/* Pixel */}
                <div>
                  <label style={labelStyle}>Размер пикселя (мкм) *</label>
                  <input type="text" placeholder="например: 5.4" value={form.pixelSize} onChange={setF('pixelSize')} style={inputStyle} />
                </div>

                {/* Telescope model */}
                <div>
                  <label style={labelStyle}>Модель телескопа</label>
                  <input type="text" placeholder="например: Celestron C8" value={form.telescopeModel} onChange={setF('telescopeModel')} style={inputStyle} />
                </div>

                {/* Camera model */}
                <div>
                  <label style={labelStyle}>Модель фотокамеры</label>
                  <input type="text" placeholder="например: ZWO ASI294MC" value={form.cameraModel} onChange={setF('cameraModel')} style={inputStyle} />
                </div>
              </div>
            </div>

            {/* Right column */}
            <div>
              <h2 style={{ fontSize: '24px', color: '#fff', textTransform: 'uppercase', marginBottom: '24px', fontFamily: 'Lemon Milk' }}>Дополнительная информация</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Место наблюдения</label>
                  <input type="text" placeholder="Обсерватория или координаты" value={form.location} onChange={setF('location')} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Наблюдатель</label>
                  <input type="text" placeholder="Ваше имя" value={form.observer} onChange={setF('observer')} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Яркость кометы</label>
                  <input type="text" placeholder="например: 8.5m" value={form.brightness} onChange={setF('brightness')} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Размер комы</label>
                  <input type="text" placeholder="например: 15' × 12'" value={form.comaSize} onChange={setF('comaSize')} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Длина хвоста</label>
                  <input type="text" placeholder="например: 2.5°" value={form.tailLength} onChange={setF('tailLength')} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Примечания</label>
                  <textarea rows={4} value={form.notes} onChange={setF('notes')} style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '24px', padding: '12px 20px', fontSize: '16px', color: '#fff', outline: 'none', resize: 'vertical', fontFamily: 'Naga' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              onClick={onSubmit}
              disabled={isRunning || submitSuccess}
              style={{
                padding: '16px 48px', backgroundColor: submitSuccess ? 'rgba(76,175,80,0.3)' : 'rgba(255,255,255,0.1)',
                border: 'none', position: 'relative', cursor: (isRunning || submitSuccess) ? 'not-allowed' : 'pointer',
                fontSize: '20px', color: '#fff', borderRadius: '32px', outline: 'none',
                opacity: isRunning ? 0.5 : 1, fontFamily: 'Naga',
              }}
            >
              <div style={cardBorder} />
              <span>{isRunning ? 'Обработка...' : submitSuccess ? 'Сохранено!' : 'Сохранить наблюдение'}</span>
            </button>

            {(runError || runResult) && (
              <div style={{ marginTop: '24px', width: '100%' }}>
                {runError && (
                  <div style={{ padding: '16px', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: '16px', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.3)', fontFamily: 'Naga' }}>
                    {runError}
                  </div>
                )}
                {runResult && (
                  <pre style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', color: '#fff', whiteSpace: 'pre-wrap', fontSize: '14px', fontFamily: 'Naga' }}>
                    {runResult}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
