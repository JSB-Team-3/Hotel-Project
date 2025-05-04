// RoomDetails.tsx
import { JSX, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { Box, Grid, Typography, Divider } from '@mui/material';
import {
  Bed as BedIcon,
  Wifi as WifiIcon,
  Tv as TvIcon,
  AcUnit as AcUnitIcon,
  Kitchen as KitchenIcon,
  LocalParking as LocalParkingIcon,
  Security as SecurityIcon,
  Bathtub as BathtubIcon,
} from '@mui/icons-material';
import { getRoomsDetails } from '../../../store/rooms/roomsThunk';
import { AppDispatch } from '../../../store/auth/AuthConfig';
import { RoomDetailsData } from '../../../Interfaces/rooms.interface';
import RoomGallery from '../../../shared/UserComponent/RoomGallery/RoomGallery';
import RoomBreadcrumbs from '../../../shared/UserComponent/Breadcrumb/Breadcrumb';
import RoomDetialsSkeleton from '../../../shared/UserComponent/RoomDetialSkeleton/RoomDetialsSkeleton';
import BookingCard from '../../../shared/UserComponent/BookingCard/BookingCard';
import ReviewAndComments from '../../../shared/UserComponent/CommentAndReview/CommentAndReview';
import { useTranslation } from 'react-i18next';

// Icon map
const FACILITY_ICONS: Record<string, JSX.Element> = {
  wifi: <WifiIcon fontSize="small" />,
  tv: <TvIcon fontSize="small" />,
  'air conditioning': <AcUnitIcon fontSize="small" />,
  ac: <AcUnitIcon fontSize="small" />,
  kitchen: <KitchenIcon fontSize="small" />,
  parking: <LocalParkingIcon fontSize="small" />,
  'car parking': <LocalParkingIcon fontSize="small" />,
  security: <SecurityIcon fontSize="small" />,
  bathroom: <BathtubIcon fontSize="small" />,
  bathtub: <BathtubIcon fontSize="small" />,
  bed: <BedIcon fontSize="small" />,
  'single bed': <BedIcon fontSize="small" />,
  'double bed': <BedIcon fontSize="small" />,
  sofa: <BedIcon fontSize="small" />,
  car: <LocalParkingIcon fontSize="small" />,
  news: <TvIcon fontSize="small" />,
};

interface Facility {
  name: string;
  icon?: string;
}
const RoomDetails: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [roomDetails, setRoomDetails] = useState<RoomDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const breadCrumbsLinks = [
    { label: t('sidebar.home'), to: '/home' },
    { label: t('room_details.title'), to: `/home/rooms/${roomId}` },
  ];

  useEffect(() => {
    if (!roomId) {
      enqueueSnackbar(t('room_details.invalid_room_id'), { variant: 'error' });
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await dispatch(getRoomsDetails(roomId)).unwrap();
        if (!data?.room) throw new Error(t('room_details.fetch_error'));
        setRoomDetails(data.room);
      } catch (error) {
        enqueueSnackbar((error as string) || t('room_details.fetch_error'), { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomId, dispatch, t]);

  if (loading) return <RoomDetialsSkeleton />;

  const discountedPrice =
    roomDetails && roomDetails.price && roomDetails.discount !== undefined
      ? roomDetails.price - (roomDetails.price * roomDetails.discount) / 100
      : 0;

  return (
    <>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, textAlign: 'center' }}>
        {t('room_details.title')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center' }}>
        {t('room_details.loction')}
      </Typography>
      <RoomBreadcrumbs links={breadCrumbsLinks} />
      {roomDetails && <RoomGallery images={roomDetails.images} />}
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <Typography variant="body1">{t('room_details.paragraph1')}</Typography>
          <Typography variant="body1">{t('room_details.paragraph2')}</Typography>
          <Typography variant="body1">{t('room_details.paragraph3')}</Typography>
          <Divider sx={{ my: 3 }} />
          {roomDetails && <FacilitiesList facilities={roomDetails.facilities} />}
        </Grid>
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          {roomDetails && discountedPrice !== undefined && discountedPrice !== null && roomId && (
            <BookingCard
              price={roomDetails.price}
              capacity={roomDetails.capacity}
              discount={roomDetails.discount}
              roomId={roomId}
            />
          )}
        </Grid>
      </Grid>
      {roomId && <ReviewAndComments roomId={roomId} />}
    </>
  );
};

export default RoomDetails;

// Facilities

const FacilitiesList = ({ facilities }: { facilities: Facility[] }) => {
  const { t } = useTranslation();

  const renderFacilities = facilities?.map((facility, index) => {
    const facilityName = facility?.name?.toLowerCase();
    const icon = facilityName ? FACILITY_ICONS[facilityName] : <BedIcon fontSize="small" />;

    return (
      <Box
        key={index}
        display="flex"
        alignItems="center"
        mb={1}
        gap={1}
        sx={{ color: 'text.primary' }}
      >
        {icon}
        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
          {t(`facilities.${facilityName}`, facility.name)}
        </Typography>
      </Box>
    );
  });

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t('room_details.what_this_place_offers')}
      </Typography>
      {renderFacilities}
    </Box>
  );
};
