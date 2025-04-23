type Facility = {
  name:string
}
export interface RoomPayload {
  roomNumber: string;
  imgs: string[];
  price: number;
  capacity: number;
  discount: number;
  facilities: string[];
}
export type UpdateRoomPayload = {
    id: string;
    data: RoomPayload;
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
  }