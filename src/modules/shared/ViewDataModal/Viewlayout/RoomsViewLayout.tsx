import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Stack,
  Divider,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BedIcon from '@mui/icons-material/Bed';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { FC } from 'react';
import ImageCarousel from '../../Carousel/ImageCarousel';
import InfoCard from '../../Card/InfoCard';
import { formatDate } from '../../../../utilities/formaterHelper';
import { RoomDataProps } from '../../../../Interfaces/rooms.interface';
import {calculateDiscountedPrice}  from '../../../../utilities/CalculationHelper';
const RoomsViewLayout: FC<{ data: RoomDataProps; handleClose: Function; isMobile: boolean }> = ({ data, handleClose, isMobile }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} >
      {!data ? (
        <CircularProgress />
      ) : (
        <>
          {/* Header Section with Room Images */}
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

            {/* Room Title */}
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BedIcon sx={{ mr: 1 }} /> Room {data.roomNumber || 'Unknown'}
              </Typography>
            </Box>

            {/* Using the reusable Swiper Image Carousel component */}
            <Box sx={{ maxHeight: 400, overflow: 'hidden', borderRadius: 2, width: '80%' ,mx: 'auto'}}>
              <ImageCarousel 
                images={data.images}
                height={260}
                borderRadius={1}
                placeholderText="No room images available"
                placeholderBackground="rgba(255, 255, 255, 0.2)"
                navigation={true}
                pagination={true}
                loop={true}
                effect="slide"
              />
            </Box>
          </Box>

          {/* Room Overview */}
          <Box sx={{ px: 3, py: 2, bgcolor: '#f8fafc' }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems="center"
              justifyContent="space-evenly"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PeopleIcon color="primary" />
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Capacity:
                  </Typography>{' '}
                  {data.capacity || 0} People
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachMoneyIcon color="primary" />
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Price:
                  </Typography>{' '}
                  ${data.price || 0}
                  {data.discount && data.discount > 0 && (
                    <Typography component="span" color="error.main" sx={{ ml: 1 }}>
                      ${calculateDiscountedPrice(data.price || 0, data.discount || 0)}
                    </Typography>
                  )}
                </Typography>
              </Box>

              {data.discount && data.discount > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalOfferIcon color="error" />
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Discount:
                    </Typography>{' '}
                    {data.discount}% 
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
            {/* Room ID Card */}
            <InfoCard label="ROOM ID" value={data._id || 'Unknown'} fullWidth={true} isMonospaced={true} hasBgColor={true} />

            {/* Facilities Card */}
            <InfoCard
              label="FACILITIES"
              value={
                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                {(data.facilities && data.facilities.length > 0) ? (
                  data.facilities.map((facility: any) => (
                    <Chip key={facility._id} label={facility.name} color="primary" size="small" />
                  ))
                ) : (
                  <Chip label="N/A" color="warning" size="small" />
                )}
              </Stack>
              }
              fullWidth={true}
            />

            {/* Created By Card */}
            <InfoCard label="CREATED BY" value={data.createdBy?.userName || 'Unknown'} />

            {/* Room Number Card */}
            <InfoCard label="ROOM NUMBER" value={data.roomNumber || 'Unknown'} />

            {/* Created At Card */}
            <InfoCard label="CREATED AT" value={data.createdAt ? formatDate(data.createdAt) : 'Unknown'} hasBgColor={true} />

            {/* Updated At Card */}
            <InfoCard label="UPDATED AT" value={data.updatedAt ? formatDate(data.updatedAt) : 'Unknown'} hasBgColor={true} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default RoomsViewLayout;