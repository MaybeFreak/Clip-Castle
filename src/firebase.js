// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const {
  VITE_API_KEY,
  VITE_MESSAGE_SENDER_ID,
  VITE_APP_ID,
  VITE_MEASURMENT_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: "clip-castle.firebaseapp.com",
  projectId: "clip-castle",
  storageBucket: "clip-castle.appspot.com",
  messagingSenderId: VITE_MESSAGE_SENDER_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASURMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleAuth = new GoogleAuthProvider();

export { app, analytics, auth, googleAuth };
