import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppHeader } from '../components/AppHeader';
import { useApiWithFallback } from '../hooks/useApiWithFallback';
import { api } from '../api/api';
import { MOCK_USER, formatDate, statusLabel } from '../data/mockData';
import type { UserStats } from '../api/types';

const cardStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px', position: 'relative',
  backdropFilter: 'blur(16px)', boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)',
};

const gradientBorderStyle: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '32px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
};

const linkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '18px', fontFamily: 'Naga',
};

function StatBlock({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '12px' }}>{icon}</div>
      <div style={{ fontSize: '32px', color: '#fff', marginBottom: '4px', fontFamily: 'Lemon Milk' }}>{value}</div>
      <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>{label}</div>
    </div>
  );
}

export function UserProfile() {
  useEffect(() => { document.body.classList.remove('main-page'); }, []);

  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();

  const { data: profile } = useApiWithFallback<UserStats>(
    () => api.getProfile(),
    authUser ?? MOCK_USER,
    [authUser?.id],
  );

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const displayName = profile.first_name
    ? `${profile.first_name} ${profile.last_name}`.trim()
    : profile.username;

  const recentObs = profile.recent_observations?.slice(0, 3) ?? [];

  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '80px auto 0' }}>
        <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>
          Главная / Профиль
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '32px auto 64px', display: 'flex', gap: '80px' }}>
        {/* Sidebar */}
        <div style={{ ...cardStyle, width: '300px', padding: '32px', display: 'flex', flexDirection: 'column', minHeight: '600px' }}>
          <div style={gradientBorderStyle} />

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="7" r="4" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 'auto' }}>
            <div style={{ fontSize: '24px', color: '#fff', marginBottom: '4px', fontFamily: 'Lemon Milk' }}>
              {displayName}
            </div>
            <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>
              {profile.total_observations} наблюдений
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', marginTop: '20px' }}>
            <Link to="/profile-edit" style={linkStyle}>Настройки профиля</Link>
            <Link to="/obs-table" style={linkStyle}>Мои наблюдения</Link>
            <Link to="/new-observation" style={linkStyle}>Новое наблюдение</Link>
            <Link to="/faq" style={linkStyle}>Помощь</Link>
            <button onClick={handleLogout} style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              Выйти
            </button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Stats */}
          <div style={{ ...cardStyle, padding: '32px', minHeight: '200px' }}>
            <div style={gradientBorderStyle} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', alignItems: 'center' }}>
              <StatBlock
                value={profile.total_observations}
                label="наблюдений"
                icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" /><path d="M12 6V12L16 14" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" /></svg>}
              />
              <StatBlock
                value={profile.public_observations}
                label="опубликовано"
                icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              />
              <StatBlock
                value={profile.calculations_count}
                label="расчётов"
                icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinejoin="round" /></svg>}
              />
              <StatBlock
                value={profile.total_observations > 0 ? `${Math.round((profile.public_observations / profile.total_observations) * 100)}%` : '—'}
                label="публичных"
                icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 20V10M18 20V4M6 20V16" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" /></svg>}
              />
            </div>
          </div>

          {/* Recent observations */}
          <div style={{ ...cardStyle, padding: '32px', minHeight: '400px' }}>
            <div style={gradientBorderStyle} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', textTransform: 'uppercase', color: '#fff', fontFamily: 'Lemon Milk', margin: 0 }}>
                Последние наблюдения
              </h3>
              <Link to="/obs-table" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontFamily: 'Naga' }}>
                Все наблюдения →
              </Link>
            </div>

            {recentObs.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: 'Naga', marginTop: '48px' }}>
                Наблюдений пока нет.{' '}
                <Link to="/new-observation" style={{ color: '#fff', textDecoration: 'underline' }}>Создать первое</Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {recentObs.map((obs) => {
                  const { label, color } = statusLabel(obs.status);
                  return (
                    <div key={obs.id}>
                      <div style={{
                        width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: '16px', marginBottom: '12px',
                        backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
                        backgroundSize: '20px 20px',
                      }} />
                      <div style={{ fontSize: '16px', color: '#fff', marginBottom: '4px', fontFamily: 'Naga' }}>
                        {obs.comet_name}
                      </div>
                      <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px', fontFamily: 'Naga' }}>
                        {formatDate(obs.date_obs)}
                      </div>
                      <div style={{
                        fontSize: '12px', color, display: 'inline-block',
                        padding: '4px 8px', backgroundColor: `${color}20`, borderRadius: '20px', fontFamily: 'Naga',
                      }}>
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
