import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { addToFavourite } from '../store/favourites/favouritesThunk';
import { AppDispatch, RootState } from '../store/auth/AuthConfig';
export const useAddToFavorite = () => {
    
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();
  const role = useSelector((state: RootState) => state.auth.user?.role);

  const addToFav = async (roomId: string): Promise<void> => {
    if (role !== 'user') {
      enqueueSnackbar('You must login to add to favourites', { variant: 'error' });
      return;
    }

    try {
      const response = await dispatch(addToFavourite({ roomId })).unwrap();
      enqueueSnackbar(response.message || 'Room added to favourites', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err as string || 'failed to add room to favourites', { variant: 'error' });
    }
  };

  return addToFav;
};

export default useAddToFavorite;