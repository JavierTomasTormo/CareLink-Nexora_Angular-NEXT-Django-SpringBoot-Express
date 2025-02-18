import axios from 'axios';
import { getAccessToken } from '@/utils/auth';

export const createInscription = async (inscriptionData: any) => {
    try {
        const token = getAccessToken();
        const response = await axios.post('http://localhost:8085/inscriptions/create', inscriptionData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating inscription:', error);
        throw error;
    }
};