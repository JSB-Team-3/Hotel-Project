export interface adPayload {
    title: string;
  }
  export type updateAdPayload = {
      id: string;
      data: adPayload;
    };
    export type getAllAdsParams = {
      pageSize: number;
      pageNumber: number;
    };
    export type ad= {
      id: string;
    };
    export type AdsState = {
      ads: ad[];  
      adDetails: ad | null;
      loading: boolean;
      error: string | null;
    }

    export interface AdDataProps {
      _id: string;
      isActive: boolean;
      room: {
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
      };
      createdBy: {
        _id: string;
        userName: string;
      };
      createdAt: string;
      updatedAt: string;
    }