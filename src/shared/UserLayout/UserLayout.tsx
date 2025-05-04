import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../HomeComponent/Navbar/Navbar';


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