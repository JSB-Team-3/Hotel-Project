import React, { useState, useCallback, memo } from 'react';
import { Toolbar, IconButton, Typography, Menu, Avatar, useMediaQuery, Box, Divider, Badge } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/auth/AuthConfig';
import { imgURL } from '../../services/api/apiConfig';
import UserMenuItem from './UserMenuItem';  
import { StyledAppBar } from './ StyledAppBar';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/auth/AuthSlice';
import { useAppDispatch } from '../../hooks/Hook';

interface NavbarProps {
  open: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ open }) => {
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const { t} = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isUserMenuOpen = Boolean(userMenuAnchor);
  const store = useSelector((state: RootState) => state.auth);
  const userName = store.user?.userName || 'User';
  const userImage = store?.userProfile?.profileImage ? `${imgURL}${store.userProfile.profileImage}` : '/images/avatar.png';
  const userEmail = store.userProfile?.email || '';
  const navigate=useNavigate();
  const dispatch=useAppDispatch();

  const handleUserMenuOpen = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(e.currentTarget);
  }, []);

  const handleUserMenuClose = useCallback(() => {
    setUserMenuAnchor(null);
  }, []);

  const handleUserSettings = useCallback(() => {
    handleUserMenuClose();
  }, [handleUserMenuClose]);

  

  const handleLogout = React.useCallback(() => {
    handleUserMenuClose();
    navigate('/');
    dispatch(logout());
  }, [ handleUserMenuClose, navigate, dispatch])
 
  return (
    <StyledAppBar position="fixed" open={open} elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', p: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            backgroundColor: theme.palette.background.default,
            padding: 1,
            borderRadius: 2,
          }}
        >
          {/* User Profile Section with angle icon */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginInlineStart: "auto", gap: 2, pr: 1 }}>
            <Box
              onClick={handleUserMenuOpen}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                }
              }}
            >
              <Avatar
                alt="User"
                src={userImage}
                sx={{
                  width: isMobile ? 28 : 32,
                  height: isMobile ? 28 : 32,
                  fontWeight: 'bold',
                  border: `2px solid ${theme.palette.background.paper}`,
                }}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: 500,direction:"ltr" ,color: 'text.primary', userSelect: 'none',display:"flex",gap:4} }
              >  <Typography component="span" sx={{display:{xs:"none",sm:"block"}}}>{t('welcome ')}</Typography>
                 <Typography component="span" sx={{ fontWeight: 700 }}>{userName}</Typography>
              </Typography>
              {isUserMenuOpen ? (
                <KeyboardArrowUpIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              )}
            </Box>

            <IconButton sx={{ p: 0.5 }}>
              <Badge color="error" variant="dot" overlap="circular">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Menu
              anchorEl={userMenuAnchor}
              open={isUserMenuOpen}
              onClose={handleUserMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
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
              disableAutoFocusItem
              disableEnforceFocus
              disableScrollLock
            >
              <Box sx={{ px: 2, py: .5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {userName}
                </Typography>
              </Box>
              <Box sx={{ px: 2, pb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {userEmail}
                </Typography>
              </Box>
              <Divider />

              <UserMenuItem
                icon={<SettingsIcon fontSize="small" />}
                text={t('common.settings')}
                onClick={handleUserSettings}
              />
              <UserMenuItem
                icon={<LogoutIcon fontSize="small" />}
                text={t('common.logout')}
                onClick={handleLogout}
              />
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default memo(Navbar);
