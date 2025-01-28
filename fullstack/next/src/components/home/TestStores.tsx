import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store, { AppDispatch } from '@/store';
import { fetchRooms, selectAllRooms, selectRoomsStatus, selectRoomsError } from '@/store/slices/roomsSlice';
import { fetchActivities, selectAllActivities, selectActivitiesStatus, selectActivitiesError } from '@/store/slices/activitiesSlice';
import { fetchBedRooms, selectAllBedRooms, selectBedRoomsStatus, selectBedRoomsError } from '@/store/slices/bedroomsSlice';
import { fetchMeals, selectAllMeals, selectMealsStatus, selectMealsError } from '@/store/slices/mealsSlice';

const TestStores: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const rooms = useSelector(selectAllRooms);
  const roomsStatus = useSelector(selectRoomsStatus);
  const roomsError = useSelector(selectRoomsError);

  const activities = useSelector(selectAllActivities);
  const activitiesStatus = useSelector(selectActivitiesStatus);
  const activitiesError = useSelector(selectActivitiesError);

  const bedrooms = useSelector(selectAllBedRooms);
  const bedroomsStatus = useSelector(selectBedRoomsStatus);
  const bedroomsError = useSelector(selectBedRoomsError);

  const meals = useSelector(selectAllMeals);
  const mealsStatus = useSelector(selectMealsStatus);
  const mealsError = useSelector(selectMealsError);

  useEffect(() => {
    if (roomsStatus === 'idle') {
      dispatch(fetchRooms());
    }
    if (activitiesStatus === 'idle') {
      dispatch(fetchActivities());
    }
    if (bedroomsStatus === 'idle') {
      dispatch(fetchBedRooms());
    }
    if (mealsStatus === 'idle') {
      dispatch(fetchMeals());
    }
  }, [dispatch, roomsStatus, activitiesStatus, bedroomsStatus, mealsStatus]);

  useEffect(() => {
    // console.log('Rooms:', rooms);
    // console.log('Rooms Error:', roomsError);
    // console.log('Activities:', activities);
    // console.log('Activities Error:', activitiesError);
    // console.log('Bedrooms:', bedrooms);
    // console.log('Bedrooms Error:', bedroomsError);
    // console.log('Meals:', meals);
    // console.log('Meals Error:', mealsError);
  }, [rooms, roomsError, activities, activitiesError, bedrooms, bedroomsError, meals, mealsError]);

  return (
    <Provider store={store}>
      <div>
        <h1>Test Stores</h1>
        <p>Check the console for store data.</p>
      </div>
    </Provider>
  );
};

export default TestStores;