import { memo } from 'react';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import RoomsViewLayout from './Viewlayout/RoomsViewLayout';
import UserViewLayout from './Viewlayout/UserViewLayout';
import {  ViewRenderProps } from '../../../Interfaces/modal.interface';
import BookingViewLayout from './Viewlayout/BookingViewDetials';
import { BookingData } from '../../../Interfaces/cards.interfaces';
import FacilitiesViewLayout from './Viewlayout/FacilitiesViewLayout';
import { FacilitiesDataInterface } from '../../../Interfaces/facilities.interface';
import AdsViewLayout from './Viewlayout/AdsViewLayout';
import { AdDataProps } from '../../../Interfaces/ads.interfaces';


const RenderViewContent: FC<ViewRenderProps> = memo(({ data, handleClose }) => {
  const location = useLocation();

  if (!data) return null;

  if (location.pathname.includes('/dashboard/rooms')) {
    return <RoomsViewLayout data={data} handleClose={handleClose}  />;
  }

  if (location.pathname.includes('/dashboard/users')) {
    return <UserViewLayout data={data} handleClose={handleClose} />;
  }

  if (location.pathname.includes('/dashboard/booking')) {
    return <BookingViewLayout data={data as BookingData} handleClose={handleClose} />;
  }
  if (location.pathname.includes('/dashboard/facilities')) {
    return <FacilitiesViewLayout data={data as FacilitiesDataInterface} handleClose={handleClose} />;
  }
  if (location.pathname.includes('/dashboard/ads')) {
    return <AdsViewLayout data={data as AdDataProps} handleClose={handleClose}  />;
  }

});

export default RenderViewContent;
