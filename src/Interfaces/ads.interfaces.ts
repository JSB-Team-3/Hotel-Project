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