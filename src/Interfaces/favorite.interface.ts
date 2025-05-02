import { Room } from "./rooms.interface";

export type favouriteState = {
    rooms: Room[];
    loading: boolean;
    error: string | null;
    deleteLoading: boolean;
    addLoading: boolean;
    totalCount: number;
}