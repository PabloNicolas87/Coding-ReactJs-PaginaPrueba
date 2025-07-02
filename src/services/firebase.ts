// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD680P8vm3I-xirQ5Ylz5Aj2kF0r7TEtiw",
  authDomain: "paginaprueba-3ad6a.firebaseapp.com",
  projectId: "paginaprueba-3ad6a",
  storageBucket: "paginaprueba-3ad6a.firebasestorage.app",
  messagingSenderId: "235853664271",
  appId: "1:235853664271:web:7dd6097a2ac16c250c937a"
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
