import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '@/store';
import { fetchRooms, createNewRoom, updateExistingRoom, deleteExistingRoom } from '@/store/slices/roomsSlice';
import { fetchActivities, createNewActivity, updateExistingActivity, deleteExistingActivity } from '@/store/slices/activitiesSlice';
import { fetchBedRooms, createNewBedRoom, updateExistingBedRoom } from '@/store/slices/bedroomsSlice';
import { fetchMeals, createNewMeal, updateExistingMeal } from '@/store/slices/mealsSlice';

export const useStore = () => {
    const dispatch = useDispatch<AppDispatch>();

    const rooms = useSelector((state: RootState) => state.rooms);
    const activities = useSelector((state: RootState) => state.activities);
    const bedrooms = useSelector((state: RootState) => state.bedrooms);
    const meals = useSelector((state: RootState) => state.meals);

    useEffect(() => {
        if (rooms.status === 'idle') {
            dispatch(fetchRooms());
        }
    }, [dispatch, rooms.status]);

    useEffect(() => {
        if (activities.status === 'idle') {
            dispatch(fetchActivities());
        }
    }, [dispatch, activities.status]);

    useEffect(() => {
        if (bedrooms.status === 'idle') {
            dispatch(fetchBedRooms());
        }
    }, [dispatch, bedrooms.status]);

    useEffect(() => {
        if (meals.status === 'idle') {
            dispatch(fetchMeals());
        }
    }, [dispatch, meals.status]);

    const createRoom = (roomData: RoomData) => dispatch(createNewRoom(roomData));
    const updateRoom = (id: number, roomData: RoomData) => dispatch(updateExistingRoom({ id, roomData }));
    const deleteRoom = (id: number) => dispatch(deleteExistingRoom(id));

    const createActivity = (activityData: ActivityData) => dispatch(createNewActivity(activityData));
    const updateActivity = (id: number, activityData: ActivityData) => dispatch(updateExistingActivity({ id, activityData }));
    const deleteActivity = (id: number) => dispatch(deleteExistingActivity(id));

    const createBedRoom = (bedroomData: BedRoomData) => dispatch(createNewBedRoom(bedroomData));
    const updateBedRoom = (id: number, bedroomData: BedRoomData) => dispatch(updateExistingBedRoom({ id, bedroomData }));

    const createMeal = (mealData: MealData) => dispatch(createNewMeal(mealData));
    const updateMeal = (id: number, mealData: MealData) => dispatch(updateExistingMeal({ id, mealData }));

    return {
        rooms,
        activities,
        bedrooms,
        meals,
        createRoom,
        updateRoom,
        deleteRoom,
        createActivity,
        updateActivity,
        deleteActivity,
        createBedRoom,
        updateBedRoom,
        createMeal,
        updateMeal,
    };
};