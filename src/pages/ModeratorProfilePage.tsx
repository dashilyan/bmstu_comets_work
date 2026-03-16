import { useEffect } from 'react';

export function ModeratorProfile() {
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

      {/* Breadcrumbs */}
      <div 
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          width: 'calc(100% - 80px)',
          margin: '80px auto 0',
        }}
      >
        <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)' }}>
          Главная / Профиль модератора
        </div>
      </div>

      {/* Основной блок */}
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
        {/* Левая узкая часть */}
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
          
          {/* Аватарка */}
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
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="7" r="4" stroke="rgba(255,255,255,0.8)" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* Информация о модераторе */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 'auto'
            }}
          >
            <div style={{ fontSize: '24px', color: '#ffffff', marginBottom: '4px' }}>
              Алексей Модератор
            </div>
            <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px' }}>
              Модератор
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
              На модерации с 2024
            </div>
          </div>

          {/* Инструменты модератора */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '12px',
              marginTop: '20px'
            }}
          >
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '18px' }}>
              Панель управления
            </a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '18px' }}>
              Очередь проверки
            </a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '18px' }}>
              Жалобы
            </a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '18px' }}>
              Статистика модерации
            </a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '18px' }}>
              Настройки
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
          {/* Верхний блок - статистика модерации */}
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
            
            {/* Статистика модерации - теперь 3 колонки */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Ожидает проверки */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '12px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"/>
                    <path d="M12 6V12L16 14" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: '32px', color: '#ffffff', marginBottom: '4px' }}>24</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>ожидают</div>
              </div>

              {/* Проверено сегодня */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '12px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: '32px', color: '#ffffff', marginBottom: '4px' }}>18</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>проверено</div>
              </div>

              {/* Отклонено */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '12px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: '32px', color: '#ffffff', marginBottom: '4px' }}>3</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>отклонено</div>
              </div>
            </div>
          </div>

          {/* Нижний блок - очередь на модерацию */}
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
            
            {/* Заголовок с фильтрами */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}
            >
              <h3 style={{ 
                fontSize: '20px', 
                textTransform: 'uppercase',
                color: '#ffffff',
                margin: 0
              }}>
                Очередь на проверку
              </h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <select style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  padding: '8px 16px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none'
                }}>
                  <option>Все типы</option>
                  <option>Изображения</option>
                  <option>Кометы</option>
                  <option>Пользователи</option>
                </select>
              </div>
            </div>

            {/* Список на модерацию */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Элемент 1 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '16px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
                  backgroundSize: '10px 10px'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', color: '#ffffff', marginBottom: '4px' }}>
                    Комета C/2024 A1 (пользователь: user123)
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                    10 мин назад • требуется проверка
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    ✓
                  </button>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    ✗
                  </button>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    details
                  </button>
                </div>
              </div>

              {/* Элемент 2 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '16px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
                  backgroundSize: '10px 10px'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', color: '#ffffff', marginBottom: '4px' }}>
                    Наблюдение 12P/Pons-Brooks (пользователь: astro_boris)
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                    1 час назад • ждет подтверждения
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    ✓
                  </button>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    ✗
                  </button>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    details
                  </button>
                </div>
              </div>

              {/* Элемент 3 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '16px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
                  backgroundSize: '10px 10px'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', color: '#ffffff', marginBottom: '4px' }}>
                    Жалоба на пользователя comet_hunter (пользователь: star_gazer)
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                    3 часа назад • нарушение правил
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    принять
                  </button>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    отклонить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}