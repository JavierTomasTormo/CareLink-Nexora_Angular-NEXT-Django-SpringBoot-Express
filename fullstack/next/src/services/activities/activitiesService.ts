import axios from 'axios';
import { ACTIVITIES_API_URL, IMAGES_ACTIVITIES_API_URL, ActivityData } from '@/store/Constants';



export const createActivity = async (activityData: ActivityData) => {
    try {
        const response = await axios.post(ACTIVITIES_API_URL, activityData);
        return response.data;
    } catch (error) {
        console.error('Error creating activity:', error);
        throw error;
    }
};

export const updateActivity = async (id: number, activityData: ActivityData) => {
    try {
        const response = await axios.put(`${ACTIVITIES_API_URL}${id}/`, activityData);
        return response.data;
    } catch (error) {
        console.error(`Error updating activity with id ${id}:`, error);
        throw error;
    }
};

export const deleteActivity = async (id: number) => {
    try {
        await axios.delete(`${ACTIVITIES_API_URL}${id}/`);
        await axios.delete(`${IMAGES_ACTIVITIES_API_URL}?id_activity=${id}`);
    } catch (error) {
        console.error(`Error deleting activity with id ${id}:`, error);
        throw error;
    }
};