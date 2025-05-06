import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, alpha, useTheme, Box } from '@mui/material';
import { PageType } from '../constant';
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
  
  // Replace Framer Motion animation with CSS
  const [isVisible, setIsVisible] = React.useState(false);
  
  React.useEffect(() => {
    // Add staggered animation delay based on index
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 300);
    
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Box
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(15px)',
        transition: `opacity 0.25s ease, transform 0.25s ease`,
      }}
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
    </Box>
  );
});