import { GetAllRoomFacilitiesParams } from '../../Interfaces/facilities.interface';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomFacilityPayload, UpdateRoomFacilityPayload } from "../../Interfaces/facilities.interface";
import { ADMIN_ROOM_FACILITIES_URLS } from "../../services/api/apiConfig";
import { privateAxiosInstance } from "../../services/api/apiInstance";
import { handleThunkError } from '../../utilities/handleThunkError';

// Create Room Facility
export const createRoomFacility = createAsyncThunk('roomFacilities/create', async (payload: RoomFacilityPayload, thunkAPI) => {
  try {
    const response = await privateAxiosInstance.post(ADMIN_ROOM_FACILITIES_URLS.CREATE_ROOM_FACILITIES, payload);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to create the room facility'));
  }
});

// Update Room Facility
export const updateRoomFacility = createAsyncThunk('roomFacilities/update', async (payload: UpdateRoomFacilityPayload, thunkAPI) => {
  const { id, data } = payload;
  try {
    const response = await privateAxiosInstance.put(ADMIN_ROOM_FACILITIES_URLS.UPDATE_ROOM_FACILITIES(id), data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to update the room facility'));
  }
});

// Get Room Facility Details
export const getRoomFacilityDetails = createAsyncThunk('roomFacilities/details', async (id: string, thunkAPI) => {
  try {
    const response = await privateAxiosInstance.post(ADMIN_ROOM_FACILITIES_URLS.GET_ROOM_FACILITY_DETAILS(id));
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to get the room facility details'));
  }
});

// Delete Room Facility
export const deleteRoomFacility = createAsyncThunk('roomFacilities/delete', async (id: string, thunkAPI) => {
  try {
    const response = await privateAxiosInstance.delete(ADMIN_ROOM_FACILITIES_URLS.DELETE_ROOM_FACILITIES(id));
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to delete the room facility'));
  }
});

// Get All Room Facilities
export const getAllRoomFacilities = createAsyncThunk('roomFacilities/getAll', async (params:GetAllRoomFacilitiesParams,thunkAPI) => {
  try {
    const response = await privateAxiosInstance.get(ADMIN_ROOM_FACILITIES_URLS.GET_ROOM_FACILITIES,{params});
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to get all room facilities'));
  }
});
