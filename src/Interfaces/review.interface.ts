// Interfaces for Review components

// User information
export interface UserInfo {
  _id: string;
  userName: string;
  profileImage: string;
}

// Room information
export interface RoomInfo {
  _id: string;
  roomNumber: string;
}

// Review form inputs
export interface ReviewFormInputs {
  rating: number;
  review: string;
}

// Review object returned from the API
export interface ReviewResponse {
  _id: string;
  room: RoomInfo;
  user: UserInfo;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

// Response for getting reviews
export interface GetReviewsResponse {
  roomReviews: ReviewResponse[];  
}

export interface GetReviewPayload{
  data:{
    roomReviews: ReviewResponse[]
  }
}
// Payload for creating a review
export interface CreateReviewPayload {
  roomId: string;
  rating: number;
  review: string;
}

// Response after creating a review
export interface CreateReviewResponse {
  roomId: string;
  rating: number;
  review: string;
}