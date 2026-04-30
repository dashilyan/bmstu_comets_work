import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useApiWithFallback } from '../hooks/useApiWithFallback';
import { api } from '../api/api';
import { MOCK_COMETS, MOCK_ALL_OBSERVATIONS, formatDate } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import type { ApiCometDetail, ApiObservation } from '../api/types';

const cardBorder: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '32px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
};

const smallCardBorder: React.CSSProperties = { ...cardBorder, borderRadius: '24px' };

const rowStyle: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
  paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)',
};

const btnStyle: React.CSSProperties = {
  padding: '10px 20px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none',
  borderRadius: '24px', color: '#fff', fontSize: '14px', fontFamily: 'Naga',
  cursor: 'pointer', position: 'relative',
};

const btnBorder: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '24px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
};

// Default comet for when no ID is provided
const DEFAULT_COMET: ApiCometDetail = {
  ...MOCK_COMETS[0],
  observations_count: 156,
  observations: MOCK_ALL_OBSERVATIONS.slice(0, 5),
};

export function CometPage() {
  useEffect(() => { document.body.classList.remove('main-page'); }, []);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const cometId = id ? parseInt(id, 10) : null;

  const mockComet: ApiCometDetail = cometId
    ? { ...(MOCK_COMETS.find((c) => c.id === cometId) ?? MOCK_COMETS[0]), observations_count: 156, observations: MOCK_ALL_OBSERVATIONS.slice(0, 5) }
    : DEFAULT_COMET;

  const { data: comet, usingMock } = useApiWithFallback<ApiCometDetail>(
    () => cometId ? api.getCometDetail(cometId) : Promise.reject(new Error('no id')),
    mockComet,
    [cometId],
  );

  const [favorites, setFavorites] = useState<Set<number>>(new Set([2, 5]));

  const toggleFavorite = async (obsId: number) => {
    const wasFav = favorites.has(obsId);
    setFavorites((prev) => {
      const next = new Set(prev);
      if (wasFav) next.delete(obsId); else next.add(obsId);
      return next;
    });
    if (isAuthenticated) {
      try {
        if (wasFav) await api.removeFavorite(obsId);
        else await api.addFavorite(obsId);
      } catch {
        setFavorites((prev) => {
          const next = new Set(prev);
          if (wasFav) next.add(obsId); else next.delete(obsId);
          return next;
        });
      }
    }
  };

  const orbitalParams = [
    { label: 'e', value: comet.e_avg?.toFixed(3) ?? '—', description: 'эксцентриситет' },
    { label: 'i', value: comet.i_avg != null ? `${comet.i_avg.toFixed(2)}°` : '—', description: 'наклонение орбиты' },
    { label: 'Ω', value: comet.node_avg != null ? `${comet.node_avg.toFixed(1)}°` : '—', description: 'долгота восходящего узла' },
    { label: 'ω', value: comet.peri_avg != null ? `${comet.peri_avg.toFixed(1)}°` : '—', description: 'аргумент перигелия' },
    { label: 'a', value: comet.a_avg?.toFixed(2) ?? '—', description: 'большая полуось (а.е.)' },
    { label: 'P', value: comet.p_avg != null ? `${comet.p_avg.toFixed(1)} лет` : '—', description: 'период обращения' },
  ];

  const FavHeart = ({ obsId }: { obsId: number }) => {
    const isFav = favorites.has(obsId);
    return (
      <button onClick={(e) => { e.stopPropagation(); toggleFavorite(obsId); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill={isFav ? '#ffffff' : 'none'} stroke="#ffffff" strokeWidth="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    );
  };

  const ObsCard = ({ obs }: { obs: ApiObservation }) => (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '24px', position: 'relative',
      backdropFilter: 'blur(16px)', boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)',
      aspectRatio: '1/1', display: 'flex', flexDirection: 'column', cursor: 'pointer', overflow: 'hidden',
    }} onClick={() => navigate(`/obs-details/${obs.id}`)}>
      <div style={smallCardBorder} />
      <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ fontSize: '16px', color: '#fff', fontFamily: 'Naga' }}>{obs.username}</span>
        <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>↗</span>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <path d="M12 6V12L16 14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        </svg>
      </div>
      <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontFamily: 'Naga' }}>{formatDate(obs.date_obs)}</span>
        <FavHeart obsId={obs.id} />
      </div>
    </div>
  );

  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      {/* Header block */}
      <div className="position-relative overflow-hidden" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', marginTop: '48px' }}>
        <div style={{ padding: '46px 0', position: 'relative', zIndex: 2 }}>
          <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga', marginBottom: '8px' }}>
                  Главная / Кометы / {comet.official_name}
                </div>
                <div style={{ fontSize: '36px', color: '#fff', textTransform: 'uppercase', fontFamily: 'Lemon Milk' }}>
                  {comet.official_name}
                </div>
              </div>
              {usingMock && <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Naga', marginTop: '8px' }}>офлайн-режим</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '40px auto 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
          {/* Comet info */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px', position: 'relative', backdropFilter: 'blur(16px)', boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)', padding: '32px' }}>
            <div style={cardBorder} />

            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '28px', color: '#fff', margin: 0, textTransform: 'uppercase', fontFamily: 'Lemon Milk' }}>
                {comet.official_name}
              </h2>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '4px', fontFamily: 'Naga' }}>
                {comet.observations_count} наблюдений
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                ['Дата открытия', comet.date_founded ? new Date(comet.date_founded).toLocaleDateString('ru-RU') : '—'],
                ['Яркость', comet.brightness != null ? `${comet.brightness}m` : '—'],
                ['Размер комы', comet.coma_size ?? '—'],
              ].map(([label, value]) => (
                <div key={label} style={rowStyle}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', fontFamily: 'Naga' }}>{label}</span>
                  <span style={{ color: '#fff', fontSize: '15px', fontFamily: 'Naga' }}>{value}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '18px', fontFamily: 'Lemon Milk', color: '#fff', marginBottom: '16px', textTransform: 'uppercase' }}>
              Орбитальные параметры
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '16px' }}>
              {orbitalParams.map((p) => (
                <div key={p.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '8px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '20px', color: '#fff', fontFamily: 'Naga', marginBottom: '4px' }}>{p.value}</div>
                  <div style={{ fontSize: '14px', fontFamily: 'Naga', color: 'rgba(255,255,255,0.5)', marginBottom: '2px' }}>{p.label}</div>
                  <div style={{ fontSize: '11px', fontFamily: 'Naga', color: 'rgba(255,255,255,0.3)' }}>{p.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent observations grid */}
          <div>
            <h2 style={{ fontSize: '24px', fontFamily: 'Lemon Milk', color: '#fff', textTransform: 'uppercase', marginBottom: '24px' }}>
              Последние наблюдения
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {comet.observations.slice(0, 4).map((obs) => <ObsCard key={obs.id} obs={obs} />)}
            </div>
          </div>
        </div>

        {/* All observations list */}
        <div>
          <h2 style={{ fontSize: '24px', fontFamily: 'Lemon Milk', color: '#fff', textTransform: 'uppercase', marginBottom: '24px' }}>
            Все наблюдения ({comet.observations.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {comet.observations.map((obs) => {
              const isFav = favorites.has(obs.id);
              return (
                <div key={obs.id} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px', position: 'relative', backdropFilter: 'blur(16px)', boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={cardBorder} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.3)' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="7" r="4" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '20px', color: '#fff', marginBottom: '4px', fontFamily: 'Naga' }}>{obs.username}</div>
                      <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>{obs.photos_count} фото</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', fontFamily: 'Naga' }}>{formatDate(obs.date_obs)}</div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <button onClick={() => navigate(`/obs-details/${obs.id}`)} style={btnStyle}>
                        <div style={btnBorder} /><span>Посмотреть наблюдение</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(obs.id); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px', display: 'flex', alignItems: 'center' }}
                      >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill={isFav ? '#ffffff' : 'none'} stroke="#ffffff" strokeWidth="2">
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
