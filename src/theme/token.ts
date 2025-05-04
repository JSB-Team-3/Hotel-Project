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
        darkblue:"#152C5B",

      }
    : {
        primary: '#90caf9',
        primaryLight: '#c6d9f1',
        primaryLightActive: '#c6d9f1',
        primaryDark: '#42a5f5',
        secondary: '#ce93d8',
        secondaryLight: '#f1b6ff',
        secondaryDark: '#9c64a6',
        blueMain:"#3061c8",
        liteMain:"#fff",
        background: { default: '#121212', paper: '#1e1e1e' },
        text: { primary: '#fff', secondary: '#aaa' },
        activeBreadcrumb: '#FFFFFF',
        inactiveBreadcrumb: '#888888',
        darkblue:"#fff",

      }),
});

