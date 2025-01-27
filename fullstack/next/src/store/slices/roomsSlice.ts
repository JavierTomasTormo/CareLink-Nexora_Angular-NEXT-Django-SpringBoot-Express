import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllRooms, fetchRoomById } from '@/services/rooms/room/roomService';
import { createRoom, updateRoom, deleteRoom } from '@/action_services/rooms/room/getRoom';
import { RoomState, RoomData, FETCH_ROOMS, FETCH_ROOM_BY_ID, CREATE_ROOM, UPDATE_ROOM, DELETE_ROOM } from '../Constants';

const initialState: RoomState = {
    rooms: [],
    status: 'idle',
    error: null,
};

export const fetchRooms = createAsyncThunk(FETCH_ROOMS, async () => {
    const response = await fetchAllRooms();
    // console.log('fetchRooms response: fetchAllRooms', response);
    return response;
});

export const fetchRoom = createAsyncThunk(FETCH_ROOM_BY_ID, async (id: number) => {
    const response = await fetchRoomById(id);
    return response;
});

export const createNewRoom = createAsyncThunk(CREATE_ROOM, async (roomData: RoomData) => {
    const response = await createRoom(roomData);
    return response;
});

export const updateExistingRoom = createAsyncThunk(UPDATE_ROOM, async ({ id, roomData }: { id: number, roomData: RoomData }) => {
    const response = await updateRoom(id, roomData);
    return response;
});

export const deleteExistingRoom = createAsyncThunk(DELETE_ROOM, async (id: number) => {
    await deleteRoom(id);
    return id;
});

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchRooms.pending, (state) => {
            state.status = 'loading';
            // console.log('Fetching rooms...');
        })
        .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<RoomData[]>) => {
            state.status = 'succeeded';
            state.rooms = action.payload;
            // console.log('Fetched rooms:', action.payload);
        })
        .addCase(fetchRooms.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch rooms';
            // console.log('Failed to fetch rooms:', action.error.message);
        })
        .addCase(fetchRoom.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchRoom.fulfilled, (state, action: PayloadAction<RoomData>) => {
            state.status = 'succeeded';
            const index = state.rooms.findIndex(room => room.num_room === action.payload.num_room);
            if (index !== -1) {
            state.rooms[index] = action.payload;
            } else {
            state.rooms.push(action.payload);
            }
        })
        .addCase(fetchRoom.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch room';
        })
        .addCase(createNewRoom.fulfilled, (state, action: PayloadAction<RoomData>) => {
            state.rooms.push(action.payload);
        })
        .addCase(updateExistingRoom.fulfilled, (state, action: PayloadAction<RoomData>) => {
            const index = state.rooms.findIndex(room => room.num_room === action.payload.num_room);
            if (index !== -1) {
            state.rooms[index] = action.payload;
            }
        })
        .addCase(deleteExistingRoom.fulfilled, (state, action: PayloadAction<number>) => {
            state.rooms = state.rooms.filter(room => room.num_room !== action.payload);
        });
    },
});

export default roomsSlice.reducer;