import { useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { getMuiTheme } from './muiTheme';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/auth/AuthConfig';
import { setMode } from '../store/slices/themeSlice';
import i18n from '../Locales/i18n'; // Import your i18n instance

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();
  
  // Manage theme direction (LTR or RTL)
  const [languageDirection, setLanguageDirection] = useState<'ltr' | 'rtl'>('ltr');

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

    // Initial check for direction
    handleLanguageChange();

    // Listen for language change
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange); // Clean up listener
    };
  }, []);

  // Create theme with the correct direction
  const theme = useMemo(() => 
    getMuiTheme(mode, languageDirection), 
    [mode, languageDirection]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};