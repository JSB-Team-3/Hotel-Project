import { useEffect, useMemo } from 'react';
import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { getMuiTheme } from './muiTheme';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/auth/AuthConfig';
import { setMode } from '../store/slices/themeSlice';

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (!saved) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setMode(prefersDark ? 'dark' : 'light'));
    }
  }, [dispatch]);

  useEffect(() => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {
      favicon.href = mode === 'dark' ? '/favicon-dark.ico' : '/favicon-light.ico';
    }
  }, [mode]);

  const theme = useMemo(() => createTheme(getMuiTheme(mode)), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
