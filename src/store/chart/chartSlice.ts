import { createSlice } from "@reduxjs/toolkit";
import { chartState } from "../../Interfaces/chart.interface";
import { getChart } from "./chartThunk";


const initialState: chartState = {
  chartData: null,
  loading: false,
  error: null,
};

const chartSlice = createSlice({
  name: "adminChart",
  initialState,
  reducers: {
    resetChartState: (state) => {
      state.chartData = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChart.fulfilled, (state, action) => {
        state.loading = false;
        state.chartData = action.payload;
      })
      .addCase(getChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetChartState } = chartSlice.actions;
export default chartSlice.reducer;
