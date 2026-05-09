import { useEffect, useState, useMemo } from 'react';
import { AppHeader } from '../components/AppHeader';
import { useApiWithFallback } from '../hooks/useApiWithFallback';
import { api } from '../api/api';
import { MOCK_MODERATION_QUEUE, formatDateTime } from '../data/mockData';
import type { ApiModerationQueue, ApiObservationDetail } from '../api/types';

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

const circleBtnStyle: React.CSSProperties = {
  width: '36px', height: '36px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none',
  borderRadius: '50%', color: '#fff', fontSize: '18px', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', fontFamily: 'Naga',
};

const circleBorder: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '50%', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
};

const btnStyle: React.CSSProperties = {
  height: '48px', padding: '0 24px', backgroundColor: 'rgba(255,255,255,0.1)',
  border: 'none', borderRadius: '32px', color: '#fff', fontSize: '16px',
  cursor: 'pointer', position: 'relative', fontFamily: 'Naga',
};

const btnBorder: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '32px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
};

const pagBtnStyle: React.CSSProperties = {
  padding: '6px 12px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none',
  borderRadius: '20px', color: '#fff', fontSize: '13px', cursor: 'pointer',
  position: 'relative', fontFamily: 'Naga',
};

const pagBorder: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '20px', padding: '1px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
};

export function ModeratorQueue() {
  useEffect(() => { document.body.classList.remove('main-page'); }, []);

  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [page, setPage] = useState(0);

  // Local state for processed IDs to hide approved/rejected rows optimistically
  const [processed, setProcessed] = useState<Set<number>>(new Set());

  const { data: queue, usingMock, refetch } = useApiWithFallback<ApiModerationQueue>(
    () => api.getModerationQueue(),
    MOCK_MODERATION_QUEUE,
  );

  const filtered = useMemo(() => {
    return queue.observations.filter((obs) => {
      if (processed.has(obs.id)) return false;
      const authorMatch = !filterAuthor || obs.user.username.toLowerCase().includes(filterAuthor.toLowerCase());
      const dateMatch = !filterDateFrom || formatDateTime(obs.date_created).includes(filterDateFrom);
      return authorMatch && dateMatch;
    });
  }, [queue.observations, filterAuthor, filterDateFrom, processed]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleApprove = async (obs: ApiObservationDetail) => {
    setProcessed((prev) => new Set(prev).add(obs.id));
    try {
      await api.approveObservation(obs.id);
    } catch {
      // if API fails (e.g. mock mode), still remove from view
    }
    refetch();
  };

  const handleReject = async (obs: ApiObservationDetail) => {
    setProcessed((prev) => new Set(prev).add(obs.id));
    try {
      await api.rejectObservation(obs.id);
    } catch {
      // ignore in mock mode
    }
    refetch();
  };

  const resetFilters = () => {
    setFilterAuthor('');
    setFilterDateFrom('');
    setPage(0);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '80px auto 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>
            Главная / Модерация / Очередь проверки
          </div>
          {usingMock && <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Naga' }}>офлайн-режим</span>}
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: '1280px', width: 'calc(100% - 80px)', margin: '32px auto 64px' }}>
        <h1 style={{
          fontSize: '36px', color: '#fff', textTransform: 'uppercase', marginBottom: '32px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Lemon Milk',
        }}>
          Очередь на проверку
          <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '32px', fontWeight: 'normal', fontFamily: 'Naga' }}>
            {filtered.length} заявок
          </span>
        </h1>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '48px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 200px' }}>
            <div style={{ fontSize: '18px', color: '#fff', marginBottom: '8px', fontFamily: 'Lemon Milk' }}>Автор</div>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Имя пользователя..." value={filterAuthor} onChange={(e) => { setFilterAuthor(e.target.value); setPage(0); }} style={inputStyle} />
              <div style={gradBorder} />
            </div>
          </div>

          <div style={{ flex: '1 1 200px' }}>
            <div style={{ fontSize: '18px', color: '#fff', marginBottom: '8px', fontFamily: 'Lemon Milk' }}>Дата от</div>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="ДД.ММ.ГГГГ" value={filterDateFrom} onChange={(e) => { setFilterDateFrom(e.target.value); setPage(0); }} style={inputStyle} />
              <div style={gradBorder} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button onClick={resetFilters} style={btnStyle}>
              <div style={btnBorder} />
              <span>Сбросить</span>
            </button>
          </div>
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
                {['ID', 'Объект', 'Автор', 'Дата подачи', '', ''].map((h, i) => (
                  <th key={i} style={{ textAlign: 'left', padding: '16px 8px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)', fontFamily: 'Naga' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Naga' }}>
                    Заявок нет
                  </td>
                </tr>
              ) : pageData.map((obs) => (
                <tr key={obs.id}>
                  <td style={{ padding: '12px 8px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Naga' }}>#{obs.id}</td>
                  <td style={{ padding: '12px 8px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Naga' }}>{obs.comet.official_name}</td>
                  <td style={{ padding: '12px 8px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Naga' }}>{obs.user.username}</td>
                  <td style={{ padding: '12px 8px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Naga' }}>{formatDateTime(obs.date_created)}</td>
                  <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(255,255,255,0.1)', width: '40px' }}>
                    <button style={circleBtnStyle} title="Подтвердить" onClick={() => handleApprove(obs)}>
                      <div style={circleBorder} />✓
                    </button>
                  </td>
                  <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(255,255,255,0.1)', width: '40px' }}>
                    <button style={circleBtnStyle} title="Отклонить" onClick={() => handleReject(obs)}>
                      <div style={circleBorder} />✗
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontFamily: 'Naga' }}>
            <span>Всего заявок: {filtered.length}</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} style={{ ...pagBtnStyle, opacity: page === 0 ? 0.4 : 1 }}>
                <div style={pagBorder} /><span>← Предыдущая</span>
              </button>
              <span style={{ padding: '6px 12px' }}>
                {filtered.length === 0 ? '0' : `${page * PAGE_SIZE + 1} – ${Math.min((page + 1) * PAGE_SIZE, filtered.length)}`} из {filtered.length}
              </span>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} style={{ ...pagBtnStyle, opacity: page >= totalPages - 1 ? 0.4 : 1 }}>
                <div style={pagBorder} /><span>Следующая →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
