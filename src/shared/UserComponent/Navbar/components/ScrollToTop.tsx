import * as React from 'react';
import { Box, Fab, Slide, useScrollTrigger, useTheme } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const ScrollToTop = React.memo(() => {
  const trigger = useScrollTrigger({ threshold: 300 });
  const theme = useTheme();

  const scrollToTop = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Slide in={trigger} direction="up">
      <Box 
        onClick={scrollToTop} 
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16, 
          zIndex: 1000 
        }}
      >
        <Fab 
          color="primary" 
          size="medium" 
          aria-label="scroll to top"
          sx={{
            color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.white,
            background: theme.palette.mode === 'dark' 
              ? `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)` 
              : `linear-gradient(45deg, ${theme.custom.blueMain} 30%, ${theme.palette.primary.light} 90%)`,
            '&:hover': {
              boxShadow: '0 4px 8px rgba(50, 82, 223, 0.4)',
              transform: 'translateY(-1px)'
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Slide>
  );
});