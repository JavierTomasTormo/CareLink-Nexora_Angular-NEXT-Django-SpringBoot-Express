import axios from 'axios';

import { BEDROOMS_API_URL, BedRoomData } from '@/store/Constants';

export const fetchAllBedRooms = async () => {
    try {
        const response = await axios.get(BEDROOMS_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all bedrooms:', error);
        throw error;
    }
};

export const fetchBedRoomById = async (id: number) => {
    try {
        const response = await axios.get(`${BEDROOMS_API_URL}${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching bedroom with id ${id}:`, error);
        throw error;
    }
};



export const createBedRoom = async (bedroomData: BedRoomData) => {
    try {
        const response = await axios.post(BEDROOMS_API_URL, bedroomData);
        return response.data;
    } catch (error) {
        console.error('Error creating bedroom:', error);
        throw error;
    }
};

export const updateBedRoom = async (id: number, bedroomData: BedRoomData) => {
    try {
        const response = await axios.put(`${BEDROOMS_API_URL}${id}/`, bedroomData);
        return response.data;
    } catch (error) {
        console.error(`Error updating bedroom with id ${id}:`, error);
        throw error;
    }
};