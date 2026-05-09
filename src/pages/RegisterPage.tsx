import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { AppHeader } from '../components/AppHeader';

const inputStyle: React.CSSProperties = {
  width: '100%', height: '42px',
  backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '32px',
  padding: '0 20px', fontSize: '18px', fontFamily: 'Naga', color: '#ffffff',
  outline: 'none', position: 'relative', zIndex: 1,
};

const gradientBorder: React.CSSProperties = {
  position: 'absolute', bottom: 0, left: 0, width: '100%', height: '42px',
  borderRadius: '32px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none', zIndex: 2,
};

const cardBorder: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '32px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
};

function Field({ label, type, value, onChange }: { label: string; type: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
      <label style={{ fontSize: '24px', color: '#fff', fontFamily: 'Naga' }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} autoComplete="off" />
      <div style={gradientBorder} />
    </div>
  );
}

export function Register() {
  useEffect(() => { document.body.classList.remove('main-page'); }, []);

  const [username, setUsername] = useState('');
  const [education, setEducation] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { refreshProfile } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username.trim() || !password) {
      setError('Введите логин и пароль');
      return;
    }
    if (password !== confirm) {
      setError('Пароли не совпадают');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await api.register({ username: username.trim(), password, education });
      // auto-login after register
      const { api: { login } } = await import('../api/api');
      await login(username.trim(), password);
      await refreshProfile();
      navigate('/profile');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Ошибка регистрации';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      <div className="position-relative d-flex justify-content-center" style={{ width: '100%', marginTop: '64px', paddingBottom: '48px' }}>
        <div
          style={{
            width: '512px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px',
            position: 'relative', backdropFilter: 'blur(16px)',
            boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '44px', padding: '40px 0',
          }}
        >
          <div style={cardBorder} />

          {/* Avatar */}
          <div style={{
            width: '180px', height: '180px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="7" r="4" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
            </svg>
          </div>

          {/* Fields */}
          <div style={{ width: '432px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Field label="Логин" type="text" value={username} onChange={setUsername} />
            <Field label="Образование" type="text" value={education} onChange={setEducation} />
            <Field label="Пароль" type="password" value={password} onChange={setPassword} />
            <Field label="Повторите пароль" type="password" value={confirm} onChange={setConfirm} />

            {error && (
              <div style={{ color: '#ff6b6b', fontSize: '15px', fontFamily: 'Naga', textAlign: 'center' }}>
                {error}
              </div>
            )}
          </div>

          {/* Register button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              padding: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', position: 'relative',
              cursor: loading ? 'not-allowed' : 'pointer', fontSize: '24px', fontFamily: 'Naga',
              color: '#fff', borderRadius: '32px', outline: 'none', flexShrink: 0,
              opacity: loading ? 0.6 : 1,
            }}
          >
            <div style={cardBorder} />
            <span>{loading ? 'Регистрация...' : 'Зарегистрироваться'}</span>
          </button>

          {/* Login link */}
          <div style={{ fontFamily: 'Naga', fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>
            Уже есть аккаунт?{' '}
            <Link to="/auth" style={{ color: '#fff', textDecoration: 'underline' }}>Войти</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
