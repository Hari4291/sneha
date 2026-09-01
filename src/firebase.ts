import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC9bvmCoZfSxuHBeRDLjaRMauffaTF0Uis",
  authDomain: "sneha-34f05.firebaseapp.com",
  databaseURL: "https://sneha-34f05-default-rtdb.firebaseio.com",
  projectId: "sneha-34f05",
  storageBucket: "sneha-34f05.firebasestorage.app",
  messagingSenderId: "287677422054",
  appId: "1:287677422054:web:5e8e8bd07a6f283d461e27",
  measurementId: "G-8TQ4603LER"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Realtime Database
export const rtdb = getDatabase(app);

// Initialize Analytics if supported in environment
export let analytics: ReturnType<typeof getAnalytics> | null = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});
