import type {
  ApiUser, UserStats, ApiComet, ApiCometDetail, ApiTelescope,
  ApiObservation, ApiObservationDetail, ApiUserFavorite,
  ApiModerationQueue, ApiObservationsList,
} from './types';

export const API_BASE = 'http://localhost:8000';

function getCsrfToken(): string {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : '';
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const isFormData = options?.body instanceof FormData;
  const headers: Record<string, string> = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const method = options?.method?.toUpperCase() ?? 'GET';
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const csrf = getCsrfToken();
    if (csrf) headers['X-CSRFToken'] = csrf;
  }

  const resp = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: { ...headers, ...options?.headers },
  });

  if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
  return resp.json() as Promise<T>;
}

export const api = {
  login: (username: string, password: string) =>
    apiFetch<{ message: string; user: ApiUser }>('/api/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  register: (data: { username: string; password: string; email?: string; education?: string }) =>
    apiFetch<ApiUser>('/api/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiFetch<{ message: string }>('/api/logout/', { method: 'POST' }),

  getProfile: () => apiFetch<UserStats>('/api/profile/'),

  updateProfile: (data: Record<string, string>) =>
    apiFetch<ApiUser>('/api/profile/update/', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getComets: (search?: string) => {
    const qs = search ? `?search=${encodeURIComponent(search)}` : '';
    return apiFetch<ApiComet[]>(`/api/comets/${qs}`);
  },

  getCometDetail: (id: number) =>
    apiFetch<ApiCometDetail>(`/api/comets/${id}/`),

  getTelescopes: (search?: string) => {
    const qs = search ? `?search=${encodeURIComponent(search)}` : '';
    return apiFetch<ApiTelescope[]>(`/api/telescopes/${qs}`);
  },

  getMyObservations: (params: { status?: string; date_from?: string; date_to?: string } = {}) => {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v) qs.set(k, v); });
    return apiFetch<ApiObservation[]>(`/api/observations/my/?${qs}`);
  },

  getAllObservations: (params: { limit?: number; offset?: number; comet_id?: number } = {}) => {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v !== undefined) qs.set(k, String(v)); });
    return apiFetch<ApiObservationsList>(`/api/observations/all/?${qs}`);
  },

  getObservationDetail: (id: number) =>
    apiFetch<ApiObservationDetail>(`/api/observations/${id}/`),

  createObservation: (formData: FormData) =>
    apiFetch<ApiObservationDetail>('/api/observations/create/', {
      method: 'POST',
      body: formData,
    }),

  submitObservation: (id: number) =>
    apiFetch<{ message: string; id: number }>(`/api/observations/${id}/submit/`, {
      method: 'POST',
    }),

  getFavorites: () => apiFetch<ApiUserFavorite[]>('/api/favorites/'),

  addFavorite: (id: number) =>
    apiFetch<{ message: string }>(`/api/favorites/add/${id}/`, { method: 'POST' }),

  removeFavorite: (id: number) =>
    apiFetch<{ message: string }>(`/api/favorites/remove/${id}/`, { method: 'DELETE' }),

  getModerationQueue: () => apiFetch<ApiModerationQueue>('/api/moderation/queue/'),

  approveObservation: (id: number) =>
    apiFetch<{ message: string }>(`/api/moderation/approve/${id}/`, { method: 'PUT' }),

  rejectObservation: (id: number) =>
    apiFetch<{ message: string }>(`/api/moderation/reject/${id}/`, { method: 'PUT' }),
};
