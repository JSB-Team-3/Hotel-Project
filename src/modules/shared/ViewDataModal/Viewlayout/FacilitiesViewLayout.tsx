import { memo } from 'react';
import {
  Box,
  IconButton,
  Stack,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BadgeIcon from '@mui/icons-material/Badge';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import InfoCard from '../../Card/InfoCard'; // Ensure correct path to InfoCard
import { formatDate } from '../../../../utilities/formaterHelper';
import { FC } from 'react';
import { FacilitiesViewLayoutProps } from '../../../../Interfaces/facilities.interface';


const FacilitiesViewLayout: FC<FacilitiesViewLayoutProps> = memo(({ data, handleClose }) => {


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
          <h2 style={{ margin: 0 }}>{data.name || 'Info Details'}</h2>
          <Stack direction="row" justifyContent="center" gap={1} mt={1}>
            {data.createdBy && (
              <Chip 
                label={`Created by: ${data.createdBy.userName || 'Unknown'}`} 
                icon={<BadgeIcon />} 
                color="info" 
              />
            )}
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
          label="ID"
          value={data._id || 'N/A'}
          fullWidth
          isMonospaced
          hasBgColor
          icons={<BadgeIcon color="action" sx={{ marginInlineEnd: 1 }} />}
        />
        <InfoCard
          label="NAME"
          value={data.name || 'N/A'}
          fullWidth
          icons={<DriveFileRenameOutlineIcon color="action" sx={{ marginInlineEnd: 1 }} />}
        />
        {data.createdBy && (
          <>
            <InfoCard
              label="CREATED BY ID"
              value={data.createdBy._id || 'N/A'}
              isMonospaced
              hasBgColor
              icons={<BadgeIcon color="action" sx={{ marginInlineEnd: 1 }} />}
            />
            <InfoCard
              label="CREATED BY USERNAME"
              value={data.createdBy.userName || 'N/A'}
              icons={<BadgeIcon color="action" sx={{ marginInlineEnd: 1 }} />}
            />
          </>
        )}
        <InfoCard
          label="CREATED AT"
          value={data.createdAt ? formatDate(data.createdAt) : 'N/A'}
          hasBgColor
          icons={<CalendarMonthIcon color="action" sx={{ marginInlineEnd: 1 }} />}
        />
        <InfoCard
          label="UPDATED AT"
          value={data.updatedAt ? formatDate(data.updatedAt) : 'N/A'}
          hasBgColor
          icons={<CalendarMonthIcon color="action" sx={{ marginInlineEnd: 1 }} />}
        />
      </Box>
    </>
  );
});

export default FacilitiesViewLayout;
