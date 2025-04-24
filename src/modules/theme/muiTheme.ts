import { createTheme, PaletteMode, ThemeOptions } from '@mui/material';
import { getTokens } from './token';

export const getMuiTheme = (mode: PaletteMode): ThemeOptions => {
  const tokens = getTokens(mode);  // Get the correct tokens for the mode

  return createTheme({
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
      },
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'all 0.3s ease-in-out',
            backgroundColor: tokens.background.default,
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