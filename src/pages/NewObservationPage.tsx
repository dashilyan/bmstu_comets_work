import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { runOnnxModelOnImage } from '../onnx/runOnnxImage'
import { AppHeader } from '../components/AppHeader'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { useApiWithFallback } from '../hooks/useApiWithFallback'
import { api } from '../api/api'
import { MOCK_TELESCOPES } from '../data/mockData'
import type { ApiTelescope } from '../api/types'

type UploadedImage = { file: File; url: string; time: string }

type FormState = {
  telescopeId: string
  telescopeManualModel: string
  telescopeManualFocal: string
  telescopeManualMfr: string
  cameraModel: string
  pixelSize: string
  centerRA: string
  centerDec: string
  location: string
  brightness: string
  comaSize: string
  tailLength: string
  notes: string
}

const MIN_IMAGES = 3
const MAX_IMAGES = 10
const MODEL_URL = '/models/model.onnx'
const SLOT_SIZE = 200

const inputStyle: React.CSSProperties = {
  width: '100%', height: '48px', backgroundColor: 'rgba(255,255,255,0.1)',
  border: 'none', borderRadius: '24px', padding: '0 20px', fontSize: '16px',
  color: '#fff', outline: 'none', fontFamily: 'Naga', boxSizing: 'border-box',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none' as const,
}

const labelStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga',
}

const cardBorder: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '32px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
}

const toggleBase: React.CSSProperties = {
  padding: '8px 20px', border: 'none', borderRadius: '24px', fontSize: '14px',
  cursor: 'pointer', fontFamily: 'Naga', transition: 'background-color 0.2s, color 0.2s',
}

export function NewObservationPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.body.classList.remove('main-page')
    return () => {}
  }, [])

  const [images, setImages] = useState<UploadedImage[]>([])
  const imagesRef = useRef<UploadedImage[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [telescopeMode, setTelescopeMode] = useState<'select' | 'manual'>('select')

  const [form, setForm] = useState<FormState>({
    telescopeId: '',
    telescopeManualModel: '', telescopeManualFocal: '', telescopeManualMfr: '',
    cameraModel: '', pixelSize: '', centerRA: '', centerDec: '',
    location: '', brightness: '', comaSize: '', tailLength: '', notes: '',
  })

  const submittingRef = useRef(false)
  const [isRunning, setIsRunning] = useState(false)
  const [runError, setRunError] = useState<string | null>(null)
  const [runResult, setRunResult] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const { data: telescopes } = useApiWithFallback<ApiTelescope[]>(() => api.getTelescopes(), MOCK_TELESCOPES)

  useEffect(() => { imagesRef.current = images }, [images])
  useEffect(() => {
    return () => { for (const img of imagesRef.current) URL.revokeObjectURL(img.url) }
  }, [])

  // сколько слотов показываем: минимум 3, плюс 1 пустой если есть куда добавлять
  const slotsCount = useMemo(
    () => Math.max(MIN_IMAGES, images.length < MAX_IMAGES ? images.length + 1 : MAX_IMAGES),
    [images.length],
  )
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

  // авто-заполняем focal length при выборе телескопа из списка
  function onTelescopeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value
    setForm((p) => ({ ...p, telescopeId: id }))
    if (id) {
      const t = telescopes.find((t) => String(t.id) === id)
      if (t?.focal_length) {
        setForm((p) => ({ ...p, telescopeId: id, telescopeManualFocal: String(t.focal_length) }))
      }
    }
  }

  async function onSubmit() {
    if (submittingRef.current) return
    setRunError(null); setRunResult(null); setSubmitSuccess(false)

    if (images.length < MIN_IMAGES) {
      setRunError(`Загрузите минимум ${MIN_IMAGES} фотографии.`)
      return
    }
    if (!form.centerRA || !form.centerDec) {
      setRunError('Укажите координаты центра поля (RA и Dec).')
      return
    }

    if (telescopeMode === 'select' && !form.telescopeId) {
      setRunError('Выберите телескоп из списка.')
      return
    }
    if (telescopeMode === 'manual' && !form.telescopeManualModel.trim()) {
      setRunError('Введите модель телескопа.')
      return
    }

    submittingRef.current = true
    setIsRunning(true)
    try {
      // Resolve telescope id
      let telescopeId = form.telescopeId
      if (telescopeMode === 'manual') {
        const t = await api.findOrCreateTelescope({
          model_name: form.telescopeManualModel.trim(),
          focal_length: form.telescopeManualFocal ? parseFloat(form.telescopeManualFocal) : null,
          manufacturer: form.telescopeManualMfr.trim() || null,
        })
        telescopeId = String(t.id)
      }

      // Run ONNX model on active image
      let onnxResult = ''
      const activeImage = images[activeIndex]?.file
      if (activeImage) {
        try {
          const r = await runOnnxModelOnImage({ modelUrl: MODEL_URL, file: activeImage, topK: 5 })
          if (r.topIndices && r.topValues) {
            const lines = r.topIndices.map((idx, i) => `#${i + 1}: class ${idx} (score ${r.topValues![i].toFixed(4)})`)
            onnxResult = `Модель: ${r.outputName} dims=${JSON.stringify(r.outputDims)}\n${lines.join('\n')}`
          } else {
            onnxResult = `Модель отработала. Выход: ${r.outputName}`
          }
        } catch {
          onnxResult = 'Модель ONNX недоступна'
        }
      }

      // Submit to backend
      const formData = new FormData()
      formData.append('telescope_id', telescopeId)
      formData.append('date_obs', new Date().toISOString())
      formData.append('coordinates', `${form.centerRA},${form.centerDec}`)
      formData.append('notes', form.notes)
      formData.append('is_public', 'false')
      if (form.brightness) formData.append('brightness', form.brightness)
      if (form.comaSize) formData.append('coma', form.comaSize)
      for (const img of images) formData.append('photos', img.file)

      try {
        const obs = await api.createObservation(formData)
        setRunResult(`${onnxResult ? onnxResult + '\n\n' : ''}Наблюдение #${obs.id} создано успешно!`)
        setSubmitSuccess(true)
        setTimeout(() => navigate(`/obs-details/${obs.id}`), 1500)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Ошибка'
        setRunResult(`${onnxResult ? onnxResult + '\n\n' : ''}(Сервер: ${msg} — наблюдение не сохранено)`)
      }
    } catch (e) {
      setRunError(e instanceof Error ? e.message : 'Ошибка при обработке.')
    } finally {
      submittingRef.current = false
      setIsRunning(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '48px auto 0' }}>
        <Breadcrumbs crumbs={[
          { label: 'Главная', to: '/' },
          { label: 'Профиль', to: '/profile' },
          { label: 'Создание наблюдения' },
        ]} />
        <h1 style={{ fontSize: '36px', color: '#fff', textTransform: 'uppercase', margin: '16px 0 0', fontFamily: 'Lemon Milk' }}>
          Создание нового наблюдения
        </h1>
      </div>

      <main className="flex-grow-1">
        <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '40px auto 64px' }}>

          {/* ── Фото ── */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '24px', color: '#fff', textTransform: 'uppercase', margin: 0, fontFamily: 'Lemon Milk' }}>
                Добавить фотографии
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: images.length < MIN_IMAGES ? '#ff9800' : 'rgba(255,255,255,0.6)', fontSize: '16px', fontFamily: 'Naga' }}>
                  {photoCountLabel} (мин. {MIN_IMAGES})
                </span>
                <label style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '24px', position: 'relative', color: '#fff', fontSize: '15px', fontFamily: 'Naga' }}>
                    <div style={cardBorder} />
                    <span>+ Добавить фото</span>
                  </div>
                  <input
                    ref={fileInputRef}
                    className="d-none" type="file" accept="image/*" multiple
                    onChange={(e) => onPickFiles(e.target.files)}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>

            {/* Прокручиваемая лента слотов */}
            <div style={{ overflowX: 'auto', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '16px', minWidth: 'min-content' }}>
                {Array.from({ length: slotsCount }).map((_, idx) => {
                  const img = images[idx]
                  const isActive = idx === activeIndex && !!img
                  return (
                    <div
                      key={idx}
                      style={{
                        flexShrink: 0, width: `${SLOT_SIZE}px`,
                        padding: '12px', backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: '20px',
                        border: isActive ? '2px solid rgba(255,255,255,0.8)' : '2px solid transparent',
                      }}
                    >
                      {img ? (
                        <>
                          <div style={{ position: 'relative', marginBottom: '10px' }}>
                            <div
                              onClick={() => setActiveIndex(idx)}
                              style={{ width: '100%', aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.3)' }}
                            >
                              <img src={img.url} alt={`upload-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <button
                              onClick={() => removeImage(idx)}
                              style={{ position: 'absolute', top: '6px', right: '6px', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >×</button>
                          </div>
                          <div>
                            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', display: 'block', marginBottom: '4px', fontFamily: 'Naga' }}>Время (UTC.мс)</label>
                            <input
                              type="text" placeholder="ЧЧ:ММ:СС.ссс" value={img.time}
                              onChange={(e) => updateImageTime(idx, e.target.value)}
                              style={{ width: '100%', height: '32px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '16px', padding: '0 10px', fontSize: '12px', color: '#fff', outline: 'none', fontFamily: 'Naga', boxSizing: 'border-box' }}
                            />
                          </div>
                        </>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          style={{ width: '100%', aspectRatio: '1', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '32px', cursor: 'pointer' }}
                        >+</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Поля формы ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginTop: '64px' }}>
            {/* Левая колонка */}
            <div>
              <h2 style={{ fontSize: '24px', color: '#fff', textTransform: 'uppercase', marginBottom: '24px', fontFamily: 'Lemon Milk' }}>Параметры съемки</h2>
              <div style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontFamily: 'Naga' }}>* Обязательные поля</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Телескоп: переключатель режима */}
                <div>
                  <label style={labelStyle}>Телескоп *</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setTelescopeMode('select')}
                      style={{
                        ...toggleBase,
                        backgroundColor: telescopeMode === 'select' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)',
                        color: telescopeMode === 'select' ? '#fff' : 'rgba(255,255,255,0.5)',
                      }}
                    >Выбрать из списка</button>
                    <button
                      type="button"
                      onClick={() => setTelescopeMode('manual')}
                      style={{
                        ...toggleBase,
                        backgroundColor: telescopeMode === 'manual' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)',
                        color: telescopeMode === 'manual' ? '#fff' : 'rgba(255,255,255,0.5)',
                      }}
                    >Ввести вручную</button>
                  </div>

                  {telescopeMode === 'select' ? (
                    <div style={{ position: 'relative' }}>
                      <select value={form.telescopeId} onChange={onTelescopeSelect} style={selectStyle}>
                        <option value="">— выберите телескоп —</option>
                        {telescopes.map((t) => (
                          <option key={t.id} value={t.id} style={{ backgroundColor: '#1a1f2a' }}>
                            {t.model_name}{t.focal_length ? ` (f=${t.focal_length} мм)` : ''}
                          </option>
                        ))}
                      </select>
                      <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '12px', pointerEvents: 'none' }}>▼</div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <input type="text" placeholder="Модель телескопа *" value={form.telescopeManualModel} onChange={setF('telescopeManualModel')} style={inputStyle} />
                      <input type="text" placeholder="Фокусное расстояние (мм)" value={form.telescopeManualFocal} onChange={setF('telescopeManualFocal')} style={inputStyle} />
                      <input type="text" placeholder="Производитель" value={form.telescopeManualMfr} onChange={setF('telescopeManualMfr')} style={inputStyle} />
                    </div>
                  )}
                </div>

                {/* RA */}
                <div>
                  <label style={labelStyle}>Прямое восхождение центра поля (RA) *</label>
                  <input type="text" placeholder="чч:мм:сс.сс или градусы" value={form.centerRA} onChange={setF('centerRA')} style={inputStyle} />
                </div>

                {/* Dec */}
                <div>
                  <label style={labelStyle}>Склонение центра поля (Dec) *</label>
                  <input type="text" placeholder="±гг:мм:сс.сс или градусы" value={form.centerDec} onChange={setF('centerDec')} style={inputStyle} />
                </div>

                {/* Pixel */}
                <div>
                  <label style={labelStyle}>Размер пикселя (мкм)</label>
                  <input type="text" placeholder="например: 5.4" value={form.pixelSize} onChange={setF('pixelSize')} style={inputStyle} />
                </div>

                {/* Camera model */}
                <div>
                  <label style={labelStyle}>Модель фотокамеры</label>
                  <input type="text" placeholder="например: ZWO ASI294MC" value={form.cameraModel} onChange={setF('cameraModel')} style={inputStyle} />
                </div>
              </div>
            </div>

            {/* Правая колонка */}
            <div>
              <h2 style={{ fontSize: '24px', color: '#fff', textTransform: 'uppercase', marginBottom: '24px', fontFamily: 'Lemon Milk' }}>Дополнительная информация</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Место наблюдения</label>
                  <input type="text" placeholder="Обсерватория или координаты" value={form.location} onChange={setF('location')} style={inputStyle} />
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
                  <textarea
                    rows={4} value={form.notes} onChange={setF('notes')}
                    style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '24px', padding: '12px 20px', fontSize: '16px', color: '#fff', outline: 'none', resize: 'vertical', fontFamily: 'Naga', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Кнопка submit ── */}
          <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              onClick={onSubmit}
              disabled={isRunning || submitSuccess}
              style={{
                padding: '16px 48px',
                backgroundColor: submitSuccess ? 'rgba(76,175,80,0.3)' : 'rgba(255,255,255,0.1)',
                border: 'none', position: 'relative',
                cursor: (isRunning || submitSuccess) ? 'not-allowed' : 'pointer',
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
