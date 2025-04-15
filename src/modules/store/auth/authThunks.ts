import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_URLS } from "../../services/api/apiConfig";
import {puplicAxiosInstance} from '../../services/api/apiInstance'
import {LoginData, RegisterData, ForgotPasswordData, ResetPasswordData, ChangePasswordData} from './interfaces/authType'





export const login = createAsyncThunk('auth/login', async(data: LoginData, thunkAPI) =>{
    try{
        const Response = await puplicAxiosInstance.post(USER_URLS.LOGIN, data)
        return Response.data
    }catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const register = createAsyncThunk('auth/register', async(data: RegisterData, thunkAPI) =>{
    try{
        const Response = await puplicAxiosInstance.post(USER_URLS.REGISTER, data)
        return Response.data
    }catch(err: any){
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
} )

export const forgot = createAsyncThunk('auth/forgot', async(data: ForgotPasswordData, thunkAPI) =>{
    try{
        const response = await puplicAxiosInstance.post(USER_URLS.FORGET_PASS, data)
        return response.data
    }catch(err: any){
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const resetPass = createAsyncThunk('auth/resetPass', async(data: ResetPasswordData, thunkAPI) =>{
    try{
        const response = await puplicAxiosInstance.post(USER_URLS.RESET_PASS, data)
        return response.data
    }catch(err: any){
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const changePassword = createAsyncThunk('auth/changePass', async(data: ChangePasswordData, thunkAPI) =>{
    try{
        const response = await puplicAxiosInstance.post(USER_URLS.CHANGE_PASS, data)
        return response.data
    }catch(err: any){
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
})