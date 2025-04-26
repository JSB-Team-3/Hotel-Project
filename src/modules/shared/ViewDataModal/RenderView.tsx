// src/components/Dashboard/Viewlayout/DashboardViewContent.tsx
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import RoomsViewLayout from './Viewlayout/RoomsViewLayout';
import UserViewLayout from './Viewlayout/UserViewLayout';
import { UserDetailsModalProps, ViewRenderProps } from '../../../Interfaces/modal.interface';
import BookingViewLayout from './Viewlayout/BookingViewDetials';
import { BookingData } from '../../../Interfaces/cards.interfaces';

const RenderViewContent: FC<ViewRenderProps> = ({ data, handleClose }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!data) return null;

  if (location.pathname.includes('/dashboard/rooms')) {
    return <RoomsViewLayout data={data} handleClose={handleClose} isMobile={isMobile} />;
  }

  if (location.pathname.includes('/dashboard/users')) {
    return <UserViewLayout data={data} handleClose={handleClose} />;
  }

  if (location.pathname.includes('/dashboard/booking')) {
    return <BookingViewLayout data={data as BookingData} handleClose={handleClose} />;
  }

  return (
    <Typography variant="body1" color="text.secondary" align="center" p={2}>
      No matching view found for this route.
    </Typography>
  );
};

export default RenderViewContent;
