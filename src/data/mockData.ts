import type {
  ApiComet, ApiObservation, ApiObservationDetail, UserStats,
  ApiModerationQueue, ApiTelescope, ApiUser,
} from '../api/types';

export const MOCK_USER: UserStats = {
  id: 1,
  username: 'astro_daria',
  email: 'daria@cometica.ru',
  first_name: 'Дарья',
  last_name: 'Рабочая',
  date_joined: '2025-01-15T10:00:00Z',
  profile: {
    education: 'МГУ, Астрономия',
    city: 'Москва',
    bio: '',
    avatar_path: '',
  },
  total_observations: 42,
  public_observations: 38,
  calculations_count: 35,
  recent_observations: [],
};

const mkUser = (id: number, username: string): ApiUser => ({
  id,
  username,
  email: '',
  first_name: '',
  last_name: '',
  date_joined: '2025-01-01T00:00:00Z',
  profile: { education: '', city: '', bio: '', avatar_path: '' },
});

export const MOCK_COMETS: ApiComet[] = [
  { id: 1, official_name: 'C/2023 A3', date_founded: '2023-01-03', a_avg: 42.5, e_avg: 0.998, i_avg: 139.8, node_avg: 308.8, peri_avg: 209.1, p_avg: null, coma_size: "10' × 8'", brightness: 6.5 },
  { id: 2, official_name: '12P/Pons-Brooks', date_founded: '1812-07-21', a_avg: 17.2, e_avg: 0.954, i_avg: 74.2, node_avg: 255.9, peri_avg: 199.0, p_avg: 71.3, coma_size: "20' × 15'", brightness: 4.8 },
  { id: 3, official_name: 'C/2024 E1', date_founded: '2024-03-10', a_avg: null, e_avg: null, i_avg: null, node_avg: null, peri_avg: null, p_avg: null, coma_size: null, brightness: 9.2 },
  { id: 4, official_name: 'C/2023 H2', date_founded: '2023-04-22', a_avg: null, e_avg: null, i_avg: null, node_avg: null, peri_avg: null, p_avg: null, coma_size: "8' × 6'", brightness: 8.1 },
  { id: 5, official_name: '29P/Schwassmann-Wachmann', date_founded: '1927-11-15', a_avg: 6.0, e_avg: 0.044, i_avg: 9.4, node_avg: 312.5, peri_avg: 49.9, p_avg: 14.7, coma_size: "30' × 25'", brightness: 7.2 },
  { id: 6, official_name: 'C/2024 J2', date_founded: '2024-05-01', a_avg: null, e_avg: null, i_avg: null, node_avg: null, peri_avg: null, p_avg: null, coma_size: null, brightness: 11.3 },
  { id: 7, official_name: 'C/2023 P1', date_founded: '2023-08-15', a_avg: null, e_avg: null, i_avg: null, node_avg: null, peri_avg: null, p_avg: null, coma_size: "12' × 10'", brightness: 7.8 },
  { id: 8, official_name: 'C/2022 E3 (ZTF)', date_founded: '2022-03-02', a_avg: null, e_avg: 1.0, i_avg: 109.2, node_avg: 302.2, peri_avg: 150.0, p_avg: null, coma_size: "50' × 40'", brightness: 4.2 },
  { id: 9, official_name: 'C/2021 S3 (PanSTARRS)', date_founded: '2021-09-24', a_avg: null, e_avg: null, i_avg: null, node_avg: null, peri_avg: null, p_avg: null, coma_size: "15' × 12'", brightness: 6.9 },
  { id: 10, official_name: 'C/2020 F3 (NEOWISE)', date_founded: '2020-03-27', a_avg: 368.1, e_avg: 0.999, i_avg: 128.9, node_avg: 61.0, peri_avg: 37.3, p_avg: null, coma_size: "2° × 1.5°", brightness: 1.0 },
  { id: 11, official_name: 'C/2017 K2 (PanSTARRS)', date_founded: '2017-05-21', a_avg: null, e_avg: null, i_avg: 87.5, node_avg: 87.6, peri_avg: 236.2, p_avg: null, coma_size: "20' × 18'", brightness: 7.5 },
  { id: 12, official_name: 'C/2019 Y4 (ATLAS)', date_founded: '2019-12-28', a_avg: null, e_avg: 1.0, i_avg: 45.4, node_avg: 0.0, peri_avg: 178.8, p_avg: null, coma_size: null, brightness: 8.7 },
  { id: 13, official_name: 'C/2020 M3 (ATLAS)', date_founded: '2020-06-27', a_avg: null, e_avg: null, i_avg: null, node_avg: null, peri_avg: null, p_avg: null, coma_size: "5' × 4'", brightness: 9.8 },
  { id: 14, official_name: 'C/2021 A1 (Leonard)', date_founded: '2021-01-03', a_avg: null, e_avg: 1.0, i_avg: 132.7, node_avg: 138.8, peri_avg: 255.8, p_avg: null, coma_size: "30' × 25'", brightness: 3.9 },
  { id: 15, official_name: 'C/2022 A2 (PanSTARRS)', date_founded: '2022-01-07', a_avg: null, e_avg: null, i_avg: null, node_avg: null, peri_avg: null, p_avg: null, coma_size: null, brightness: 10.1 },
  { id: 16, official_name: 'C/2023 V1', date_founded: '2023-11-05', a_avg: null, e_avg: null, i_avg: null, node_avg: null, peri_avg: null, p_avg: null, coma_size: null, brightness: 11.8 },
  { id: 17, official_name: 'C/2024 A1', date_founded: '2024-01-12', a_avg: null, e_avg: null, i_avg: null, node_avg: null, peri_avg: null, p_avg: null, coma_size: null, brightness: 12.3 },
  { id: 18, official_name: 'C/2024 B2', date_founded: '2024-01-25', a_avg: null, e_avg: null, i_avg: null, node_avg: null, peri_avg: null, p_avg: null, coma_size: null, brightness: 13.1 },
];

export const MOCK_TELESCOPES: ApiTelescope[] = [
  { id: 1, model_name: 'Celestron C8', focal_length: 2032, manufacturer: 'Celestron' },
  { id: 2, model_name: 'Meade LX200', focal_length: 2000, manufacturer: 'Meade' },
  { id: 3, model_name: 'Sky-Watcher 12"', focal_length: 1500, manufacturer: 'Sky-Watcher' },
  { id: 4, model_name: 'Orion 10"', focal_length: 1270, manufacturer: 'Orion' },
  { id: 5, model_name: 'ZWO AM5', focal_length: 800, manufacturer: 'ZWO' },
];

export const MOCK_MY_OBSERVATIONS: ApiObservation[] = [
  { id: 1234, date_obs: '2026-03-12T20:00:00Z', coordinates: "12h 34m / +45° 12'", is_public: true, status: 'published', date_created: '2026-03-12T21:00:00Z', comet_id: 1, comet_name: 'C/2023 A3', telescope_id: 1, telescope_model: 'Celestron C8', user_id: 1, username: 'astro_daria', notes: null, photos_count: 3 },
  { id: 1235, date_obs: '2026-03-05T19:30:00Z', coordinates: "10h 22m / +38° 45'", is_public: false, status: 'draft', date_created: '2026-03-05T20:30:00Z', comet_id: 2, comet_name: '12P/Pons-Brooks', telescope_id: 1, telescope_model: 'Celestron C8', user_id: 1, username: 'astro_daria', notes: null, photos_count: 5 },
  { id: 1236, date_obs: '2026-02-28T21:00:00Z', coordinates: "14h 56m / -22° 18'", is_public: false, status: 'rejected', date_created: '2026-02-28T22:00:00Z', comet_id: 3, comet_name: 'C/2024 E1', telescope_id: 1, telescope_model: 'Celestron C8', user_id: 1, username: 'astro_daria', notes: null, photos_count: 2 },
  { id: 1237, date_obs: '2026-02-20T20:00:00Z', coordinates: "08h 44m / +62° 33'", is_public: true, status: 'published', date_created: '2026-02-20T21:00:00Z', comet_id: 4, comet_name: 'C/2023 H2', telescope_id: 1, telescope_model: 'Celestron C8', user_id: 1, username: 'astro_daria', notes: null, photos_count: 4 },
  { id: 1238, date_obs: '2026-02-15T22:00:00Z', coordinates: "20h 12m / +11° 05'", is_public: true, status: 'published', date_created: '2026-02-15T23:00:00Z', comet_id: 5, comet_name: '29P/Schwassmann-Wachmann', telescope_id: 1, telescope_model: 'Celestron C8', user_id: 1, username: 'astro_daria', notes: null, photos_count: 6 },
  { id: 1239, date_obs: '2026-02-10T21:30:00Z', coordinates: "06h 30m / +15° 42'", is_public: false, status: 'draft', date_created: '2026-02-10T22:30:00Z', comet_id: 6, comet_name: 'C/2024 J2', telescope_id: 1, telescope_model: 'Celestron C8', user_id: 1, username: 'astro_daria', notes: null, photos_count: 1 },
  { id: 1240, date_obs: '2026-02-03T20:00:00Z', coordinates: "18h 15m / -05° 20'", is_public: false, status: 'rejected', date_created: '2026-02-03T21:00:00Z', comet_id: 7, comet_name: 'C/2023 P1', telescope_id: 1, telescope_model: 'Celestron C8', user_id: 1, username: 'astro_daria', notes: null, photos_count: 3 },
];

export const MOCK_ALL_OBSERVATIONS: ApiObservation[] = [
  { id: 1, date_obs: '2026-03-12T20:00:00Z', coordinates: "12h 34m / +45° 12'", is_public: true, status: 'published', date_created: '2026-03-12T21:00:00Z', comet_id: 1, comet_name: 'C/2023 A3', telescope_id: 1, telescope_model: 'Celestron C8', user_id: 1, username: 'astro_daria', notes: null, photos_count: 3 },
  { id: 2, date_obs: '2026-03-12T18:00:00Z', coordinates: "10h 22m / +38° 45'", is_public: true, status: 'published', date_created: '2026-03-12T19:00:00Z', comet_id: 2, comet_name: '12P/Pons-Brooks', telescope_id: 2, telescope_model: 'Meade LX200', user_id: 2, username: 'comet_hunter', notes: null, photos_count: 5 },
  { id: 3, date_obs: '2026-03-11T21:00:00Z', coordinates: "14h 56m / -22° 18'", is_public: true, status: 'published', date_created: '2026-03-11T22:00:00Z', comet_id: 3, comet_name: 'C/2024 E1', telescope_id: 3, telescope_model: 'Sky-Watcher 12"', user_id: 3, username: 'star_gazer', notes: null, photos_count: 2 },
  { id: 4, date_obs: '2026-03-11T19:30:00Z', coordinates: "08h 44m / +62° 33'", is_public: true, status: 'published', date_created: '2026-03-11T20:30:00Z', comet_id: 4, comet_name: 'C/2023 H2', telescope_id: 4, telescope_model: 'Orion 10"', user_id: 4, username: 'nebula_watcher', notes: null, photos_count: 4 },
  { id: 5, date_obs: '2026-03-10T22:00:00Z', coordinates: "20h 12m / +11° 05'", is_public: true, status: 'published', date_created: '2026-03-10T23:00:00Z', comet_id: 5, comet_name: '29P/Schwassmann-Wachmann', telescope_id: 1, telescope_model: 'Celestron C8', user_id: 5, username: 'deepsky_123', notes: null, photos_count: 6 },
  { id: 6, date_obs: '2026-03-10T20:30:00Z', coordinates: "06h 30m / +15° 42'", is_public: true, status: 'published', date_created: '2026-03-10T21:30:00Z', comet_id: 6, comet_name: 'C/2024 J2', telescope_id: 2, telescope_model: 'Meade LX200', user_id: 6, username: 'cosmic_drifter', notes: null, photos_count: 1 },
  { id: 7, date_obs: '2026-03-09T21:00:00Z', coordinates: "18h 15m / -05° 20'", is_public: true, status: 'published', date_created: '2026-03-09T22:00:00Z', comet_id: 7, comet_name: 'C/2023 P1', telescope_id: 3, telescope_model: 'Sky-Watcher 12"', user_id: 7, username: 'orbit_follower', notes: null, photos_count: 3 },
  { id: 8, date_obs: '2026-03-09T19:30:00Z', coordinates: "05h 12m / +28° 18'", is_public: true, status: 'published', date_created: '2026-03-09T20:30:00Z', comet_id: 8, comet_name: 'C/2022 E3 (ZTF)', telescope_id: 4, telescope_model: 'Orion 10"', user_id: 8, username: 'starlight_77', notes: null, photos_count: 8 },
  { id: 9, date_obs: '2026-03-08T22:00:00Z', coordinates: "07h 45m / +15° 52'", is_public: true, status: 'published', date_created: '2026-03-08T23:00:00Z', comet_id: 9, comet_name: 'C/2021 S3 (PanSTARRS)', telescope_id: 1, telescope_model: 'Celestron C8', user_id: 9, username: 'astro_boris', notes: null, photos_count: 4 },
  { id: 10, date_obs: '2026-03-08T20:00:00Z', coordinates: "09h 33m / +42° 24'", is_public: true, status: 'published', date_created: '2026-03-08T21:00:00Z', comet_id: 10, comet_name: 'C/2020 F3 (NEOWISE)', telescope_id: 2, telescope_model: 'Meade LX200', user_id: 10, username: 'comet_watcher', notes: null, photos_count: 7 },
  { id: 11, date_obs: '2026-03-07T21:30:00Z', coordinates: "11h 22m / +35° 16'", is_public: true, status: 'published', date_created: '2026-03-07T22:30:00Z', comet_id: 11, comet_name: 'C/2017 K2 (PanSTARRS)', telescope_id: 3, telescope_model: 'Sky-Watcher 12"', user_id: 11, username: 'space_observer', notes: null, photos_count: 5 },
  { id: 12, date_obs: '2026-03-07T19:00:00Z', coordinates: "13h 44m / -08° 32'", is_public: true, status: 'published', date_created: '2026-03-07T20:00:00Z', comet_id: 12, comet_name: 'C/2019 Y4 (ATLAS)', telescope_id: 4, telescope_model: 'Orion 10"', user_id: 12, username: 'sky_tracker', notes: null, photos_count: 2 },
];

const mkObsDetail = (id: number, comet: ApiComet, user: ApiUser): ApiObservationDetail => ({
  id,
  date_obs: '2026-03-12T14:23:00Z',
  coordinates: "12h 34m / +45° 12'",
  is_public: false,
  status: 'draft',
  date_created: '2026-03-12T14:23:00Z',
  notes: null,
  comet,
  telescope: MOCK_TELESCOPES[0],
  user,
  photos: [],
  calculation: null,
});

export const MOCK_MODERATION_QUEUE: ApiModerationQueue = {
  total: 9,
  observations: [
    mkObsDetail(4231, MOCK_COMETS[0], mkUser(1, 'astro_daria')),
    mkObsDetail(4232, MOCK_COMETS[1], mkUser(2, 'comet_hunter')),
    mkObsDetail(4233, MOCK_COMETS[2], mkUser(3, 'star_gazer')),
    mkObsDetail(4234, MOCK_COMETS[3], mkUser(4, 'astro_boris')),
    mkObsDetail(4235, MOCK_COMETS[4], mkUser(5, 'nebula_watcher')),
    mkObsDetail(4236, MOCK_COMETS[5], mkUser(6, 'deepsky_123')),
    mkObsDetail(4237, MOCK_COMETS[6], mkUser(7, 'cosmic_drifter')),
    mkObsDetail(4238, MOCK_COMETS[7], mkUser(8, 'starlight_77')),
    mkObsDetail(4239, MOCK_COMETS[8], mkUser(9, 'orbit_follower')),
  ],
};

// helpers

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return `${formatDate(iso)} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function statusLabel(status: string): { label: string; color: string } {
  switch (status) {
    case 'published': return { label: 'подтверждено', color: '#4caf50' };
    case 'draft': return { label: 'на проверке', color: '#ff9800' };
    case 'rejected': return { label: 'требуется проверка', color: '#f44336' };
    case 'archived': return { label: 'архив', color: 'rgba(255,255,255,0.4)' };
    default: return { label: status, color: 'rgba(255,255,255,0.6)' };
  }
}
