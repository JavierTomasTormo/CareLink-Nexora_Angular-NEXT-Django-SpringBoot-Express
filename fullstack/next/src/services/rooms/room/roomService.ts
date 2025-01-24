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

export const fetchAllRooms = async () => {
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

export const fetchRoomById = async (id: number) => {
  try {
    const roomResponse = await axios.get(`${ROOMS_API_URL}${id}/`);
    const imagesResponse = await axios.get(`${IMAGES_API_URL}?id_room=${id}`);
    return { ...roomResponse.data, images: imagesResponse.data };
  } catch (error) {
    console.error(`Error fetching room with id ${id}:`, error);
    throw error;
  }
};