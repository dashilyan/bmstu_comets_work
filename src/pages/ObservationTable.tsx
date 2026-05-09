import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useApiWithFallback } from '../hooks/useApiWithFallback';
import { api } from '../api/api';
import { MOCK_MY_OBSERVATIONS, formatDate, statusLabel } from '../data/mockData';
import type { ApiObservation } from '../api/types';

const PAGE_SIZE = 10;

const inputStyle: React.CSSProperties = {
  width: '100%', height: '48px', backgroundColor: 'rgba(255,255,255,0.1)',
  border: 'none', borderRadius: '32px', padding: '0 20px', fontSize: '16px',
  color: '#fff', outline: 'none', position: 'relative', zIndex: 1, boxSizing: 'border-box', fontFamily: 'Naga',
};

const gradBorder: React.CSSProperties = {
  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '32px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none', zIndex: 2,
};

const btnStyle: React.CSSProperties = {
  padding: '6px 12px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none',
  borderRadius: '20px', color: '#fff', fontSize: '13px', cursor: 'pointer',
  position: 'relative', fontFamily: 'Naga',
};

const btnBorder: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '20px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
};

export function UserObservations() {
  useEffect(() => { document.body.classList.remove('main-page'); }, []);

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('Все');
  const [page, setPage] = useState(0);

  const { data: allObservations, usingMock } = useApiWithFallback<ApiObservation[]>(
    () => api.getMyObservations(),
    MOCK_MY_OBSERVATIONS,
  );

  const statusOptions = ['Все', 'published', 'draft', 'rejected', 'archived'];
  const statusRu: Record<string, string> = { published: 'подтверждено', draft: 'на проверке', rejected: 'требуется проверка', archived: 'архив', Все: 'Все' };

  const filtered = useMemo(() => {
    return allObservations.filter((obs) => {
      const nameMatch = !filterName || obs.comet_name.toLowerCase().includes(filterName.toLowerCase());
      const dateMatch = !filterDate || formatDate(obs.date_obs).includes(filterDate);
      const statusMatch = filterStatus === 'Все' || obs.status === filterStatus;
      return nameMatch && dateMatch && statusMatch;
    });
  }, [allObservations, filterName, filterDate, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const resetFilters = () => {
    setFilterName('');
    setFilterDate('');
    setFilterStatus('Все');
    setPage(0);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '80px auto 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>
            Главная / Профиль / Мои наблюдения
          </div>
          {usingMock && <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Naga' }}>офлайн-режим</span>}
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '32px auto 64px' }}>
        <h1 style={{ fontSize: '36px', color: '#fff', textTransform: 'uppercase', marginBottom: '32px', fontFamily: 'Lemon Milk' }}>
          Мои наблюдения
        </h1>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '48px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          {/* Name filter */}
          <div style={{ flex: '1 1 200px' }}>
            <div style={{ fontSize: '18px', color: '#fff', marginBottom: '8px', fontFamily: 'Lemon Milk' }}>Название кометы</div>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Введите название..." value={filterName} onChange={(e) => { setFilterName(e.target.value); setPage(0); }} style={inputStyle} />
              <div style={gradBorder} />
            </div>
          </div>

          {/* Date filter */}
          <div style={{ flex: '1 1 200px' }}>
            <div style={{ fontSize: '18px', color: '#fff', marginBottom: '8px', fontFamily: 'Lemon Milk' }}>Дата наблюдения</div>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="ДД.ММ.ГГГГ" value={filterDate} onChange={(e) => { setFilterDate(e.target.value); setPage(0); }} style={inputStyle} />
              <div style={gradBorder} />
            </div>
          </div>

          {/* Status filter */}
          <div style={{ flex: '1 1 200px' }}>
            <div style={{ fontSize: '18px', color: '#fff', marginBottom: '8px', fontFamily: 'Lemon Milk' }}>Статус</div>
            <div style={{ position: 'relative' }}>
              <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value); setPage(0); }}
                style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
              >
                {statusOptions.map((s) => <option key={s} value={s} style={{ backgroundColor: '#1a1f2a' }}>{statusRu[s]}</option>)}
              </select>
              <div style={gradBorder} />
              <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '12px', zIndex: 3, pointerEvents: 'none' }}>▼</div>
            </div>
          </div>

          {/* Reset */}
          <button onClick={resetFilters} style={{ ...btnStyle, height: '48px', padding: '0 24px' }}>
            <div style={btnBorder} />
            <span>Сбросить</span>
          </button>
        </div>

        {/* Table */}
        <div style={{
          width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '32px',
          position: 'relative', backdropFilter: 'blur(16px)',
          boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.25)', padding: '32px', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '32px', padding: '1px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
          }} />

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['ID', 'Комета', 'Дата', 'Координаты', 'Статус', 'Действия'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)', fontFamily: 'Naga' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Naga' }}>
                    Наблюдений не найдено
                  </td>
                </tr>
              ) : pageData.map((obs) => {
                const { label, color } = statusLabel(obs.status);
                return (
                  <tr key={obs.id}>
                    <td style={{ padding: '12px 8px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Naga' }}>#{obs.id}</td>
                    <td style={{ padding: '12px 8px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Naga' }}>{obs.comet_name}</td>
                    <td style={{ padding: '12px 8px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Naga' }}>{formatDate(obs.date_obs)}</td>
                    <td style={{ padding: '12px 8px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Naga' }}>{obs.coordinates}</td>
                    <td style={{ padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: `${color}20`, color, borderRadius: '20px', fontSize: '14px', fontFamily: 'Naga' }}>
                        {label}
                      </span>
                    </td>
                    <td style={{ padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <button onClick={() => navigate(`/obs-details/${obs.id}`)} style={btnStyle}>
                        <div style={btnBorder} />
                        <span>Подробнее</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontFamily: 'Naga' }}>
            <span>Всего наблюдений: {filtered.length}</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} style={{ ...btnStyle, opacity: page === 0 ? 0.4 : 1 }}>
                <div style={btnBorder} />
                <span>← Предыдущая</span>
              </button>
              <span style={{ padding: '6px 12px' }}>
                {filtered.length === 0 ? '0' : `${page * PAGE_SIZE + 1} – ${Math.min((page + 1) * PAGE_SIZE, filtered.length)}`} из {filtered.length}
              </span>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} style={{ ...btnStyle, opacity: page >= totalPages - 1 ? 0.4 : 1 }}>
                <div style={btnBorder} />
                <span>Следующая →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
