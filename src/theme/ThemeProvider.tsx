import { useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider, Box } from '@mui/material';
import { getMuiTheme } from './muiTheme';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/auth/AuthConfig';
import { setMode } from '../store/slices/themeSlice';
import i18n from '../Locales/i18n'; // Import your i18n instance
import LoadingScreen from '../shared/LoadingScreen/LoadingScreen';

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  // Manage theme direction (LTR or RTL)
  const [languageDirection, setLanguageDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (!saved) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setMode(prefersDark ? 'dark' : 'light'));
    }
  }, [dispatch]);

  // Listen for language change and update direction
  useEffect(() => {
    const handleLanguageChange = () => {
      const dir = i18n.dir(); // Get direction from i18next
      setLanguageDirection(dir as 'ltr' | 'rtl'); // Update the direction state
    };

    const handleLanguageChanging = () => {
      setLoading(true); // Show loading screen when language change starts
    };

    // Initial check for direction
    handleLanguageChange();

    // Listen for language change and language changing events
    i18n.on('languageChanged', handleLanguageChange);
    i18n.on('languageChanging', handleLanguageChanging);

    return () => {
      i18n.off('languageChanged', handleLanguageChange); // Clean up listener
      i18n.off('languageChanging', handleLanguageChanging); // Clean up listener
    };
  }, []);

  // After language change, simulate delay before hiding the loading screen
  useEffect(() => {
    if (loading) {
      // Use setTimeout to wait for a few seconds to simulate the loading effect
      const timer = setTimeout(() => {
        setLoading(false); // Hide loading screen after delay
      }, 500); // Adjust the delay as needed

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [loading]);

  // Create theme with the correct direction
  const theme = useMemo(() => 
    getMuiTheme(mode, languageDirection), 
    [mode, languageDirection]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <LoadingScreen fullScreen={true} />
        </Box>
      ) : (
        children
      )}
    </MuiThemeProvider>
  );
};
