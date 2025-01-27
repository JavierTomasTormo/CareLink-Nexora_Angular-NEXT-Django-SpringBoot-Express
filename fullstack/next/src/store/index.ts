import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './slices/roomsSlice';
import activitiesReducer from './slices/activitiesSlice';

const store = configureStore({
    reducer: {
        rooms: roomsReducer,
        activities: activitiesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;