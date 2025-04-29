import { Box, Toolbar, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import { SIDEBAR_WIDTH_CLOSED, SIDEBAR_WIDTH_OPEN } from '../../constants/sidebar.constant';
import Navbar from '../NavBar/NavBar';
import ScrollToTop from '../ScrollToTop';

const MasterLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => setOpen(!open);

  
  // Calculate the sidebar width based on its state (open/closed)
  const sidebarWidth = open ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED;

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Navbar stays fixed */}
      <Navbar open={open} />
      
      {/* Sidebar */}
      <SideBar open={open} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          marginTop:2,
          width: { xs: '100%', sm: `calc(100% - ${sidebarWidth}px)` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          })
        }}
      >
        <Toolbar /> {/* This creates space below the fixed navbar */}
        <Box
          sx={{
            p: 2,
            flexGrow: 1,
          }}
        >
            <ScrollToTop />

          <Outlet /> {/* Render the nested routes here */}
        </Box>
      </Box>
    </Box>
  );
};

export default MasterLayout;