import axios from 'axios';
import { getAccessToken } from '@/utils/auth';

export interface InscriptionData {
    idActivity: number;
    idHour: number;
    idDay: number;
    idMonth: number;
    idYear: number;
    idPayment: number;
    idPatient: number;
    state: string;
    specialRequest: string;
    [key: string]: string | number; 
}

export const createInscription = async (inscriptionData: InscriptionData) => {
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