import axios from 'axios';
import { ACTIVITIES_API_URL, IMAGES_ACTIVITIES_API_URL, ActivityData } from '@/store/Constants';

export const getAllActivities = async () => {
    try {

        const activitiesResponse = await axios.get(ACTIVITIES_API_URL);
        const activities = activitiesResponse.data;

        const activitiesWithImages = await Promise.all(
            activities.map(async (activity: ActivityData) => {
                const imagesResponse = await axios.get(`${IMAGES_ACTIVITIES_API_URL}?id_activity=${activity.id}`);
                return { ...activity, images: imagesResponse.data };
            })
        );
        // console.log('Activities with images:', activitiesWithImages);
        return activitiesWithImages;
    } catch (error) {
        console.error('Error fetching all activities:', error);
        throw error;
    }
};

export const getActivityById = async (id: number) => {
    try {
        console.log(`Fetching activity by ID: ${id}`);
        const activityResponse = await axios.get(`${ACTIVITIES_API_URL}${id}/`);
        console.log("Activity data:", activityResponse.data);
        const imagesResponse = await axios.get(`${IMAGES_ACTIVITIES_API_URL}?id_activity=${id}`);
        console.log('activityResponse.data:', activityResponse.data);
        console.log('imagesResponse.data:', imagesResponse.data);
        return { ...activityResponse.data, images: imagesResponse.data };
    } catch (error: unknown) {  // Cambiado a `unknown`
        if (error instanceof Error) { // Asegúrate de manejarlo como un Error
            console.error(`Error fetching activity with ID ${id}:`, error.message);
        } else {
            console.error(`Error fetching activity with ID ${id}:`, error);
        }
        throw error;
    }
};
