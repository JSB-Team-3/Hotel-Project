import { createTheme, PaletteMode, Theme } from '@mui/material';
import { getTokens } from './token';

export const getMuiTheme = (mode: PaletteMode, direction: 'ltr' | 'rtl' = 'ltr'): Theme => {
  const tokens = getTokens(mode);

  return createTheme({
    direction,
    palette: {
      mode,
      primary: {
        main: tokens.primary,
        light: tokens.primaryLight,
        dark: tokens.primaryDark
      },
      secondary: {
        main: tokens.secondary,
        light: tokens.secondaryLight,
        dark: tokens.secondaryDark
      },
      error: {
        main: tokens.errorMain
      },
      background: {
        default: tokens.background.default,
        paper: tokens.background.paper,
      },
      text: {
        primary: tokens.text.primary,
        secondary: tokens.text.secondary,
      },
      // You can extend this properly with module augmentation if needed
      // custom keys like commentFormTitle/sendButtonHover are NOT allowed here unless extended
    },
    // Instead, define custom tokens here under a custom key
    custom: {
      primaryCard:tokens.primaryCard,
      tableBg:tokens.tableBg,
      blueMain: tokens.blueMain,
      liteMain: tokens.liteMain,
      primaryLight: tokens.primaryLightActive,
      activeBreadcrumb: tokens.activeBreadcrumb,
      inactiveBreadcrumb: tokens.inactiveBreadcrumb,
      darkblue: tokens.darkblue,
      errorMain: tokens.errorMain,
      commentFormTitle: '#3f51b5',
      sendButtonHover: '#5c6bc0',
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
      h1: { fontWeight: 700, color: tokens.text.primary },
      h2: { fontWeight: 700, color: tokens.text.primary },
      h3: { fontWeight: 600, color: tokens.text.primary },
      h4: { fontWeight: 600, color: tokens.text.primary },
      h5: { fontWeight: 600, color: tokens.text.primary },
      h6: { fontWeight: 600, color: tokens.text.primary },
      subtitle1: { fontWeight: 500 },
      subtitle2: { fontWeight: 500 },
      body1: { fontSize: '1rem' },
      body2: { fontSize: '0.875rem' },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: tokens.primaryLight,
              transform: 'translateY(-2px)',
              transition: 'transform 0.2s ease',
            },
          },
          contained: {
            boxShadow: `0 4px 10px rgba(${mode === 'dark' ? '80, 114, 223' : '50, 82, 223'}, 0.3)`,
          },
          outlined: {
            borderWidth: '1px',
            borderColor: tokens.primary,
            color: tokens.primary,
            '&:hover': {
              borderColor: tokens.primaryLight,
              color: tokens.primaryLight,
            },
          },
        },
      },
    },
  });
};
