import axios from 'axios';

const API_URL = 'http://localhost:8000/api/rooms/bedroom/';

export const fetchAllBedRooms = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all bedrooms:', error);
        throw error;
    }
};

export const fetchBedRoomById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching bedroom with id ${id}:`, error);
        throw error;
    }
};