import { useEffect } from 'react';

export function Register() {
  useEffect(() => {
    document.body.classList.remove('main-page');
    return () => {};
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
            <div className="app-brand" style={{ fontSize: '40px' }}>Cometica</div>
            <nav className="d-flex" style={{ fontSize: '20px', width: '644px' }}>
              <a className="app-link flex-fill text-center" href="#">FAQ</a>
              <a className="app-link flex-fill text-center" href="#">Лидеры</a>
              <a className="app-link flex-fill text-center" href="#">Наблюдения</a>
              <a className="app-link flex-fill text-center" href="#">Кометы</a>
              <a className="app-link flex-fill text-center" href="#">Профиль</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Контейнер для центрирования блока регистрации */}
      <div 
        className="position-relative d-flex justify-content-center"
        style={{
          width: '100%',
          marginTop: '64px'
        }}
      >
        {/* Основной блок регистрации - адаптивная высота */}
        <div
          style={{
            width: '512px',
            height: 'auto', // адаптивная высота
            minHeight: 'min-content', // чтобы точно схлопывался по контенту
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '32px',
            position: 'relative',
            backdropFilter: 'blur(16px)',
            boxShadow: '10px 10px 16px 0px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '44px',
            padding: '40px 0'
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

          {/* Аватарка */}
          <div
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              overflow: 'hidden'
            }}
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="7" r="4" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
            </svg>
          </div>

          {/* Блок ввода данных */}
          <div
            style={{
              width: '432px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            {/* Поле Логин */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              position: 'relative'
            }}>
              <label style={{ fontSize: '24px', color: '#ffffff' }}>Логин</label>
              <input
                type="text"
                style={{
                  width: '100%',
                  height: '42px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '32px',
                  padding: '0 20px',
                  fontSize: '18px',
                  color: '#ffffff',
                  outline: 'none',
                  position: 'relative',
                  zIndex: 1
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: 0,
                  width: '100%',
                  height: '42px',
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
            </div>

            {/* Поле Образование */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              position: 'relative'
            }}>
              <label style={{ fontSize: '24px', color: '#ffffff' }}>Образование</label>
              <input
                type="text"
                style={{
                  width: '100%',
                  height: '42px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '32px',
                  padding: '0 20px',
                  fontSize: '18px',
                  color: '#ffffff',
                  outline: 'none',
                  position: 'relative',
                  zIndex: 1
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: 0,
                  width: '100%',
                  height: '42px',
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
            </div>

            {/* Поле Пароль */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              position: 'relative'
            }}>
              <label style={{ fontSize: '24px', color: '#ffffff' }}>Пароль</label>
              <input
                type="password"
                style={{
                  width: '100%',
                  height: '42px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '32px',
                  padding: '0 20px',
                  fontSize: '18px',
                  color: '#ffffff',
                  outline: 'none',
                  position: 'relative',
                  zIndex: 1
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: 0,
                  width: '100%',
                  height: '42px',
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
            </div>

            {/* Поле Повторите пароль */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              position: 'relative'
            }}>
              <label style={{ fontSize: '24px', color: '#ffffff' }}>Повторите пароль</label>
              <input
                type="password"
                style={{
                  width: '100%',
                  height: '42px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '32px',
                  padding: '0 20px',
                  fontSize: '18px',
                  color: '#ffffff',
                  outline: 'none',
                  position: 'relative',
                  zIndex: 1
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: 0,
                  width: '100%',
                  height: '42px',
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
            </div>
          </div>

          {/* Кнопка регистрации */}
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
              color: '#ffffff',
              letterSpacing: '1px',
              borderRadius: '32px',
              outline: 'none',
              flexShrink: 0
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
            <span>Зарегистрироваться</span>
          </button>
        </div>
      </div>
    </div>
  );
}