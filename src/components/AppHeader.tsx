import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const glowLeft: React.CSSProperties = {
  left: '963px', top: '-474px', width: '672px', height: '670px',
  background: 'radial-gradient(circle at center, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 14%, rgba(255,255,255,0) 100%)',
  filter: 'blur(40px)', pointerEvents: 'none', zIndex: 1,
};

const glowRight: React.CSSProperties = {
  left: '27px', top: '-183px', width: '762px', height: '759px',
  background: 'radial-gradient(circle at center, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 14%, rgba(255,255,255,0) 100%)',
  filter: 'blur(40px)', pointerEvents: 'none', zIndex: 1,
};

const linkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.85)',
  textDecoration: 'none',
  fontFamily: 'Naga',
  fontSize: '20px',
  textAlign: 'center',
  flex: 1,
  padding: '0 8px',
  transition: 'color 0.2s',
};

export function AppHeader() {
  const { isAuthenticated } = useAuth();

  return (
    <header
      className="app-topbar position-relative overflow-hidden"
      style={{ height: '96px', backgroundColor: 'rgba(255,255,255,0.1)' }}
    >
      <div className="position-absolute" style={glowLeft} />
      <div className="position-absolute" style={glowRight} />

      <div
        className="container h-100 px-0 position-relative"
        style={{ maxWidth: 'calc(100% - 160px)', margin: '0 80px', zIndex: 2 }}
      >
        <div className="d-flex align-items-center justify-content-between h-100">
          <Link
            to="/"
            className="app-brand"
            style={{ fontSize: '40px', fontFamily: 'Marlino', textDecoration: 'none', color: '#fff' }}
          >
            Cometica
          </Link>

          <nav className="d-flex" style={{ width: '644px' }}>
            <Link to="/faq" className="app-link" style={linkStyle}>FAQ</Link>
            <Link to="/obs-list" className="app-link" style={linkStyle}>Наблюдения</Link>
            <Link to="/comets" className="app-link" style={linkStyle}>Кометы</Link>
            {isAuthenticated ? (
              <Link to="/profile" className="app-link" style={linkStyle}>Профиль</Link>
            ) : (
              <Link to="/auth" className="app-link" style={linkStyle}>Войти</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
