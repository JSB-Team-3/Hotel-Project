import React, { useMemo } from 'react';
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import signInImg from "../../../assets/images/signInImg.png";
import signUpImg from "../../../assets/images/signUpImg.png";
import forgetPassImg from '../../../assets/images/forgetPassImg.png';

const RightAuthLayout = () => {
  const { t } = useTranslation(); // hook to use translations
  const { pathname } = useLocation();

  const { mainImg, title } = useMemo(() => {
    switch (pathname) {
      case '/login':
        return {
          mainImg: signInImg,
          title: t('login.title') // Using the translation key
        };
      case '/register':
        return {
          mainImg: signUpImg,
          title: t('register.heading') // Using the translation key
        };
      case '/verify-account':
        return {
          mainImg: signUpImg,
          title: t('verify_account.title') // Using the translation key
        };
      case '/forget-password':
        return {
          mainImg: forgetPassImg,
          title: t('forget_password.title') // Using the translation key
        };
      case '/reset-password':
        return {
          mainImg: forgetPassImg,
          title: t('reset_password.title') // Using the translation key
        };
      default:
        return {
          mainImg: signInImg,
          title: t('login.title') // Default translation key
        };
    }
  }, [pathname, t]); // Include `t` to trigger re-render when language changes

  return (
    <Box sx={{ position: 'relative',Height:"100%" }} >
      <Box
        component="img"
        src={mainImg}
        alt="Staycation Logo"
        sx={{ display:"block", width: '100%', height: "98vh", objectFit: 'cover', borderRadius: '15px' }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          minHeight: '98vh',
          borderRadius: '15px',
          backgroundColor: 'rgba(23, 33, 33, 0.15)',
        }}
      />
      <Box sx={{ position: 'absolute', top: '78%', left: '13%' }}>
        <Box component={'h2'} sx={{ color: '#FDFFFC', fontWeight: '600', marginBlockEnd: '0' }}>
          {title}
        </Box>
        <Box component={'span'} sx={{ color: '#FDFFFC' }}>
          {t('form.subtitle')} {/* You can also translate this text */}
        </Box>
      </Box>
    </Box>
  );
};

export default RightAuthLayout;
