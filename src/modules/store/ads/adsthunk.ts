import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADMIN_ADS_URLS } from "../../services/api/apiConfig";
import { privateAxiosInstance } from "../../services/api/apiInstance";
import { adPayload, getAllAdsParams, updateAdPayload } from "../../../Interfaces/ads.interfaces";
import { handleThunkError } from "../../../utilities/handleThunkError";

// ✅ Get All Ads
export const getAds = createAsyncThunk('ads/getAll', async (params: getAllAdsParams, thunkAPI) => {
  try {
    const response = await privateAxiosInstance.get(ADMIN_ADS_URLS.GET_ADS, {params});
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to fetch ads'));
  }
});

export const createAd = createAsyncThunk('ads/createAd', async (data:adPayload, thunkAPI) => {
  try {
    const response = await privateAxiosInstance.post(ADMIN_ADS_URLS.CREATE_AD, data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to create ad'));
  }
});

// ✅ Get Ad Details
export const getAdDetails = createAsyncThunk('ads/getDetails', async (id: string, thunkAPI) => {
  try {
    const response = await privateAxiosInstance.get(ADMIN_ADS_URLS.GET_AD_DETAILS(id));
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to fetch ad details'));
  }
});

// ✅ Delete Ad
export const deleteAd = createAsyncThunk('ads/delete', async (id: string, thunkAPI) => {
  try {
    const response = await privateAxiosInstance.delete(ADMIN_ADS_URLS.DELETE_AD(id));
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to delete ad'));
  }
});

// ✅ Update Ad
export const updateAd = createAsyncThunk('ads/update', async (payload: updateAdPayload, thunkAPI) => {
  const { id, data } = payload;
  try {
    const response = await privateAxiosInstance.post(ADMIN_ADS_URLS.UPDATE_AD(id), data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to update ad'));
  }
});
