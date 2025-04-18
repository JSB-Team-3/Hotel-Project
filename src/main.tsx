import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "../src/modules/Locales/i18n.ts"; 
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from "react-redux";
import { store } from "./modules/store/auth/AuthConfig.ts";
import { Snackbar } from '@mui/material';
import { SnackbarProvider } from 'notistack';


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <App />
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
