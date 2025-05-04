import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@mui/material/styles';
import { memo, useCallback, useEffect } from 'react';
import { AdsDataProps } from '../../../Interfaces/props.interface';
import { adPayload } from '../../../Interfaces/ads.interfaces';
import { AppDispatch, RootState } from '../../../store/auth/AuthConfig';
import { useSnackbar } from 'notistack';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createAd, getAdDetails, updateAd } from '../../../store/ads/adsthunk';
import { useForm, Controller } from 'react-hook-form';
import { getAllRooms } from '../../../store/rooms/roomsThunk';

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const AdsData = ({
  open,
  handleClose,
  id,
  getAllAdsList
}: AdsDataProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  const { error, text } = theme.palette;
  const { loading, rooms, adDetails } = useSelector((state: RootState) => ({
    loading: state?.ads?.deleteLoading,
    rooms: state?.rooms?.rooms,
    adDetails: state?.ads?.adDetails,
  }), shallowEqual);
  
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<adPayload>({ mode: 'onChange' });

  useEffect(() => {
      if (open) {
         getAllRoomsList();
        if (id) {
           fetchAdDetails();
        } else {
          reset({
            room: '',
            discount: 0,
            isActive: false,
          });
        }
      }
  }, [open, id]);

  useEffect(() => {
    if (id && adDetails) {
      setValue('discount', adDetails?.room?.discount);
      setValue('isActive', adDetails?.isActive); // Convert boolean to string
    }
  }, [adDetails, id, setValue]);

  // Get all rooms for the dropdown
  const getAllRoomsList = async () => {
    try {
      await dispatch(getAllRooms({
        page: 1,
        size: 30
      })).unwrap();
    } catch (err) {
      enqueueSnackbar(err as string || t('rooms.failedToGet'), { variant: 'error' });
    }
  };

  // Fetch ad details if in edit mode
  const fetchAdDetails = async () => {
    try {
      await dispatch(getAdDetails(id as string)).unwrap();
      // Console log removed - was used for debugging
    } catch (err) {
      enqueueSnackbar(err as string || 'Error fetching ad details', { variant: 'error' });
    }
  };

  const onSubmit = async (data: adPayload) => {
    try {

      
      let response;
      
      if (!id) {
        // Create new ad
        response = await dispatch(createAd(data)).unwrap();
      } else {
        // Update existing ad
        response = await dispatch(updateAd({ id, data })).unwrap();
      }
      
      enqueueSnackbar(response?.message || t('ads.successMessage'), { variant: 'success' });
      reset();
      getAllAdsList();
      handleClose(false);
    } catch (err) {
      enqueueSnackbar(err as string, { variant: 'error' });
    }
  };

  // Memoized close handler
  const handleCloseModal = useCallback(() => handleClose(false), [handleClose]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={()=>{handleCloseModal();
        reset();
        setValue('room', '');
        setValue('discount', 0);
        setValue('isActive', false);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 200,
        },
      }}
    >
      <Fade in={open} timeout={100}> 
        <Box sx={{ ...modalStyles, bgcolor: theme.palette.background.paper }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" component="h2">
              {id ? t('ads.updateAd') : t('ads.createAd')}
            </Typography>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: `1px solid ${error.main}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <CloseIcon color="error" onClick={handleCloseModal} />
            </Box>
          </Box>

          <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Room Selection - Show only for creation */}
      {!id && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel 
            id="room-select-label"
            sx={{ 
              backgroundColor: 'white', 
              px: 0.5, 
              zIndex: 1 
            }}
          >
            {t('ads.room')}
          </InputLabel>
          <Controller
            name="room"
            control={control}
            rules={{ required: t('ads.roomRequired') }}
            render={({ field }) => (
              <Select
                labelId="room-select-label"
                id="room-select"
                label={t('ads.room')}
                error={!!errors.room}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: 1
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: '1px'
                  }
                }}
                {...field}
              >
                {rooms.map((room) => (
                  <MenuItem key={room._id} value={room._id}>
                    {room?.roomNumber}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.room && (
            <Typography color="error" variant="caption">
              {errors.room.message}
            </Typography>
          )}
        </FormControl>
      )}

      {/* Discount Input */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <TextField
          label={t('ads.discount')}
          type="number"
          InputLabelProps={{
            shrink: true,
            sx: { 
              backgroundColor: 'white', 
              px: 0.5, 
              zIndex: 1 
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
                borderWidth: '1px'
              }
            }
          }}
          {...register('discount', { 
            required: t('ads.discountRequired'),
            min: {
              value: 0,
              message: t('ads.discountMin')
            },
            max: {
              value: 100,
              message: t('ads.discountMax')
            }
          })}
          error={!!errors.discount}
          helperText={errors.discount?.message}
        />
      </FormControl>

      {/* Is Active Selection */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel 
          id="active-select-label"
          sx={{ 
            backgroundColor: 'white', 
            px: 0.5, 
            zIndex: 1 
          }}
        >
          {t('ads.status')}
        </InputLabel>
        <Controller
          name="isActive"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Select
              labelId="active-select-label"
              id="active-select"
              label={t('ads.status')}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderRadius: 1
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                  borderWidth: '1px'
                }
              }}
              {...field}
            >
              <MenuItem value="true">{t('ads.active')}</MenuItem>
              <MenuItem value="false">{t('ads.inactive')}</MenuItem>
            </Select>
          )}
        />
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
        <Button
          sx={{
            '&:hover': { color: text.primary },
          }}
          variant="outlined"
          onClick={handleCloseModal}
        >
          {t('common.cancel')}
        </Button>
        <Button
          disabled={loading}
          sx={{
            '&:hover': { backgroundColor: theme.palette.primary.main, color: 'white' },
          }}
          startIcon={<SaveIcon />}
          variant="contained"
          color="primary"
          type="submit"
        >
          {loading ? <CircularProgress size={24} /> : t('common.save')}
        </Button>
      </Box>
    </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default memo(AdsData);