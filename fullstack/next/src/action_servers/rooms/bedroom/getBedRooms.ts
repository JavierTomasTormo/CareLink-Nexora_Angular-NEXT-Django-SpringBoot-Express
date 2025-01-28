import axios from 'axios';
import { BEDROOMS_API_URL } from '@/store/Constants';


export const getAllBedRooms = async () => {
    try {
        const response = await axios.get(BEDROOMS_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all bedrooms:', error);
        throw error;
    }
};

export const getBedRoomById = async (id: number) => {
    try {
        const response = await axios.get(`${BEDROOMS_API_URL}${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching bedroom with id ${id}:`, error);
        throw error;
    }
};
