import { RoomPayload, Facility } from '../../../Interfaces/rooms.interface';
import { Box, Button, Checkbox, CircularProgress, FormControl, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import TextInput from '../../shared/Form/TextInput';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/auth/AuthConfig';
import { useValidation } from '../../hooks/useValidation';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { createRoom } from '../../store/rooms/roomsThunk';
import { getAllRoomFacilities } from '../../store/facilities/facilitiesThunk';
import FileUpload from '../../shared/Form/FileUpload';

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, facilities } = useSelector((state: RootState) => ({
    loading: state?.rooms?.loading,
    facilities: state?.facilities?.facilities || [],
  }));
  const { REQUIRED_VALIDATION } = useValidation();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomPayload>({ mode: "onChange" });

  useEffect(() => {
    // Fetch facilities when component mounts
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      await dispatch(getAllRoomFacilities({ page: 1, size: 30 })).unwrap();
    } catch (err) {
      enqueueSnackbar(err as string, { variant: 'error' });
    }
  };

  const handleFacilitiesChange = (event: SelectChangeEvent<typeof selectedFacilities>) => {
    const {
      target: { value },
    } = event;
    
    // Update selected facilities state
    const newSelectedFacilities = typeof value === 'string' ? value.split(',') : value;
    setSelectedFacilities(newSelectedFacilities);
  };

  const onSubmit = async (data: RoomPayload) => {
    try {
      
  
      const formData = new FormData();
  
      // Append text fields
      formData.append('roomNumber', data.roomNumber);
      formData.append('price', data.price.toString());
      formData.append('capacity', data.capacity.toString());
      formData.append('discount', data.discount.toString());
  
      // Append facilities (array)
      selectedFacilities.forEach((facilityId) => {
        formData.append('facilities', facilityId);
      });
  
      // Append images (array)
      if (selectedFile) {
        formData.append('imgs', selectedFile); // Notice imgs[] not imgs
      }
  
      console.log([...formData.entries()]); // to see what's inside
  
      const response = await dispatch(createRoom(formData)).unwrap();
      enqueueSnackbar(response?.message || t('password.successMessage'), { variant: 'success' });
      reset();
      setSelectedFacilities([]);
      setSelectedFile(null);
    } catch (err) {
      enqueueSnackbar(err as string, { variant: 'error' });
    }
  }

  // Safely convert facilities to an array
  const facilitiesArray = Array.isArray(facilities) ? facilities : [];

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
      <Box sx={{ display: 'flex', gap: 2, alignItems:"center", mt: 1 ,mb:1 }}>
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
            fullWidth
            labelId="facilities-checkbox-label"
            id="facilities-checkbox"
            sx={{padding: 0}}
            multiple
            value={selectedFacilities}
            onChange={handleFacilitiesChange}
            input={<OutlinedInput placeholder="Select Facilities" />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Select Facilities</em>;
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
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        register={register}
        errors={errors}
        t={t}
      />

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