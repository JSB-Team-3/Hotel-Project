import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllRoomsParams } from "../../Interfaces/rooms.interface";
import { fAVOURITES_URLS } from "../../services/api/apiConfig";
import { privateAxiosInstance } from "../../services/api/apiInstance";
import { handleThunkError } from "../auth/handleThunkError";

export const getAllFavouriteRooms = createAsyncThunk('room/getAllFavouriteRooms', async(_,thunkAPI) =>{
    try{
        const response = await privateAxiosInstance.get(fAVOURITES_URLS.GET_FAVOURITE_ROOMS)
        return response.data
    }catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to retrieve  rooms list'));
    }
})
export const addToFavourite = createAsyncThunk('room/addToFavourite', async(roomId:{roomId:string},thunkAPI) =>{
    try{
        const response = await privateAxiosInstance.post(fAVOURITES_URLS.ADD_TO_FAVOURITE,roomId)
        return response.data
    }catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to retrieve  rooms list'));
    }
})
export const deleteFavourite = createAsyncThunk('room/deleteFavourite', async(roomId:string,thunkAPI) =>{
    try{
        const response = await privateAxiosInstance.delete(fAVOURITES_URLS.DELETE_FAVOURITE(roomId),{data:{roomId}})
        return response.data
    }catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to retrieve  rooms list'));
    }
})