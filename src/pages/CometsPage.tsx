import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useApiWithFallback } from '../hooks/useApiWithFallback';
import { api } from '../api/api';
import { MOCK_COMETS } from '../data/mockData';
import type { ApiComet } from '../api/types';

export function CometsPage() {
  useEffect(() => { document.body.classList.remove('main-page'); }, []);

  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { data: comets, loading, usingMock } = useApiWithFallback<ApiComet[]>(
    () => api.getComets(search || undefined),
    MOCK_COMETS,
    [search],
  );

  const [columns, setColumns] = useState(4);
  useEffect(() => {
    const calc = () => {
      const avail = window.innerWidth - 160;
      setColumns(Math.max(1, Math.min(6, Math.floor((avail + 32) / (250 + 32)))));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const obsCount = (c: ApiComet) => {
    // Derived from mock data observation counts for display
    const counts: Record<number, number> = { 1: 156, 2: 342, 3: 89, 4: 234, 5: 567, 6: 45, 7: 178, 8: 892, 9: 423, 10: 1256, 11: 678, 12: 345, 13: 234, 14: 567, 15: 123, 16: 67, 17: 89, 18: 34 };
    return counts[c.id] ?? 0;
  };

  const plural = (n: number) =>
    n === 1 ? 'наблюдение' : n >= 2 && n <= 4 ? 'наблюдения' : 'наблюдений';

  const cardBorder: React.CSSProperties = {
    position: 'absolute', inset: 0, borderRadius: '32px', padding: '1px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '48px auto 0' }}>
        <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px', fontFamily: 'Naga' }}>
          Главная / Кометы
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '36px', fontFamily: 'Lemon Milk', color: '#fff', textTransform: 'uppercase', margin: 0 }}>
            Все кометы, найденные в нашей системе
          </h1>
          {usingMock && (
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Naga' }}>
              офлайн-режим
            </span>
          )}
        </div>

        {/* Search */}
        <div style={{ marginTop: '24px', position: 'relative', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', height: '48px', backgroundColor: 'rgba(255,255,255,0.1)',
              border: 'none', borderRadius: '32px', padding: '0 20px',
              fontSize: '16px', fontFamily: 'Naga', color: '#fff', outline: 'none', boxSizing: 'border-box',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '32px', padding: '1px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
          }} />
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '80px auto 64px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontFamily: 'Naga', fontSize: '18px', marginTop: '80px' }}>
            Загрузка...
          </div>
        ) : comets.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: 'Naga', fontSize: '18px', marginTop: '80px' }}>
            Кометы не найдены
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '32px' }}>
            {comets.map((comet) => (
              <div
                key={comet.id}
                onClick={() => navigate(`/comet-details/${comet.id}`)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px', position: 'relative',
                  backdropFilter: 'blur(16px)', boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)',
                  aspectRatio: '1/1', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                  transition: 'transform 0.2s, background-color 0.2s', overflow: 'hidden',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <div style={cardBorder} />

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(255,255,255,0.1)" />
                  </svg>
                </div>

                <div style={{
                  height: '64px', backgroundColor: 'rgba(255,255,255,0.08)',
                  borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  alignItems: 'center', padding: '0 12px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '16px', fontFamily: 'Naga', fontWeight: '500', color: '#fff', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                    {comet.official_name}
                  </div>
                  <div style={{ fontSize: '12px', fontFamily: 'Naga', color: 'rgba(255,255,255,0.6)' }}>
                    {obsCount(comet)} {plural(obsCount(comet))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '16px', fontFamily: 'Naga' }}>
          Всего комет в каталоге: {comets.length}
        </div>
      </div>
    </div>
  );
}
