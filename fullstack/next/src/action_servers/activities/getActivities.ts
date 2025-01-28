import axios from 'axios';
import { ACTIVITIES_API_URL, IMAGES_ACTIVITIES_API_URL, ActivityData } from '@/store/Constants';

export const getAllActivities = async () => {
    try {
        console.log("Fetching all activities from:", ACTIVITIES_API_URL); // Log para verificar la URL
        const response = await axios.get(ACTIVITIES_API_URL);
        console.log("Response data from API:", response.data); // Log para verificar la respuesta
        return response.data;
    } catch (error: any) {
        console.error("Error fetching all activities:", error.message || error); // Log del error
        throw error;
    }
};

export const getActivityById = async (id: number) => {
    try {
        console.log(`Fetching activity by ID: ${id}`);
        const activityResponse = await axios.get(`${ACTIVITIES_API_URL}${id}/`);
        console.log("Activity data:", activityResponse.data);

        const imagesResponse = await axios.get(`${IMAGES_ACTIVITIES_API_URL}?id_activity=${id}`);
        console.log("Images data for activity:", imagesResponse.data);

        return { ...activityResponse.data, images: imagesResponse.data };
    } catch (error: any) {
        console.error(`Error fetching activity with ID ${id}:`, error.message || error);
        throw error;
    }
};
