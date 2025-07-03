import { useEffect } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import i18n from "../i18n";
import { useDispatch } from "react-redux";
import { setLanguageLoading } from "../features/language/languageSlice";

export const useLoadTranslations = (lang: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTranslations = async () => {
      dispatch(setLanguageLoading(true));
      const docRef = doc(db, "languages", lang);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        i18n.addResourceBundle(lang, "translation", data, true, true);
        i18n.changeLanguage(lang);
      }
      dispatch(setLanguageLoading(false));
    };
    fetchTranslations();
  }, [lang]);
};
