// muiTheme.ts
import { createTheme } from '@mui/material/styles';
import { PaletteMode, ThemeOptions } from '@mui/material';

// Define the color tokens for both light and dark themes
export const getTokens = (mode: PaletteMode) => ({
  ...(mode === 'light'
    ? {
        primary: '#1976d2', // Light primary color (blue)
        primaryLight: '#4791db', // Light primary hover color
        primaryDark: '#1565c0', // Darker blue for focus
        secondary: '#9c27b0', // Purple
        secondaryLight: '#ba68c8', // Lighter secondary hover
        secondaryDark: '#7b1fa2',
        background: { default: '#f5f5f5', paper: '#ffffff' }, // Light background colors
        text: { primary: '#000', secondary: '#555' }, // Dark text on light mode
      }
    : {
        primary: '#90caf9', // Dark primary color (blue)
        primaryLight: '#c6d9f1', // Lighter primary hover color
        primaryDark: '#42a5f5', // Darker blue for focus
        secondary: '#ce93d8', // Light purple
        secondaryLight: '#f1b6ff', // Lighter secondary hover
        secondaryDark: '#9c64a6',
        background: { default: '#121212', paper: '#1e1e1e' }, // Dark background colors
        text: { primary: '#fff', secondary: '#aaa' }, // Light text on dark mode
      }),
});
