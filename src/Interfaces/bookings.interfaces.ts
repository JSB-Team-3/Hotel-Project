export interface BookingPayload {
  name: string;
}
export type UpdateBookingPayload = {
  id: string;
  data: BookingPayload;
};
export type GetAllBookingParams = {
  size: number;
  page: number;
};
export type Booking = {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: {
    _id: string;
    userName: string;
  };
  room: {
    _id: string;
    roomNumber: string;
  } | null;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  stripeChargeId?: string;
};

export type BookingState = {
  bookings: Booking[];
  bookingDetails: Booking | null;
  loading: boolean;
  error: string | null;
  deleteLoading: boolean;
  totalCount: number;
}