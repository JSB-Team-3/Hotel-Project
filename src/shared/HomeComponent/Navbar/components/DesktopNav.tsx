import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, alpha, useTheme } from '@mui/material';
import { PageType } from '../constant';
import { useTranslation } from 'react-i18next';

interface DesktopNavProps {
  pages: PageType[];
  isActive: (path: string) => boolean;
}

export const DesktopNav = React.memo(({ pages, isActive }: DesktopNavProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
      {pages.map((page) => (
        <Link
          key={page.name}
          component={RouterLink}
          to={page.path}
          sx={{
            color: isActive(page.path)
              ? theme.custom.blueMain
              : theme.palette.mode === 'dark'
              ? theme.palette.text.primary
              : theme.custom.darkblue,
            fontWeight: isActive(page.path) ? 600 : 500,
            textDecoration: 'none',
            padding: '8px 12px',
            borderRadius: '8px',
            position: 'relative',
            transition: 'all 0.2s ease',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '2px',
              left: '12px',
              width: isActive(page.path) ? 'calc(100% - 24px)' : '0',
              height: '2px',
              backgroundColor: theme.custom.blueMain,
              transition: 'width 0.3s ease-in-out',
              borderRadius: '1px',
            },
            '&:hover': {
              backgroundColor: alpha(theme.custom.blueMain, 0.08),
              transform: 'translateY(-1px)',
              '&::after': {
                width: 'calc(100% - 24px)', // Full width minus padding
              },
            },
          }}
        >
          {t(page.translationKey)}
        </Link>
      ))}
    </Box>
  );
});
