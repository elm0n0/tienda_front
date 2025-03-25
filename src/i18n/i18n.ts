import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import headerES from "./locales/es/header.json";
import headerEN from "./locales/en/header.json";
import headerFR from "./locales/fr/header.json";

const resources = {
  es: {
    header: headerES,
  },
  en: {
    header: headerEN,
  },
  fr: {
    header: headerFR,
  },
};

i18n
.use(LanguageDetector)
.use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["navigator", "localStorage", "cookie"],
      caches: ["localStorage", "cookie"],
    },
    ns: ["header"],
    defaultNS: "header",
    interpolation: {
      escapeValue: false,
    },
  });

console.log(navigator.language);
console.log(i18n.language);

export default i18n;
