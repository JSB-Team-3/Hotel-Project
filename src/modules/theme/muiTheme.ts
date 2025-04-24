// muiTheme.ts
import { createTheme, PaletteMode, Theme } from '@mui/material';
import { getTokens } from './token';

export const getMuiTheme = (mode: PaletteMode, direction: 'ltr' | 'rtl' = 'ltr'): Theme => {
  const tokens = getTokens(mode);

  return createTheme({
    direction, // 👈 dynamic direction
    palette: {
      mode,
      primary: { main: tokens.primary },
      secondary: { main: tokens.secondary },
      background: {
        default: tokens.background.default,
        paper: tokens.background.paper,
      },
      text: {
        primary: tokens.text.primary,
        secondary: tokens.text.secondary,
      }
    },
    custom: {
      blueMain: tokens.blueMain,
      liteMain: tokens.liteMain,
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: tokens.background.paper,
            color: tokens.text.primary,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: tokens.primaryLight,
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            borderRadius: '8px',
            padding: '10px 12px',
            backgroundColor: tokens.background.paper,
            color: tokens.text.primary,
            '&:focus': {
              borderColor: tokens.primary,
              boxShadow: `0 0 0 0.2rem ${tokens.primaryLight}`,
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: tokens.primary,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: tokens.primaryLight,
            },
          },
        },
      }
    },
  });
};
