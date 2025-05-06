// src/components/navbar/constants.ts
import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ArticleIcon from '@mui/icons-material/Article';
import HelpIcon from '@mui/icons-material/Help';
import { TFunction } from 'i18next';

export interface PageType {
  name: string;
  path: string;
  icon: React.ReactNode;
  translationKey: string;
}

export const getPages = (t: TFunction): PageType[] => [
  { name: t('user-navbar.home'), path: '/', icon: <HomeIcon />, translationKey: 'user-navbar.home' },
  { name: t('user-navbar.explore'), path: '/explore', icon: <ExploreIcon />, translationKey: 'user-navbar.explore' },
  { name: t('user-navbar.userBookings'), path: '/user-booking', icon: <ArticleIcon />, translationKey: 'user-navbar.userBookings' },
];

// These constants are no longer needed as we're using MUI transitions
export const DRAWER_TRANSITION_DURATION = {
  enter: 250,  // Opening duration in ms
  exit: 300    // Closing duration in ms
};

export const DRAWER_TRANSITION_EASING = {
  enter: 'cubic-bezier(0.32, 0, 0.67, 0)',  // Snappy cubic bezier for opening
  exit: 'cubic-bezier(0.32, 0.72, 0, 1)'    // Smooth cubic bezier for closing
};

export const ITEM_STAGGER_DELAY = 100; // Delay between list items animating in ms