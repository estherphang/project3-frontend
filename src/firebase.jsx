import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_SOME_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_SOME_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_SOME_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_SOME_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_SOME_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SOME_MESSAGINGSENDER_FIREBASE_ID,
  appId: import.meta.env.VITE_SOME_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);
