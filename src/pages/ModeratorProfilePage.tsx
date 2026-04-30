import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useAuth } from '../context/AuthContext';
import { useApiWithFallback } from '../hooks/useApiWithFallback';
import { api } from '../api/api';
import { MOCK_MODERATION_QUEUE } from '../data/mockData';
import type { ApiModerationQueue } from '../api/types';

const gradBorder: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '32px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
};

const navLinkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '18px', fontFamily: 'Naga',
};

export function ModeratorProfile() {
  useEffect(() => { document.body.classList.remove('main-page'); }, []);

  const { user } = useAuth();
  const displayName = user
    ? (user.first_name || user.last_name ? `${user.first_name} ${user.last_name}`.trim() : user.username)
    : 'Модератор';

  const { data: queue } = useApiWithFallback<ApiModerationQueue>(
    () => api.getModerationQueue(),
    MOCK_MODERATION_QUEUE,
  );

  const pending = queue.total;

  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '80px auto 0' }}>
        <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>
          Главная / Профиль модератора
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '32px auto 64px', display: 'flex', gap: '80px' }}>

        {/* Sidebar */}
        <div style={{
          width: '300px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px',
          position: 'relative', backdropFilter: 'blur(16px)',
          boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)', padding: '32px',
          display: 'flex', flexDirection: 'column', minHeight: '600px',
        }}>
          <div style={gradBorder} />

          {/* Avatar */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="7" r="4" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 'auto' }}>
            <div style={{ fontSize: '24px', color: '#fff', marginBottom: '4px', fontFamily: 'Naga' }}>
              {displayName}
            </div>
            <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px', fontFamily: 'Lemon Milk' }}>
              Модератор
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', marginTop: '20px' }}>
            <Link to="/profile" style={navLinkStyle}>Мой профиль</Link>
            <Link to="/mod-table" style={navLinkStyle}>Очередь проверки</Link>
            <Link to="/profile-edit" style={navLinkStyle}>Настройки</Link>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Stats */}
          <div style={{
            width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px',
            position: 'relative', backdropFilter: 'blur(16px)',
            boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)', padding: '32px', minHeight: '200px',
          }}>
            <div style={gradBorder} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '12px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
                    <path d="M12 6V12L16 14" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{ fontSize: '32px', color: '#fff', marginBottom: '4px', fontFamily: 'Lemon Milk' }}>{pending}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>ожидают</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '12px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ fontSize: '32px', color: '#fff', marginBottom: '4px', fontFamily: 'Lemon Milk' }}>—</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>проверено сегодня</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '12px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{ fontSize: '32px', color: '#fff', marginBottom: '4px', fontFamily: 'Lemon Milk' }}>—</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>отклонено</div>
              </div>
            </div>
          </div>

          {/* Queue preview */}
          <div style={{
            width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px',
            position: 'relative', backdropFilter: 'blur(16px)',
            boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)', padding: '32px', minHeight: '400px',
          }}>
            <div style={gradBorder} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontFamily: 'Lemon Milk', textTransform: 'uppercase', color: '#fff', margin: 0 }}>
                Очередь на проверку
              </h3>
              <Link to="/mod-table" style={{
                padding: '8px 20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '20px',
                color: '#fff', textDecoration: 'none', fontSize: '14px', fontFamily: 'Naga',
              }}>
                Открыть очередь →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {queue.observations.slice(0, 4).map((obs) => (
                <div key={obs.id} style={{
                  display: 'flex', alignItems: 'center', gap: '16px', padding: '12px',
                  backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px',
                }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '15px', color: '#fff', marginBottom: '4px', fontFamily: 'Naga', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {obs.comet.official_name} — {obs.user.username}
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Naga' }}>
                      #{obs.id} · ожидает проверки
                    </div>
                  </div>
                </div>
              ))}
              {queue.observations.length === 0 && (
                <div style={{ textAlign: 'center', padding: '48px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Naga' }}>
                  Очередь пуста
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
