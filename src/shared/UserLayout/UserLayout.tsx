import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';


const UserLayout = () => {
  

  return (
    <Box >
     <Outlet />
    </Box>
  );
};

export default UserLayout;