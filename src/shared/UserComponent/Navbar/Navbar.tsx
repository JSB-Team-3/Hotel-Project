// src/components/navbar/Navbar.tsx
import * as React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Avatar,
  Tooltip,
  Box,
  Badge,
  useMediaQuery,
  useScrollTrigger,
  Slide,
  alpha,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThemeToggle from '../../ThemeToggle';
import LanguageSwitcher from '../../LanguageSwithcer';
import { useTranslation } from 'react-i18next';

// Custom components & hooks
import { DesktopNav } from './components/DesktopNav';
import { UserMenu } from './components/UserMenu';
import { AuthButtons } from './components/AuthButtons';
import { ScrollToTop } from './components/ScrollToTop';
import { MobileDrawer } from './components/MobileDrawer';
import { useNavbarState } from './hooks/useNavbarState';
import { Logo } from '../Logo/Logo';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const scrolled = useScrollTrigger({ threshold: 50 });
  const { t } = useTranslation();
  
  const {
    isLoggedIn,
    userProfile,
    PAGES,
    isActive,
    drawerOpen,
    anchorEl,
    favoriteCount,
    toggleDrawer,
    closeDrawer,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
    goToFavorites,
    handleNavigateToHome
  } = useNavbarState();

  return (
    <>
      <Slide appear={false} direction="down" in={!scrolled}>
        <AppBar
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.95)
                : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
            transition: 'box-shadow 0.3s ease',
            transform: 'translateY(0)' ,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{
                justifyContent: 'space-between',
                minHeight: scrolled ? '64px' : '80px',
                transition: 'min-height 0.3s ease',
              }}
            >
              <Logo navigateToHome={handleNavigateToHome} />
              <DesktopNav pages={PAGES} isActive={isActive} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {isLoggedIn && (
                  <Tooltip title={t('user-navbar.favorites')}>
                    <IconButton
                      onClick={goToFavorites}
                      sx={{
                        color: '#FF498B',
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <Badge badgeContent={favoriteCount} color="error">
                        <FavoriteIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                )}

                {!isMobile && (
                  <>
                    <LanguageSwitcher color="info" />
                    <ThemeToggle color="info" />
                  </>
                )}

                {!isMobile &&
                  (isLoggedIn ? (
                    <>
                      <Tooltip title={t('user-navbar.settings')}>
                        <IconButton
                          onClick={handleMenuOpen}
                          size="small"
                          sx={{
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            },
                          }}
                        >
                          <Avatar
                            alt={userProfile?.userName || 'user image'}
                            src={userProfile?.profileImage || '/static/images/avatar/2.jpg'}
                            sx={{
                              width: 40,
                              height: 40,
                              border: '2px solid',
                              borderColor: anchorEl ? theme.custom.blueMain : 'transparent',
                              transition: 'border-color 0.2s ease',
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                      <UserMenu
                        anchorEl={anchorEl}
                        handleClose={handleMenuClose}
                        handleLogout={handleLogout}
                      />
                    </>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <AuthButtons />
                    </Box>
                  ))}

                {isMobile && (
                  <IconButton
                    onClick={toggleDrawer}
                    sx={{
                      color: drawerOpen
                        ? '#FF498B'
                        : theme.palette.mode === 'dark'
                        ? theme.palette.text.primary
                        : theme.custom.darkblue,
                      transition: 'color 0.2s ease, transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>

      {isMobile && (
        <MobileDrawer
          drawerOpen={drawerOpen}
          closeDrawer={closeDrawer}
          theme={theme}
          isLoggedIn={isLoggedIn}
          userProfile={userProfile}
          pages={PAGES}
          isActive={isActive}
          handleLogout={handleLogout}
          handleNavigateToHome={handleNavigateToHome}
        />
      )}

      <ScrollToTop />
    </>
  );
};

export default React.memo(Navbar);