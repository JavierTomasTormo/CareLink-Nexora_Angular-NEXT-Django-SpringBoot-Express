import axios from 'axios';

import { MEALS_API_URL } from '@/store/Constants';


export const fetchAllMeals = async () => {
    try {
        const response = await axios.get(MEALS_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all meals:', error);
        throw error;
    }
};

export const fetchMealById = async (id: number) => {
    try {
        // console.log(`Fetching meal with id ${id}...`);
        const response = await axios.get(`${MEALS_API_URL}${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching meal with id ${id}:`, error);
        throw error;
    }
};