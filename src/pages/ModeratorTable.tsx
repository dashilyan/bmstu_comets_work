import { useEffect } from 'react';

export function ModeratorQueue() {
  useEffect(() => {
    document.body.classList.remove('main-page');
    return () => {};
  }, []);

  // Тестовые данные заявок на проверку
  const moderationItems = [
    {
      id: 4231,
      type: 'Наблюдение',
      cometName: 'C/2023 A3',
      author: 'astro_daria',
      submittedDate: '12.03.2026 14:23',
      priority: 'Высокий',
      status: 'Ожидает проверки'
    },
    {
      id: 4232,
      type: 'Наблюдение',
      cometName: '12P/Pons-Brooks',
      author: 'comet_hunter',
      submittedDate: '12.03.2026 10:15',
      priority: 'Средний',
      status: 'Ожидает проверки'
    },
    {
      id: 4233,
      type: 'Комета',
      cometName: 'C/2024 E1 (новая)',
      author: 'star_gazer',
      submittedDate: '11.03.2026 22:45',
      priority: 'Высокий',
      status: 'Ожидает проверки'
    },
    {
      id: 4234,
      type: 'Жалоба',
      cometName: 'На пользователя',
      author: 'astro_boris',
      submittedDate: '11.03.2026 18:30',
      priority: 'Средний',
      status: 'Ожидает проверки'
    },
    {
      id: 4235,
      type: 'Наблюдение',
      cometName: 'C/2023 H2',
      author: 'nebula_watcher',
      submittedDate: '11.03.2026 12:10',
      priority: 'Низкий',
      status: 'Ожидает проверки'
    },
    {
      id: 4236,
      type: 'Наблюдение',
      cometName: '29P/Schwassmann-Wachmann',
      author: 'deepsky_123',
      submittedDate: '10.03.2026 09:50',
      priority: 'Средний',
      status: 'Ожидает проверки'
    },
    {
      id: 4237,
      type: 'Комета',
      cometName: 'C/2024 J2 (новая)',
      author: 'cosmic_drifter',
      submittedDate: '10.03.2026 08:20',
      priority: 'Высокий',
      status: 'Ожидает проверки'
    },
    {
      id: 4238,
      type: 'Жалоба',
      cometName: 'На наблюдение',
      author: 'starlight_77',
      submittedDate: '09.03.2026 20:15',
      priority: 'Низкий',
      status: 'Ожидает проверки'
    },
    {
      id: 4239,
      type: 'Наблюдение',
      cometName: 'C/2023 P1',
      author: 'orbit_follower',
      submittedDate: '09.03.2026 16:40',
      priority: 'Средний',
      status: 'Ожидает проверки'
    }
  ];

  // Фильтры для модератора
  const filters = [
    { label: 'Тип заявки', type: 'select', options: ['Все', 'Наблюдение', 'Комета', 'Жалоба'] },
    { label: 'Приоритет', type: 'select', options: ['Все', 'Высокий', 'Средний', 'Низкий'] },
    { label: 'Автор', type: 'text', placeholder: 'Имя пользователя...' },
    { label: 'Дата от', type: 'text', placeholder: 'ДД.ММ.ГГГГ' }
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
          Главная / Модерация / Очередь проверки
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
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          Очередь на проверку
          <span style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.6)',
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '8px 16px',
            borderRadius: '32px',
            fontWeight: 'normal'
          }}>
            {moderationItems.length} заявок
          </span>
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
          
          {/* Кнопка сброса фильтров */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-end',
            marginBottom: '0'
          }}>
            <button
              style={{
                height: '48px',
                padding: '0 24px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '32px',
                color: '#ffffff',
                fontSize: '16px',
                cursor: 'pointer',
                position: 'relative'
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
              <span>Сбросить</span>
            </button>
          </div>
        </div>

        {/* Таблица заявок */}
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
                <th style={{ textAlign: 'left', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Тип</th>
                <th style={{ textAlign: 'left', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Объект</th>
                <th style={{ textAlign: 'left', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Автор</th>
                <th style={{ textAlign: 'left', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Дата подачи</th>
                <th style={{ textAlign: 'left', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Приоритет</th>
                <th style={{ textAlign: 'center', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }} colSpan={2}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {moderationItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: '12px 8px', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>#{item.id}</td>
                  <td style={{ padding: '12px 8px', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{item.type}</td>
                  <td style={{ padding: '12px 8px', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{item.cometName}</td>
                  <td style={{ padding: '12px 8px', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{item.author}</td>
                  <td style={{ padding: '12px 8px', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{item.submittedDate}</td>
                  <td style={{ padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}>
                      {item.priority}
                    </span>
                  </td>
                  <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(255,255,255,0.1)', width: '40px' }}>
                    <button
                      style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        color: '#ffffff',
                        fontSize: '18px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}
                      title="Подтвердить"
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          padding: '1px',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          pointerEvents: 'none'
                        }}
                      />
                      ✓
                    </button>
                  </td>
                  <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(255,255,255,0.1)', width: '40px' }}>
                    <button
                      style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        color: '#ffffff',
                        fontSize: '18px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}
                      title="Отклонить"
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          padding: '1px',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          pointerEvents: 'none'
                        }}
                      />
                      ✗
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Информация о количестве записей и пагинация */}
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
            <span>Всего заявок: {moderationItems.length}</span>
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
              <span style={{ padding: '6px 12px' }}>1 - 9 из 24</span>
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