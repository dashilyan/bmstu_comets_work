import { useEffect, useState } from 'react';

type Observation = {
  id: string
  cometName: string
  userName: string
  date: string
  image?: string
  isFavorite: boolean // начальное состояние из данных
}

export function AllObservationsPage() {
  useEffect(() => {
    document.body.classList.remove('main-page');
    return () => {};
  }, []);

  // Тестовые данные наблюдений
  const observations: Observation[] = [
    { id: '1', cometName: 'C/2023 A3', userName: 'astro_daria', date: '12.03.2026', isFavorite: false },
    { id: '2', cometName: '12P/Pons-Brooks', userName: 'comet_hunter', date: '12.03.2026', isFavorite: true },
    { id: '3', cometName: 'C/2024 E1', userName: 'star_gazer', date: '11.03.2026', isFavorite: false },
    { id: '4', cometName: 'C/2023 H2', userName: 'nebula_watcher', date: '11.03.2026', isFavorite: false },
    { id: '5', cometName: '29P/Schwassmann-Wachmann', userName: 'deepsky_123', date: '10.03.2026', isFavorite: true },
    { id: '6', cometName: 'C/2024 J2', userName: 'cosmic_drifter', date: '10.03.2026', isFavorite: false },
    { id: '7', cometName: 'C/2023 P1', userName: 'orbit_follower', date: '09.03.2026', isFavorite: false },
    { id: '8', cometName: 'C/2022 E3 (ZTF)', userName: 'starlight_77', date: '09.03.2026', isFavorite: true },
    { id: '9', cometName: 'C/2021 S3 (PanSTARRS)', userName: 'astro_boris', date: '08.03.2026', isFavorite: false },
    { id: '10', cometName: 'C/2020 F3 (NEOWISE)', userName: 'comet_watcher', date: '08.03.2026', isFavorite: false },
    { id: '11', cometName: 'C/2017 K2 (PanSTARRS)', userName: 'space_observer', date: '07.03.2026', isFavorite: true },
    { id: '12', cometName: 'C/2019 Y4 (ATLAS)', userName: 'sky_tracker', date: '07.03.2026', isFavorite: false },
  ];

  // Инициализируем Set с ID тех наблюдений, у которых isFavorite = true
  const [favorites, setFavorites] = useState<Set<string>>(
    () => new Set(observations.filter(obs => obs.isFavorite).map(obs => obs.id))
  );

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id); // если есть - удаляем (становится пустым)
      } else {
        newSet.add(id); // если нет - добавляем (становится закрашенным)
      }
      return newSet;
    });
  };

  // Состояние для количества колонок
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const calculateColumns = () => {
      const width = window.innerWidth;
      const availableWidth = width - 160;
      const minCardWidth = 350;
      const gapSpace = 32;
      
      let possibleColumns = Math.floor((availableWidth + gapSpace) / (minCardWidth + gapSpace));
      possibleColumns = Math.max(1, Math.min(4, possibleColumns));
      
      setColumns(possibleColumns);
    };

    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    
    return () => window.removeEventListener('resize', calculateColumns);
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
          Главная / Наблюдения
        </div>
        
        <h1 style={{ 
          fontSize: '36px', 
          color: '#ffffff', 
          textTransform: 'uppercase',
          margin: 0, fontFamily: 'Lemon Milk'
        }}>
          Все наблюдения пользователей
        </h1>
      </div>

      {/* Блок с карточками наблюдений */}
      <div 
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          width: 'calc(100% - 80px)',
          margin: '80px auto 64px',
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '32px',
        }}>
          {observations.map((observation) => {
            // Проверяем, есть ли ID в Set favorites
            const isFavorite = favorites.has(observation.id);
            
            return (
              <div
                key={observation.id}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '32px',
                  position: 'relative',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '10px 10px 16px 0px rgba(0, 0, 0, 0.25)',
                  aspectRatio: '1 / 1',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, background-color 0.2s',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
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

                {/* Верхняя часть с ником и стрелкой */}
                <div style={{
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{
                    fontSize: '20px',
                    color: '#ffffff',
                    fontWeight: '500', fontFamily: 'Naga'
                  }}>
                    {observation.userName}
                  </span>
                  <span style={{
                    fontSize: '20px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    transform: 'rotate(45deg)',
                    display: 'inline-block', fontFamily: 'Naga'
                  }}>
                    ↗
                  </span>
                </div>

                {/* Центральная часть с изображением */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px'
                }}>
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <path d="M12 6V12L16 14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="2" fill="rgba(255,255,255,0.2)" />
                  </svg>
                </div>

                {/* Нижняя часть с датой и сердечком */}
                <div style={{
                  height: '61px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 20px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{
                    fontSize: '20px',
                    color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'Naga'
                  }}>
                    {observation.date}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(observation.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg 
                      width="28" 
                      height="28" 
                      viewBox="0 0 24 24" 
                      fill={isFavorite ? '#ffffff' : 'none'} 
                      stroke="#ffffff" 
                      strokeWidth="2"
                      style={{
                        transition: 'fill 0.2s'
                      }}
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>

                {/* Название кометы */}
                <div style={{
                  position: 'absolute',
                  bottom: '80px',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  padding: '0 16px'
                }}>
                  <span style={{
                    fontSize: '24px',
                    color: '#ffffff',
                    fontWeight: '600',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'Naga'
                  }}>
                    {observation.cometName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Информация о количестве наблюдений */}
        <div style={{
          marginTop: '48px',
          display: 'flex',
          justifyContent: 'center',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '16px', fontFamily: 'Naga'
        }}>
          Всего наблюдений: {observations.length}
        </div>
      </div>
    </div>
  );
}