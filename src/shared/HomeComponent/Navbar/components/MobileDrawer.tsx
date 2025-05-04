import * as React from 'react';
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { DrawerContent } from './DrawerContent';
import { backdropVariants, drawerVariants } from '../constant';

interface MobileDrawerProps {
  drawerOpen: boolean;
  closeDrawer: () => void;
  theme: any;
  isLoggedIn: boolean;
  userProfile: any;
  pages: any[];
  isActive: (path: string) => boolean;
  handleLogout: () => void;
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
  }: MobileDrawerProps) => {
    if (!drawerOpen) return null;

    return (
      <AnimatePresence>
        <Box
          component={motion.div}
          key="backdrop"
          variants={backdropVariants}
          initial="closed"
          animate="open"
          exit="closed"
          onClick={closeDrawer}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: theme.zIndex.drawer + 1,
            backdropFilter: 'blur(2px)',
          }}
        />

        <Box
          component={motion.div}
          key="drawer"
          variants={drawerVariants}
          initial="closed"
          animate="open"
          exit="closed"
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
          />
        </Box>
      </AnimatePresence>
    );
  }
);
