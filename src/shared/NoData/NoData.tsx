import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import noDataImg from '../../assets/nodata.png';

const NoData = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 5
        }}
      >
        <Box sx={{ mb: 2 }}>
          <img 
            src={noDataImg} 
            alt="No data available" 
            style={{ 
              width: '200px',
              height: '160px',
              objectFit: 'contain'
            }} 
          />
        </Box>
        
        <Typography 
          variant="h5" 
          component="h5"
          sx={{ 
            pt: 3,
            width: '100%',
            fontWeight: 'bold'
          }}
        >
          No Data!
        </Typography>
      </Box>
    </Container>
  );
};

export default NoData;