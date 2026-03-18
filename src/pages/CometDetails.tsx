import { useEffect, useState } from 'react';

type Observation = {
  id: string
  cometName: string
  userName: string
  userAvatar?: string
  userObservations: number
  date: string
  image?: string
  isFavorite: boolean
}

type CometDetails = {
  name: string
  designation: string
  discoveryDate: string
  discoverer: string
  magnitude: string
  comaSize: string
}

type OrbitalParam = {
  label: string
  value: string
  description?: string
}

export function CometPage() {
  useEffect(() => {
    document.body.classList.remove('main-page');
    return () => {};
  }, []);

  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Данные кометы
  const cometName = "Комета Борисова";
  
  const cometDetails: CometDetails = {
    name: 'Комета Борисова',
    designation: '2I/Borisov',
    discoveryDate: '30 августа 2019',
    discoverer: 'Геннадий Борисов',
    magnitude: '8.5m',
    comaSize: '15\' × 12\'',
  };

  const orbitalParams: OrbitalParam[] = [
    { label: 'q', value: '2.006', description: 'перигелийное расстояние (а.е.)' },
    { label: 'e', value: '3.357', description: 'эксцентриситет' },
    { label: 'i', value: '44.05°', description: 'наклонение орбиты' },
    { label: 'Ω', value: '308.8°', description: 'долгота восходящего узла' },
    { label: 'ω', value: '209.1°', description: 'аргумент перигелия' },
    { label: 'T', value: '2019.874', description: 'время перигелия (юлианский год)' },
  ];

  // Тестовые данные наблюдений кометы
  const observations: Observation[] = [
    { 
      id: '1', 
      cometName: '2I/Borisov', 
      userName: 'astro_daria', 
      userObservations: 156,
      date: '12.03.2026', 
      isFavorite: false 
    },
    { 
      id: '2', 
      cometName: '2I/Borisov', 
      userName: 'comet_hunter', 
      userObservations: 342,
      date: '11.03.2026', 
      isFavorite: true 
    },
    { 
      id: '3', 
      cometName: '2I/Borisov', 
      userName: 'star_gazer', 
      userObservations: 89,
      date: '10.03.2026', 
      isFavorite: false 
    },
    { 
      id: '4', 
      cometName: '2I/Borisov', 
      userName: 'nebula_watcher', 
      userObservations: 234,
      date: '09.03.2026', 
      isFavorite: false 
    },
    { 
      id: '5', 
      cometName: '2I/Borisov', 
      userName: 'deepsky_123', 
      userObservations: 567,
      date: '08.03.2026', 
      isFavorite: true 
    },
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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

      {/* Блок заголовка как в base.tsx */}
      <div 
        className="position-relative overflow-hidden"
        style={{
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          marginTop: '48px'
        }}
      >
        {/* Зоны свечения для заголовка */}
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

        {/* Контент заголовка */}
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
              <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>
                Главная / Кометы / {cometName}
              </div>
              
              {/* Заголовок капсом */}
              <div style={{ fontSize: '36px', color: '#ffffff', textTransform: 'uppercase', fontFamily: 'Lemon Milk' }}>
                {cometName}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div 
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          width: 'calc(100% - 80px)',
          margin: '40px auto 64px',
        }}
      >
        {/* Два блока в ряд: информация о комете и последние наблюдения */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '32px',
          marginBottom: '48px'
        }}>
          {/* Левый блок - параметры кометы */}
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
              flexDirection: 'column',
              height: 'fit-content'
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
                {cometDetails.designation}
              </div>
              <h2 style={{ fontSize: '28px', color: '#ffffff', margin: 0, textTransform: 'uppercase', fontFamily: 'Lemon Milk' }}>
                {cometDetails.name}
              </h2>
            </div>

            {/* Список параметров кометы */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px', fontFamily: 'Naga' }}>
                  Дата открытия
                </span>
                <span style={{ color: '#ffffff', fontSize: '15px', textAlign: 'right', fontFamily: 'Naga' }}>
                  {cometDetails.discoveryDate}
                </span>
              </div>
              
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px', fontFamily: 'Naga' }}>
                  Первооткрыватель
                </span>
                <span style={{ color: '#ffffff', fontSize: '15px', textAlign: 'right', fontFamily: 'Naga' }}>
                  {cometDetails.discoverer}
                </span>
              </div>
              
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px', fontFamily: 'Naga' }}>
                  Яркость
                </span>
                <span style={{ color: '#ffffff', fontSize: '15px', textAlign: 'right', fontFamily: 'Naga' }}>
                  {cometDetails.magnitude}
                </span>
              </div>
              
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px', fontFamily: 'Naga' }}>
                  Размер комы
                </span>
                <span style={{ color: '#ffffff', fontSize: '15px', textAlign: 'right', fontFamily: 'Naga' }}>
                  {cometDetails.comaSize}
                </span>
              </div>
            </div>

            {/* Таблица орбитальных параметров */}
            <div>
              <h3 style={{ 
                fontSize: '18px', 
                fontFamily: 'Lemon Milk',
                color: '#ffffff', 
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
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
                      fontFamily: 'Naga',
                      marginBottom: '4px'
                    }}>
                      {param.value}
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      fontFamily: 'Naga',
                      color: 'rgba(255, 255, 255, 0.5)',
                      marginBottom: '2px'
                    }}>
                      {param.label}
                    </div>
                    {param.description && (
                      <div style={{ 
                        fontSize: '11px', 
                        fontFamily: 'Naga',
                        color: 'rgba(255, 255, 255, 0.3)'
                      }}>
                        {param.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правый блок - последние наблюдения */}
          <div>
            <h2 style={{ 
              fontSize: '24px', 
              fontFamily: 'Lemon Milk',
              color: '#ffffff', 
              textTransform: 'uppercase',
              marginBottom: '24px'
            }}>
              Последние наблюдения
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px'
            }}>
              {observations.slice(0, 4).map((obs) => {
                const isFavorite = favorites.has(obs.id);
                
                return (
                  <div
                    key={obs.id}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '24px',
                      position: 'relative',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '10px 10px 16px 0px rgba(0, 0, 0, 0.25)',
                      aspectRatio: '1 / 1',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Градиентный контур */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '24px',
                        padding: '1px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Верхняя часть */}
                    <div style={{
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 16px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <span style={{ fontSize: '16px', color: '#ffffff', fontFamily: 'Naga' }}>{obs.userName}</span>
                      <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>↗</span>
                    </div>

                    {/* Центр */}
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                        <path d="M12 6V12L16 14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                      </svg>
                    </div>

                    {/* Нижняя часть */}
                    <div style={{
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontFamily: 'Naga' }}>{obs.date}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(obs.id);
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? '#ffffff' : 'none'} stroke="#ffffff" strokeWidth="2">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Список всех наблюдений в виде строк */}
        <div>
          <h2 style={{ 
            fontSize: '24px', 
            fontFamily: 'Lemon Milk',
            color: '#ffffff', 
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            Все наблюдения ({observations.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {observations.map((obs) => {
              const isFavorite = favorites.has(obs.id);
              
              return (
                <div
                  key={obs.id}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '32px',
                    position: 'relative',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '10px 10px 16px 0px rgba(0, 0, 0, 0.25)',
                    padding: '20px 32px',
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

                  {/* Аватарка и информация о пользователе */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(255,255,255,0.3)'
                      }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="7" r="4" stroke="rgba(255,255,255,0.8)" strokeWidth="2"/>
                      </svg>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: '20px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Naga' }}>
                        {obs.userName}
                      </div>
                      <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>
                        {obs.userObservations} наблюдений
                      </div>
                    </div>
                  </div>

                  {/* Дата и кнопки */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', fontFamily: 'Naga' }}>
                      {obs.date}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <button
                        style={{
                          padding: '10px 20px',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          border: 'none',
                          borderRadius: '24px',
                          color: '#ffffff',
                          fontSize: '14px',
                          fontFamily: 'Naga',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '24px',
                            padding: '1px',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                            pointerEvents: 'none'
                          }}
                        />
                        <span>Посмотреть наблюдение</span>
                      </button>
                      
                      <button
                        style={{
                          padding: '10px 20px',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          border: 'none',
                          borderRadius: '24px',
                          color: '#ffffff',
                          fontSize: '14px',
                          fontFamily: 'Naga',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '24px',
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

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(obs.id);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0 8px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill={isFavorite ? '#ffffff' : 'none'} stroke="#ffffff" strokeWidth="2">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}