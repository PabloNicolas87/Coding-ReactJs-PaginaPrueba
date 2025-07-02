import { useEffect } from "react";
import { getTextContent } from "../services/firebase";
import i18n from "../i18n";

export const useLoadTranslations = (lang: string) => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTextContent(lang);
      console.log("✅ Traducciones cargadas desde Firebase:", data);
      i18n.addResourceBundle(lang, 'translation', data, true, true);
      console.log("🌐 Idioma actual de i18n:", i18n.language);
      i18n.changeLanguage(lang);
    };
    fetchData();
  }, [lang]);
};
