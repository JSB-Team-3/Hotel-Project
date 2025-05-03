import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  CreateReviewPayload, 
  CreateReviewResponse, 
  GetReviewPayload, 
} from '../../Interfaces/review.interface';
import { privateAxiosInstance } from '../../services/api/apiInstance';
import { REVIEWS_URLS } from '../../services/api/apiConfig';
import { handleThunkError } from '../auth/handleThunkError';

// Fetch reviews for a specific room
export const getUserReviews = createAsyncThunk<GetReviewPayload, string>(
  'reviews/getUserReviews',
  async (roomId: string, thunkAPI) => {
    try {
      const res = await privateAxiosInstance.get<GetReviewPayload>(
        REVIEWS_URLS.GET_USER_REVIEWS(roomId)
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to fetch reviews'));
    }
  }
);

// Create a new review
export const createReview = createAsyncThunk<CreateReviewResponse, CreateReviewPayload>(
  'reviews/createReview',
  async (payload, thunkAPI) => {
    try {
      const res = await privateAxiosInstance.post<CreateReviewResponse>(
        REVIEWS_URLS.CREATE_REVIEW, 
        payload
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to create review'));
    }
  }
);