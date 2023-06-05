// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- Import Firestore here
import { getStorage } from "firebase/storage";

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGE_SENDER_ID,
  VITE_APP_ID,
  VITE_MEASURMENT_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGE_SENDER_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASURMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleAuth = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, googleAuth, db, storage };
