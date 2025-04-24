import { createSlice } from "@reduxjs/toolkit";
import { BookingState } from "../../../Interfaces/bookings.interfaces";
import { deleteBooking, getAllBookings, getBookingDetails } from "./bookingsThunk";



const initialState: BookingState = {
  bookings: [],
  bookingDetails: null,
  loading: false,
  error: null,
  deleteLoading: false,
  totalCount: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearBookingDetails: (state) => {
      state.bookingDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Bookings
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload?.data?.booking;
        state.totalCount = action.payload?.data?.totalCount;
            })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get Booking Details
      .addCase(getBookingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetails = action.payload?.data?.booking;
      })
      .addCase(getBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Booking
      .addCase(deleteBooking.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
