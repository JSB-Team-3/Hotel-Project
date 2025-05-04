import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { Outlet } from 'react-router-dom';
import Navbar from '../UserComponent/Navbar/Navbar';


const UserLayout = () => {
  

  return (
    <Box sx={{display:'flex' , flexDirection:'column',minHeight:'100vh'}}>
    <Navbar/>
    <Box  sx={{flexGrow:1,marginTop:"70px" }}>
     <Outlet />
    </Box>
    <Box >
    Footer
    </Box>
    </Box>

  );
};

export default UserLayout;