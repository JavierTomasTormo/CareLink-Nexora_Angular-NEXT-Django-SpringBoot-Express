import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './slices/roomsSlice';
import activitiesReducer from './slices/activitiesSlice';
import bedroomsReducer from './slices/bedroomsSlice';
import mealsReducer from '@/store/slices/mealsSlice';

const store = configureStore({
    reducer: {
        rooms: roomsReducer,
        activities: activitiesReducer,
        bedrooms: bedroomsReducer,
        meals: mealsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;