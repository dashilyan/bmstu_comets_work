type NotFoundPageProps = {
  onBackHome?: () => void
}

export function NotFoundPage({ onBackHome }: NotFoundPageProps) {
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

      <main className="container flex-grow-1 d-flex align-items-center justify-content-center">
        <div
          className="app-surface text-center px-5 py-5"
          style={{
            borderRadius: 28,
            maxWidth: 700,
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontFamily: 'Princess Diana',
              marginBottom: 12,
            }}
          >
            Звёздный след остыл...
          </div>

          <div
            style={{
              fontSize: '256px',
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            404
          </div>

          <div
            className="text-white-50 mb-4"
            style={{ fontSize: '20px', fontFamily: 'Naga' }}          >
            То, что вы ищете, уже завершило свой путь — превратилось в
            космическую пыль или улетело в другую галактику.
            <br />
            Но не отчаивайтесь: наша вселенная полна и другими,
            не менее прекрасными, мимолётными чудесами.
          </div>

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
              <span>Вернуться на главную</span>
            </button>
        </div>
      </main>
    </div>
  )
}