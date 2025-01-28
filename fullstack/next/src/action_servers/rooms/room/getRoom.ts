import axios from 'axios';
import { ROOMS_API_URL, IMAGES_ROOMS_API_URL, RoomData } from '@/store/Constants';


export const getAllRooms = async () => {
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

export const getRoomById = async (id: number) => {
    try {
        const roomResponse = await axios.get(`${ROOMS_API_URL}${id}/`);
        const imagesResponse = await axios.get(`${IMAGES_ROOMS_API_URL}?id_room=${id}`);
        return { ...roomResponse.data, images: imagesResponse.data };
    } catch (error) {
        console.error(`Error fetching room with id ${id}:`, error);
        throw error;
    }
};