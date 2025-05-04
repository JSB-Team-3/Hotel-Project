import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../UserComponent/Navbar/Navbar';
import Footer from '../UserComponent/Footer/Footer';


const UserLayout = () => {
  

  return (
    <Box  sx={{display:'flex' , flexDirection:'column',minHeight:'100vh'}}>
    <Navbar/>
    <Box  sx={{flexGrow:1,marginTop:"70px" }}>
     <Outlet />
    </Box>
    <Footer/>
    </Box>

  );
};

export default UserLayout;