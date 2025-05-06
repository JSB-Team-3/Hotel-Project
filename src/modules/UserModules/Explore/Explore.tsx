import { Grid } from '@mui/material'
import RoomCard from '../../../shared/RoomCard/RoomCard';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/auth/AuthConfig';
import { useSnackbar } from 'notistack';
import { getAllRoomsPortal } from '../../../store/rooms/roomsThunk';
import { useEffect, useState } from 'react';
import PaginationComp from '../../../shared/Pagination/PaginationComp';
import PortalHeader from '../../../shared/PortalHeader/PortalHeader';
import CardSkeleton from '../../../shared/CardSkeleton/CardSkeleton';
import NoData from '../../../shared/NoData/NoData';
import useAddToFavorite from '../../../hooks/useAddToFavorite';
import { useTranslation } from 'react-i18next';

export default function Explore() {
  const addToFav = useAddToFavorite();
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(9);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, rooms, totalCount } = useSelector((state: RootState) => ({
    loading: state.rooms.loading,
    rooms: state.rooms.rooms,
    totalCount: state.rooms.totalCount,
  }),
    shallowEqual);
  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();
  const getAllRoomsList = async () => {
    try {
      await dispatch(getAllRoomsPortal({
        page: page,
        size: size
      })).unwrap();
    } catch (err) {
      enqueueSnackbar(err as string || t('explore.getMessage'), { variant: 'error' });
    }
  };
  const breadCrumbsLinks = [
    { label: t('sidebar.home'), to: '/home' },
    { label: t('explore.link'), to: `/home/explore` },
  ];
  useEffect(() => {
    getAllRoomsList();
  }, [page, size]);
  return (
    <>
      <PortalHeader title={t('explore.title')} subTitle={t('explore.subtitle')} links={breadCrumbsLinks} />
      <Grid container spacing={2}>
        {loading
          ? [1, 2, 3, 4].map((_, index) => (
            <CardSkeleton key={index} />
          ))
          : rooms?.length > 0 ? rooms?.map((room) => (
            <RoomCard key={room._id} room={room} handleFav={addToFav} />
          )) : <NoData />}
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

