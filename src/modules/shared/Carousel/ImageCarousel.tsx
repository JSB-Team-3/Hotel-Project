
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ImageCarouselProps } from '../../../Interfaces/carousel.interface';

import 'swiper/swiper-bundle.css';

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images = [],
  height = 400,
  width = '100%',
  borderRadius = 1,
  showPlaceholder = true,
  placeholderBackground = 'rgba(255, 255, 255, 0.2)',
  placeholderText = 'No images available',
}) => {
  const [carouselImages] = useState<string[]>(images);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (carouselImages.length === 0 && showPlaceholder) {
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

  return (
    <Box sx={{ width, borderRadius, overflow: 'hidden' }}>
      {/* Main Carousel */}
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
        } as React.CSSProperties}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {carouselImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ width: '100%', height }}>
              <Box
                component="img"
                src={image}
                alt={`Image ${index + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius,
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Carousel */}
      <Swiper
  onSwiper={setThumbsSwiper}
  loop={false}
  spaceBetween={8 }
  slidesPerView={5} // Increase this for tighter thumbnails
  freeMode={true}
  watchSlidesProgress={true}
  modules={[FreeMode, Navigation, Thumbs]}
  className="mySwiper"
  style={{ marginTop: '10px' }}
>
  {carouselImages.map((image, index) => {
    const isActive = index === activeIndex;
    return (
      <SwiperSlide key={`thumb-${index}`} style={{ padding: 0 }}>
        <Box
          sx={{
            width: '100%', // Let Swiper control the size
            height: 70,
            border: isActive ? '2px solid #b5c8db' : 'none',
            borderRadius,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={image}
            alt={`Thumb ${index + 1}`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: isActive ? 'none' : 'brightness(50%)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
          />
        </Box>
      </SwiperSlide>
    );
  })}
</Swiper>


    </Box>
  );
};

export default ImageCarousel;
