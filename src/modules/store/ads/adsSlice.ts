import { createSlice } from "@reduxjs/toolkit";
import { AdsState } from "../../../Interfaces/ads.interfaces";
import { createAd, deleteAd, getAdDetails, getAds, updateAd } from "./adsthunk";

const initialState: AdsState = {
  ads: [],
  adDetails: null,
  loading: false,
  error: null,
  deleteLoading: false,
  totalCount: 0,
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    resetAdsState: (state) => {
      state.ads = [];
      state.adDetails = null;
      state.loading = false;
      state.error = null;
      state.deleteLoading = false;
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Ad
      .addCase(createAd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAd.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get All Ads
      .addCase(getAds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAds.fulfilled, (state, action) => {
        state.loading = false;
        state.ads = action.payload?.data?.ads;
        state.totalCount = action.payload?.data?.totalCount;
      })
      .addCase(getAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get Ad Details
      .addCase(getAdDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.adDetails = action.payload;
      })
      .addCase(getAdDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Ad
      .addCase(deleteAd.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteAd.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteAd.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload as string;
      })

      // Update Ad
      .addCase(updateAd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAd.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAdsState } = adsSlice.actions;
export default adsSlice.reducer;
