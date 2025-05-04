import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { PageType, listItemVariants } from '../constant';
import { useTranslation } from 'react-i18next';

interface DrawerItemProps {
  page: PageType;
  index: number;
  isActive: (path: string) => boolean;
  closeDrawer: () => void;
}

export const DrawerItem = React.memo(({ page, index, isActive, closeDrawer }: DrawerItemProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <motion.div
      custom={index}
      variants={listItemVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <ListItem
        component={RouterLink}
        to={page.path}
        onClick={closeDrawer}
        sx={{
          backgroundColor: isActive(page.path) ? alpha(theme.custom.blueMain, 0.1) : 'transparent',
          color: isActive(page.path) ? theme.custom.blueMain : theme.palette.text.primary,
          borderRadius: '8px',
          margin: '4px 8px',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: isActive(page.path)
              ? alpha(theme.custom.blueMain, 0.15)
              : alpha(theme.custom.blueMain, 0.05),
            transform: 'translateX(4px)',
          },
        }}
      >
        <ListItemIcon
          sx={{ color: isActive(page.path) ? theme.custom.blueMain : theme.palette.text.secondary }}
        >
          {page.icon}
        </ListItemIcon>
        <ListItemText
          primary={t(page.translationKey)}
          primaryTypographyProps={{ fontWeight: isActive(page.path) ? 600 : 500 }}
        />
      </ListItem>
    </motion.div>
  );
});
