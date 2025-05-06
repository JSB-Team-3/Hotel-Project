export type Facility = {
  name:string
  _id:string
}
export interface RoomPayload {
  roomNumber: string;
  images: File[];
  price: number;
  discount: number;
  capacity: number;
  facilities: Facility[];  
}
export type UpdateRoomPayload = {
    id: string;
    data: FormData;
  };
  export type GetAllRoomsParams = {
    page: number;
    size: number;
  };
  export type Room= {
    _id: string;
    roomNumber: string;
    images: string[];
    price: number;
    discount: number;
    capacity: number;
    facilities: Facility[];  
  };
  export type RoomsState = {
    rooms: Room[];  
    roomDetails: Room | null;
    loading: boolean;
    error: string | null;
    deleteLoading: boolean;
    totalCount: number;
  }

  export interface RoomDataProps {
    _id: string;
    roomNumber: string;
    price: number;
    capacity: number;
    discount: number;
    facilities: string[];
    createdBy: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface RoomDetailsData{
    _id: string;
    roomNumber: string;
    images: string[];
    capacity: number;
    price: number;
    discount: number;
    facilities: Facility[];
    createdBy: {
      _id: string;
      userName: string;
    };
    createdAt: string;
    updatedAt: string;
  }
  