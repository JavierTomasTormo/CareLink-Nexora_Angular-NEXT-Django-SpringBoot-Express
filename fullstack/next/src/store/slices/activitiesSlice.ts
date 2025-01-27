import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllActivities, fetchActivityById } from '@/services/activities/activitiesService';
import { createActivity, updateActivity, deleteActivity } from '@/action_services/activities/getActivities';
import { ActivityState, ActivityData, FETCH_ACTIVITIES, FETCH_ACTIVITY_BY_ID, CREATE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY } from '../Constants';

const initialState: ActivityState = {
    activities: [],
    status: 'idle',
    error: null,
};

export const fetchActivities = createAsyncThunk(FETCH_ACTIVITIES, async () => {
    const response = await fetchAllActivities();
    return response;
});

export const fetchActivity = createAsyncThunk(FETCH_ACTIVITY_BY_ID, async (id: number) => {
    const response = await fetchActivityById(id);
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
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchActivities.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchActivities.fulfilled, (state, action: PayloadAction<ActivityData[]>) => {
            state.status = 'succeeded';
            state.activities = action.payload;
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
            state.activities = state.activities.filter(activity => activity.id_activitie !== action.payload);
        });
    },
});

export default activitiesSlice.reducer;