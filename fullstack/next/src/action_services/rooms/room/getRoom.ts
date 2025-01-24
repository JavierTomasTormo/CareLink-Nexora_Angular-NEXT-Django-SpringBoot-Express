import axios from 'axios';

const ROOMS_API_URL = 'http://localhost:8000/api/rooms/room/';
const IMAGES_API_URL = 'http://localhost:8000/api/images/imagesrooms/';

interface RoomData {
    type_room: string;
    num_room: number;
    capacity: number;
    description: string;
    isactive: number; 
    createdat: Date;
    updatedat: Date;
    availability: string; 

}

export const getAllRooms = async () => {
    try {
        const roomsResponse = await axios.get(ROOMS_API_URL);
        const rooms = roomsResponse.data;

        const roomsWithImages = await Promise.all(
            rooms.map(async (room: RoomData) => {
                const imagesResponse = await axios.get(`${IMAGES_API_URL}?num_room=${room.num_room}`);
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
        const imagesResponse = await axios.get(`${IMAGES_API_URL}?room_id=${id}`);
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
        await axios.delete(`${IMAGES_API_URL}?id_room=${id}`);
    } catch (error) {
        console.error(`Error deleting room with id ${id}:`, error);
        throw error;
    }
};