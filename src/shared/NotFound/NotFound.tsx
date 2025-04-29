// NotFound.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExploreIcon from '@mui/icons-material/Explore';
import { useTranslation } from 'react-i18next'; // ADD THIS
import {
  NotFoundPageContainer,
  Overlay,
  CircleDecoration,
  DotGrid,
  ContentContainer,
  LogoContainer,
  ContentBox,
  ErrorImage,
  BlueButton,
  GradientHeading,
} from './NotFound.style';

import logo from '../../assets/nodata.png';
import error from '../../assets/error.png';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // ADD THIS
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBackToHome = () => navigate('/dashboard');

  return (
    <NotFoundPageContainer>
      <Overlay />

      {/* Decorations */}
      {[{ size: 200, left: "10%", top: "15%" }, { size: 300, left: "85%", top: "70%" }, { size: 150, left: "75%", top: "10%" }].map((circle, idx) => (
        <CircleDecoration key={idx} {...circle} />
      ))}
      {[{ left: "5%", top: "60%" }, { left: "80%", top: "30%" }].map((dot, idx) => (
        <DotGrid key={`dot-${idx}`} {...dot} />
      ))}

      <Container maxWidth="lg">
        <ContentContainer>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            
            <Grid size={{ xs: 12, md: 5, lg: 5 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <LogoContainer>
                <img src={logo} alt="logo" style={{ width: '120px', maxWidth: '160px', display: 'block' }} />
              </LogoContainer>

              <ContentBox>
                <GradientHeading variant="h1" sx={{ fontSize: { xs: '2rem', md: '4rem' }, mb: 2 }}>
                  {t('notFound.oops')}
                </GradientHeading>

                <Typography variant="h2" sx={{ fontWeight: 700, fontSize: { xs: '1.2rem', md: '2rem' }, mb: 2 }}>
                  {t('notFound.pageNotFound')}
                </Typography>

                <Typography variant="body1" sx={{ maxWidth: 400, opacity: 0.8, mb: 3 }}>
                  {t('notFound.description')}
                </Typography>

                <BlueButton
                  onClick={handleBackToHome}
                  variant="contained"
                  size={isMobile ? 'medium' : 'large'}
                  endIcon={<ExploreIcon />}
                >
                  {t('notFound.returnToDashboard')}
                </BlueButton>
              </ContentBox>
            </Grid>

            <Grid size={{ xs: 12, md: 7, lg: 6 }} sx={{ textAlign: 'center' }}>
              <ErrorImage src={error} alt="Error" />
            </Grid>

          </Grid>
        </ContentContainer>
      </Container>
    </NotFoundPageContainer>
  );
};

export default NotFound;
