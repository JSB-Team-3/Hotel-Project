import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, alpha, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const AuthButtons = React.memo(() => {
  const theme = useTheme();
  const { t } = useTranslation();
  
  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'end' }}>
      <Button
        component={RouterLink}
        to="/auth/login"
        variant="outlined"
        size="small"
        sx={{
          color: theme.custom.blueMain,
          borderColor: theme.custom.blueMain,
          fontWeight: 600,
          '&:hover': {
            borderColor: theme.custom.blueMain,
            backgroundColor: alpha(theme.custom.blueMain, 0.04)
          }
        }}
      >
        {t('user-navbar.login.title')}
      </Button>
      
      <Button
        component={RouterLink}
        to="/auth/register"
        variant="contained"
        size="small"
        sx={{
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`
            : `linear-gradient(45deg, ${theme.custom.blueMain} 30%, ${theme.palette.primary.light} 90%)`,
          color: 'white',
          fontWeight: 600,
          boxShadow: '0 2px 4px rgba(50, 82, 223, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(50, 82, 223, 0.4)',
            transform: 'translateY(-1px)'
          },
          transition: 'all 0.2s ease'
        }}
      >
        {t('user-navbar.signup.title')}
      </Button>
    </Box>
  );
});
