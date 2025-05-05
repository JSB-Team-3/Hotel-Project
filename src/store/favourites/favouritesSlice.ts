import { createSlice } from "@reduxjs/toolkit";
import { favouriteState } from "../../Interfaces/favorite.interface";
import { addToFavourite, deleteFavourite, getAllFavouriteRooms } from "./favouritesThunk";

const initialState: favouriteState = {
  rooms: [],
  loading: false,
  deleteLoading: false,
  addLoading: false,
  error: null,
  totalCount: 0,
};
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    clearFavouritesError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(addToFavourite.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addToFavourite.fulfilled, (state,action) => {
        state.addLoading = false;
        state.totalCount=action.payload?.data?.favoriteRooms?.[0]?.rooms?.length 
      })
      .addCase(addToFavourite.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload as string;
      })


      .addCase(deleteFavourite.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteFavourite.fulfilled, (state, action) => {
        state.deleteLoading = false;
        const deletedRoomId = action.meta.arg; // This will be the roomId you passed
        state.totalCount=action.payload?.data?.favoriteRooms?.[0]?.rooms?.length 
        // Filter it out from state.rooms
        state.rooms = state.rooms.filter(room => room._id !== deletedRoomId);

      })
      .addCase(deleteFavourite.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getAllFavouriteRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFavouriteRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload?.data?.favoriteRooms?.[0]?.rooms;
        state.totalCount = state.rooms?.length || 0;
      })
      .addCase(getAllFavouriteRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  }

})
export const { clearFavouritesError } = favouritesSlice.actions
export default favouritesSlice.reducer;
