import { PaletteMode } from '@mui/material';

// Define the color tokens for both light and dark themes
export const getTokens = (mode: PaletteMode) => ({
  ...(mode === 'light'
    ? {
        primary: '#1976d2',
        primaryLight: '#4791db',
        primaryLightActive: '#f0f7ff',
        primaryDark: '#1565c0',
        secondary: '#9c27b0',
        secondaryLight: '#ba68c8',
        secondaryDark: '#7b1fa2',
        blueMain:"#3061c8",
        liteMain:"#fff",
        background: { default: '#f5f5f5', paper: '#ffffff' },
        text: { primary: '#000', secondary: '#555' },
        activeBreadcrumb: '#152C5B',
        inactiveBreadcrumb: '#B0B0B0',
      }
    : {
        primary: '#90caf9',
        primaryLight: '#c6d9f1',
        primaryLightActive: '#c6d9f1',
        primaryDark: '#42a5f5',
        secondary: '#ce93d8',
        secondaryLight: '#f1b6ff',
        secondaryDark: '#9c64a6',
        blueMain:"#111212",
        liteMain:"#fff",
        background: { default: '#121212', paper: '#1e1e1e' },
        text: { primary: '#fff', secondary: '#aaa' },
        activeBreadcrumb: '#FFFFFF',
        inactiveBreadcrumb: '#888888',
      }),
});

