import { useEffect, useState } from 'react';

type Comet = {
  id: string
  name: string
  observations: number
  image?: string // для будущих изображений
}

export function CometsPage() {
  useEffect(() => {
    document.body.classList.remove('main-page');
    return () => {};
  }, []);

  // Тестовые данные комет
  const comets: Comet[] = [
    { id: '1', name: 'C/2023 A3', observations: 156 },
    { id: '2', name: '12P/Pons-Brooks', observations: 342 },
    { id: '3', name: 'C/2024 E1', observations: 89 },
    { id: '4', name: 'C/2023 H2', observations: 234 },
    { id: '5', name: '29P/Schwassmann-Wachmann', observations: 567 },
    { id: '6', name: 'C/2024 J2', observations: 45 },
    { id: '7', name: 'C/2023 P1', observations: 178 },
    { id: '8', name: 'C/2022 E3 (ZTF)', observations: 892 },
    { id: '9', name: 'C/2021 S3 (PanSTARRS)', observations: 423 },
    { id: '10', name: 'C/2020 F3 (NEOWISE)', observations: 1256 },
    { id: '11', name: 'C/2017 K2 (PanSTARRS)', observations: 678 },
    { id: '12', name: 'C/2019 Y4 (ATLAS)', observations: 345 },
    { id: '13', name: 'C/2020 M3 (ATLAS)', observations: 234 },
    { id: '14', name: 'C/2021 A1 (Leonard)', observations: 567 },
    { id: '15', name: 'C/2022 A2 (PanSTARRS)', observations: 123 },
    { id: '16', name: 'C/2023 V1', observations: 67 },
    { id: '17', name: 'C/2024 A1', observations: 89 },
    { id: '18', name: 'C/2024 B2', observations: 34 },
  ];

  // Состояние для количества колонок
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const calculateColumns = () => {
      const width = window.innerWidth;
      // Отступы по бокам: 80px с каждой стороны = 160px
      // Отступы между карточками: 32px
      // Минимальная ширина карточки: примерно 250px
      const availableWidth = width - 160; // отнимаем боковые отступы
      const minCardWidth = 250;
      const gapSpace = 32;
      
      // Вычисляем максимальное количество колонок, которое поместится
      let possibleColumns = Math.floor((availableWidth + gapSpace) / (minCardWidth + gapSpace));
      
      // Ограничиваем от 1 до 6 колонок
      possibleColumns = Math.max(1, Math.min(6, possibleColumns));
      
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
          Главная / Кометы
        </div>
        
        <h1 style={{ 
          fontSize: '36px', 
          fontFamily: 'Lemon Milk',
          color: '#ffffff', 
          textTransform: 'uppercase',
          margin: 0
        }}>
          Все кометы, найденные в нашей системе
        </h1>
      </div>

      {/* Блок с карточками комет */}
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
          {comets.map((comet) => (
            <div
              key={comet.id}
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

              {/* Верхняя часть карточки (для будущего изображения) */}
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}>
                {/* Плейсхолдер для будущего изображения кометы */}
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                        stroke="rgba(255,255,255,0.5)" 
                        strokeWidth="1.5" 
                        strokeLinejoin="round"
                        fill="rgba(255,255,255,0.1)"/>
                </svg>
              </div>

              {/* Нижняя область с названием и количеством наблюдений */}
              <div style={{
                height: '64px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderBottomLeftRadius: '32px',
                borderBottomRightRadius: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 12px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontFamily: 'Naga',
                  fontWeight: '500',
                  color: '#ffffff',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%'
                }}>
                  {comet.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  fontFamily: 'Naga',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  {comet.observations} {comet.observations === 1 ? 'наблюдение' : 
                     comet.observations >= 2 && comet.observations <= 4 ? 'наблюдения' : 'наблюдений'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Информация о количестве комет */}
        <div style={{
          marginTop: '48px',
          display: 'flex',
          justifyContent: 'center',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '16px',
          fontFamily: 'Naga'
        }}>
          Всего комет в каталоге: {comets.length}
        </div>
      </div>
    </div>
  );
}