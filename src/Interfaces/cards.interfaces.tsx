import { ReactNode } from "react";

export interface DashbordCardProps {
  count: number;
  icon?: React.ReactNode; // Optional prop for the icon
  label: string;
}

export interface InfoCardProps {
  label: string;
  value: string | ReactNode;
  fullWidth?: boolean;
  isMonospaced?: boolean;
  hasBgColor?: boolean;
  icons?: ReactNode;
}

export interface BookingData{
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
    };
    status: string;
    createdAt: string;
    updatedAt: string;
    stripeChargeId: string;
  }
  
  export interface BookingViewLayoutProps {
    data: BookingData;
    handleClose: (val: boolean) => void;
  }