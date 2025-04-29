import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ClipLoader, BeatLoader } from 'react-spinners';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  fullScreen = true
}) => {
  const theme = useTheme(); 

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: fullScreen ? '80vh' : '100%',
        width: '100%',
        gap: 2
      }}
    >
      {/* Primary loader */}
      <ClipLoader 
        color={theme.palette.mode === 'dark' ? theme.custom.liteMain: '#3061C8'} // Use dark theme colors if mode is dark
        size={60}
      />
      
      {/* Optional secondary loader */}
      <BeatLoader 
        color={theme.palette.mode === 'dark' ? theme.custom.liteMain : '#3061C8'}
        margin={5}
      />
   
      {/* Loading message */}
      <Typography 
        variant="body1" 
        color="textSecondary"
        sx={{ mt: 1 }}
      >
        <Box component="span" sx={{ color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#152C5B' }}>
          stay
        </Box>
        <Box component="span" sx={{ color: theme.palette.mode === 'dark' ? '#BBBBBB' : '#3252DF' }}>
          cation.
        </Box> 
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
