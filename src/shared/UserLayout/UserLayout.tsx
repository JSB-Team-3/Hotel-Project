import { Container } from '@mui/system';
import { Outlet } from 'react-router-dom';


const UserLayout = () => {
  

  return (
<Container maxWidth="lg" sx={{ py: 4 }}>   
    <Outlet />
    </Container>
  );
};

export default UserLayout;