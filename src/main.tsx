import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./Locales/i18n.ts";
import { SnackbarProvider } from 'notistack';
import { Provider } from "react-redux";
import { store } from "./store/auth/AuthConfig.ts";
// import theme from './modules/theme/theme.ts';
import { ToastContainer } from 'react-toastify';
import { AppThemeProvider } from './theme/ThemeProvider.tsx';


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>

      <AppThemeProvider>
         <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        <App />
      </SnackbarProvider>
          <ToastContainer />
        </AppThemeProvider>
    </Provider>
  </StrictMode>
);

