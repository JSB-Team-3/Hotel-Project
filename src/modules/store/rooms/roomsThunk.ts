import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADMIN_ROOMS_URLS } from "../../services/api/apiConfig";
import { privateAxiosInstance } from "../../services/api/apiInstance";
import { handleThunkError } from "../../../utilities/handleThunkError";
import { GetAllRoomsParams, RoomPayload, UpdateRoomPayload } from "../../../Interfaces/rooms.interface";

export const createRoom = createAsyncThunk('room/create', async(payload:RoomPayload, thunkAPI) =>{
    try{
        const response = await privateAxiosInstance.post(ADMIN_ROOMS_URLS.CREATE_ROOM, payload)
        return response.data
    }catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to create the room'));
    }
})
export const updateRoom = createAsyncThunk('room/update', async(payload:UpdateRoomPayload, thunkAPI) =>{
    const {id, data} = payload
    try{
        const response = await privateAxiosInstance.post(ADMIN_ROOMS_URLS.UPDATE_ROOM(id), data)
        return response.data
    }catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to update the room'));
    }
})
export const getRoomDetails = createAsyncThunk('room/details', async(id:string,thunkAPI) =>{
    try{
        const response = await privateAxiosInstance.post(ADMIN_ROOMS_URLS.GET_ROOM_DETAILS(id))
        return response.data
    }catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to create the room'));
    }
})
export const deleteRoom = createAsyncThunk('room/delete', async(id:string,thunkAPI) =>{
    try{
        const response = await privateAxiosInstance.post(ADMIN_ROOMS_URLS.DELETE_ROOM(id))
        return response.data
    }catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to create the room'));
    }
})
export const getAllRooms = createAsyncThunk('room/getAll', async(params:GetAllRoomsParams ,thunkAPI) =>{
    try{
        const response = await privateAxiosInstance.post(ADMIN_ROOMS_URLS.GET_ALL_ROOMS,params)
        return response.data
    }catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to create the room'));
    }
})