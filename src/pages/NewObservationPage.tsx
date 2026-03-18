import { useEffect, useMemo, useRef, useState } from 'react'
import { runOnnxModelOnImage } from '../onnx/runOnnxImage'

type UploadedImage = {
  file: File
  url: string
  time: string  // время съемки (UTC) с миллисекундами
}

type FormState = {
  // Параметры наблюдения (нужны для пересчета пикселей в RA/Dec)
  telescopeModel: string      // модель телескопа (для информации)
  cameraModel: string         // модель камеры (для информации)
  focalLength: string        // фокусное расстояние (мм) - ВАЖНО
  pixelSize: string          // размер пикселя (мкм) - ВАЖНО
  centerRA: string           // прямое восхождение центра поля - ВАЖНО
  centerDec: string          // склонение центра поля - ВАЖНО
  location: string           // место наблюдения (для отчета)
  observer: string           // наблюдатель (для отчета)
  
  // Параметры кометы (для информации)
  brightness: string         // яркость (зв. величина)
  comaSize: string          // размер комы
  tailLength: string        // длина хвоста
  notes: string             // примечания
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
    focalLength: '',
    pixelSize: '',
    centerRA: '',
    centerDec: '',
    location: '',
    observer: '',
    brightness: '',
    comaSize: '',
    tailLength: '',
    notes: ''
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

    // Проверка обязательных полей для пересчета координат
    if (!form.focalLength || !form.pixelSize || !form.centerRA || !form.centerDec) {
      setRunError('Для расчета координат необходимо заполнить: фокусное расстояние, размер пикселя, координаты центра поля.')
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
      <header 
        className="app-topbar position-relative overflow-hidden" 
        style={{ 
          height: '96px',
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Зоны свечения */}
        <div
          className="position-absolute"
          style={{
            left: '963px',
            top: '-474px',
            width: '672px',
            height: '670px',
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 14%, rgba(255, 255, 255, 0) 100%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
        
        <div
          className="position-absolute"
          style={{
            left: '27px',
            top: '-183px',
            width: '762px',
            height: '759px',
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 14%, rgba(255, 255, 255, 0) 100%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Навигация */}
        <div className="container h-100 px-0 position-relative" style={{ maxWidth: 'calc(100% - 160px)', margin: '0 80px', zIndex: 2 }}>
          <div className="d-flex align-items-center justify-content-between h-100">
            <div className="app-brand" style={{ fontSize: '40px', fontFamily: 'Marlino' }}>Cometica</div>
            <nav className="d-flex" style={{ fontSize: '20px', width: '644px', fontFamily: 'Naga' }}>
              <a className="app-link flex-fill text-center" href="#">FAQ</a>
              <a className="app-link flex-fill text-center" href="#">Лидеры</a>
              <a className="app-link flex-fill text-center" href="#">Наблюдения</a>
              <a className="app-link flex-fill text-center" href="#">Кометы</a>
              <a className="app-link flex-fill text-center" href="#">Профиль</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumbs и заголовок */}
      <div 
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          width: 'calc(100% - 80px)',
          margin: '48px auto 0',
        }}
      >
        <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '16px', fontFamily: 'Naga' }}>
          Главная / Профиль / Создание наблюдения
        </div>
        
        <h1 style={{ 
          fontSize: '36px', 
          color: '#ffffff', 
          textTransform: 'uppercase',
          margin: 0, 
          fontFamily: 'Lemon Milk'
        }}>
          Создание нового наблюдения
        </h1>
      </div>

      <main className="flex-grow-1">
        <div 
          className="mx-auto"
          style={{
            maxWidth: '1280px',
            width: 'calc(100% - 80px)',
            margin: '40px auto 64px',
          }}
        >
          {/* Блок добавления фотографий */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h2 style={{ 
                fontSize: '24px', 
                color: '#ffffff', 
                textTransform: 'uppercase',
                margin: 0, 
                fontFamily: 'Lemon Milk'
              }}>
                Добавить фотографии
              </h2>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', fontFamily: 'Naga' }}>
                {photoCountLabel}
              </span>
            </div>

            {/* Кнопка добавления фото */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ cursor: 'pointer' }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '32px',
                    position: 'relative',
                    color: '#ffffff',
                    fontSize: '16px', 
                    fontFamily: 'Naga'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '32px',
                      padding: '1px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      pointerEvents: 'none'
                    }}
                  />
                  <span>+ Добавить фото</span>
                </div>
                <input
                  className="d-none"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => onPickFiles(e.target.files)}
                  style={{ display: 'none' }}
                />
              </label>
              <span style={{ marginLeft: '16px', color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: 'Naga' }}>
                до {MAX_IMAGES} фото
              </span>
            </div>

            {/* Сетка изображений */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '20px'
            }}>
              {Array.from({ length: Math.max(5, Math.min(MAX_IMAGES, images.length || 5)) }).map((_, idx) => {
                const img = images[idx]
                const isActive = idx === activeIndex
                return (
                  <div key={idx} style={{
                    padding: '16px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '24px',
                    border: isActive ? '2px solid rgba(255,255,255,0.8)' : '2px solid transparent'
                  }}>
                    {img ? (
                      <>
                        <div style={{ position: 'relative', marginBottom: '12px' }}>
                          <div
                            onClick={() => setActiveIndex(idx)}
                            style={{
                              width: '100%',
                              aspectRatio: '1',
                              borderRadius: '16px',
                              overflow: 'hidden',
                              cursor: 'pointer',
                              backgroundColor: 'rgba(0,0,0,0.3)'
                            }}
                          >
                            <img 
                              src={img.url} 
                              alt={`upload-${idx}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                          <button
                            onClick={() => removeImage(idx)}
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(0,0,0,0.6)',
                              border: '1px solid rgba(255,255,255,0.3)',
                              color: '#ffffff',
                              fontSize: '18px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center', 
                              fontFamily: 'Naga'
                            }}
                          >
                            ×
                          </button>
                        </div>
                        
                        {/* Время съемки с миллисекундами */}
                        <div>
                          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', display: 'block', marginBottom: '4px', fontFamily: 'Naga' }}>
                            Время съемки (UTC.мс) *
                          </label>
                          <input
                            type="text"
                            placeholder="ЧЧ:ММ:СС.ссс"
                            value={img.time}
                            onChange={(e) => updateImageTime(idx, e.target.value)}
                            style={{
                              width: '100%',
                              height: '36px',
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              border: 'none',
                              borderRadius: '18px',
                              padding: '0 12px',
                              fontSize: '14px',
                              color: '#ffffff',
                              outline: 'none', 
                              fontFamily: 'Naga'
                            }}
                            required
                          />
                        </div>
                      </>
                    ) : (
                      <div style={{
                        width: '100%',
                        aspectRatio: '1',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255,255,255,0.2)',
                        fontSize: '32px', 
                        fontFamily: 'Naga'
                      }}>
                        +
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Блок ввода данных - два столбца */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '48px',
            marginTop: '64px'
          }}>
            {/* Левый столбец - параметры наблюдения */}
            <div>
              <h2 style={{ 
                fontSize: '24px', 
                color: '#ffffff', 
                textTransform: 'uppercase',
                marginBottom: '24px', 
                fontFamily: 'Lemon Milk'
              }}>
                Параметры съемки
              </h2>
              
              <div style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontFamily: 'Naga' }}>
                * Поля, отмеченные звездочкой, обязательны для расчета координат
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Координаты центра поля */}
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Прямое восхождение центра поля (RA) *
                  </label>
                  <input
                    type="text"
                    placeholder="чч:мм:сс.сс"
                    value={form.centerRA}
                    onChange={(e) => setForm(p => ({ ...p, centerRA: e.target.value }))}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '0 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none', 
                      fontFamily: 'Naga'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Склонение центра поля (Dec) *
                  </label>
                  <input
                    type="text"
                    placeholder="±гг:мм:сс.сс"
                    value={form.centerDec}
                    onChange={(e) => setForm(p => ({ ...p, centerDec: e.target.value }))}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '0 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none', 
                      fontFamily: 'Naga'
                    }}
                    required
                  />
                </div>

                {/* Оптические параметры */}
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Фокусное расстояние (мм) *
                  </label>
                  <input
                    type="text"
                    placeholder="например: 1000"
                    value={form.focalLength}
                    onChange={(e) => setForm(p => ({ ...p, focalLength: e.target.value }))}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '0 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none', 
                      fontFamily: 'Naga'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Размер пикселя (мкм) *
                  </label>
                  <input
                    type="text"
                    placeholder="например: 5.4"
                    value={form.pixelSize}
                    onChange={(e) => setForm(p => ({ ...p, pixelSize: e.target.value }))}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '0 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none', 
                      fontFamily: 'Naga'
                    }}
                    required
                  />
                </div>

                {/* Информационные поля */}
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Модель телескопа
                  </label>
                  <input
                    type="text"
                    placeholder="например: Celestron C8"
                    value={form.telescopeModel}
                    onChange={(e) => setForm(p => ({ ...p, telescopeModel: e.target.value }))}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '0 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none', 
                      fontFamily: 'Naga'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Модель фотокамеры
                  </label>
                  <input
                    type="text"
                    placeholder="например: ZWO ASI294MC"
                    value={form.cameraModel}
                    onChange={(e) => setForm(p => ({ ...p, cameraModel: e.target.value }))}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '0 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none', 
                      fontFamily: 'Naga'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Правый столбец - дополнительные параметры */}
            <div>
              <h2 style={{ 
                fontSize: '24px', 
                color: '#ffffff', 
                textTransform: 'uppercase',
                marginBottom: '24px', 
                fontFamily: 'Lemon Milk'
              }}>
                Дополнительная информация
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Место наблюдения
                  </label>
                  <input
                    type="text"
                    placeholder="Обсерватория или координаты"
                    value={form.location}
                    onChange={(e) => setForm(p => ({ ...p, location: e.target.value }))}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '0 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none', fontFamily: 'Naga'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Наблюдатель
                  </label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={form.observer}
                    onChange={(e) => setForm(p => ({ ...p, observer: e.target.value }))}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '0 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none', fontFamily: 'Naga'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Яркость кометы
                  </label>
                  <input
                    type="text"
                    placeholder="например: 8.5m"
                    value={form.brightness}
                    onChange={(e) => setForm(p => ({ ...p, brightness: e.target.value }))}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '0 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none', fontFamily: 'Naga'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Размер комы
                  </label>
                  <input
                    type="text"
                    placeholder="например: 15' × 12'"
                    value={form.comaSize}
                    onChange={(e) => setForm(p => ({ ...p, comaSize: e.target.value }))}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '0 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none', fontFamily: 'Naga'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Длина хвоста
                  </label>
                  <input
                    type="text"
                    placeholder="например: 2.5°"
                    value={form.tailLength}
                    onChange={(e) => setForm(p => ({ ...p, tailLength: e.target.value }))}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '0 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none', fontFamily: 'Naga'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'block', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Примечания
                  </label>
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '12px 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none',
                      resize: 'vertical', fontFamily: 'Naga'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Кнопка сохранения и результаты модели */}
          <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              onClick={onSubmit}
              disabled={isRunning}
              style={{
                padding: '16px 48px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                position: 'relative',
                cursor: isRunning ? 'not-allowed' : 'pointer',
                fontSize: '20px',
                color: '#ffffff',
                borderRadius: '32px',
                outline: 'none',
                opacity: isRunning ? 0.5 : 1, fontFamily: 'Naga'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '32px',
                  padding: '1px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  pointerEvents: 'none'
                }}
              />
              <span>{isRunning ? 'Обработка...' : 'Сохранить наблюдение'}</span>
            </button>

            {(runError || runResult) && (
              <div style={{ marginTop: '24px', width: '100%' }}>
                {runError && (
                  <div style={{
                    padding: '16px',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    borderRadius: '16px',
                    color: '#ff6b6b',
                    border: '1px solid rgba(255, 107, 107, 0.3)'
                  }}>
                    {runError}
                  </div>
                )}
                {runResult && (
                  <pre style={{
                    padding: '16px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    color: '#ffffff',
                    whiteSpace: 'pre-wrap',
                    fontSize: '14px', fontFamily: 'Naga'
                  }}>
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