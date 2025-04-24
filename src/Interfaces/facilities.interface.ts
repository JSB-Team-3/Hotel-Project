export type RoomFacilityPayload = {
    name: string; // Name of the room facility
};
export type UpdateRoomFacilityPayload = {
    id: string;
    data: RoomFacilityPayload;
};
export type GetAllRoomFacilitiesParams = {
    pageSize: number;
    pageNumber: number;
};
export type RoomFacility = {
    id: string;
    name: string; 
};
export type RoomFacilitiesState = { 
    facilities: RoomFacility[];  
    facilityDetails: RoomFacility | null;
    loading: boolean;
    error: string | null;
  };
