import { Box, Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { InfoCardProps } from '../../../Interfaces/cards.interfaces';

const InfoCard: FC<InfoCardProps> = ({
  label,
  value,
  fullWidth = false,
  isMonospaced = false,
  hasBgColor = false,
  icons = null,
}) => {
  const theme = useTheme();

  return (
    <Box
      component="div"
      sx={{
        p: 2,
        bgcolor: hasBgColor ? theme.palette.background.paper : 'transparent',
        borderRadius: 1,
        width: fullWidth ? '100%' : 'auto',
        color: theme.palette.text.primary,
      }}
    >
      {icons && icons}
      <Typography variant="subtitle2" fontWeight={600}>
        {label}
      </Typography>
      <Typography
        component="h6"
        variant="body2"
        sx={{ fontFamily: isMonospaced ? 'monospace' : 'inherit' }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default InfoCard;
