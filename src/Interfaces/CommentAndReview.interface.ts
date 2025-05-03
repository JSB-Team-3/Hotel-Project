export interface UserInfo {
  _id: string;
  userName: string;
  profileImage: string;
}

export interface RoomInfo {
  _id: string;
  roomNumber: string;
}

export interface CommentResponse {
  _id: string;
  room: RoomInfo;
  user: UserInfo;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentPayload {
  room: string;
  user: string;
  comment: string;
}

export interface UpdateCommentPayload {
  id: string;
  data: {
    comment: string;
  };
}

export interface CommentUpdateResponse {
  success: boolean;
  message: string;
  data: {
    comment: CommentResponse;
  };
}

export interface Comment {
  id?: string;
  roomId?: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  comment: string;
  createdAt?: string;
}

export interface Review {
  id?: string;
  roomId?: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  rating: number;
  review: string;
  createdAt?: string;
}

export interface CommentRequest {
  roomId: string;
  comment: string;
}

export interface ReviewRequest {
  roomId: string;
  rating: number;
  review: string;
}

export interface ReviewFormInputs {
  rating: number;
  review: string;
}

export interface CommentFormInputs {
  comment: string;
}

export interface CommentResponse {
  success: boolean;
  message: string;
  data: {
    roomComment: Comment[];
    totalCount: number;
  };
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data: {
    roomReviews: Review[];
    totalCount: number;
  };
}
