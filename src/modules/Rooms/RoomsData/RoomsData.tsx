import { RoomPayload, Facility } from '../../../Interfaces/rooms.interface';
import { Box, Button, Checkbox, CircularProgress, FormControl, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import TextInput from '../../shared/Form/TextInput';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { AppDispatch, RootState } from '../../store/auth/AuthConfig';
import { useValidation } from '../../hooks/useValidation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { createRoom, getRoomDetails, updateRoom } from '../../store/rooms/roomsThunk';
import { getAllRoomFacilities } from '../../store/facilities/facilitiesThunk';
import FileUpload from '../../shared/Form/FileUpload';
import OptimizedImage from '../../shared/OptimizedImage/OptimizedImage';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export default function RoomsData() {
  const { roomId } = useParams<{ roomId: string }>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, facilities } = useSelector((state: RootState) => ({
    loading: state?.rooms?.loading,
    facilities: state?.facilities?.facilities || [],
  }), shallowEqual);
  const { REQUIRED_VALIDATION } = useValidation();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const navigate = useNavigate();
  const isUpdate = Boolean(roomId && roomId !== 'new-room');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomPayload>({ mode: "onChange" });

  const fetchRoomDetails = useCallback(async () => {
    try {
      const response = await dispatch(getRoomDetails(roomId as string)).unwrap();
      const roomData = response?.data?.room;

      if (roomData) {
        reset({
          roomNumber: roomData?.roomNumber,
          price: roomData?.price,
          capacity: roomData?.capacity,
          discount: roomData?.discount,
        });

        setSelectedFacilities(roomData?.facilities?.map((facility: Facility) => facility._id));

        if (roomData.images && roomData.images.length > 0) {
          const imagePromises = roomData.images.map(async (imageUrl: string) => {
            try {
              const response = await fetch(imageUrl);
              const blob = await response.blob();
              const fileName = imageUrl.split('/').pop() || 'image.jpg';
              return new File([blob], fileName, { type: blob.type });
            } catch {
              return null;
            }
          });

          Promise.all(imagePromises)
            .then(files => {
              const validFiles = files.filter((file): file is File => file !== null);
              if (validFiles.length > 0) {
                setSelectedFiles(validFiles);
              }
            });
        }
      }
    } catch (err) {
      enqueueSnackbar(err as string || 'Error fetching room details', { variant: 'error' });
    }
  }, [dispatch, roomId, reset, enqueueSnackbar]);

  const fetchFacilities = useCallback(async () => {
    try {
      await dispatch(getAllRoomFacilities({ page: 1, size: 30 })).unwrap();
    } catch (err) {
      enqueueSnackbar(err as string, { variant: 'error' });
    }
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    fetchFacilities();

    if (isUpdate) {
      fetchRoomDetails();
    }
  }, [isUpdate, fetchRoomDetails, fetchFacilities]);

  const handleFacilitiesChange = useCallback((event: SelectChangeEvent<typeof selectedFacilities>) => {
    const { target: { value } } = event;
    const newSelectedFacilities = typeof value === 'string' ? value.split(',') : value;
    setSelectedFacilities(newSelectedFacilities);
  }, []);
  const onSubmit = async (data: RoomPayload) => {
    try {
      const formData = new FormData();
      formData.append('roomNumber', data.roomNumber);
      formData.append('price', data.price.toString());
      formData.append('capacity', data.capacity.toString());
      formData.append('discount', data.discount.toString());
      selectedFacilities.forEach((facilityId) => {
        formData.append('facilities', facilityId);
      });
      if (selectedFiles.length > 0) {
        selectedFiles.forEach(file => {
          formData.append('imgs', file);
        });
      }

      const response = isUpdate
        ? await dispatch(updateRoom({ id: roomId as string, data: formData })).unwrap()
        : await dispatch(createRoom(formData)).unwrap();

      enqueueSnackbar(response?.message || t('common.success'), { variant: 'success' });

      reset();
      setSelectedFacilities([]);
      setSelectedFiles([]);

      navigate('/dashboard/rooms');
    } catch (err) {
      enqueueSnackbar(err as string, { variant: 'error' });
    }
  };

// Memoize facilitiesArray using useMemo
const facilitiesArray = useMemo(() => {
  return Array.isArray(facilities) ? facilities : [];
}, [facilities]);
  return (
    <Box
      sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 3 }}
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      noValidate
      autoComplete="off"
      encType="multipart/form-data"
    >
      <TextInput<RoomPayload>
        name="roomNumber"
        id="roomNumber"
        register={register}
        placeholder='Room Number'
        validation={REQUIRED_VALIDATION('Room Number')}
        type="text"
        errors={errors}
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <TextInput<RoomPayload>
          name="price"
          id="price"
          register={register}
          placeholder='Price'
          validation={REQUIRED_VALIDATION('Price')}
          type="number"
          errors={errors}
        />
        <TextInput<RoomPayload>
          name="capacity"
          id="capacity"
          register={register}
          placeholder='Capacity'
          validation={REQUIRED_VALIDATION('Capacity')}
          type="number"
          errors={errors}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: "end", mt: 1, mb: 1 }}>
        <TextInput<RoomPayload>
          name="discount"
          id="discount"
          register={register}
          placeholder='Discount'
          validation={REQUIRED_VALIDATION('Discount')}
          type="number"
          errors={errors}
        />
        <FormControl fullWidth>
          <Select
            displayEmpty
            sx={{
              '& .MuiSelect-select': {
                padding: '10px'
              }
            }}
            fullWidth
            labelId="facilities-checkbox-label"
            id="facilities-checkbox"
            multiple
            value={selectedFacilities}
            onChange={handleFacilitiesChange}
            input={<OutlinedInput placeholder="Select Facilities" />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <Box component={'span'}>Select Facilities</Box>;
              }

              return facilitiesArray
                .filter((facility: Facility) => selected.includes(facility._id))
                .map((facility: Facility) => facility.name)
                .join(', ');
            }}
            MenuProps={MenuProps}
          >
            {facilitiesArray.length === 0 ? (
              <MenuItem disabled>No facilities available</MenuItem>
            ) : (
              facilitiesArray.map((facility: Facility) => (
                <MenuItem key={facility._id} value={facility._id}>
                  <Checkbox checked={selectedFacilities.includes(facility._id)} />
                  <ListItemText primary={facility.name} />
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Box>

      <FileUpload
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        register={register}
        errors={errors}
        multiple={true}
        isUpdate={isUpdate}
        fieldName="imgs"
      />
      {/* Preview selected images */}
      <Box sx={{display:"flex",gap:1 ,mt:1}}>
      {selectedFiles.length > 0 && selectedFiles.map((file, index) => (
        <OptimizedImage
          key={index}
          src={URL.createObjectURL(file)} 
          alt={`Room image ${index + 1}`}
          width="80px"
          height="80px"
        />
      ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
        <Button variant="outlined" component={Link} to="/dashboard/rooms">
          {t('common.cancel')}
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {loading ? <CircularProgress color="inherit" size={24} sx={{ color: 'white' }} /> : t('common.save')}
        </Button>
      </Box>
    </Box>
  );
}
