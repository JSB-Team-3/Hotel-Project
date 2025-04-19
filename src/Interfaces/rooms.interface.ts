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
    pageSize: number;
    pageNumber: number;
  };
  export type Room= {
    id: string;
    roomNumber: string;
    imgs: string[];
    price: number;
    capacity: number;
    discount: number;
    facilities: string[];
  };
  export type RoomsState = {
    rooms: Room[];  
    roomDetails: Room | null;
    loading: boolean;
    error: string | null;
  }