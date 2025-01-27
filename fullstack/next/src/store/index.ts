import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './slices/roomsSlice';
import activitiesReducer from './slices/activitiesSlice';
import bedroomsReducer from './slices/bedroomsSlice';

const store = configureStore({
    reducer: {
        rooms: roomsReducer,
        activities: activitiesReducer,
        bedrooms: bedroomsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;