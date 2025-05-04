import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewResponse,  GetReviewPayload } from '../../Interfaces/review.interface';
import { getUserReviews, createReview } from './reviewThunk';

interface ReviewsState {
  reviews: ReviewResponse[];
  loading: boolean;
  error: string | null;
  reviewCreated: boolean;
}

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
  reviewCreated: false,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    resetReviewCreated: (state) => {
      state.reviewCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get User Reviews
      .addCase(getUserReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserReviews.fulfilled, (state, action: PayloadAction<GetReviewPayload>) => {
        state.reviews = action.payload.data.roomReviews;
        state.loading = false;
      })
      .addCase(getUserReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Review
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.reviewCreated = false;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.reviewCreated = true;
        state.loading = false;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.reviewCreated = false;
      });
  },
});

export const { resetReviewCreated } = reviewsSlice.actions;
export default reviewsSlice.reducer;