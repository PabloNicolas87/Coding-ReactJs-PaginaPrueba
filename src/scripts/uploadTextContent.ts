// src/scripts/uploadTextContent.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

// 🔐 Usá tus propios datos acá:
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

const data = [
  {
    id: "home_es",
    section: "home",
    language: "es",
    content: {
      title: "Hola!",
      description: "Soy Pablo",
    },
  },
  {
    id: "home_en",
    section: "home",
    language: "en",
    content: {
      title: "Hello!",
      description: "I'm Pablo",
    },
  },
  {
    id: "home_pt",
    section: "home",
    language: "pt",
    content: {
      title: "Olá!",
      description: "Sou o Pablo",
    },
  },
];

const upload = async () => {
  const colRef = collection(db, "textContent");
  for (const item of data) {
    await setDoc(doc(colRef, item.id), item);
    console.log(`✅ Documento ${item.id} subido`);
  }
};

upload();
