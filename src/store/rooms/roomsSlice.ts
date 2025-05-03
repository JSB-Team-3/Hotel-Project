import { createSlice } from "@reduxjs/toolkit";
import { RoomsState } from "../../Interfaces/rooms.interface";
import { createRoom, deleteRoom, getAllRooms, getAllRoomsPortal, getRoomDetails, updateRoom } from "./roomsThunk";


const initialState: RoomsState = {
  rooms: [],
  roomDetails: null,
  loading: false,
  deleteLoading: false,
  error: null,
  totalCount: 0,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    clearRoomDetails: (state) => {
      state.roomDetails = null;
    },
    clearRoomsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Create Room
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms.push(action.payload);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Room
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = state.rooms.map((room) =>
          room._id === action.payload._id ? action.payload : room
        );
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get Room Details
      .addCase(getRoomDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoomDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.roomDetails = action.payload;
      })
      .addCase(getRoomDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Room
      .addCase(deleteRoom.pending, (state) => {
        state.error = null;
        state.deleteLoading = true;
      })
      .addCase(deleteRoom.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload as string;
      })

      // Get All Rooms
      .addCase(getAllRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload?.data?.rooms;
        state.totalCount = action.payload?.data?.totalCount;
      })
      .addCase(getAllRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  // Get All Rooms Portal
  .addCase(getAllRoomsPortal.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(getAllRoomsPortal.fulfilled, (state, action) => {
    state.loading = false;
    state.rooms = action.payload?.data?.rooms;
    state.totalCount = action.payload?.data?.totalCount;
  })
  .addCase(getAllRoomsPortal.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });  
},
});

export const { clearRoomDetails, clearRoomsError } = roomsSlice.actions;
export default roomsSlice.reducer;
