import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useAuth } from '../context/AuthContext';

export function Main() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const originalBg = document.body.style.backgroundImage;
    document.body.style.backgroundImage = 'url("./background_main.png")';
    return () => {
      document.body.style.backgroundImage = originalBg;
    };
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      <div
        className="position-relative"
        style={{ width: '100%', marginTop: '64px' }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: '1280px',
            width: 'calc(100% - 80px)',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '24px',
              maxWidth: '1000px',
            }}
          >
            <div style={{ fontSize: '96px', color: '#ffffff', lineHeight: '1.1', fontFamily: 'Princess Diana' }}>
              Превратите свет в знание.
            </div>
            <div style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.85)', fontFamily: 'Naga' }}>
              Вы поймали луч от распадающейся древности на матрицу.
              Мы помогаем совершить алхимию: преобразовать пиксели в параметры,
              а восторг — в осмысленное открытие. Добро пожаловать в лабораторию
              небесной механики.
            </div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <button
              onClick={() => navigate(isAuthenticated ? '/new-observation' : '/reg')}
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
                outline: 'none',
              }}
            >
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
                  pointerEvents: 'none',
                }}
              />
              <span>Сделать открытие</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
