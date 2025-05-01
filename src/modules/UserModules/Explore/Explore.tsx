import {  Grid } from '@mui/material'
import ThemeToggle from '../../../shared/ThemeToggle'
import RoomCard from '../../../shared/RoomCard/RoomCard';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/auth/AuthConfig';
import { useSnackbar } from 'notistack';
import { getAllRoomsPortal } from '../../../store/rooms/roomsThunk';
import { useEffect, useState } from 'react';
import PaginationComp from '../../../shared/Pagination/PaginationComp';
import PortalHeader from '../../../shared/PortalHeader/PortalHeader';
import CardSkeleton from '../../../shared/CardSkeleton/CardSkeleton';

export default function Explore() {
     const [page, setPage] = useState<number>(0);
       const [size] = useState<number>(6); 
       const dispatch = useDispatch<AppDispatch>();
      const { loading, rooms,totalCount } = useSelector((state: RootState) => ({
         loading: state.rooms.loading,
         rooms: state.rooms.rooms,
         totalCount: state.rooms.totalCount,
       }),
       shallowEqual);
       const { enqueueSnackbar } = useSnackbar();
       const getAllRoomsList = async () => {
           try {
             await dispatch(getAllRoomsPortal({ 
               page: page +1,
               size: size
             })).unwrap();
           } catch (err) {
             enqueueSnackbar(err as string || 'failed to get all rooms', { variant: 'error' });
           }
         };

         useEffect(() => {
            getAllRoomsList();
         }, [page, size]);
  return (
    <>
    <ThemeToggle />
    <PortalHeader title='Explore ALL Rooms' subTitle='All Rooms'/>
    <Grid container spacing={2}>
  {loading
    ? [1, 2, 3].map((_, index) => (
        <CardSkeleton key={index} />
      ))
    : rooms?.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
</Grid>
     <PaginationComp
                  count={totalCount}
                  page={page}
                  setPage={setPage}
                  size={size}                  
              />
    </>
  )
}

