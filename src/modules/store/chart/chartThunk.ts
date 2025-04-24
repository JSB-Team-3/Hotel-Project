import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADMIN_CHART_URLS } from "../../services/api/apiConfig";
import { handleThunkError } from "../../../utilities/handleThunkError";
import { privateAxiosInstance } from "../../services/api/apiInstance";

export const getChart = createAsyncThunk('adminChart/getChart', async (_, thunkAPI) => {
  try {
    const response = await privateAxiosInstance.post(ADMIN_CHART_URLS.GET_CHART);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to fetch the chart data'));
  }
});
