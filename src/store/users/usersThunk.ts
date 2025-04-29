import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADMIN_USERS_URLS } from "../../services/api/apiConfig";
import { privateAxiosInstance } from "../../services/api/apiInstance";
import { handleThunkError } from "../../utilities/handleThunkError";
import { GetAllUsersParams } from "../../Interfaces/user.interface";

// Get All Users
export const getAllUsers = createAsyncThunk(
  "adminUsers/getAll",
  async (params: GetAllUsersParams, thunkAPI) => {
    try {
      const response = await privateAxiosInstance.get(ADMIN_USERS_URLS.GET_ALL_USERS, {params});
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(handleThunkError(err, "Failed to fetch users"));
    }
  }
);

// Get User Profile
export const getUserProfile = createAsyncThunk(
  "adminUsers/getProfile",
  async (id: string, thunkAPI) => {
    try {
      const response = await privateAxiosInstance.post(ADMIN_USERS_URLS.GET_USER_PROFILE(id));
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(handleThunkError(err, "Failed to fetch user profile"));
    }
  }
);
