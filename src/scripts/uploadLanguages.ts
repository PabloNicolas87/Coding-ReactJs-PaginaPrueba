import { config } from "dotenv";
config({ path: ".env" }); // 👈 importante: especificar el path si no es .env

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const languages = {
  es: { label: "Español" },
  en: { label: "Inglés" },
  pt: { label: "Portugués" },
};

async function uploadLanguages() {
  for (const [code, data] of Object.entries(languages)) {
    const ref = doc(db, "languages", code);
    await setDoc(ref, data);
    console.log(`✅ Subido ${code}: ${data.label}`);
  }
}

uploadLanguages()
  .then(() => console.log("✅ Todos los idiomas fueron subidos"))
  .catch((err) => console.error("❌ Error subiendo idiomas", err));
