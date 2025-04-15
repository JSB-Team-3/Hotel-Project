
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from "./en/translation.json";
import translationAR from "./ar/translation.json";
const resources = {
    en: { translation: translationEN },
    ar: { translation: translationAR },
  }

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources
  });

export default i18n;

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  document.dir = lng === "ar" ? "rtl" : "ltr";
};