import { createAsyncThunk } from "@reduxjs/toolkit";
import { COMMENTS_URLS } from "../../services/api/apiConfig";
import { privateAxiosInstance } from "../../services/api/apiInstance";
import { handleThunkError } from "../auth/handleThunkError";
import { Comment, CommentResponse, CommentUpdateResponse, UpdateCommentPayload } from "../../Interfaces/CommentAndReview.interface";

interface fetchCommentsResponse {
  data: {
    roomComments: CommentResponse[];
    totalCount: number;
  };
}

export const getUserComments = createAsyncThunk<fetchCommentsResponse, string>(
  'comments/getUserComments',
  async (roomId, thunkAPI) => {
    try {
      const res = await privateAxiosInstance.get(COMMENTS_URLS.GET_USER_COMMENTS(roomId));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to fetch comments'));
    }
  }
);

export const createComment = createAsyncThunk<CommentResponse, Comment>(
  'comments/createComment',
  async (payload, thunkAPI) => {
    try {
      const res = await privateAxiosInstance.post(COMMENTS_URLS.CREATE_COMMENT, payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to create comment'));
    }
  }
);

export const updateComment = createAsyncThunk<CommentUpdateResponse, UpdateCommentPayload>(
  'comments/updateComment',
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await privateAxiosInstance.patch(COMMENTS_URLS.UPDATE_COMMENT(id), data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to update comment'));
    }
  }
);

export const deleteComment = createAsyncThunk<{ message: string }, string>(
  'comments/deleteComment',
  async (id, thunkAPI) => {
    try {
      const res = await privateAxiosInstance.delete(COMMENTS_URLS.DELETE_COMMENT(id));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(handleThunkError(err, 'Failed to delete comment'));
    }
  }
);