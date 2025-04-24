import { createSlice } from "@reduxjs/toolkit";
import { createRoomFacility, updateRoomFacility, getRoomFacilityDetails, deleteRoomFacility, getAllRoomFacilities } from "./facilitiesThunk";
import { RoomFacilitiesState } from "../../../Interfaces/facilities.interface";


const initialState: RoomFacilitiesState = {
  facilities: [],
  facilityDetails: null,
  loading: false,
  error: null,
};

export const roomFacilitiesSlice = createSlice({
  name: "roomFacilities",
  initialState,
  reducers: {
    resetRoomFacilitiesState: (state) => {
      state.facilities = [];
      state.facilityDetails = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createRoomFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoomFacility.fulfilled, (state, action) => {
        state.loading = false;
        state.facilities.push(action.payload);
      })
      .addCase(createRoomFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateRoomFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoomFacility.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateRoomFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get One
      .addCase(getRoomFacilityDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoomFacilityDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.facilityDetails = action.payload;
      })
      .addCase(getRoomFacilityDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteRoomFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoomFacility.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteRoomFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get All
      .addCase(getAllRoomFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRoomFacilities.fulfilled, (state, action) => {
        state.loading = false;
        state.facilities = action.payload?.data?.facilities;
      })
      .addCase(getAllRoomFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetRoomFacilitiesState } = roomFacilitiesSlice.actions;
export default roomFacilitiesSlice.reducer;
