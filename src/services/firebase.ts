// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getTextContent = async (lang: string) => {
  const q = query(
    collection(db, "textContent"),
    where("language", "==", lang)
  );
  const snapshot = await getDocs(q);
  const result: Record<string, any> = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    result[data.section] = data.content;
  });

  return result;
};
