import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { addToFavourite } from '../store/favourites/favouritesThunk';
import { AppDispatch, RootState } from '../store/auth/AuthConfig';
import { useTranslation } from 'react-i18next';
export const useAddToFavorite = () => {
    
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();
  const role = useSelector((state: RootState) => state.auth.user?.role);
const {t} =useTranslation()
  const addToFav = async (roomId: string): Promise<void> => {
    if (role !== 'user') {
      enqueueSnackbar(t('favourite.loginFirst'), { variant: 'error' });
      return;
    }

    try {
      const response = await dispatch(addToFavourite({ roomId })).unwrap();
      enqueueSnackbar(response.message || t('favourite.addSuccess'), { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err as string || t('favourite.addFailed'), { variant: 'error' });
    }
  };

  return addToFav;
};

export default useAddToFavorite;