import { useState, memo } from 'react';
import { Box, Skeleton } from '@mui/material';

interface OptimizedImageProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
}

const OptimizedImage = ({ src, alt = 'Optimized Image', width = '60px', height = 'auto' }: OptimizedImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        borderRadius: '8px',
      }}
    >
      {/* Skeleton while loading */}
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '8px',
          }}
        />
      )}

      {/* Image */}
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleImageLoad}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          borderRadius: '8px',
          display: 'block',
        }}
      />
    </Box>
  );
};

export default memo(OptimizedImage);
