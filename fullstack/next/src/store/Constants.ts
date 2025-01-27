export const API_URL = 'http://localhost:8000/api';

export const MEALS_API_URL = `${API_URL}/food/meals/`;
export const BEDROOMS_API_URL = `${API_URL}/rooms/bedroom/`;
export const ROOMS_API_URL = `${API_URL}/rooms/room/`;
export const IMAGES_ROOMS_API_URL = `${API_URL}/images/imagesrooms/`;
export const ACTIVITIES_API_URL = `${API_URL}/activities/`;
export const IMAGES_ACTIVITIES_API_URL = `${API_URL}/images/imagesactivities/`;

export interface RoomData {
  type_room: string;
  num_room: number;
  capacity: number;
  description: string;
  isactive: number;
  createdat: Date;
  updatedat: Date;
  availability: string;
}

export interface ActivityData {
  name_activitie: string;
  id_hour: number;
  id_day: number;
  id_month: number;
  id_year: number;
  id_dayofweek: number;
  description: string;
  isactive: number;
  slug: string;
  intensity: number;
  price: number;
  caracteristics: string[];
  createdat: Date;
  updatedat: Date;
  max_participants: number;
  capacity: number;
  duration: number;
}

export interface MealData {
  img: string;
  isactive: number;
  createdat: Date;
  updatedat: Date;
  role: string[];
  name: string;
  description: string;
  allergens: string[];
  calories: number;
  type_meal: string[];
}

export interface BedRoomData {
  type_room: string;
  num_room: number;
  id_patient: number;
  description: string;
  availability: string;
  special_features: string[];
  isactive: number;
  createdat: Date;
  updatedat: Date;
}

export interface RoomState {
  rooms: RoomData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface ActivityState {
  activities: ActivityData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface MealState {
  meals: MealData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface BedRoomState {
  bedrooms: BedRoomData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}