import axios from 'axios';

import { ACTIVITIES_API_URL, IMAGES_ACTIVITIES_API_URL, ActivityData } from '@/store/Constants';


export const getAllActivities = async () => {
    try {
        const response = await axios.get(ACTIVITIES_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all activities:', error);
        throw error;
    }
};

export const getActivityById = async (id: number) => {
    try {
        const activityResponse = await axios.get(`${ACTIVITIES_API_URL}${id}/`);
        const imagesResponse = await axios.get(`${IMAGES_ACTIVITIES_API_URL}?id_activity=${id}`);
        return { ...activityResponse.data, images: imagesResponse.data };
    } catch (error) {
        console.error(`Error fetching activity with id ${id}:`, error);
        throw error;
    }
};
