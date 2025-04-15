import signInImg from "../../../assets/images/signInImg.png";
import signUpImg from "../../../assets/images/signUpImg.png";
import forgetPassImg from '../../../assets/images/forgetPassImg.png';
import { useMemo } from 'react';
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const RightAuthLayout = () => {
  const { pathname } = useLocation();
    const { mainImg, title } = useMemo(() => {
    switch (pathname) {
      case '/login':
        return {
          mainImg: signInImg,
          title: 'Sign in to Roamhome'
        };
      case '/register':
        return {
          mainImg: signUpImg,
          title: 'Sign up to Roamhome'
        };
      case '/verify-account':
        return {
          mainImg: signUpImg,
          title: 'Verify Account'
        };
      case '/forget-password':
        return {
          mainImg: forgetPassImg,
          title: 'Forget Password'
        };
      case '/reset-password':
        return {
          mainImg: forgetPassImg,
          title: 'Reset Password'
        };
      default:
        return {
          mainImg: signInImg,
          title: 'Sign in to Roamhome'
        };
    }
  }, [pathname]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        component="img"
        src={mainImg}
        alt="Staycation Logo"
        sx={{ width: '100%', height: "95vh", objectFit: 'fill', borderRadius: '15px' }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '95vh',
          borderRadius: '15px',
          backgroundColor: 'rgba(23, 33, 33, 0.15)',
        }}
      />
      <Typography sx={{ position: 'absolute', top: '78%', left: '13%' }}>
        <Box component={'h2'} sx={{ color: '#FDFFFC', fontWeight: '600', marginBlockEnd: '0' }}>
          {title}
        </Box>
        <Box component={'span'} sx={{ color: '#FDFFFC' }}>
          Homes as unique as you.
        </Box>
      </Typography>
    </Box>
  );
};

export default RightAuthLayout;