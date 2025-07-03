import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export interface LanguageOption {
  code: string;
  label: string;
}

export const useLoadLanguageOptions = () => {
  const [languages, setLanguages] = useState<LanguageOption[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const snapshot = await getDocs(collection(db, "languages"));
      const langs = snapshot.docs.map(doc => ({
        code: doc.id,
        label: doc.data().label,
      }));
      setLanguages(langs);
    };
    fetchLanguages();
  }, []);

  return languages;
};