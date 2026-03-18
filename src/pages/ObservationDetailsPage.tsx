type ObservationDetailsPageProps = {
  onBackToNew?: () => void
}

export function ObservationDetailsPage({ onBackToNew }: ObservationDetailsPageProps) {
  const images = [
    '/sample-comet-1.jpg',
    '/sample-comet-2.jpg',
    '/sample-comet-3.jpg',
  ]

  const observationId = 1234

  const fields: { label: string; value: string }[] = [
    { label: 'Модель телескопа', value: 'Celestron C8 Schmidt-Cassegrain' },
    { label: 'Модель фотокамеры', value: 'ZWO ASI294MC Pro' },
    { label: 'Географические координаты', value: '55°45\'N, 37°37\'E' },
    { label: 'Яркость кометы', value: '8.5m' },
    { label: 'Размер комы', value: '15\' × 12\'' },
    { label: 'Комментарии', value: 'Хорошая видимость, слабая диффузия' },
    { label: 'Прямое восхождение', value: '12h 34m 56.7s' },
    { label: 'Склонение', value: '+45° 12\' 34"' },
  ]

  const orbitalParams: { label: string; value: string; description?: string }[] = [
    { label: 'q', value: '1.2', description: 'перигелийное расстояние (а.е.)' },
    { label: 'e', value: '0.85', description: 'эксцентриситет' },
    { label: 'i', value: '45°', description: 'наклонение орбиты' },
    { label: 'Ω', value: '123.4°', description: 'долгота восходящего узла' },
    { label: 'ω', value: '67.8°', description: 'аргумент перигелия' },
    { label: 'T', value: '2026.345', description: 'время перигелия (юлианский год)' },
  ]

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

      {/* Breadcrumbs */}
      <div 
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          width: 'calc(100% - 80px)',
          margin: '48px auto 0',
        }}
      >
        <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>
          Главная / Наблюдения / Детали наблюдения
        </div>
      </div>

      <main className="flex-grow-1">
        <div 
          className="mx-auto"
          style={{
            maxWidth: '1280px',
            width: 'calc(100% - 80px)',
            margin: '32px auto 64px',
          }}
        >
          <div style={{ display: 'flex', gap: '32px' }}>
            {/* Левая колонка с изображением */}
            <div style={{ width: '45%' }}>
              <div
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '32px',
                  position: 'relative',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '10px 10px 16px 0px rgba(0, 0, 0, 0.25)',
                  overflow: 'hidden',
                  aspectRatio: '4 / 3'
                }}
              >
                {/* Градиентный контур */}
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
                    pointerEvents: 'none',
                    zIndex: 2
                  }}
                />
                
                {/* Изображение */}
                <img
                  src={images[0]}
                  alt="Наблюдение"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Стрелки навигации */}
                <button
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#ffffff',
                    fontSize: '24px',
                    backdropFilter: 'blur(4px)',
                    zIndex: 3, fontFamily: 'Naga'
                  }}
                >
                  ‹
                </button>
                <button
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#ffffff',
                    fontSize: '24px',
                    backdropFilter: 'blur(4px)',
                    zIndex: 3, fontFamily: 'Naga'
                  }}
                >
                  ›
                </button>

                {/* Индикатор текущего изображения */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '8px',
                    zIndex: 3
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: i === 0 ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                        transition: 'background-color 0.3s'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Правая колонка с информацией */}
            <div style={{ width: '55%' }}>
              <div
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '32px',
                  position: 'relative',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '10px 10px 16px 0px rgba(0, 0, 0, 0.25)',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Градиентный контур */}
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
                
                {/* Заголовок */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Наблюдение №{observationId}
                  </div>
                  <h2 style={{ fontSize: '28px', color: '#ffffff', margin: 0, textTransform: 'uppercase', fontFamily: 'Lemon Milk' }}>
                    Комета C/2023 A3
                  </h2>
                </div>

                {/* Список параметров */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  {fields.map((f) => (
                    <div
                      key={f.label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        paddingBottom: '8px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px', fontFamily: 'Naga' }}>
                        {f.label}
                      </span>
                      <span style={{ color: '#ffffff', fontSize: '15px', textAlign: 'right', maxWidth: '60%', fontFamily: 'Naga' }}>
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Таблица орбитальных параметров */}
                <div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    color: '#ffffff', 
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px', fontFamily: 'Lemon Milk'
                  }}>
                    Орбитальные параметры
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '20px',
                    padding: '16px'
                  }}>
                    {orbitalParams.map((param) => (
                      <div
                        key={param.label}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          padding: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '12px'
                        }}
                      >
                        <div style={{ 
                          fontSize: '20px', 
                          color: '#ffffff',
                          fontWeight: '500',
                          marginBottom: '4px', fontFamily: 'Naga'
                        }}>
                          {param.value}
                        </div>
                        <div style={{ 
                          fontSize: '14px', 
                          color: 'rgba(255, 255, 255, 0.5)',
                          marginBottom: '2px', fontFamily: 'Naga'
                        }}>
                          {param.label}
                        </div>
                        {param.description && (
                          <div style={{ 
                            fontSize: '11px', 
                            color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Naga'
                          }}>
                            {param.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Блок с информацией о наблюдателе */}
          <div style={{ marginTop: '32px' }}>
            <div
              style={{
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '32px',
                position: 'relative',
                backdropFilter: 'blur(16px)',
                boxShadow: '10px 10px 16px 0px rgba(0, 0, 0, 0.25)',
                padding: '24px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {/* Градиентный контур */}
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
              
              {/* Информация о пользователе */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="7" r="4" stroke="rgba(255,255,255,0.8)" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '18px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Naga' }}>
                    astro_daria
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Naga' }}>
                    123 наблюдения
                  </div>
                </div>
              </div>

              {/* Кнопка профиля */}
              <button
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#ffffff',
                  borderRadius: '32px',
                  outline: 'none', fontFamily: 'Naga'
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
                <span>Посмотреть профиль</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}