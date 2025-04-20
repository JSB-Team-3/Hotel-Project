export interface UserPayload {
    title: string;
  }
  export type updateUserPayload = {
      id: string;
      data: UserPayload;
    };
    export type GetAllUsersParams = {
      pageSize: number;
      pageNumber: number;
    };
    export type user= {
      id: string;
    };
    export type UsersState = {
      users: user[];  
      userProfile: user | null;
      loading: boolean;
      error: string | null;
    }