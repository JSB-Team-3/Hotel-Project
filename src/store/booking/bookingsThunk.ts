import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateAxiosInstance } from "../../services/api/apiInstance";
import { ADMIN_BOOKING_URLS } from "../../services/api/apiConfig";
import { GetAllBookingParams } from "../../Interfaces/bookings.interfaces";
import { handleThunkError } from "../../utilities/handleThunkError";

export const getBookingDetails = createAsyncThunk(
  'booking/details',
  async (id: string, thunkAPI) => {
    try {
      const response = await privateAxiosInstance.post(ADMIN_BOOKING_URLS.GET_BOOKING_DETAILS(id));
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to fetch booking details'));
    }
  }
);

// Delete Booking
export const deleteBooking = createAsyncThunk(
  'booking/delete',
  async (id: string, thunkAPI) => {
    try {
      const response = await privateAxiosInstance.delete(ADMIN_BOOKING_URLS.DELETE_BOOKING(id));
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to delete booking'));
    }
  }
);

// Get All Bookings
export const getAllBookings = createAsyncThunk(
  'booking/getAll',
  async (params: GetAllBookingParams, thunkAPI) => {
    try {
      const response = await privateAxiosInstance.get(ADMIN_BOOKING_URLS.GET_ALL_BOOKING, {params});
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to fetch all bookings'));
    }
  }
);
