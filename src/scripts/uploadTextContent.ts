import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

// 🔐 Usá tus propios datos acá:
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY!,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.VITE_FIREBASE_APP_ID!,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Traducciones unificadas por idioma
const translations = {
  es: {
    home: {
      title: "¡Hola!",
      description: "Soy Pablo"
    },
    theme: {
      light: "Claro",
      dark: "Oscuro"
    },
    language: {
      label: "Idioma"
    },
    languageOptions: {
      es: "Español",
      en: "Inglés",
      pt: "Portugués"
    }
  },
  en: {
    home: {
      title: "Hello!",
      description: "I'm Pablo"
    },
    theme: {
      light: "Light",
      dark: "Dark"
    },
    language: {
      label: "Language"
    },
    languageOptions: {
      es: "Spanish",
      en: "English",
      pt: "Portuguese"
    }
  },
  pt: {
    home: {
      title: "Olá!",
      description: "Sou o Pablo"
    },
    theme: {
      light: "Claro",
      dark: "Escuro"
    },
    language: {
      label: "Idioma"
    },
    languageOptions: {
      es: "Espanhol",
      en: "Inglês",
      pt: "Português"
    }
  }
};

async function uploadLanguagesNested() {
  for (const [lang, data] of Object.entries(translations)) {
    const ref = doc(db, "languages", lang);
    console.log(`🟡 Subiendo traducciones para ${lang}...`);
    await setDoc(ref, data);
    console.log(`✅ ${lang} subido correctamente`);
  }
}

uploadLanguagesNested()
  .then(() => console.log("🎉 Todos los idiomas fueron subidos a Firestore"))
  .catch((err) => console.error("❌ Error subiendo idiomas", err));
