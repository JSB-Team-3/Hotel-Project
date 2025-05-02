import { Grid } from '@mui/material'
import ThemeToggle from '../../../shared/ThemeToggle'
import RoomCard from '../../../shared/RoomCard/RoomCard';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/auth/AuthConfig';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import PortalHeader from '../../../shared/PortalHeader/PortalHeader';
import CardSkeleton from '../../../shared/CardSkeleton/CardSkeleton';
import { deleteFavourite, getAllFavouriteRooms } from '../../../store/favourites/favouritesThunk';
import NoData from '../../../shared/NoData/NoData';

export default function Favourites() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, rooms,deleteLoading} = useSelector((state: RootState) => ({
        loading: state.favourites.loading,
        deleteLoading: state.favourites.deleteLoading,
        rooms: state.favourites.rooms,
    }),
        shallowEqual);
    const { enqueueSnackbar } = useSnackbar();
    const getAllFavourites = async () => {
        try {
            await dispatch(getAllFavouriteRooms()).unwrap();
        } catch (err) {
            enqueueSnackbar(err as string || 'failed to get all favourite rooms', { variant: 'error' });
        }
    };
    const deleteFav = async (roomId: string) => {
        try {
            const response = await dispatch(deleteFavourite(roomId)).unwrap();
            enqueueSnackbar(response.message || 'Room removed from favourites', { variant: 'success' });
        }
        catch (err) {
            enqueueSnackbar(err as string || 'failed to remove room from favourites', { variant: 'error' });
        }
    }
        useEffect(() => {
            getAllFavourites();
        }, []);
        return (
            <>
                <ThemeToggle />
                <PortalHeader title='Your Favorites' subTitle='Your Rooms' />
                <Grid container spacing={2}>
                    {loading || deleteLoading
                        ? [1, 2, 3, 4].map((_, index) => (
                            <CardSkeleton key={index} />
                        ))
                        :rooms?.length>0? rooms?.map((room) => (
                        <RoomCard key={room._id} room={room} handleFav={deleteFav} />
                        )):<NoData/>}
                </Grid>
               
            </>
        )
    }