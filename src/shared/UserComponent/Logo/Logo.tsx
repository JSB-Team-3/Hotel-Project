import * as React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

interface LogoProps {
  blueMainColor?: string;
  liteMainColor?: string;
  darkblueColor?: string;
  navigateToHome?: () => void;
}

export const Logo: React.FC<LogoProps> = React.memo(({ 
  blueMainColor, 
  liteMainColor, 
  darkblueColor,
  navigateToHome 
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
                
  // Use provided colors or fallback to the default theme colors
  const blueMain = blueMainColor || theme.custom.blueMain;
  const liteMain = liteMainColor || theme.custom.liteMain;
  const darkblue = darkblueColor || theme.custom.darkblue;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AdbIcon sx={{ mr: 1, color: blueMain }} />
      <Typography 
        variant="h6" 
        component="div" 
        onClick={navigateToHome}
        sx={{
          fontWeight: 700,
          textDecoration: 'none',
          cursor: navigateToHome ? 'pointer' : 'default',
          '&:hover': {
            opacity: navigateToHome ? 0.8 : 1,
            transition: 'opacity 0.2s ease'
          }
        }}
      >
        <Box component="span" sx={{ color: blueMain }}>
          stay
        </Box>
        <Box component="span" sx={{ color: isDark ? liteMain : darkblue }}>
          cation.
        </Box>
      </Typography>
    </Box>
  );
});