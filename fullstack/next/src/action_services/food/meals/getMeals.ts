import axios from 'axios';

const API_URL = 'http://localhost:8000/api/food/meals/';


interface MealData {
    img: string;
    isactive: number;
    createdat: Date;
    updatedat: Date;
    role: string[]; 
    name: string;
    description: string;
    allergens: string[]; 
    calories: number;
    type_meal: string[]; 
}


export const getAllMeals = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all meals:', error);
        throw error;
    }
};

export const getMealById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching meal with id ${id}:`, error);
        throw error;
    }
};

export const createMeal = async (mealData: MealData) => {
    try {
        const response = await axios.post(API_URL, mealData);
        return response.data;
    } catch (error) {
        console.error('Error creating meal:', error);
        throw error;
    }
};

export const updateMeal = async (id: number, mealData: MealData) => {
    try {
        const response = await axios.put(`${API_URL}${id}/`, mealData);
        return response.data;
    } catch (error) {
        console.error(`Error updating meal with id ${id}:`, error);
        throw error;
    }
};