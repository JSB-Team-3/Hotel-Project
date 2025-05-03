import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Grid, Dialog, IconButton, Box, useMediaQuery, useTheme, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import OptimizedImage from '../../OptimizedImage/OptimizedImage';

type RoomGalleryProps = {
  images: string[];
  collageStyle?: 'horizontal' | 'mixed';
};

const RoomGallery: React.FC<RoomGalleryProps> = ({ images = [], collageStyle = 'mixed' }) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const slideRefs = useRef<(HTMLImageElement | null)[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    slideRefs.current = Array(images.length).fill(null).map((_, i) => slideRefs.current[i] || null);
  }, [images.length]);

  const handleOpen = useCallback((index: number) => {
    setActiveIndex(index);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setIsZoomed(false);
  }, []);

  const navigateSlide = useCallback((direction: 'next' | 'prev') => {
    let newIndex;
    if (direction === 'next') {
      newIndex = activeIndex + 1 >= images.length ? 0 : activeIndex + 1;
    } else {
      newIndex = activeIndex - 1 < 0 ? images.length - 1 : activeIndex - 1;
    }
    setActiveIndex(newIndex);
    setIsZoomed(false);
  }, [activeIndex, images.length]);

  const toggleZoom = useCallback(() => {
    setIsZoomed(prev => !prev);
  }, []);

  const renderCollageItem = useCallback((imageUrl: string, index: number, height: string | number) => (
    <Paper
      key={index}
      elevation={2}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 1,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        height,
        '&:hover': {
          transform: 'scale(1.008)',
          boxShadow: theme.shadows[4],
        }
      }}
      onClick={() => handleOpen(index)}
    >
      <OptimizedImage
        src={imageUrl}
        alt={`Room View ${index + 1}`}
        width="100%"
        height="100%"
      />
    </Paper>
  ), [handleOpen, theme.shadows]);

  const renderCollageLayout = useCallback(() => {
    if (collageStyle === 'horizontal') {
      return (
        <Grid container spacing={1.5} sx={{ mb: 4 }}>
          {images.slice(0, 3).map((image, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              {renderCollageItem(image, index, 240)}
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={1.5} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            {renderCollageItem(images[0], 0, 310)}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={1.5} direction={{ xs: 'row', md: 'column' }}>
              <Grid size={{ xs: 6, md: 12 }}>
                {renderCollageItem(images[1] || images[0], 1, 150)}
              </Grid>
              <Grid size={{ xs: 6, md: 12 }}>
                {images.length > 2
                  ? renderCollageItem(images[2], 2, 150)
                  : renderCollageItem(images[0], 0, 100)}
              </Grid>
            </Grid>
          </Grid>
          {images.length > 3 && (
            <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
              {images.slice(3, 6).map((image, index) => (
                <Grid size={{ xs: 6, md: 4 }} key={index + 3}>
                  {renderCollageItem(image, index + 3, 200)}
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      );
    }
  }, [collageStyle, images, renderCollageItem]);

  const renderModal = useCallback(() => (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={isMobile}
      maxWidth="lg"
      PaperProps={{
        sx: {
          bgcolor: 'rgb(18, 18, 18)',
          m: { xs: 1, sm: 2, md: 3 },
          position: 'relative',
          width: '100%',
          height: '90vh',
          boxShadow: 24,
          overflowY: 'hidden'
        }
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
          color: 'white',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <CloseIcon />
      </IconButton>
      <IconButton
        onClick={() => navigateSlide('prev')}
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          color: 'white',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <NavigateBeforeIcon sx={{ fontSize: 36 }} />
      </IconButton>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isZoomed ? 'zoom-out' : 'zoom-in',
        }}
        onClick={toggleZoom}
      >
        <img
          src={images[activeIndex]}
          alt={`Gallery image ${activeIndex + 1}`}
          ref={(el) => { slideRefs.current[activeIndex] = el; }}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            transition: 'transform 0.3s ease',
            transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
          }}
        />
      </Box>
      <IconButton
        onClick={() => navigateSlide('next')}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          color: 'white',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <NavigateNextIcon sx={{ fontSize: 36 }} />
      </IconButton>
      <Box sx={{
        position: 'absolute',
        bottom: 24,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: 1,
        zIndex: 10,
      }}>
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setIsZoomed(false);
            }}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              transition: 'all 0.3s',
              bgcolor: index === activeIndex ? 'white' : 'grey.500',
              transform: index === activeIndex ? 'scale(1.25)' : 'scale(1)',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: index === activeIndex ? 'white' : 'grey.300',
              },
            }}
          />
        ))}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          px: 2,
          py: 0.5,
          borderRadius: 4,
          fontSize: 14,
        }}
      >
        {activeIndex + 1} / {images.length}
      </Box>
    </Dialog>
  ), [open, isMobile, handleClose, navigateSlide, images, activeIndex, isZoomed, toggleZoom]);

  // ✅ Return JSX after all hooks
  if (images.length === 0) {
    return (
      <Box p={4} textAlign="center" color="text.secondary">
        No images available
      </Box>
    );
  }

  return (
    <>
      {renderCollageLayout()}
      {renderModal()}
    </>
  );
};

export default RoomGallery;
