import axios from 'axios';

export const getPatientsByUserId = async (userId: number) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/users/patient/?id_user=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
};