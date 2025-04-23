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
