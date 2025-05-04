import * as React from 'react';
import { Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Typography, alpha, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../../../store/auth/AuthConfig';
import { useAppSelector } from '../../../../hooks/Hook';

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleLogout: () => void;
}

export const UserMenu = React.memo(({ anchorEl, handleClose, handleLogout }: UserMenuProps) => {
  const { userProfile } = useAppSelector((state: RootState) => state.auth);
  const theme = useTheme();
  const { t } = useTranslation();
  
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={{
        elevation: 3,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
          mt: 1.5,
          borderRadius: 2,
          minWidth: 200,
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {userProfile?.userName || 'user'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {userProfile?.email || 'user@test.com'}
        </Typography>
      </Box>
      
      <Divider />
      
      <MenuItem 
        onClick={handleClose} 
        sx={{ '&:hover': { backgroundColor: alpha(theme.custom.blueMain, 0.05) } }}
      >
        <ListItemIcon>
          <PersonIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText primary={t('user-navbar.users')} />
      </MenuItem>
      
      <MenuItem 
        onClick={handleClose} 
        sx={{ '&:hover': { backgroundColor: alpha(theme.custom.blueMain, 0.05) } }}
      >
        <ListItemIcon>
          <SettingsIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText primary={t('user-navbar.settings')} />
      </MenuItem>
      
      <Divider />
      
      <MenuItem 
        onClick={handleLogout} 
        sx={{ '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.05) } }}
      >
        <ListItemIcon>
          <LogoutIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText primary={t('user-navbar.logout')} sx={{ color: 'error.main' }} />
      </MenuItem>
    </Menu>
  );
});