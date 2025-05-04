import React from 'react';
import { Box, Container, Grid, Typography, Link, useMediaQuery, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box component="footer" sx={{ 
      py: 3, 
      bgcolor: 'white',
      borderTop: '1px solid #eaeaea'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 2 : 4}>
          {/* Brand */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#4758E3',
                  mb: 1
                }}
              >
                Staycation.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                We kickstart your lovely holiday
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                instantly and memorable.
              </Typography>
            </Box>
          </Grid>

          {/* For Beginners */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography variant="subtitle2" sx={{  color: '#4758E3', fontWeight: 'bold', mb: 1 }}>
              For Beginners
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" underline="none" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.75rem' }}>
                New Account
              </Link>
              <Link href="#" underline="none" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.75rem' }}>
                Start Booking a Room
              </Link>
              <Link href="#" underline="none" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Use Payments
              </Link>
            </Box>
          </Grid>

          {/* Explore Us */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography variant="subtitle2" sx={{  color: '#4758E3', fontWeight: 'bold', mb: 1 }}>
              Explore Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" underline="none" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.75rem' }}>
                Our Careers
              </Link>
              <Link href="#" underline="none" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.75rem' }}>
                Privacy
              </Link>
              <Link href="#" underline="none" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Terms & Conditions
              </Link>
            </Box>
          </Grid>

          {/* Connect Us */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography variant="subtitle2" sx={{  color: '#4758E3', fontWeight: 'bold', mb: 1 }}>
              Connect Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" underline="none" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.75rem' }}>
                support@staycation.id
              </Link>
              <Link href="#" underline="none" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.75rem' }}>
                021 - 2208 - 1996
              </Link>
              <Link href="#" underline="none" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Staycation, Kemang, Jakarta
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Copyright 2019 • All rights reserved • Staycation
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;