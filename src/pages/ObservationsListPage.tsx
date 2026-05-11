import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useApiWithFallback } from '../hooks/useApiWithFallback';
import { api } from '../api/api';
import { MOCK_ALL_OBSERVATIONS, formatDate } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import type { ApiObservationsList } from '../api/types';

const MOCK_LIST: ApiObservationsList = {
  total: MOCK_ALL_OBSERVATIONS.length,
  limit: 20,
  offset: 0,
  observations: MOCK_ALL_OBSERVATIONS,
};

const cardBorder: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '32px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
};

const inputStyle: React.CSSProperties = {
  width: '100%', height: '48px', backgroundColor: 'rgba(255,255,255,0.1)',
  border: 'none', borderRadius: '32px', padding: '0 20px', fontSize: '16px',
  color: '#fff', outline: 'none', position: 'relative', zIndex: 1,
  boxSizing: 'border-box', fontFamily: 'Naga',
};

const gradBorder: React.CSSProperties = {
  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '32px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none', zIndex: 2,
};

const btnStyle: React.CSSProperties = {
  padding: '0 24px', height: '48px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none',
  borderRadius: '32px', color: '#fff', fontSize: '16px', cursor: 'pointer',
  position: 'relative', fontFamily: 'Naga',
};

export function AllObservationsPage() {
  useEffect(() => { document.body.classList.remove('main-page'); }, []);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();

  const [filterUser, setFilterUser] = useState(searchParams.get('user') ?? '');
  const [filterComet, setFilterComet] = useState(searchParams.get('comet') ?? '');
  const [filterDateFrom, setFilterDateFrom] = useState(searchParams.get('date_from') ?? '');
  const [filterDateTo, setFilterDateTo] = useState(searchParams.get('date_to') ?? '');

  const syncParams = useCallback((u: string, c: string, df: string, dt: string) => {
    const p: Record<string, string> = {};
    if (u) p.user = u;
    if (c) p.comet = c;
    if (df) p.date_from = df;
    if (dt) p.date_to = dt;
    setSearchParams(p, { replace: true });
  }, [setSearchParams]);

  const apiParams = {
    limit: 20,
    username: filterUser || undefined,
    comet_search: filterComet || undefined,
    date_from: filterDateFrom || undefined,
    date_to: filterDateTo || undefined,
  };

  const { data: result, loading, usingMock } = useApiWithFallback<ApiObservationsList>(
    () => api.getAllObservations(apiParams),
    MOCK_LIST,
    [filterUser, filterComet, filterDateFrom, filterDateTo],
  );

  const [favorites, setFavorites] = useState<Set<number>>(new Set([2, 5, 8, 11]));

  const toggleFavorite = async (id: number) => {
    const wasFav = favorites.has(id);
    setFavorites((prev) => {
      const next = new Set(prev);
      if (wasFav) next.delete(id); else next.add(id);
      return next;
    });
    if (isAuthenticated) {
      try {
        if (wasFav) await api.removeFavorite(id);
        else await api.addFavorite(id);
      } catch {
        setFavorites((prev) => {
          const next = new Set(prev);
          if (wasFav) next.add(id); else next.delete(id);
          return next;
        });
      }
    }
  };

  const [columns, setColumns] = useState(3);
  useEffect(() => {
    const calc = () => {
      const avail = window.innerWidth - 160;
      setColumns(Math.max(1, Math.min(4, Math.floor((avail + 32) / (350 + 32)))));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  function handleUserChange(v: string) { setFilterUser(v); syncParams(v, filterComet, filterDateFrom, filterDateTo); }
  function handleCometChange(v: string) { setFilterComet(v); syncParams(filterUser, v, filterDateFrom, filterDateTo); }
  function handleDateFromChange(v: string) { setFilterDateFrom(v); syncParams(filterUser, filterComet, v, filterDateTo); }
  function handleDateToChange(v: string) { setFilterDateTo(v); syncParams(filterUser, filterComet, filterDateFrom, v); }

  function resetFilters() {
    setFilterUser(''); setFilterComet(''); setFilterDateFrom(''); setFilterDateTo('');
    setSearchParams({}, { replace: true });
  }

  const hasFilters = !!(filterUser || filterComet || filterDateFrom || filterDateTo);

  if (loading && !usingMock) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <AppHeader />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga', fontSize: '18px' }}>
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '48px auto 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Breadcrumbs crumbs={[{ label: 'Главная', to: '/' }, { label: 'Наблюдения' }]} />
          {usingMock && <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Naga' }}>офлайн-режим</span>}
        </div>
        <h1 style={{ fontSize: '36px', color: '#fff', textTransform: 'uppercase', margin: '16px 0 0', fontFamily: 'Lemon Milk' }}>
          Все наблюдения пользователей
        </h1>
      </div>

      {/* Filters */}
      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '32px auto 0' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 180px' }}>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontFamily: 'Naga' }}>Пользователь</div>
            <div style={{ position: 'relative' }}>
              <input
                type="text" placeholder="Имя пользователя..." value={filterUser}
                onChange={(e) => handleUserChange(e.target.value)}
                style={inputStyle}
              />
              <div style={gradBorder} />
            </div>
          </div>

          <div style={{ flex: '1 1 180px' }}>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontFamily: 'Naga' }}>Комета</div>
            <div style={{ position: 'relative' }}>
              <input
                type="text" placeholder="Название кометы..." value={filterComet}
                onChange={(e) => handleCometChange(e.target.value)}
                style={inputStyle}
              />
              <div style={gradBorder} />
            </div>
          </div>

          <div style={{ flex: '1 1 160px' }}>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontFamily: 'Naga' }}>Дата от</div>
            <div style={{ position: 'relative' }}>
              <input
                type="date" value={filterDateFrom}
                onChange={(e) => handleDateFromChange(e.target.value)}
                style={{ ...inputStyle, colorScheme: 'dark' }}
              />
              <div style={gradBorder} />
            </div>
          </div>

          <div style={{ flex: '1 1 160px' }}>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontFamily: 'Naga' }}>Дата до</div>
            <div style={{ position: 'relative' }}>
              <input
                type="date" value={filterDateTo}
                onChange={(e) => handleDateToChange(e.target.value)}
                style={{ ...inputStyle, colorScheme: 'dark' }}
              />
              <div style={gradBorder} />
            </div>
          </div>

          {hasFilters && (
            <button onClick={resetFilters} style={btnStyle}>
              <div style={{ ...gradBorder, borderRadius: '32px' }} />
              <span>Сбросить</span>
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '32px auto 64px' }}>
        {result.observations.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: 'Naga', marginTop: '64px', fontSize: '18px' }}>
            Наблюдений не найдено
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '32px' }}>
            {result.observations.map((obs) => {
              const isFav = favorites.has(obs.id);
              return (
                <div
                  key={obs.id}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px', position: 'relative',
                    backdropFilter: 'blur(16px)', boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)',
                    aspectRatio: '1/1', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                    transition: 'transform 0.2s, background-color 0.2s', overflow: 'hidden',
                  }}
                  onClick={() => navigate(`/obs-details/${obs.id}`)}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <div style={cardBorder} />

                  <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '20px', color: '#fff', fontWeight: '500', fontFamily: 'Naga' }}>{obs.username}</span>
                    <span style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', transform: 'rotate(45deg)', display: 'inline-block' }}>↗</span>
                  </div>

                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                      <path d="M12 6V12L16 14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="12" cy="12" r="2" fill="rgba(255,255,255,0.2)" />
                    </svg>
                  </div>

                  <div style={{ position: 'absolute', bottom: '80px', left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
                    <span style={{ fontSize: '24px', color: '#fff', fontWeight: '600', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'Naga' }}>
                      {obs.comet_name ?? '—'}
                    </span>
                  </div>

                  <div style={{ height: '61px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', fontFamily: 'Naga' }}>{formatDate(obs.date_obs)}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(obs.id); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill={isFav ? '#ffffff' : 'none'} stroke="#ffffff" strokeWidth="2" style={{ transition: 'fill 0.2s' }}>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '16px', fontFamily: 'Naga' }}>
          Всего наблюдений: {result.total}
        </div>
      </div>
    </div>
  );
}
