import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useApiWithFallback } from '../hooks/useApiWithFallback';
import { api } from '../api/api';
import {
  MOCK_ALL_OBSERVATIONS, MOCK_MY_OBSERVATIONS, MOCK_COMETS, MOCK_TELESCOPES, MOCK_USER,
  formatDate, statusLabel,
} from '../data/mockData';
import type { ApiObservationDetail } from '../api/types';

const gradBorder: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '32px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
};

function buildMockDetail(id: number): ApiObservationDetail {
  const obs = [...MOCK_MY_OBSERVATIONS, ...MOCK_ALL_OBSERVATIONS].find((o) => o.id === id);
  const comet = MOCK_COMETS.find((c) => c.id === (obs?.comet_id ?? 1)) ?? MOCK_COMETS[0];
  const telescope = MOCK_TELESCOPES.find((t) => t.id === (obs?.telescope_id ?? 1)) ?? MOCK_TELESCOPES[0];
  return {
    id: obs?.id ?? id,
    date_obs: obs?.date_obs ?? '2026-03-12T20:00:00Z',
    coordinates: obs?.coordinates ?? "12h 34m / +45° 12'",
    is_public: obs?.is_public ?? true,
    status: obs?.status ?? 'published',
    date_created: obs?.date_created ?? '2026-03-12T21:00:00Z',
    notes: obs?.notes ?? null,
    comet,
    telescope,
    user: MOCK_USER,
    photos: [],
    calculation: null,
  };
}

type FieldItem = { label: string; value: string; color?: string };

export function ObservationDetailsPage() {
  useEffect(() => { document.body.classList.remove('main-page'); }, []);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const obsId = id ? parseInt(id, 10) : 1234;
  const mockDetail = buildMockDetail(obsId);

  const [currentImage, setCurrentImage] = useState(0);

  const { data: obs, usingMock } = useApiWithFallback<ApiObservationDetail>(
    () => api.getObservationDetail(obsId),
    mockDetail,
    [obsId],
  );

  const photos = obs.photos;
  const hasPhotos = photos.length > 0;
  const totalImages = hasPhotos ? photos.length : 0;

  const prevImage = () => setCurrentImage((i) => (i - 1 + totalImages) % totalImages);
  const nextImage = () => setCurrentImage((i) => (i + 1) % totalImages);

  const { label: statusText, color: statusColor } = statusLabel(obs.status);
  const calc = obs.calculation;
  const comet = obs.comet;

  const fields: FieldItem[] = [
    { label: 'Телескоп', value: obs.telescope.model_name },
    { label: 'Дата наблюдения', value: formatDate(obs.date_obs) },
    { label: 'Координаты', value: obs.coordinates },
    { label: 'Статус', value: statusText, color: statusColor },
    ...(obs.notes ? [{ label: 'Комментарии', value: obs.notes }] : []),
    ...(calc?.coma ? [{ label: 'Размер комы', value: calc.coma }] : comet.coma_size ? [{ label: 'Размер комы', value: comet.coma_size }] : []),
    ...(calc?.brightness != null ? [{ label: 'Яркость', value: `${calc.brightness}m` }] : comet.brightness != null ? [{ label: 'Яркость', value: `${comet.brightness}m` }] : []),
  ];

  const orbitalParams = [
    { label: 'e', value: calc?.exentricity ?? comet.e_avg, description: 'эксцентриситет' },
    { label: 'i', value: calc?.inclination ?? comet.i_avg, description: 'наклонение' },
    { label: 'Ω', value: calc?.longtitude ?? comet.node_avg, description: 'долгота узла' },
    { label: 'ω', value: calc?.arg_perihelion ?? comet.peri_avg, description: 'аргумент перигелия' },
    { label: 'a', value: comet.a_avg, description: 'большая полуось (а.е.)' },
    { label: 'P', value: calc?.orbital_period ?? comet.p_avg, description: 'период (лет)' },
  ];

  const fmtVal = (v: number | null | undefined) =>
    v != null ? v.toFixed(2) : '—';

  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '48px auto 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>
            Главная / Наблюдения / Детали наблюдения
          </div>
          {usingMock && <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Naga' }}>офлайн-режим</span>}
        </div>
      </div>

      <main className="flex-grow-1">
        <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '32px auto 64px' }}>
          <div style={{ display: 'flex', gap: '32px' }}>

            {/* Left: image carousel */}
            <div style={{ width: '45%' }}>
              <div style={{
                width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px',
                position: 'relative', backdropFilter: 'blur(16px)',
                boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)', overflow: 'hidden', aspectRatio: '4/3',
              }}>
                <div style={{ ...gradBorder, zIndex: 2 }} />

                {hasPhotos ? (
                  <img
                    src={photos[currentImage].url ?? photos[currentImage].file_path}
                    alt="Наблюдение"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                      <path d="M12 6V12L16 14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Naga', fontSize: '14px' }}>Нет фотографий</span>
                  </div>
                )}

                {totalImages > 1 && (
                  <>
                    <button onClick={prevImage} style={{
                      position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.2)', border: 'none', width: '48px', height: '48px',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: '#fff', fontSize: '24px', backdropFilter: 'blur(4px)', zIndex: 3,
                    }}>‹</button>
                    <button onClick={nextImage} style={{
                      position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.2)', border: 'none', width: '48px', height: '48px',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: '#fff', fontSize: '24px', backdropFilter: 'blur(4px)', zIndex: 3,
                    }}>›</button>
                    <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 3 }}>
                      {photos.map((_, i) => (
                        <div key={i} onClick={() => setCurrentImage(i)} style={{
                          width: '8px', height: '8px', borderRadius: '50%', cursor: 'pointer',
                          backgroundColor: i === currentImage ? '#fff' : 'rgba(255,255,255,0.4)',
                          transition: 'background-color 0.3s',
                        }} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right: info card */}
            <div style={{ width: '55%' }}>
              <div style={{
                width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px',
                position: 'relative', backdropFilter: 'blur(16px)',
                boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)', padding: '32px', display: 'flex', flexDirection: 'column',
              }}>
                <div style={gradBorder} />

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontFamily: 'Naga' }}>
                    Наблюдение №{obs.id}
                  </div>
                  <h2 style={{ fontSize: '28px', color: '#fff', margin: 0, textTransform: 'uppercase', fontFamily: 'Lemon Milk' }}>
                    Комета {obs.comet.official_name}
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {fields.map((f) => (
                    <div key={f.label} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                      paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)',
                    }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', fontFamily: 'Naga' }}>{f.label}</span>
                      <span style={{ color: f.color ?? '#fff', fontSize: '15px', textAlign: 'right', maxWidth: '60%', fontFamily: 'Naga' }}>
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Lemon Milk' }}>
                    Орбитальные параметры
                  </h3>
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px',
                    backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '16px',
                  }}>
                    {orbitalParams.map((param) => (
                      <div key={param.label} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                        padding: '8px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px',
                      }}>
                        <div style={{ fontSize: '20px', color: '#fff', fontWeight: '500', marginBottom: '4px', fontFamily: 'Naga' }}>
                          {fmtVal(param.value)}
                        </div>
                        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '2px', fontFamily: 'Naga' }}>
                          {param.label}
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'Naga' }}>
                          {param.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Observer info bar */}
          <div style={{ marginTop: '32px' }}>
            <div style={{
              width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px',
              position: 'relative', backdropFilter: 'blur(16px)',
              boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)', padding: '24px 32px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={gradBorder} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.3)',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="7" r="4" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '18px', color: '#fff', marginBottom: '4px', fontFamily: 'Naga' }}>
                    {obs.user.username}
                  </div>
                  {(obs.user.first_name || obs.user.last_name) && (
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Naga' }}>
                      {obs.user.first_name} {obs.user.last_name}
                    </div>
                  )}
                </div>
              </div>

              <button onClick={() => navigate('/profile')} style={{
                padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none',
                position: 'relative', cursor: 'pointer', fontSize: '16px', color: '#fff',
                borderRadius: '32px', outline: 'none', fontFamily: 'Naga',
              }}>
                <div style={gradBorder} />
                <span>Посмотреть профиль</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
