import {
  Box,
  Avatar,
  IconButton,
  Chip,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import { FC, memo } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import BadgeIcon from '@mui/icons-material/Badge';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import UpdateIcon from '@mui/icons-material/Update';
import InfoCard from '../../Card/InfoCard';
import { formatDate } from '../../../utilities/formaterHelper';

interface UserData {
  _id?: string;
  userName?: string;
  profileImage?: string;
  verified?: boolean;
  email?: string;
  phoneNumber?: string;
  role?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserViewLayoutProps {
  data: UserData;
  handleClose: (val: boolean) => void;
}

const UserViewLayout: FC<UserViewLayoutProps> = ({ data, handleClose }) => {
  return (
    <>
      {/* Header Section with Gradient */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'primary.main',
          backgroundImage: 'linear-gradient(to right, #4f46e5, #8b5cf6)',
          color: 'white',
          px: 3,
          py: 1,
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

        {/* User Profile */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ position: 'relative', mb: 1.5 }}>
            <Avatar
              src={data.profileImage}
              alt={data.userName || ''}
              sx={{
                width: 96,
                height: 96,
                border: '4px solid rgba(255,255,255,0.5)',
                mb: 1,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 6,
                right: -4,
                bgcolor: data.verified ? '#4ade80' : '#f87171',
                color: 'white',
                borderRadius: '50%',
                width: 28,
                height: 28,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px solid white',
              }}
            >
              {data.verified ? <VerifiedIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
            </Box>
          </Box>

          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              icon={data.verified ? <VerifiedIcon /> : <GppMaybeIcon />}
              label={data.verified ? 'Verified' : 'Not Verified'}
              color={data.verified ? 'success' : 'warning'}
              sx={{ mt: 1 }}
            />
            <Chip
              icon={<BadgeIcon />}
              label={data.role}
              color="primary"
              sx={{ mt: 1 }}
            />
             <Chip
              icon={<LocationOnIcon color='inherit' />}
              label={data.country}
              color="default"
              variant="outlined"
              sx={{ mt: 1, color: '#fff' }}
            />
          </Box>
        </Box>
      </Box>

      {/* Main Content Area with Reusable Cards */}
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
          label="USER ID"
          value={data._id || '680a9208662a988e021fe5a7'}
          fullWidth={true}
          isMonospaced={true}
          hasBgColor={true}
          icons={<BadgeIcon color="action" sx={{ marginInlineEnd: 1, color: 'text.secondary' }} />}
        />
        <InfoCard
          label="EMAIL ADDRESS"
          value={data.email || '11alielzoghpy@gmail.com'}
          icons={<EmailIcon color="action" sx={{ marginInlineEnd: 1, color: 'text.secondary' }} />}
        />
        <InfoCard
          label="PHONE NUMBER"
          value={data.phoneNumber || '1120162192'}
          icons={<PhoneIcon color="action" sx={{ marginInlineEnd: 1, color: 'text.secondary' }} />}
        />
        <InfoCard
          label="ACCOUNT STATUS"
          value={
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
              <Chip
                icon={data.verified ? <VerifiedIcon /> : <CancelIcon />}
                label={data.verified ? 'Verified' : 'Not Verified'}
                color={data.verified ? 'success' : 'error'}
                size="small"
              />
              <Chip
                label={data.role || 'admin'}
                color="primary"
                size="small"
              />
              <Chip
                label={data.country || 'egypt'}
                variant="outlined"
                size="small"
                sx={{ textTransform: 'capitalize' }}
              />
            </Stack>
          }
          fullWidth={true}
          icons={<GppMaybeIcon color="action" sx={{ marginInlineEnd: 1, color: 'text.secondary' }} />}
        />
        <InfoCard
          label="CREATED AT"
          value={formatDate(data.createdAt || '2025-04-24T19:33:28.677Z')}
          hasBgColor={true}
          icons={<UpdateIcon color="action" sx={{ marginInlineEnd: 1, color: 'text.secondary' }} />}
        />
        <InfoCard
          label="UPDATED AT"
          value={formatDate(data.updatedAt || '2025-04-24T21:45:47.422Z')}
          hasBgColor={true}
          icons={<UpdateIcon color="action" sx={{ marginInlineEnd: 1, color: 'text.secondary' }} />}
        />
      </Box>
    </>
  );
};

export default memo(UserViewLayout);
