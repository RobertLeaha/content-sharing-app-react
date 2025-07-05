import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf0rfKwqkmgJuVwoH9v2EfoeWNHiY3KXs",
  authDomain: "content-sharing-app-react.firebaseapp.com",
  projectId: "content-sharing-app-react",
  storageBucket: "content-sharing-app-react.firebasestorage.app",
  messagingSenderId: "273191326820",
  appId: "1:273191326820:web:74813e2a1d048a29defb71",
  measurementId: "G-E7Q5CP63NX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
