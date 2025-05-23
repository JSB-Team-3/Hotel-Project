import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_URLS } from "../../services/api/apiConfig";
import {privateAxiosInstance, puplicAxiosInstance} from '../../services/api/apiInstance'
import {LoginData, ForgotPasswordData, ResetPasswordData, ChangePasswordData} from './interfaces/authType'
import { handleThunkError } from "../../utilities/handleThunkError";


export const login = createAsyncThunk('auth/login', async(data: LoginData, thunkAPI) =>{
    try{
        const response = await puplicAxiosInstance.post(USER_URLS.LOGIN, data)        
        return response.data
    }catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to login'));
    }
})

export const registerThunk = createAsyncThunk('auth/register', async(data: FormData, thunkAPI) =>{
    try{
        const Response = await puplicAxiosInstance.post(USER_URLS.REGISTER, data,{headers: {
            'Content-Type': 'multipart/form-data',
          }},)
          
        return Response.data
    }catch(err: any){
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const forgot = createAsyncThunk('auth/forgot', async(data: ForgotPasswordData, thunkAPI) =>{
    try{
        const response = await puplicAxiosInstance.post(USER_URLS.FORGET_PASS, data)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to send reset email'));
    }
})

export const resetPass = createAsyncThunk('auth/resetPass', async(data: ResetPasswordData, thunkAPI) =>{
    try{
        console.log("DATA SENT TO RESET:", data);
        const response = await puplicAxiosInstance.post(USER_URLS.RESET_PASS, data)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to reset password'));
    }
})

export const changePassword = createAsyncThunk('auth/changePass', async(data: ChangePasswordData, thunkAPI) =>{
    try{
        const response = await privateAxiosInstance.post(USER_URLS.CHANGE_PASS, data)
        return response.data
    }catch (error) {
        return thunkAPI.rejectWithValue(handleThunkError(error, 'Failed to change password'));
    }
})

export const getUserProfile = createAsyncThunk(
    'auth/getUserProfile', 
    async(id: string | undefined = undefined, thunkAPI) => {
        try {
            // Get the state to check for user ID if not provided
            const state: any = thunkAPI.getState();
            const userId = id || state.auth.user?._id;
            
            if (!userId) {
                return thunkAPI.rejectWithValue('User ID not available');
            }
            
            const response = await privateAxiosInstance.get(USER_URLS.USER_PROFILE(userId));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(handleThunkError(error, 'Failed to fetch user profile'));
        }
    }
);