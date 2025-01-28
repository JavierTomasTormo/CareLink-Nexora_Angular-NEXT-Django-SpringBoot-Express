import axios from 'axios';

import { MEALS_API_URL, MealData } from '@/store/Constants';


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



export const createMeal = async (mealData: MealData) => {
    try {
        const response = await axios.post(MEALS_API_URL, mealData);
        return response.data;
    } catch (error) {
        console.error('Error creating meal:', error);
        throw error;
    }
};

export const updateMeal = async (id: number, mealData: MealData) => {
    try {
        const response = await axios.put(`${MEALS_API_URL}${id}/`, mealData);
        return response.data;
    } catch (error) {
        console.error(`Error updating meal with id ${id}:`, error);
        throw error;
    }
};