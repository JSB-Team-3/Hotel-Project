import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "../../../Interfaces/user.interface";
import { getAllUsers, getUserProfile } from "./usersThunk";

const initialState: UsersState = {
  users: [],
  userProfile: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    resetUsersState: (state) => {
      state.users = [];
      state.userProfile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get User Profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUsersState } = usersSlice.actions;
export default usersSlice.reducer;
