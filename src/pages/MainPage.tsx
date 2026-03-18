import { useEffect } from 'react';

export function Main() {
  useEffect(() => {
    // Сохраняем оригинальный фон
    const originalBg = document.body.style.backgroundImage;
    
    // Меняем фон
    document.body.style.backgroundImage = 'url("./background_main.png")';
    
    // Возвращаем при размонтировании
    return () => {
      document.body.style.backgroundImage = originalBg;
    };
  }, []);

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

      {/* Основной контент */}
      <div 
        className="position-relative"
        style={{
          width: '100%',
          marginTop: '64px'
        }}
      >
        <div 
          className="mx-auto"
          style={{
            maxWidth: '1280px',
            width: 'calc(100% - 80px)',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Текстовый блок */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '24px',
              maxWidth: '1000px'
            }}
          >
            <div style={{ fontSize: '96px', color: '#ffffff', lineHeight: '1.1', fontFamily: 'Princess Diana' }}>
              Превратите свет в знание.
            </div>
            <div style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.85)', fontFamily: 'Naga' }}>
              Вы поймали луч от распадающейся древности на матрицу. 
              Мы помогаем совершить алхимию: преобразовать пиксели в параметры, 
              а восторг — в осмысленное открытие. Добро пожаловать в лабораторию 
              небесной механики.
            </div>
          </div>

          {/* Кнопка */}
          <div style={{ marginTop: '40px' }}>
            <button
              style={{
                padding: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                position: 'relative',
                cursor: 'pointer',
                fontSize: '24px',
                fontFamily: 'Naga',
                color: '#ffffff',
                letterSpacing: '1px',
                borderRadius: '32px',
                outline: 'none'
              }}
            >
              {/* Контур с градиентом */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '32px',
                  padding: '1px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(102,102,102,0) 25%, rgba(0,0,0,0) 66%, rgba(255,255,255,0.5) 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  pointerEvents: 'none'
                }}
              />
              <span>Сделать открытие</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}