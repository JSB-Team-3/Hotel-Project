import React, { memo, useMemo } from 'react';
import { Box, Container, Grid, Typography, Link, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Logo } from '../Logo/Logo';

const Footer = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const footerSections = useMemo(
    () => [
      {
        title: t('footer.for_beginners'),
        links: ['footer.new_account', 'footer.start_booking', 'footer.use_payments'],
      },
      {
        title: t('footer.explore_us'),
        links: ['footer.careers', 'footer.privacy', 'footer.terms'],
      },
      {
        title: t('footer.connect_us'),
        links: ['footer.email', 'footer.phone', 'footer.address'],
      },
    ],
    [t]
  );

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        bgcolor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 2 : 4}>
          {/* Brand */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Logo />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                {t('footer.kickstart')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                {t('footer.memorable')}
              </Typography>
            </Box>
          </Grid>

          {/* Sections */}
          {footerSections.map((section, idx) => (
            <Grid size={{ xs: 12, sm: 3 }} key={idx}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                  mb: 1,
                }}
              >
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {section.links.map((linkKey, index) => (
                  <Link
                    key={index}
                    href="#"
                    underline="none"
                    color="text.secondary"
                    sx={{ mb: index !== section.links.length - 1 ? 0.5 : 0, fontSize: '0.75rem' }}
                  >
                    {t(linkKey)}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Copyright */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            © 2019 • {t('footer.rights')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(Footer);
