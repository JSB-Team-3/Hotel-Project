import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../src/modules/Locales/i18n.ts"; 
import { Provider } from "react-redux";
import { store } from "./modules/store/auth/AuthConfig.ts";
import { ThemeProvider } from '@mui/material';
import theme from './modules/theme/theme.ts';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
    </ThemeProvider>
  </StrictMode>
);
