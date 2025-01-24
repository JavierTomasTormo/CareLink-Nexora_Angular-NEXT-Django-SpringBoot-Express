import axios from 'axios';

const API_URL = 'http://localhost:8000/api/rooms/bedroom/';

interface BedRoomData {
    type_room: string;
    num_room: number;
    id_patient: number;
    description: string;
    availability: string; 
    special_features: string[];
    isactive: number;
    createdat: Date; 
    updatedat: Date;
}

export const getAllBedRooms = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all bedrooms:', error);
    throw error;
  }
};

export const getBedRoomById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bedroom with id ${id}:`, error);
    throw error;
  }
};

export const createBedRoom = async (bedroomData: BedRoomData) => {
  try {
    const response = await axios.post(API_URL, bedroomData);
    return response.data;
  } catch (error) {
    console.error('Error creating bedroom:', error);
    throw error;
  }
};

export const updateBedRoom = async (id: number, bedroomData: BedRoomData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, bedroomData);
    return response.data;
  } catch (error) {
    console.error(`Error updating bedroom with id ${id}:`, error);
    throw error;
  }
};