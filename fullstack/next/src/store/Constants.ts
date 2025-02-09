export const API_URL = 'http://localhost:8000/api';

export const MEALS_API_URL = `${API_URL}/food/meals/`;
export const BEDROOMS_API_URL = `${API_URL}/rooms/bedroom/`;
export const ROOMS_API_URL = `${API_URL}/rooms/room/`;
export const IMAGES_ROOMS_API_URL = `${API_URL}/images/imagesrooms/`;
export const ACTIVITIES_API_URL = `${API_URL}/activities/`;
export const IMAGES_ACTIVITIES_API_URL = `${API_URL}/images/imagesactivities/`;



export const FETCH_ROOMS = 'rooms/fetchRooms';
export const FETCH_ROOM_BY_ID = 'rooms/fetchRoomById';
export const CREATE_ROOM = 'rooms/createRoom';
export const UPDATE_ROOM = 'rooms/updateRoom';
export const DELETE_ROOM = 'rooms/deleteRoom';

export const FETCH_ACTIVITIES = 'activities/fetchActivities';
export const FETCH_ACTIVITY_BY_ID = 'activities/fetchActivityById';
export const CREATE_ACTIVITY = 'activities/createActivity';
export const UPDATE_ACTIVITY = 'activities/updateActivity';
export const DELETE_ACTIVITY = 'activities/deleteActivity';

export const FETCH_MEALS = 'meals/fetchMeals';
export const FETCH_MEAL_BY_ID = 'meals/fetchMealById';
export const CREATE_MEAL = 'meals/createMeal';
export const UPDATE_MEAL = 'meals/updateMeal';

export const FETCH_BEDROOMS = 'bedrooms/fetchBedRooms';
export const FETCH_BEDROOM_BY_ID = 'bedrooms/fetchBedRoomById';
export const CREATE_BEDROOM = 'bedrooms/createBedRoom';
export const UPDATE_BEDROOM = 'bedrooms/updateBedRoom';



export interface RoomData {
  id: number;
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
  id: number;
  name_activitie: string;
  id_hour: number;
  id_day: number;
  id_month: number;
  id_year: number;
  id_dayoftheweek: number;
  description: string;
  isactive: number;
  slug: string;
  intensity: number;
  price: number;
  caracteristics: { tags: string[] };
  createdat: Date;
  updatedat: Date;
  max_participants: number;
  capacity: number;
  duration: number;
  activity_type: number;
  images?: { img: string }[];
}

export interface MealData {
  id: number;
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
  id: number;
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


export const SHARED_ROUTES = {
  ANGULAR: {
    AUTH: {
      LOGIN: 'http://localhost:4200/auth/login',
      REGISTER: 'http://localhost:4200/auth/register',
      LOGOUT: 'http://localhost:4200/auth/logout'
    }
  },
  NEXT: {
    HOME: '/home',
    SHOP: '/shop',
    MEALS: '/meals',
    PROFILE: '/profile'
  }
};


export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'vitalnest_access_token',
  REFRESH_TOKEN: 'vitalnest_refresh_token',
  USER_INFO: 'vitalnest_user_info'
};