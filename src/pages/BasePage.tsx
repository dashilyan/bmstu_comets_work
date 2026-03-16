export function Base() {
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
        {/* Первая зона */}
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
        
        {/* Вторая зона */}
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

        {/* Контент навигации */}
        <div className="container h-100 px-0 position-relative" style={{ maxWidth: 'calc(100% - 160px)', margin: '0 80px', zIndex: 2 }}>
          <div className="d-flex align-items-center justify-content-between h-100">
            <div className="app-brand" style={{ fontSize: '40px' }}>Cometica</div>
            <nav className="d-flex" style={{ fontSize: '20px', width: '644px' }}>
              <a className="app-link flex-fill text-center" href="#">
                FAQ
              </a>
              <a className="app-link flex-fill text-center" href="#">
                Лидеры
              </a>
              <a className="app-link flex-fill text-center" href="#">
                Наблюдения
              </a>
              <a className="app-link flex-fill text-center" href="#">
                Кометы
              </a>
              <a className="app-link flex-fill text-center" href="#">
                Профиль
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Прямоугольник с текстом - с такими же зонами */}
      <div 
        className="position-relative overflow-hidden"
        style={{
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          marginTop: '48px'
        }}
      >
        {/* Первая зона для текстового блока */}
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
        
        {/* Вторая зона для текстового блока */}
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

        {/* Контент текстового блока */}
        <div style={{ padding: '46px 0', position: 'relative', zIndex: 2 }}>
          <div 
            className="mx-auto"
            style={{
              maxWidth: '1280px',
              width: 'calc(100% - 80px)',
              margin: '0 auto'
            }}
          >
            <div 
              className="d-flex flex-column"
              style={{
                gap: '16px'
              }}
            >
              {/* Breadcrumbs */}
              <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)' }}>
                Главная / Категория / Текущая страница
              </div>
              
              {/* Заголовок капсом */}
              <div style={{ fontSize: '36px', color: '#ffffff', textTransform: 'uppercase' }}>
                ЗАГОЛОВОК СТРАНИЦЫ
              </div>
              
              {/* Подзаголовок */}
              <div style={{ fontSize: '24px', color: '#ffffff' }}>
                Описание или подзаголовок текущей страницы. Здесь может быть достаточно длинный текст, который будет переноситься на несколько строк в зависимости от ширины экрана.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}