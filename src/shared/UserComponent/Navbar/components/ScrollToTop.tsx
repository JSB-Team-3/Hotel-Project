import * as React from 'react';
import { Box, Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
export const ScrollToTop = React.memo(() => {
  // Use a custom scroll trigger implementation for better performance
  const [trigger, setTrigger] = React.useState(false);
  
  // Use throttled scroll event for more responsive appearance
  React.useEffect(() => {
    let ticking = false;
    let lastKnownScrollPosition = 0;
    
    const handleScroll = () => {
      lastKnownScrollPosition = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setTrigger(lastKnownScrollPosition > 300);
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Check initial scroll position
    setTrigger(window.scrollY > 300);
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Memoize the scroll handler to prevent unnecessary re-renders
  const scrollToTop = React.useCallback(() => {
    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }, []);

  return (
    <Zoom in={trigger}>
      <Box 
        role="presentation"
        onClick={scrollToTop}
        aria-label="scroll to top"
        sx={{ 
          position: 'fixed', 
          bottom: { xs: 12, sm: 16, md: 20 }, 
          right: { xs: 12, sm: 16, md: 20 }, 
          zIndex: 1000
        }}
      >
        <Fab 
          color="primary" 
          size="medium"
          aria-label="scroll to top"
          sx={{
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
            background: 'linear-gradient(45deg, #3252df 30%, #5b84ff 90%)',
            color: '#ffffff',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 4px 16px rgba(50, 82, 223, 0.45)',
              transform: 'translateY(-2px) scale(1.05)'
            },
            '&:active': {
              transform: 'translateY(0) scale(0.98)'
            }
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
});

// Ensure displayName is set for React DevTools
ScrollToTop.displayName = 'ScrollToTop';