import { Room } from "./rooms.interface";

export interface adPayload {
    title: string;
  }
  export type updateAdPayload = {
      id: string;
      data: adPayload;
    };
    export type getAllAdsParams = {
      page: number;
      size: number;
    };
    export type Ad= {
      _id: string;
      isActive:boolean;
      room:Room
    };
    export type AdsState = {
      ads: Ad[];  
      adDetails: Ad | null;
      loading: boolean;
      error: string | null;
      deleteLoading: boolean;
      totalCount: number;
    }