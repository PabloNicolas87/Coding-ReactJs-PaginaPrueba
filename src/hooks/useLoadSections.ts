import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

export interface Section {
  slug: string;
  label: string;
}

export const useLoadSections = (lang: string) => {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      const docRef = doc(db, "languages", lang);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSections(docSnap.data().sections || []);
      }
    };
    fetchSections();
  }, [lang]);

  return sections;
};