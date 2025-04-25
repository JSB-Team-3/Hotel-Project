import React from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper and SwiperSlide
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

interface ImageCarouselProps {
  images?: string[];
  height?: number | string;
  width?: string | number;
  borderRadius?: number;
  showPlaceholder?: boolean;
  placeholderBackground?: string;
  placeholderText?: string;
  navigation?: boolean;
  pagination?: boolean;
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip';
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  spaceBetween?: number;
  slidesPerView?: number | 'auto';
}

/**
 * A reusable image carousel component built with Swiper
 */
const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images = [],
  height = 300,
  width = '100%',
  borderRadius = 1,
  showPlaceholder = true,
  placeholderBackground = 'rgba(255, 255, 255, 0.2)',
  placeholderText = 'No images available',
  navigation = true,
  pagination = true,
  effect = 'slide',
  loop = true,
  autoplay = false,
  autoplayDelay = 4000,
  spaceBetween = 0,
  slidesPerView = 1,
}) => {
  // No images to display
  if (images.length === 0 && showPlaceholder) {
    return (
      <Box
        sx={{
          height,
          width,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: placeholderBackground,
          borderRadius,
        }}
      >
        <Typography variant="body1" color="white">
          {placeholderText}
        </Typography>
      </Box>
    );
  }

  // Single image (no carousel needed)
  if (images.length === 1) {
    return (
      <Box
        component="img"
        src={images[0]}
        alt="Image"
        sx={{
          width,
          height,
          objectFit: 'cover',
          borderRadius,
        }}
      />
    );
  }

  // Custom styles for Swiper container and slides
  const containerStyle = {
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius * 8}px` : borderRadius,
    overflow: 'hidden',
    height: typeof height === 'number' ? `${height}px` : height,
    width: width,
  };

  // Configure pagination
  const paginationOptions = pagination ? {
    clickable: true,
    dynamicBullets: images.length > 5,
  } : false;

  // Configure autoplay
  const autoplayOptions = autoplay ? {
    delay: autoplayDelay,
    disableOnInteraction: false,
  } : false;

  return (
    <Box sx={containerStyle}>
      <Swiper
        modules={[Navigation]} // Add Navigation module
        spaceBetween={spaceBetween}  // Space between slides
        slidesPerView={slidesPerView}  // Number of slides to show at once
        onSlideChange={() => console.log('Slide changed')}  // Log slide change
        onSwiper={(swiper) => console.log(swiper)}  // Log Swiper instance
        navigation={navigation}
        pagination={paginationOptions}
        effect={effect}
        loop={loop}
        autoplay={autoplayOptions}
        style={{ width: '100%', height: '100%' }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={image}
              alt={`Image ${index + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageCarousel;
