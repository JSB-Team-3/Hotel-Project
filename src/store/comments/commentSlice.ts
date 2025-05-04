import { createSlice } from "@reduxjs/toolkit";
import { getUserComments, createComment, updateComment, deleteComment } from "./commentsThunk";
import { CommentResponse } from "../../Interfaces/CommentAndReview.interface";

const initialState = {
  comments: [] as CommentResponse[],
  count: 0 as number,
  loading: false,
  error: null as string | null,
  deleteLoading: false,
  updateLoading: {} as Record<string, boolean>,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setUpdateLoading: (state, action) => {
      state.updateLoading = {
        ...state.updateLoading,
        [action.payload.id]: action.payload.loading
      };
    }
  },
  extraReducers: (builder) => {
    // Fetch user comments
    builder
      .addCase(getUserComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data.roomComments;
        state.count = action.payload.data.totalCount;
      })
      .addCase(getUserComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        // In your actual implementation, you might want to update the comments array
        // or just rely on re-fetching comments after creation
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update comment
      .addCase(updateComment.pending, (state, action) => {
        state.loading = true;
        // Individual comment loading state is handled by setUpdateLoading reducer
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        // Individual comment loading state is handled by setUpdateLoading reducer
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.deleteLoading = false;
        // Remove the deleted comment from the list
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload.message
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUpdateLoading } = commentsSlice.actions;
export default commentsSlice.reducer;