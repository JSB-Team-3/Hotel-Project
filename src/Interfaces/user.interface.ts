export interface UserPayload {
    title: string;
  }
  export type updateUserPayload = {
      id: string;
      data: UserPayload;
    };
    export type GetAllUsersParams = {
      page: number;
      size: number;
    };
    export type User= {
      _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  role: string;
  profileImage: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
    };
    export type UsersState = {
      users: User[];  
      userProfile: User | null;
      loading: boolean;
      error: string | null;
      totalCount: number;
    }