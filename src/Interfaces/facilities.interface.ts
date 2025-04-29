export type RoomFacilityPayload = {
    name: string; // Name of the room facility
};
export type UpdateRoomFacilityPayload = {
    id: string;
    data: RoomFacilityPayload;
};
export type GetAllRoomFacilitiesParams = {
    page: number;
    size: number;
};
export type RoomFacility = {
  _id: string;
  name: string;
  roomNumber?: string;
  user?: { userName: string };
  email?: string;
  createdAt?: string; // Add the createdAt property
};
export type RoomFacilitiesState = {
  facilities: RoomFacility[];
  facilityDetails: RoomFacility | null;
  loading: boolean;
  deleteLoading: boolean;
  error: string | null;
  totalCount: number;
};

  export interface FacilitiesDataInterface {
    _id: string;
    name: string;
    createdBy: {
      _id: string;
      userName: string;
    };
    createdAt: string;
    updatedAt: string;
  }
  
  export interface FacilitiesViewLayoutProps {
    data: FacilitiesDataInterface;
    handleClose: (value: boolean) => void;
  }
  

