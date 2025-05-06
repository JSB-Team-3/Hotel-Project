import { createAsyncThunk } from '@reduxjs/toolkit';
import { ADMIN_BOOKING_URLS, BOOKING_URLS } from "../../services/api/apiConfig";
import { BookingData, BookingItem, GetAllBookingParams, GetAllMyBookingsResponse } from "../../Interfaces/bookings.interfaces";
import { privateAxiosInstance } from '../../services/api/apiInstance';
import { handleThunkError } from '../auth/handleThunkError';


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



export const getAllMyBookings = createAsyncThunk<GetAllMyBookingsResponse>(
  'bookings/getAllMyBookings',
  async (_, thunkAPI) => {
    try {
      const res = await privateAxiosInstance.get(BOOKING_URLS.GET_ALL_MY_BOOKINGS);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to fetch my bookings'));
    }
  }
);


export const createBooking = createAsyncThunk<BookingItem, BookingData>(
  'bookings/createBooking',
  async (bookingData, thunkAPI) => {
    try {
      const response = await privateAxiosInstance.post(
        BOOKING_URLS.CREATE_BOOKING,
        bookingData
      );
      return response.data.data as BookingItem;
    } catch (err) {
      console.log(err, 'err');
      
      return thunkAPI.rejectWithValue(
        handleThunkError(err, 'Failed to create booking')
      );
    }
  }
);


