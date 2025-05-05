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
  { name: t('user-navbar.home'), path: '/home', icon: <HomeIcon />, translationKey: 'user-navbar.home' },
  { name: t('user-navbar.explore'), path: '/home/explore', icon: <ExploreIcon />, translationKey: 'user-navbar.explore' },
  { name: t('user-navbar.userBookings'), path: '/home/user-booking', icon: <ArticleIcon />, translationKey: 'user-navbar.userBookings' },
  { name: t('user-navbar.help'), path: '/help', icon: <HelpIcon />, translationKey: 'user-navbar.help' }
];

// Animation variants
export const drawerVariants = {
  closed: {
    x: '100%',
    transition: {
      duration: 0.3,
      ease: [0.32, 0.72, 0, 1] // Smooth cubic bezier for closing
    }
  },
  open: {
    x: 0,
    transition: {
      duration: 0.25,
      ease: [0.32, 0, 0.67, 0] // Snappy cubic bezier for opening
    }
  }
};

export const listItemVariants = {
  closed: {
    opacity: 0,
    x: 15,
    transition: {
      duration: 0.15 // Faster exit animation
    }
  },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1, // Reduced stagger delay
      duration: 0.25,
      ease: "easeOut"
    }
  })
};

export const backdropVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.25
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.2
    }
  }
};