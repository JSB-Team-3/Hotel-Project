import * as React from 'react';
import { Box, Backdrop, Fade, Slide } from '@mui/material';
import { DrawerContent } from './DrawerContent';

interface MobileDrawerProps {
  drawerOpen: boolean;
  closeDrawer: () => void;
  theme: any;
  isLoggedIn: boolean;
  userProfile: any;
  pages: any[];
  isActive: (path: string) => boolean;
  handleLogout: () => void;
  handleNavigateToHome: () => void;
}

export const MobileDrawer = React.memo(
  ({
    drawerOpen,
    closeDrawer,
    theme,
    isLoggedIn,
    userProfile,
    pages,
    isActive,
    handleLogout,
    handleNavigateToHome
  }: MobileDrawerProps) => {
    return (
      <React.Fragment>
        {/* Backdrop with MUI Fade transition */}
        <Backdrop 
          open={drawerOpen}
          onClick={closeDrawer}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: theme.zIndex.drawer + 1,
            backdropFilter: 'blur(2px)',
            transition: 'opacity 0.2s ease',
          }}
          transitionDuration={{
            enter: 200,
            exit: 250,
          }}
        />

        {/* Drawer with MUI Slide transition */}
        <Slide
          direction="left"
          in={drawerOpen}
          mountOnEnter
          unmountOnExit 
          timeout={{
            enter: 250,
            exit: 300
          }}
          easing={{
            enter: 'cubic-bezier(0.32, 0, 0.67, 0)', // Snappy cubic bezier for opening
            exit: 'cubic-bezier(0.32, 0.72, 0, 1)'   // Smooth cubic bezier for closing
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: { xs: '85%', sm: '320px' },
              height: '100%',
              backgroundColor: 'background.paper',
              zIndex: theme.zIndex.drawer + 2,
              overflow: 'hidden',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
              borderRadius: '16px 0 0 16px',
            }}
          >
            <DrawerContent
              isLoggedIn={isLoggedIn}
              userProfile={userProfile}
              pages={pages}
              isActive={isActive}
              closeDrawer={closeDrawer}
              handleLogout={handleLogout}
              handleNavigateToHome={handleNavigateToHome}
            />
          </Box>
        </Slide>
      </React.Fragment>
    );
  }
);