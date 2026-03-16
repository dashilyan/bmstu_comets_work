import { useEffect } from 'react';

export function UserObservations() {
  useEffect(() => {
    document.body.classList.remove('main-page');
    return () => {};
  }, []);

  // Тестовые данные наблюдений
  const observations = [
    {
      id: 1234,
      cometName: 'C/2023 A3',
      date: '12.03.2026',
      coordinates: '12h 34m / +45° 12\'',
      status: 'подтверждено',
      statusColor: '#4caf50'
    },
    {
      id: 1235,
      cometName: '12P/Pons-Brooks',
      date: '05.03.2026',
      coordinates: '10h 22m / +38° 45\'',
      status: 'на проверке',
      statusColor: '#ff9800'
    },
    {
      id: 1236,
      cometName: 'C/2024 E1',
      date: '28.02.2026',
      coordinates: '14h 56m / -22° 18\'',
      status: 'требуется проверка',
      statusColor: '#f44336'
    },
    {
      id: 1237,
      cometName: 'C/2023 H2',
      date: '20.02.2026',
      coordinates: '08h 44m / +62° 33\'',
      status: 'подтверждено',
      statusColor: '#4caf50'
    },
    {
      id: 1238,
      cometName: '29P/Schwassmann-Wachmann',
      date: '15.02.2026',
      coordinates: '20h 12m / +11° 05\'',
      status: 'подтверждено',
      statusColor: '#4caf50'
    },
    {
      id: 1239,
      cometName: 'C/2024 J2',
      date: '10.02.2026',
      coordinates: '06h 30m / +15° 42\'',
      status: 'на проверке',
      statusColor: '#ff9800'
    },
    {
      id: 1240,
      cometName: 'C/2023 P1',
      date: '03.02.2026',
      coordinates: '18h 15m / -05° 20\'',
      status: 'требуется проверка',
      statusColor: '#f44336'
    }
  ];

  // Фильтры
  const filters = [
    { label: 'Название кометы', type: 'text', placeholder: 'Введите название...' },
    { label: 'Дата наблюдения', type: 'text', placeholder: 'ДД.ММ.ГГГГ' },
    { label: 'Статус', type: 'select', options: ['Все', 'Подтверждено', 'На проверке', 'Требуется проверка'] }
  ];

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
          Главная / Профиль / Мои наблюдения
        </div>
      </div>

      {/* Основной контент */}
      <div 
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          width: 'calc(100% - 80px)',
          margin: '32px auto 64px',
        }}
      >
        {/* Заголовок */}
        <h1 style={{ 
          fontSize: '36px', 
          color: '#ffffff', 
          textTransform: 'uppercase',
          marginBottom: '32px'
        }}>
          Мои наблюдения
        </h1>

        {/* Фильтры */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '48px',
          flexWrap: 'wrap'
        }}>
          {filters.map((filter) => (
            <div key={filter.label} style={{ flex: '1 1 200px' }}>
              <div style={{ 
                fontSize: '24px', 
                color: '#ffffff', 
                marginBottom: '8px'
              }}>
                {filter.label}
              </div>
              {filter.type === 'text' ? (
                <div style={{ position: 'relative', width: '100%' }}>
                  <input
                    type="text"
                    placeholder={filter.placeholder}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '32px',
                      padding: '0 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none',
                      position: 'relative',
                      zIndex: 1,
                      boxSizing: 'border-box'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
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
              ) : (
                <div style={{ position: 'relative', width: '100%' }}>
                  <select
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '32px',
                      padding: '0 20px',
                      fontSize: '16px',
                      color: '#ffffff',
                      outline: 'none',
                      position: 'relative',
                      zIndex: 1,
                      cursor: 'pointer',
                      appearance: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    {filter.options?.map(option => (
                      <option key={option} style={{ backgroundColor: '#1a1f2a' }}>{option}</option>
                    ))}
                  </select>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
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
                  {/* Стрелка для select */}
                  <div style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '12px',
                    zIndex: 3,
                    pointerEvents: 'none'
                  }}>
                    ▼
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Таблица наблюдений */}
        <div
          style={{
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '32px',
            position: 'relative',
            backdropFilter: 'blur(16px)',
            boxShadow: '10px 10px 16px 0px rgba(0, 0, 0, 0.25)',
            padding: '32px',
            overflow: 'hidden'
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

          {/* Таблица */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>ID</th>
                <th style={{ textAlign: 'left', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Комета</th>
                <th style={{ textAlign: 'left', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Дата</th>
                <th style={{ textAlign: 'left', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Координаты</th>
                <th style={{ textAlign: 'left', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Статус</th>
                <th style={{ textAlign: 'left', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((obs) => (
                <tr key={obs.id}>
                  <td style={{ padding: '12px 8px', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>#{obs.id}</td>
                  <td style={{ padding: '12px 8px', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{obs.cometName}</td>
                  <td style={{ padding: '12px 8px', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{obs.date}</td>
                  <td style={{ padding: '12px 8px', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{obs.coordinates}</td>
                  <td style={{ padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: `${obs.statusColor}20`,
                      color: obs.statusColor,
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}>
                      {obs.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <button
                      style={{
                        padding: '6px 12px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '20px',
                        color: '#ffffff',
                        fontSize: '13px',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '20px',
                          padding: '1px',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          pointerEvents: 'none'
                        }}
                      />
                      <span>Подробнее</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Информация о количестве записей */}
          <div style={{
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '14px'
          }}>
            <span>Всего наблюдений: {observations.length}</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '6px 12px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '20px',
                color: '#ffffff',
                fontSize: '13px',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    padding: '1px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none'
                  }}
                />
                <span>← Предыдущая</span>
              </button>
              <span style={{ padding: '6px 12px' }}>1 - 7 из 24</span>
              <button style={{
                padding: '6px 12px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '20px',
                color: '#ffffff',
                fontSize: '13px',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    padding: '1px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none'
                  }}
                />
                <span>Следующая →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}