// src/scripts/uploadTextContent.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

// 🔐 Usá tus propios datos acá:
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
