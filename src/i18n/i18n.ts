import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import headerES from "./locales/es/header.json";
import validationsES from "./locales/es/validations.json";

import headerEN from "./locales/en/header.json";
import validationsEN from "./locales/en/validations.json";

import headerFR from "./locales/fr/header.json";
import validationsFR from "./locales/fr/validations.json";

import headerDE from "./locales/de/header.json";
import validationsDE from "./locales/de/validations.json";

import headerRU from "./locales/ru/header.json";
import validationsRU from "./locales/ru/validations.json";

const resources = {
  es: {
    header: headerES,
    validations: validationsES,
  },
  en: {
    header: headerEN,
    validations: validationsEN,
  },
  fr: {
    header: headerFR,
    validations: validationsFR,
  },
  de: {
    header: headerDE,
    validations: validationsDE,
  },
  ru: {
    header: headerRU,
    validations: validationsRU,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    ns: ["header", "validations"],
    defaultNS: "header",
    interpolation: {
      escapeValue: false,
    },
  });

console.log(navigator.language);
console.log(i18n.language);

export default i18n;
