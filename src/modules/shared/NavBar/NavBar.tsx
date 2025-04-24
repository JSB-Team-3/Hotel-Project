import React, { useState, useCallback, memo } from 'react';
import {Toolbar,IconButton,Typography,Menu,MenuItem,Avatar,useMediaQuery,Box,
  Divider,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  Badge,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BootstrapInput from '../Form/BootstrapInput';
import { StyledAppBar } from './ StyledAppBar';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  open: boolean;
}

const UserMenuItem = memo(
  ({ icon, text, onClick }: { icon: React.ReactNode; text: string; onClick: () => void }) => (
    <MenuItem onClick={onClick} sx={{ minWidth: 200 }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </MenuItem>
  )
);

const Navbar: React.FC<NavbarProps> = ({ open }) => {
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isUserMenuOpen = Boolean(userMenuAnchor);

  const handleUserMenuOpen = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(e.currentTarget);
  }, []);

  const handleUserMenuClose = useCallback(() => {
    setUserMenuAnchor(null);
  }, []);

  const handleUserSettings = useCallback(() => {
    handleUserMenuClose();
  }, [handleUserMenuClose]);

  const handleLogout = useCallback(() => {
    handleUserMenuClose();
  }, [handleUserMenuClose]);

  return (
    <StyledAppBar position="fixed" open={open} elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', p:1 }}>
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
          {/* Search */}
          {/* <Box sx={{ flex: 1, mx: 2, maxWidth: '70%' }}>
            <BootstrapInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('common.search') || 'Search...'}
              startAdornment={
                <InputAdornment position={dir === 'rtl' ? 'end' : 'start'}>
                  <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              }
              fullWidth
              sx={{
                direction: dir,
                textAlign: dir === 'rtl' ? 'right' : 'left',
              }}
            />
          </Box> */}
          
          {/* User Profile Section with angle icon */}
          <Box sx={{ display: 'flex', alignItems: 'center',marginInlineStart:"auto", gap: 2, pr: 1 }}>
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
                src="/images/avatar.png"
                sx={{
                  width: isMobile ? 28 : 32,
                  height: isMobile ? 28 : 32,
                  fontWeight: 'bold',
                  border: `2px solid ${theme.palette.background.paper}`,
                }}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: 'text.primary', userSelect: 'none' }}
              >
                {t('welcome')} 
              </Typography>
              {/* Added angle icon that changes based on menu state */}
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
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  User Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  user@example.com
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