import React, { useState, useMemo, useCallback } from 'react';
import {Card,Box,Typography,Button,IconButton,CircularProgress,Tooltip,
} from '@mui/material';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import { BookingCardProps, BookingData } from '../../../Interfaces/bookings.interfaces';
import { createBooking } from '../../../store/booking/bookingsThunk';
import { useAppDispatch, useAppSelector } from '../../../hooks/Hook';
import { RootState } from '../../../store/auth/AuthConfig';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const BookingCard: React.FC<BookingCardProps> = ({
  price = 280,
  capacity = 1,
  discount = 20,
  roomId,
}) => {
  const { t } = useTranslation();
  const [dates, setDates] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });
  const [personCount, setPersonCount] = useState<number>(1);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const {user} = useAppSelector((state) => state.auth);
  const {loading}=useAppSelector((state:RootState) => state.bookings)  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();  

  const discountedPrice = useMemo(() => price * (1 - discount / 100), [price, discount]);

  const { totalCost, nights } = useMemo(() => {
    if (!dates.startDate || !dates.endDate) {
      return {
        totalCost: discountedPrice * personCount,
        nights: 1,
      };
    }

    const diffInTime = dates.endDate.getTime() - dates.startDate.getTime();
    const nights = Math.max(Math.round(diffInTime / (1000 * 60 * 60 * 24)), 1);
    const baseTotal = discountedPrice * nights * personCount;

    return {
      totalCost: Math.round(baseTotal),
      nights,
    };
  }, [dates, discountedPrice, personCount]);

  const handleBooking = useCallback(async () => {
    if(user.role !== 'user') {
      enqueueSnackbar(t('booking.user_only'), { variant: 'warning' });
      return
    }else if(user.role === 'admin') {
      enqueueSnackbar(t('booking.admin'), { variant: 'warning' });
      return
    }
    if (!dates.startDate || !dates.endDate) {
      enqueueSnackbar(t('booking.select_date_range'), { variant: 'warning' });
      return;
    }

    if (dates.endDate <= dates.startDate) {
      enqueueSnackbar(t('booking.end_date_error'), { variant: 'warning' });
      return;
    }

    const bookingData: BookingData = {
      startDate: dates.startDate.toISOString().split('T')[0],
      endDate: dates.endDate.toISOString().split('T')[0],
      room: roomId,
      totalPrice: totalCost,
    };

    try {
       await dispatch(createBooking(bookingData)).unwrap();
      enqueueSnackbar(t('booking.success'), { variant: 'success' });
      navigate('/checkout');
    } catch (error) {
      console.error('Booking error:', error);
      enqueueSnackbar(t('booking.error'), { variant: 'error' });
    }
  }, [dates, roomId, totalCost, dispatch, navigate, t,user.role]);

  const handleConfirmDates = useCallback(() => {
    if (dates.startDate && dates.endDate) {
      setIsCalendarOpen(false);
    } else {
      enqueueSnackbar(t('booking.select_both_dates'), { variant: 'warning' });
    }
  }, [dates, t]);

  const increasePerson = () => {
    if (personCount < capacity) {
      setPersonCount((prev) => prev + 1);
    } else {
      enqueueSnackbar(t('booking.capacity_full'), { variant: 'warning' });
    }
  };

  const decreasePerson = () => {
    if (personCount > 1) {
      setPersonCount((prev) => prev - 1);
    } else {
      enqueueSnackbar(t('booking.min_guests'), { variant: 'warning' });
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,  // Background color adapts to the theme
        position: 'sticky',
        top: 20,
        maxWidth: 380,
        boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
        mx: 'auto',
      }}
    >
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        {t('booking.start_booking')}
      </Typography>

      <Box>
        <Typography variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          ${discountedPrice.toFixed(2)}
          <Typography variant="body2" component="span" sx={{ ml: 1 }}>
            {t('booking.per_night')}
          </Typography>
        </Typography>
        {discount > 0 && (
          <Typography variant="caption" sx={{ color: '#ef4444' }}>
            <del>${price}</del> — {discount}% {t('booking.off')}
          </Typography>
        )}
      </Box>

      <Typography variant="body1" sx={{ mt: 5, color: theme.palette.primary.main }}>
        {t('booking.pick_date')}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={t('booking.select_dates_tooltip')}>
            <Button
              onClick={() => setIsCalendarOpen((prev) => !prev)}
              sx={{
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.light,
                px: 0,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              aria-label={t('booking.open_calendar')}
            >
              <CalendarIcon sx={{color: theme.custom.liteMain}} />
            </Button>
          </Tooltip>
          <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
            {dates.startDate && dates.endDate
              ? `${dates.startDate.toLocaleDateString()} - ${dates.endDate.toLocaleDateString()}`
              : t('booking.select_dates')}
          </Typography>
        </Box>

        {isCalendarOpen && (
          <DateRangePicker
            startDate={dates.startDate}
            endDate={dates.endDate}
            setDates={setDates}
            handleConfirmDates={handleConfirmDates}
          />
        )}
      </Box>

      <Box
        mt={2}
        mb={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: theme.palette.background.paper,
          p: 1.5,
          borderRadius: 1,
        }}
      >
        <Typography variant="body1">{t('booking.guests')}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={decreasePerson}
            aria-label={t('booking.decrease_guest')}
            sx={{
              bgcolor: theme.palette.background.paper,
              '&:hover': { bgcolor: theme.palette.primary.light },
            }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography>{personCount}</Typography>
          <IconButton
            onClick={increasePerson}
            aria-label={t('booking.increase_guest')}
            disabled={personCount >= capacity}
            sx={{
              bgcolor: theme.palette.background.paper,
              '&:hover': { bgcolor: theme.palette.primary.light },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      <Box mt={2} mb={2}>
        <Typography variant="body2" color="text.secondary">
          {nights} {t('booking.night', { count: nights })} × {personCount} {t('booking.guest', { count: personCount })}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t('booking.you_will_pay')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {discount > 0 && (
              <Typography variant="body2" sx={{ mr: 1 }}>
                <Box component="del" sx={{ color: '#9ca3af' }}>
                  ${(price * nights * personCount).toFixed(2)}
                </Box>
              </Typography>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>${totalCost}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                {t('booking.per')}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                {personCount} {t('booking.person')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={handleBooking}
        disabled={loading || !dates.startDate || !dates.endDate}
        sx={{
          bgcolor: theme.palette.primary.main,
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          '&:hover': { bgcolor: theme.palette.primary.dark },
        }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : t('booking.continue')}
      </Button>
    </Card>
  );
};

export default BookingCard;