import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createActivity, updateActivity, deleteActivity } from '@/services/activities/activitiesService';
import { getAllActivities, getActivityById } from '@/action_servers/activities/getActivities';
import { ActivityState, ActivityData, FETCH_ACTIVITIES, FETCH_ACTIVITY_BY_ID, CREATE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY } from '../Constants';
import { RootState } from '@/store';

const initialState: ActivityState = {
    activities: [],
    filteredActivities: [], // Asegúrate de agregar el estado filtrado
    status: 'idle',
    error: null,
};

export const fetchActivities = createAsyncThunk(FETCH_ACTIVITIES, async () => {
    const response = await getAllActivities();
    return response;
});

export const fetchActivity = createAsyncThunk(FETCH_ACTIVITY_BY_ID, async (id: number) => {
    const response = await getActivityById(id);
    return response;
});

export const createNewActivity = createAsyncThunk(CREATE_ACTIVITY, async (activityData: ActivityData) => {
    const response = await createActivity(activityData);
    return response;
});

export const updateExistingActivity = createAsyncThunk(UPDATE_ACTIVITY, async ({ id, activityData }: { id: number, activityData: ActivityData }) => {
    const response = await updateActivity(id, activityData);
    return response;
});

export const deleteExistingActivity = createAsyncThunk(DELETE_ACTIVITY, async (id: number) => {
    await deleteActivity(id);
    return id;
});

const activitiesSlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
      filterActivitiesByType(state, action: PayloadAction<number | null>) {
        if (action.payload !== null) {
          state.filteredActivities = state.activities.filter(
            (activity) => activity.activity_type === action.payload
          );
        } else {
          state.filteredActivities = state.activities; // Si no hay filtro, mostrar todas
        }
      },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivities.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchActivities.fulfilled, (state, action: PayloadAction<ActivityData[]>) => {
                state.status = 'succeeded';
                state.activities = action.payload;
                state.filteredActivities = action.payload; // Al cargar las actividades, también las asignamos a las actividades filtradas
            })
            .addCase(fetchActivities.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch activities';
            })
            .addCase(fetchActivity.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchActivity.fulfilled, (state, action: PayloadAction<ActivityData>) => {
                state.status = 'succeeded';
                const index = state.activities.findIndex(activity => activity.slug === action.payload.slug);
                if (index !== -1) {
                    state.activities[index] = action.payload;
                } else {
                    state.activities.push(action.payload);
                }
            })
            .addCase(fetchActivity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch activity';
            })
            .addCase(createNewActivity.fulfilled, (state, action: PayloadAction<ActivityData>) => {
                state.activities.push(action.payload);
            })
            .addCase(updateExistingActivity.fulfilled, (state, action: PayloadAction<ActivityData>) => {
                const index = state.activities.findIndex(activity => activity.slug === action.payload.slug);
                if (index !== -1) {
                    state.activities[index] = action.payload;
                }
            })
            .addCase(deleteExistingActivity.fulfilled, (state, action: PayloadAction<number>) => {
                state.activities = state.activities.filter(activity => activity.id !== action.payload);
            });
    },
});

// Selectores
export const selectAllActivities = (state: RootState) => state.activities.activities;
export const selectFilteredActivities = (state: RootState) => state.activities.filteredActivities; // Seleccionamos las actividades filtradas
export const selectActivitiesStatus = (state: RootState) => state.activities.status;
export const selectActivitiesError = (state: RootState) => state.activities.error;

export const { filterActivitiesByType } = activitiesSlice.actions;

export default activitiesSlice.reducer;
