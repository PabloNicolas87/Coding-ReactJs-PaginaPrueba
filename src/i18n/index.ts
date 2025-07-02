// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es: { translation: {} }, // vacíos por ahora
      en: { translation: {} },
      pt: { translation: {} },
    },
  });

export default i18n;
