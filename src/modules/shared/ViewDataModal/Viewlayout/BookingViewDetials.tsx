import {Box,IconButton,Stack,Chip,} from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
  import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
  import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
  import BadgeIcon from '@mui/icons-material/Badge';
  import InfoCard from '../../Card/InfoCard';
  import { formatDate } from '../../../../utilities/formaterHelper';
  import { FC } from 'react';
import { BookingViewLayoutProps } from '../../../../Interfaces/cards.interfaces';

const getStatusColor = (
    status: string
  ): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };
  

  const BookingViewLayout: FC<BookingViewLayoutProps> = ({ data, handleClose }) => {
    return (
      <>
        {/* Header */}
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'primary.main',
            backgroundImage: 'linear-gradient(to right, #4f46e5, #8b5cf6)',
            color: 'white',
            px: 3,
            py: 2,
            textAlign: 'center',
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
            }}
          >
            <CloseIcon />
          </IconButton>
  
          <Box sx={{ mt: 1 }}>
            <h2 style={{ margin: 0 }}>Booking Info</h2>
            <Stack direction="row" justifyContent="center" gap={1} mt={1}>
              <Chip label={`Status: ${data.status}`} color={getStatusColor(data.status)}/>
              <Chip label={`Room: ${data.room.roomNumber}`} icon={<MeetingRoomIcon />} color="secondary" />
              <Chip label={`User: ${data.user.userName}`} icon={<BadgeIcon />} color='info' />
            </Stack>
          </Box>
        </Box>
  
        {/* Info Cards Section */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 1,
          }}
        >
          <InfoCard
            label="BOOKING ID"
            value={data._id}
            fullWidth
            isMonospaced
            hasBgColor
            icons={<BadgeIcon color="action" sx={{ marginInlineEnd: 1 }} />}
          />
          <InfoCard
            label="STRIPE CHARGE ID"
            value={data.stripeChargeId}
            fullWidth
            isMonospaced
            icons={<AttachMoneyIcon color="action" sx={{ marginInlineEnd: 1 }} />}
          />
          <InfoCard
            label="TOTAL PRICE"
            value={`$${data.totalPrice}`}
            icons={<AttachMoneyIcon color="action" sx={{ marginInlineEnd: 1 }} />}
          />
          <InfoCard
            label="START DATE"
            value={formatDate(data.startDate)}
            icons={<CalendarMonthIcon color="action" sx={{ marginInlineEnd: 1 }} />}
          />
          <InfoCard
            label="END DATE"
            value={formatDate(data.endDate)}
            icons={<CalendarMonthIcon color="action" sx={{ marginInlineEnd: 1 }} />}
          />
          <InfoCard
            label="CREATED AT"
            value={formatDate(data.createdAt)}
            hasBgColor
            icons={<CalendarMonthIcon color="action" sx={{ marginInlineEnd: 1 }} />}
          />
          <InfoCard
            label="UPDATED AT"
            value={formatDate(data.updatedAt)}
            hasBgColor
            icons={<CalendarMonthIcon color="action" sx={{ marginInlineEnd: 1 }} />}
          />
        </Box>
      </>
    );
  };
  
  export default BookingViewLayout;