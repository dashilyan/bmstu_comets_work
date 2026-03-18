import { useEffect } from 'react';

export function EditProfile() {
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
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          zIndex: 3
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
          position: 'relative',
          zIndex: 3
        }}
      >
        <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>
          Главная / Профиль / Редактирование
        </div>
      </div>

      {/* Затемненный фон с blur */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2,
          pointerEvents: 'all'
        }}
      />

      {/* Основной контент (размытый) */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          filter: 'blur(4px)',
          opacity: 0.5,
          pointerEvents: 'none'
        }}
      >
        {/* Основной блок с функциями (копия из UserProfile) */}
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

            {/* Информация о пользователе */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: 'auto'
              }}
            >
              <div style={{ fontSize: '24px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Naga' }}>
                Дарья Рабочая
              </div>
              <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>
                42 наблюдения
              </div>
            </div>

            {/* Ссылки */}
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

          {/* Правая широкая часть (упрощенно) */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
            }}
          >
            {/* Верхний блок - статистика */}
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
              
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '24px',
                  height: '100%',
                  alignItems: 'center'
                }}
              >
                {/* Статистика */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"/>
                      <path d="M12 6V12L16 14" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '32px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Naga' }}>42</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>наблюдений</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '32px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Naga' }}>38</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>подтверждено</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '32px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Naga' }}>35</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>верифицировано</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 20V10M18 20V4M6 20V16" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '32px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Naga' }}>92.5%</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Naga' }}>точность</div>
                </div>
              </div>
            </div>

            {/* Нижний блок - наблюдения */}
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
              
              <h3 style={{ fontSize: '20px', marginBottom: '24px', textTransform: 'uppercase', color: '#ffffff', fontFamily: 'Lemon Milk' }}>
                Наблюдения
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div style={{
                      width: '100%',
                      aspectRatio: '1',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '16px',
                      marginBottom: '12px',
                      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
                      backgroundSize: '20px 20px'
                    }} />
                    <div style={{ fontSize: '16px', color: '#ffffff', marginBottom: '4px', fontFamily: 'Naga' }}>C/2023 A3</div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Naga' }}>12.03.2026</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно редактирования */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '512px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '32px',
          backdropFilter: 'blur(16px)',
          boxShadow: '10px 10px 16px 0px rgba(0, 0, 0, 0.25)',
          padding: '40px 0',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px'
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
        <h2 style={{ fontSize: '32px', color: '#ffffff', textTransform: 'uppercase', margin: 0, fontFamily: 'Lemon Milk' }}>
          Редактировать профиль
        </h2>

        {/* Форма */}
        <div style={{ width: '432px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Имя */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
            <label style={{ fontSize: '24px', color: '#ffffff', fontFamily: 'Naga' }}>Имя</label>
            <input
              type="text"
              defaultValue="Дарья Рабочая"
              style={{
                width: '100%',
                height: '42px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '32px',
                padding: '0 20px',
                fontSize: '18px',
                fontFamily: 'Naga',
                color: '#ffffff',
                outline: 'none',
                position: 'relative',
                zIndex: 1
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
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

          {/* Образование */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
            <label style={{ fontSize: '24px', color: '#ffffff', fontFamily: 'Naga' }}>Образование</label>
            <input
              type="text"
              defaultValue="МГТУ им. Баумана"
              style={{
                width: '100%',
                height: '42px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '32px',
                padding: '0 20px',
                fontSize: '18px',
                fontFamily: 'Naga',
                color: '#ffffff',
                outline: 'none',
                position: 'relative',
                zIndex: 1
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
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

          {/* Город */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
            <label style={{ fontSize: '24px', color: '#ffffff',fontFamily: 'Naga' }}>Город</label>
            <input
              type="text"
              defaultValue="Москва"
              style={{
                width: '100%',
                height: '42px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '32px',
                padding: '0 20px',
                fontSize: '18px',
                fontFamily: 'Naga',
                color: '#ffffff',
                outline: 'none',
                position: 'relative',
                zIndex: 1
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
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

          {/* О себе - исправлено */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px', 
            position: 'relative'
          }}>
            <label style={{ fontSize: '24px', color: '#ffffff', fontFamily: 'Naga' }}>О себе</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <textarea
                defaultValue="Астроном-любитель с 5-летним стажем. Специализируюсь на наблюдении комет и астероидов."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '32px',
                  padding: '12px 20px',
                  fontSize: '18px',
                  fontFamily: 'Naga',
                  color: '#ffffff',
                  outline: 'none',
                  position: 'relative',
                  zIndex: 1,
                  resize: 'vertical',
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
          </div>
        </div>

        {/* Кнопки */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            style={{
              padding: '16px 32px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              position: 'relative',
              cursor: 'pointer',
              fontSize: '18px',
              fontFamily: 'Naga',
              color: '#ffffff',
              borderRadius: '32px',
              outline: 'none'
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
            <span>Сохранить</span>
          </button>
          <button
            style={{
              padding: '16px 32px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              position: 'relative',
              cursor: 'pointer',
              fontSize: '18px',
              fontFamily: 'Naga',
              color: '#ffffff',
              borderRadius: '32px',
              outline: 'none'
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
            <span>Отмена</span>
          </button>
        </div>
      </div>
    </div>
  );
}