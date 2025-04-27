export type RoomFacilityPayload = {
    name: string; // Name of the room facility
};
export type UpdateRoomFacilityPayload = {
    _id: string;
    data: RoomFacilityPayload;
};
export type GetAllRoomFacilitiesParams = {
    page: number;
    size: number;
};
export type RoomFacility = {
    _id: string;
    name: string; 
};
export type RoomFacilitiesState = { 
    facilities: RoomFacility[];  
    facilityDetails: RoomFacility | null;
    loading: boolean;
    error: string | null;
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
  