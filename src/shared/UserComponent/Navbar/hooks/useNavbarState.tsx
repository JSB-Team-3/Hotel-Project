// src/components/navbar/hooks/useNavbarState.tsx
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/Hook';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../../../store/auth/AuthConfig';
import { getPages } from '../constant';
import { logout } from '../../../../store/auth/AuthSlice';

export const useNavbarState = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, userProfile } = useAppSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [favoriteCount] = React.useState(3); // This could come from a selector if needed
  const isLoggedIn = !!user;
  
  const PAGES = React.useMemo(() => getPages(t), [t]);
  
  const isActive = React.useCallback((path: string) => location.pathname === path, [location.pathname]);

  const toggleDrawer = React.useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, []);

  const closeDrawer = React.useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const handleMenuOpen = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);
   
  const goToFavorites= React.useCallback(() => {
    navigate('/home/favourites');
  },[navigate]);

  const handleLogout = React.useCallback(() => {
    closeDrawer();
    handleMenuClose();
    navigate('/home');
    dispatch(logout());
  }, [closeDrawer, handleMenuClose, navigate, dispatch]);

  // Control document body overflow when drawer is open
  React.useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [drawerOpen]);

  return {
    isLoggedIn,
    user,
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
    goToFavorites
  };
};