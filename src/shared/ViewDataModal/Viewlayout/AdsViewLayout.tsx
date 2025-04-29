import  { memo } from 'react';
import {
    Box, Typography, IconButton, Chip, Stack, Divider, CircularProgress,
    useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UpdateIcon from '@mui/icons-material/Update';
import HotelIcon from '@mui/icons-material/Hotel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SpaIcon from '@mui/icons-material/Spa';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { FC } from 'react';
import ImageCarousel from '../../Carousel/ImageCarousel';
import InfoCard from '../../Card/InfoCard';
import { formatDate } from '../../../utilities/formaterHelper';
import { calculateDiscountedPrice } from '../../../utilities/CalculationHelper';
import { AdDataProps } from '../../../Interfaces/ads.interfaces';


const AdsViewLayout: FC<{ data: AdDataProps; handleClose: Function }> = ({ data, handleClose }) => {
    const theme = useTheme();
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }} >
            {!data ? (
                <CircularProgress />
            ) : (
                <>
                    {/* Header Section with Ad Details and Room Images */}
                    <Box
                        sx={{
                            position: 'relative',
                            bgcolor: 'primary.main',
                            backgroundImage: 'linear-gradient(to right, #0369a1, #0284c7)',
                            color: 'white',
                            px: 4,
                            py: 3,
                        }}
                    >
                        <IconButton
                            onClick={() => handleClose(false)}
                            sx={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                color: 'white',
                                bgcolor: 'rgba(255,255,255,0.15)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                                zIndex: 2,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        {/* Ad Title */}
                        <Box sx={{ mb: 2, textAlign: 'center' }}>
                            <Typography variant="h5" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <AdsClickIcon sx={{ mr: 1 }} /> Advertisement for Room {data.room.roomNumber || 'Unknown'}
                            </Typography>
                            <Chip
                                icon={data.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                                label={data.isActive ? "Active" : "Inactive"}
                                color={data.isActive ? "success" : "error"}
                                size="small"
                                sx={{ mt: 1 }}
                            />
                        </Box>

                        {/* Using the reusable Swiper Image Carousel component */}
                        <Box sx={{ maxHeight: 400, overflow: 'hidden', borderRadius: 2, width: '80%', mx: 'auto' }}>
                            <ImageCarousel
                                images={data.room.images}
                                height={260}
                                borderRadius={1}
                                placeholderText="No room images available"
                                placeholderBackground="rgba(255, 255, 255, 0.2)"
                            />
                        </Box>
                    </Box>

                    {/* Room Overview */}
                    <Box sx={{ px: 3, py: 2, bgcolor: theme.palette.background.paper }}>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            alignItems="center"
                            justifyContent="space-evenly"
                            divider={<Divider orientation="vertical" flexItem />}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <HotelIcon color="primary" />
                                <Typography>
                                    <Typography component="span" fontWeight={600}>
                                        Room:
                                    </Typography>{' '}
                                    {data.room.roomNumber || 'Unknown'}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PeopleIcon color="primary" />
                                <Typography>
                                    <Typography component="span" fontWeight={600}>
                                        Capacity:
                                    </Typography>{' '}
                                    {data.room.capacity || 0} People
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AttachMoneyIcon color="primary" />
                                <Typography>
                                    <Typography component="span" fontWeight={600}>
                                        Price:
                                    </Typography>{' '}
                                    ${data.room.price || 0}
                                    {data.room.discount && data.room.discount > 0 && (
                                        <Typography component="span" color="error.main" sx={{ ml: 1 }}>
                                            ${calculateDiscountedPrice(data.room.price || 0, data.room.discount || 0)}
                                        </Typography>
                                    )}
                                </Typography>
                            </Box>

                            {data.room.discount && data.room.discount > 0 && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LocalOfferIcon color="error" />
                                    <Typography>
                                        <Typography component="span" fontWeight={600}>
                                            Discount:
                                        </Typography>{' '}
                                        {data.room.discount}%
                                    </Typography>
                                </Box>
                            )}
                        </Stack>
                    </Box>

                    {/* Main Content Area with Reusable Cards */}
                    <Box
                        sx={{
                            flex: 1,
                            p: 3,
                            overflowY: 'auto',
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                            gap: 3,
                        }}
                    >
                        {/* Ad ID Card */}
                        <InfoCard
                            label="AD ID"
                            value={<Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{data._id || 'Unknown'}</Typography>}
                            icons={<FingerprintIcon color="primary" />}
                            fullWidth={true}
                            hasBgColor={true}
                        />

                        {/* Room ID Card */}
                        <InfoCard
                            label="ROOM ID"
                            value={<Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{data.room._id || 'Unknown'}</Typography>}
                            icons={<FingerprintIcon color="secondary" />}
                            fullWidth={true}
                            hasBgColor={true}
                        />

                        {/* Ad Status Card */}
                        <InfoCard
                            label="AD STATUS"
                            value={
                                <Chip
                                    label={data.isActive ? "Active" : "Inactive"}
                                    color={data.isActive ? "success" : "error"}
                                    size="small"
                                />
                            }
                            icons={data.isActive ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                        />

                        {/* Created By Card */}
                        <InfoCard
                            label="CREATED BY"
                            value={data.createdBy?.userName || 'Unknown'}
                            icons={<PersonIcon color="primary" />}
                        />

                        {/* Facilities Card */}
                        <InfoCard
                            label="FACILITIES"
                            value={
                                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                    {(data.room.facilities && data.room.facilities.length > 0) ? (
                                        data.room.facilities.map((facilityId: string) => (
                                            <Chip key={facilityId} label={facilityId} color="primary" size="small" />
                                        ))
                                    ) : (
                                        <Chip label="N/A" color="warning" size="small" />
                                    )}
                                </Stack>
                            }
                            icons={<SpaIcon color="primary" />}
                            fullWidth={true}
                        />

                        {/* Ad Created At Card */}
                        <InfoCard
                            label="AD CREATED AT"
                            value={data.createdAt ? formatDate(data.createdAt) : 'Unknown'}
                            icons={<EventAvailableIcon color="primary" />}
                            hasBgColor={true}
                        />

                        {/* Ad Updated At Card */}
                        <InfoCard
                            label="AD UPDATED AT"
                            value={data.updatedAt ? formatDate(data.updatedAt) : 'Unknown'}
                            icons={<UpdateIcon color="primary" />}
                            hasBgColor={true}
                        />

                        {/* Room Created At Card */}
                        <InfoCard
                            label="ROOM CREATED AT"
                            value={data.room.createdAt ? formatDate(data.room.createdAt) : 'Unknown'}
                            icons={<AccessTimeIcon color="secondary" />}
                            hasBgColor={true}
                        />

                        {/* Room Updated At Card */}
                        <InfoCard
                            label="ROOM UPDATED AT"
                            value={data.room.updatedAt ? formatDate(data.room.updatedAt) : 'Unknown'}
                            icons={<UpdateIcon color="secondary" />}
                            hasBgColor={true}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
}

export default memo(AdsViewLayout);