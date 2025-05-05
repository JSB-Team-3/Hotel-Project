import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../UserComponent/Navbar/Navbar';
import Footer from '../UserComponent/Footer/Footer';
import { Container } from '@mui/system';


const UserLayout = () => {
  

  return (
    <Box  sx={{display:'flex' , flexDirection:'column',minHeight:'100vh'}}>
    <Navbar/>
    <Container   sx={{marginTop:"70px", marginBottom:"70px"}}> 
     <Outlet />
    </Container>
    <Footer/>
    </Box>

  );
};

export default UserLayout;