export interface BookingPayload {
name: string; 
}
export type UpdateBookingPayload = {
    id: string;
    data: BookingPayload;
  };
  export type GetAllBookingParams = {
    pageSize: number;
    pageNumber: number;
  };
  export type Booking= {
    id: string;
  };
  export type BookingState = {
    bookings: Booking[];  
    bookingDetails: Booking | null;
    loading: boolean;
    error: string | null;
  }