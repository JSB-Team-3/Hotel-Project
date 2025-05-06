import React, { useEffect, useState, useMemo, useCallback, memo, Suspense } from 'react';
import { Box, Grid, Typography, useTheme, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Lazy load components
const LazyRoomCardItem = React.lazy(() => import('../../../shared/RoomCardItem/RoomCardItem'));
const LazyRoomCardSkeleton = React.lazy(() => import('../../../shared/UserComponent/Skelletons/RoomCardSkelleton'));

import { PORTAL_ADS_URLS, PORTAL_ROOMS_URLS } from '../../../services/api/apiConfig';
import { privateAxiosInstance } from '../../../services/api/apiInstance';
import { AdDataProps } from '../../../Interfaces/ads.interfaces';
import { RoomDataProps } from '../../../Interfaces/rooms.interface';
import { HeroSectionProps, MainAdsGridProps, SectionTitleProps, StateDataType } from '../../../Interfaces/landing.interface';
import BookingBox from '../../../shared/BookingBox/BookingBox';
import TestimonialSlider from '../../../shared/TestimonialSlider/TestimonialSlider';


// Hero section component optimized with proper types
const HeroSection = memo(({ primaryColor, secondaryTextColor, borderColor, currentImage, t }: HeroSectionProps) => (
  <Grid
    container
    alignItems="center"
    direction={{ xs: 'column-reverse', md: 'row' }}
    justifyContent={{ xs: 'center', md: 'space-between' }}
  >
    <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h3"
        gutterBottom
        fontSize={{ xs: 36, md: 50 }}
        color={primaryColor}
        letterSpacing={1}
        fontWeight={600}
        maxWidth="600px"
        sx={{ mx: { xs: 'auto', md: 0 } }}
      >
        {t('landing_page.Forget Busy Work,Start Next Vacation')}
      </Typography>
      <Typography variant="body1" color={secondaryTextColor} width="100%">
        {t(
          'landing_page.We provide what you need to enjoy your holiday with family.Time to make another memorable moments.'
        )}
      </Typography>
        <BookingBox />
    </Grid>

    <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: 'center' }}>
      <Box
        component="img"
        src={currentImage}
        alt="Room Booking"
        loading="lazy"
        sx={{
          width: { xs: '100%', sm: 400, md: 450 },
          height: { xs: 250, sm: 400, md: 500 },
          objectFit: 'cover',
          mx: { xs: 'auto', md: 0 },
          borderRadius: '5rem 1rem 1rem 1rem',
          border: `5px solid ${borderColor}`,
          mb: '20px',
          padding: '10px',
        }}
      />
    </Grid>
  </Grid>
));

// Section title component
const SectionTitle = memo(({ title, theme, t, loading }: SectionTitleProps) => (
  <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '2rem', mb: '1rem' }}>
    {loading ? (
      <Skeleton variant="text" width="50%" height={40} animation="wave" />
    ) : (
      <Typography variant="h4">{title}</Typography>
    )}
    {loading ? (
      <Skeleton variant="text" width={80} height={28} animation="wave" />
    ) : (
      <Link
        to="/explore"
        style={{
          textDecoration: 'none',
          color: theme.palette.error.main || 'red',
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        {t('landing_page.more')}
      </Link>
    )}
  </Grid>
));

// Main ads grid component optimized
const MainAdsGrid = memo(({ loading, addsGroup, ads }: MainAdsGridProps) => (
  <Grid container spacing={2}>
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        gap: 2,
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box sx={{ flex: 1 }}>
        {loading ? (
            <LazyRoomCardSkeleton height={{ xs: 300, md: 400 }} />
        ) : addsGroup[0] ? (
          <Suspense fallback={<LazyRoomCardSkeleton height={{ xs: 300, md: 400 }} />}>
            <LazyRoomCardItem
              image={addsGroup[0]?.images?.[0] || ''}
              title={addsGroup[0]?.roomNumber || 'No Title'}
              price={addsGroup[0]?.price || 0}
              width="100%"
              height={{ xs: 300, md: 400 }}
              id={addsGroup[0]?._id || ''}
            />
          </Suspense>
        ) : (
          <Box
            sx={{
              height: { xs: 300, md: 400 },
              width: '100%',
              borderRadius: '15px',
              bgcolor: 'rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>No data available</Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 2,
        }}
      >
        {loading
          ? Array(4)
              .fill(0)
              .map((_,idx ) => (
                  <LazyRoomCardSkeleton height={{ xs: 150, sm: 190 }} key={idx} />
              ))
          : ads.slice(1, 5).map((ad, index) => (
              <Suspense key={ad?._id || index} fallback={<LazyRoomCardSkeleton height={{ xs: 300, md: 400 }} />}>
                <LazyRoomCardItem
                  key={ad?._id || index}
                  image={ad?.images?.[0] || ''}
                  title={ad?.roomNumber || 'No Title'}
                  price={ad?.price || 0}
                  width="100%"
                  height={{ xs: 150, sm: 190 }}
                  id={ad?._id || ''}
                />
              </Suspense>
            ))}
      </Box>
    </Box>
  </Grid>
));

// Preload hero images
const preloadImages = (urls: string[]) => {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

// Main LandingPage Component
const LandingPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  // State with proper typing
  const [state, setState] = useState<StateDataType>({
    ads: [],
    rooms: [],
    loading: true,
    addsGroup: [],
  });

  // Using a default image to prevent undefined errors
  const defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  const [currentImage, setCurrentImage] = useState<string>(defaultImage);
  const [heroImages, setHeroImages] = useState<string[]>([defaultImage]);

  const { ads, rooms, loading, addsGroup } = state;

  const primaryColor = theme.palette.primary?.main || '#152C5B';
  const secondaryTextColor = theme.palette.text?.secondary || 'gray';
  const borderColor = theme.palette.primary?.dark || primaryColor;

  // Load hero images
  useEffect(() => {
    const loadImages = async () => {
      try {
        const img1Module = await import('../../../assets/images/image 3.png');
        const img2Module = await import('../../../assets/images/_.jpeg');
        const img3Module = await import('../../../assets/images/_ (1).jpeg');
        
        const images = [img1Module.default, img2Module.default, img3Module.default];
        setHeroImages(images);
        setCurrentImage(images[0]);
        preloadImages(images);
      } catch (error) {
        console.error('Failed to load images:', error);
      }
    };
    
    loadImages();
  }, []);

  // Image rotation effect
  useEffect(() => {
    if (heroImages.length <= 1) return;
    
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % heroImages.length;
      setCurrentImage(heroImages[index]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [heroImages]);

  // Data fetching with proper error handling and AbortController for cleanup
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    
    const fetchData = async () => {
      try {
        const [adsResponse, roomsResponse] = await Promise.all([
          privateAxiosInstance.get(PORTAL_ADS_URLS.GET_ADS, { signal }),
          privateAxiosInstance.get(PORTAL_ROOMS_URLS.GET_ALL_ROOMS_ALL, { signal }),
        ]);

        if (signal.aborted) return;

        const adsData: AdDataProps[] = adsResponse.data.data.ads;
        const roomsData: RoomDataProps[] = roomsResponse.data.data.rooms;
        
        // Safely map data with type checking
        const adsRooms: RoomDataProps[] =adsData && adsData
          .filter(item => item?.room)
          .map((item: AdDataProps) => item.room );

        setState({
          ads: adsRooms,
          rooms: roomsData || [],
          addsGroup: adsRooms,
          loading: false,
        });
      } catch (error) {
        if (!signal.aborted) {
          console.error('Error fetching data:', error);
          setState(prev => ({ ...prev, loading: false }));
        }
      }
    };

    fetchData();
    
    return () => {
      abortController.abort();
    };
  }, []);

  // Memoize section configurations to prevent unnecessary re-renders
  const sectionConfigs = useMemo(
    () => [
      {
        title: t('landing_page.Houses with beauty backyard'),
        getItems: () => rooms.slice(0, 4),
      },
      {
        title: t('landing_page.Hotels with large living room'),
        getItems: () => rooms.slice(4, 8),
      },
      {
        title: t('landing_page.ads'),
        getItems: () => ads.slice(4, 8),
      },
    ],
    [rooms, ads, t]
  );

  // Memoize skeleton renderer to prevent unnecessary re-renders
  const renderSkeletons = useCallback(
    () => (
      <Box sx={{ display: 'flex', gap: 2, width: '100%', overflowX: 'auto' }}>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Box key={`skeleton-${i}`} sx={{ minWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' }}}>
              <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={215} />}>
                <LazyRoomCardSkeleton height={215} />
              </Suspense>
            </Box>
          ))}
      </Box>
    ),
    []
  );

  return (
    <Box>
      <HeroSection
        primaryColor={primaryColor}
        secondaryTextColor={secondaryTextColor}
        borderColor={borderColor}
        currentImage={currentImage}
        t={t}
      />

      <SectionTitle title={t('landing_page.most_popular')} theme={theme} t={t} loading={loading} />
      <MainAdsGrid loading={loading} addsGroup={addsGroup} ads={ads} />

      {sectionConfigs.map((section, i) => (
        <React.Fragment key={i}>
          <SectionTitle title={section.title} theme={theme} t={t} loading={loading} />
          {loading ? (
            renderSkeletons()
          ) : (
            <Grid container spacing={2}>
              {section.getItems().map((item, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }}  key={`${item._id || 'item'}-${idx}`}>
                  <Suspense fallback={ <LazyRoomCardSkeleton height={{ xs: 300, md: 400 }}  />}>
                    <LazyRoomCardItem
                      image={item.images?.[0] || ''}
                      title={item.roomNumber || 'No Title'}
                      price={item.price || 0}
                      width="100%"
                      height={215}
                      id={item._id || ''}
                    />
                  </Suspense>
                </Grid>
              ))}
            </Grid>
          )}
        </React.Fragment>
      ))}

        <TestimonialSlider />
    </Box>
  );
};

export default memo(LandingPage);