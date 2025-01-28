import axios from 'axios';

import { ROOMS_API_URL, IMAGES_ROOMS_API_URL, RoomData } from '@/store/Constants';


export const fetchAllRooms = async () => {
    try {
        const roomsResponse = await axios.get(ROOMS_API_URL);
        const rooms = roomsResponse.data;

        const roomsWithImages = await Promise.all(
            rooms.map(async (room: RoomData) => {
                const imagesResponse = await axios.get(`${IMAGES_ROOMS_API_URL}?id_room=${room.id_room}`);
                return { ...room, images: imagesResponse.data };
            })
        );

        return roomsWithImages;
    } catch (error) {
        console.error('Error fetching all rooms:', error);
        throw error;
    }
};

export const fetchRoomById = async (id: number) => {
  try {
    const roomResponse = await axios.get(`${ROOMS_API_URL}${id}/`);
    const imagesResponse = await axios.get(`${IMAGES_ROOMS_API_URL}?id_room=${id}`);
    return { ...roomResponse.data, images: imagesResponse.data };
  } catch (error) {
    console.error(`Error fetching room with id ${id}:`, error);
    throw error;
  }
};


export const createRoom = async (roomData: RoomData) => {
  try {
      const response = await axios.post(ROOMS_API_URL, roomData);
      return response.data;
  } catch (error) {
      console.error('Error creating room:', error);
      throw error;
  }
};

export const updateRoom = async (id: number, roomData: RoomData) => {
  try {
      const response = await axios.put(`${ROOMS_API_URL}${id}/`, roomData);
      return response.data;
  } catch (error) {
      console.error(`Error updating room with id ${id}:`, error);
      throw error;
  }
};

export const deleteRoom = async (id: number) => {
  try {
      await axios.delete(`${ROOMS_API_URL}${id}/`);
      await axios.delete(`${IMAGES_ROOMS_API_URL}?id_room=${id}`);
  } catch (error) {
      console.error(`Error deleting room with id ${id}:`, error);
      throw error;
  }
};