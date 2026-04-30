export interface UserProfile {
  education: string;
  city: string;
  bio: string;
  avatar_path: string;
}

export interface ApiUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  profile: UserProfile;
}

export interface UserStats extends ApiUser {
  total_observations: number;
  public_observations: number;
  calculations_count: number;
  recent_observations: ApiObservation[];
}

export interface ApiComet {
  id: number;
  official_name: string;
  date_founded: string | null;
  a_avg: number | null;
  e_avg: number | null;
  i_avg: number | null;
  node_avg: number | null;
  peri_avg: number | null;
  p_avg: number | null;
  coma_size: string | null;
  brightness: number | null;
}

export interface ApiTelescope {
  id: number;
  model_name: string;
  focal_length: number | null;
  manufacturer: string | null;
}

export interface ApiObservation {
  id: number;
  date_obs: string;
  coordinates: string;
  is_public: boolean;
  status: 'draft' | 'published' | 'rejected' | 'archived';
  date_created: string;
  comet_id: number;
  comet_name: string;
  telescope_id: number;
  telescope_model: string;
  user_id: number;
  username: string;
  notes: string | null;
  photos_count: number;
}

export interface ApiPhoto {
  id: number;
  file_name: string;
  file_path: string;
  url: string | null;
}

export interface ApiCalculation {
  id: number;
  coma: string | null;
  brightness: number | null;
  axis: number | null;
  exentricity: number | null;
  inclination: number | null;
  longtitude: number | null;
  arg_perihelion: number | null;
  orbital_period: number | null;
}

export interface ApiObservationDetail {
  id: number;
  date_obs: string;
  coordinates: string;
  is_public: boolean;
  status: 'draft' | 'published' | 'rejected' | 'archived';
  date_created: string;
  notes: string | null;
  comet: ApiComet;
  telescope: ApiTelescope;
  user: ApiUser;
  photos: ApiPhoto[];
  calculation: ApiCalculation | null;
}

export interface ApiUserFavorite {
  id: number;
  observation: ApiObservation;
  created_at: string;
}

export interface ApiModerationQueue {
  total: number;
  observations: ApiObservationDetail[];
}

export interface ApiObservationsList {
  total: number;
  limit: number;
  offset: number;
  observations: ApiObservation[];
}

export interface ApiCometDetail extends ApiComet {
  observations_count: number;
  observations: ApiObservation[];
}
