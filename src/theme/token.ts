// muiTheme.ts
import { PaletteMode } from '@mui/material';
// Define the color tokens for both light and dark themes with added custom colors
export const getTokens = (mode: PaletteMode) => ({
  ...(mode === 'light'
    ? {
        // Base theme colors
        primary: '#3252DF', // Blue from original code
        primaryLight: '#5172DF', // Light primary (from gradient)
        primaryLightActive: '#f0f7ff',
        primaryDark: '#2540B8', // Darker blue for focus
        secondary: '#FF498B', // Pink from original code
        secondaryLight: '#FF6B9D', // Lighter secondary (from gradient)
        secondaryDark: '#E13570',
        
        // Custom colors from original code
        blueMain: "#3252DF",
        liteMain: "#fff",
        darkblue: "#152C5B",
        
        // Additional custom colors
        errorMain: "#FF498B", // Using secondary as error for consistency
        
        // Background and text colors
        background: { default: '#f5f5f5', paper: '#ffffff'},
        text: { primary: '#152C5B', secondary: '#757575' },
      }
    : {
        // Dark mode colors
        primary: '#5172DF', // Lighter blue for dark mode
        primaryLight: '#7290FF',
        primaryLightActive: '#323B60',
        primaryDark: '#3252DF',
        secondary: '#FF6B9D', // Lighter pink for dark mode
        secondaryLight: '#FF8EB7',
        secondaryDark: '#FF498B',
        
        // Custom colors in dark mode
        blueMain: "#5172DF",
        liteMain: "#fff",
        darkblue: "#fff", // Text is white in dark mode
        
        // Additional custom colors
        errorMain: "#FF6B9D",
        
        // Background and text colors
        background: { default: '#121212', paper: '#1E1E1E' },
        text: { primary: '#fff', secondary: '#B0B0B0' },
      }),
});