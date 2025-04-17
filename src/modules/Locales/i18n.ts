import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './en/translation.json';
import translationAR from './ar/translation.json';

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false, // Set to false for production
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // No need for escaping in React
    },
    resources,
    react: {
      useSuspense: false, // Disable suspense to improve performance
    },
  });

// Save language preference and update the direction
export const changeLanguage = (lng: string) => {
  // Change the language
  i18n.changeLanguage(lng);

  // Save the language to localStorage for persistence
  localStorage.setItem('language', lng);

  // Set text direction for RTL or LTR based on language
  const direction = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', direction);
};

// Load the language from localStorage on initial load
const storedLanguage = localStorage.getItem('language') || 'en';
changeLanguage(storedLanguage);

export default i18n;
