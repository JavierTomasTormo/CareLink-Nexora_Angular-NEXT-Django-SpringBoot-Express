import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllBedRooms, fetchBedRoomById } from '@/services/rooms/bedroom/bedroomsService';
import { createBedRoom, updateBedRoom } from '@/action_servers/rooms/bedroom/getBedRooms';
import { BedRoomState, BedRoomData, FETCH_BEDROOMS, FETCH_BEDROOM_BY_ID, CREATE_BEDROOM, UPDATE_BEDROOM } from '../Constants';

const initialState: BedRoomState = {
    bedrooms: [],
    status: 'idle',
    error: null,
};

export const fetchBedRooms = createAsyncThunk(FETCH_BEDROOMS, async () => {
    const response = await fetchAllBedRooms();
    return response;
});

export const fetchBedRoom = createAsyncThunk(FETCH_BEDROOM_BY_ID, async (id: number) => {
    const response = await fetchBedRoomById(id);
    return response;
});

export const createNewBedRoom = createAsyncThunk(CREATE_BEDROOM, async (bedroomData: BedRoomData) => {
    const response = await createBedRoom(bedroomData);
    return response;
});

export const updateExistingBedRoom = createAsyncThunk(UPDATE_BEDROOM, async ({ id, bedroomData }: { id: number, bedroomData: BedRoomData }) => {
    const response = await updateBedRoom(id, bedroomData);
    return response;
});


const bedroomsSlice = createSlice({
    name: 'bedrooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBedRooms.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBedRooms.fulfilled, (state, action: PayloadAction<BedRoomData[]>) => {
            state.status = 'succeeded';
            state.bedrooms = action.payload;
        })
        .addCase(fetchBedRooms.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch bedrooms';
        })
        .addCase(fetchBedRoom.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBedRoom.fulfilled, (state, action: PayloadAction<BedRoomData>) => {
            state.status = 'succeeded';
            const index = state.bedrooms.findIndex(bedroom => bedroom.num_room === action.payload.num_room);
            if (index !== -1) {
            state.bedrooms[index] = action.payload;
            } else {
            state.bedrooms.push(action.payload);
            }
        })
        .addCase(fetchBedRoom.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch bedroom';
        })
        .addCase(createNewBedRoom.fulfilled, (state, action: PayloadAction<BedRoomData>) => {
            state.bedrooms.push(action.payload);
        })
        .addCase(updateExistingBedRoom.fulfilled, (state, action: PayloadAction<BedRoomData>) => {
            const index = state.bedrooms.findIndex(bedroom => bedroom.num_room === action.payload.num_room);
            if (index !== -1) {
            state.bedrooms[index] = action.payload;
            }
        })
    },
});



// Selectors
export const selectAllBedRooms = (state: RootState) => state.bedrooms.bedrooms;
export const selectBedRoomById = (state: RootState, bedroomId: number) => state.bedrooms.bedrooms.find(bedroom => bedroom.id_bedroom === bedroomId);
export const selectBedRoomsStatus = (state: RootState) => state.bedrooms.status;
export const selectBedRoomsError = (state: RootState) => state.bedrooms.error;


export default bedroomsSlice.reducer;