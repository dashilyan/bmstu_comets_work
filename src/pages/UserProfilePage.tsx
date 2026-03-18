import { useEffect } from 'react';

export function UserProfile() {
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
          margin: '80px auto 0',
        }}
      >
        <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>
          Главная / Профиль
        </div>
      </div>

      {/* Основной блок с функциями */}
      <div 
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          width: 'calc(100% - 80px)',
          margin: '32px auto 0',
          display: 'flex',
          gap: '80px',
        }}
      >
        {/* Левая узкая часть (без изменений) */}
        <div
          style={{
            width: '300px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '32px',
            position: 'relative',
            backdropFilter: 'blur(16px)',
            boxShadow: '10px 10px 16px 0px rgba(0, 0, 0, 0.25)',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '600px',
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
          
          {/* Аватарка по центру */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px'
            }}
          >
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="7" r="4" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* Блок с именем и количеством наблюдений */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 'auto'
            }}
          >
            <div style={{ fontSize: '24px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Lemon Milk' }}>
              Дарья Рабочая
            </div>
            <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>
              42 наблюдения
            </div>
          </div>

          {/* Блок со ссылками */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '12px',
              marginTop: '20px'
            }}
          >
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '18px', fontFamily: 'Naga' }}>
              Настройки профиля
            </a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '18px', fontFamily: 'Naga' }}>
              Мои наблюдения
            </a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '18px', fontFamily: 'Naga' }}>
              Избранное
            </a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '18px', fontFamily: 'Naga' }}>
              Помощь
            </a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '18px', fontFamily: 'Naga' }}>
              Выйти
            </a>
          </div>
        </div>

        {/* Правая широкая часть */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          {/* Верхний блок - симпатичная статистика */}
          <div
            style={{
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '32px',
              position: 'relative',
              backdropFilter: 'blur(16px)',
              boxShadow: '10px 10px 16px 0px rgba(0, 0, 0, 0.25)',
              padding: '32px',
              minHeight: '200px',
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
            
            {/* Статистика в 4 колонки */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
                height: '100%',
                alignItems: 'center'
              }}
            >
              {/* Всего наблюдений */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '12px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"/>
                    <path d="M12 6V12L16 14" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: '32px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Lemon Milk' }}>42</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>наблюдений</div>
              </div>

              {/* Подтверждено */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '12px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: '32px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Lemon Milk' }}>38</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>подтверждено</div>
              </div>

              {/* Верифицировано */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '12px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: '32px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Lemon Milk' }}>35</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>верифицировано</div>
              </div>

              {/* Точность */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '12px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20V10M18 20V4M6 20V16" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: '32px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Lemon Milk' }}>92.5%</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>точность</div>
              </div>
            </div>
          </div>

          {/* Нижний блок - наблюдения со статусом */}
          <div
            style={{
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '32px',
              position: 'relative',
              backdropFilter: 'blur(16px)',
              boxShadow: '10px 10px 16px 0px rgba(0, 0, 0, 0.25)',
              padding: '32px',
              minHeight: '400px',
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
            
            {/* Заголовок */}
            <h3 style={{ 
              fontSize: '20px', 
              marginBottom: '24px', 
              textTransform: 'uppercase',
              color: '#ffffff', fontFamily: 'Lemon Milk'
            }}>
              Наблюдения
            </h3>

            {/* Сетка с наблюдениями */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px'
              }}
            >
              {/* Наблюдение 1 */}
              <div>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    marginBottom: '12px',
                    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
                    backgroundSize: '20px 20px'
                  }}
                />
                <div style={{ fontSize: '16px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Naga' }}>C/2023 A3</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px', fontFamily: 'Naga' }}>12.03.2026</div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#4caf50',
                  display: 'inline-block',
                  padding: '4px 8px',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  borderRadius: '20px', fontFamily: 'Naga'
                }}>
                  подтверждено
                </div>
              </div>

              {/* Наблюдение 2 */}
              <div>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    marginBottom: '12px',
                    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
                    backgroundSize: '20px 20px'
                  }}
                />
                <div style={{ fontSize: '16px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Naga' }}>12P/Pons-Brooks</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px', fontFamily: 'Naga' }}>05.03.2026</div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#ff9800',
                  display: 'inline-block',
                  padding: '4px 8px',
                  backgroundColor: 'rgba(255, 152, 0, 0.1)',
                  borderRadius: '20px', fontFamily: 'Naga'
                }}>
                  на проверке
                </div>
              </div>

              {/* Наблюдение 3 */}
              <div>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    marginBottom: '12px',
                    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
                    backgroundSize: '20px 20px'
                  }}
                />
                <div style={{ fontSize: '16px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Naga' }}>C/2024 E1</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px', fontFamily: 'Naga' }}>28.02.2026</div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#f44336',
                  display: 'inline-block',
                  padding: '4px 8px',
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  borderRadius: '20px', fontFamily: 'Naga'
                }}>
                  требуется проверка
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}