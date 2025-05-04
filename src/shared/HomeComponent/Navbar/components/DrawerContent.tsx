import * as React from 'react';
import { Avatar, Box, Button, IconButton, List, Typography, alpha, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Logo } from './Logo';
import { DrawerItem } from './DrawerItem';
import { AuthButtons } from './AuthButtons';
import { PageType } from '../constant';
import ThemeToggle from '../../../ThemeToggle';
import LanguageSwitcher from '../../../LanguageSwithcer';
import { useTranslation } from 'react-i18next';

interface DrawerContentProps {
  isLoggedIn: boolean;
  userProfile: any;
  pages: PageType[];
  isActive: (path: string) => boolean;
  closeDrawer: () => void;
  handleLogout: () => void;
}

export const DrawerContent = React.memo(
  ({ isLoggedIn, userProfile, pages, isActive, closeDrawer, handleLogout }: DrawerContentProps) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background:
              theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
                : `linear-gradient(135deg, ${theme.custom.blueMain} 0%, ${theme.palette.primary.light} 100%)`,
            color: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Logo blueMainColor='#ffffff' liteMainColor='#ffffff' />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <ThemeToggle />
              <LanguageSwitcher />
            </Box>
          </Box>
          <IconButton
            onClick={closeDrawer}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: alpha('#ffffff', 0.1),
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {isLoggedIn && (
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Avatar
              alt={'user profile'}
              src={userProfile?.profileImage || '/images/avatar.png'}
              sx={{
                width: 50,
                height: 50,
                border: '2px solid',
                borderColor: theme.custom.blueMain,
              }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {userProfile?.userName || 'user'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {userProfile?.email || 'user@example.com'}
              </Typography>
            </Box>
          </Box>
        )}

        <List
          sx={{
            py: 1,
            flexGrow: 1,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: alpha(theme.custom.blueMain, 0.3),
              borderRadius: '3px',
            },
          }}
        >
          {pages.map((page, index) => (
            <DrawerItem
              key={page.name}
              page={page}
              index={index}
              isActive={isActive}
              closeDrawer={closeDrawer}
            />
          ))}
        </List>

        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          {isLoggedIn ? (
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogout}
              sx={{
                background:
                  theme.palette.mode === 'dark'
                    ? `linear-gradient(45deg, ${theme.palette.error.dark} 30%, ${theme.palette.error.main} 90%)`
                    : `linear-gradient(45deg, #FF498B 30%, #FF6B9D 90%)`,
                color: 'white',
                fontWeight: 600,
                py: 1.5,
                boxShadow: '0 2px 4px rgba(255, 73, 139, 0.3)',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(255, 73, 139, 0.4)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {t('user-navbar.logout')}
            </Button>
          ) : (
            <AuthButtons />
          )}
        </Box>
      </Box>
    );
  }
);
