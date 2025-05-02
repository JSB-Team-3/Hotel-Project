import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return<>
   <Box component={Link} to={'favourites'}>LandingPages</Box>
   <Box component={Link} to={'explore'}>LandingPages</Box>;
  </>
};

export default LandingPage;
