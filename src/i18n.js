import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation files - import them directly to avoid async loading issues
import enTranslations from "./locales/en.json";
import hiTranslations from "./locales/hi.json";
import arabicTranslation from "./locales/ar.json";

// Define resources object with translations
const resources = {
  en: {
    translation: enTranslations,
  },
  hi: {
    translation: hiTranslations,
  },
  ar: {
    translation: arabicTranslation,
  },
};

// Initialize i18next with synchronous configuration
const initPromise = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // if another language fails, English will display
    debug: false,

    // Ensure synchronous initialization
    initImmediate: false,

    // Load translations synchronously
    load: "languageOnly",

    // Allow empty values to fallback to fallback language
    returnEmptyString: false,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "language",
      caches: ["localStorage"],
    },

    react: {
      useSuspense: false, // Disable suspense to avoid React context issues
    },
  });

// Export both the i18n instance and the initialization promise
export { initPromise };

export default i18n;
