import axios from 'axios';

const ACTIVITIES_API_URL = 'http://localhost:8000/api/activities/';
const IMAGES_API_URL = 'http://localhost:8000/api/images/imagesactivities/';


// interface ActivityData {
//     name_activitie: string;
//     id_hour: number;
//     id_day: number;
//     id_month: number;
//     id_year: number; 
//     id_dayofweek: number;
//     description: string;
//     isactive: number;
//     slug: string;
//     intensity: number;
//     price: number;
//     caracteristics: string[];
//     createdat: Date;
//     updatedat: Date;
//     max_participants: number;
//     capacity: number;
//     duration: number;
// }

export const fetchAllActivities = async () => {
    try {
        const response = await axios.get(ACTIVITIES_API_URL);
        const imagesResponse = await axios.get(`${IMAGES_API_URL}`);
        return { ...response.data, images: imagesResponse.data };
    } catch (error) {
        console.error('Error fetching all activities:', error);
        throw error;
    }
};

export const fetchActivityById = async (id: number) => {
    try {
        const activityResponse = await axios.get(`${ACTIVITIES_API_URL}${id}/`);
        const imagesResponse = await axios.get(`${IMAGES_API_URL}?id_activity=${id}`);
        return { ...activityResponse.data, images: imagesResponse.data };
    } catch (error) {
        console.error(`Error fetching activity with id ${id}:`, error);
        throw error;
    }
};
