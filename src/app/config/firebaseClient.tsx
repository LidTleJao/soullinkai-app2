// ใช้ config จาก Firebase Console (Project settings > General > Your apps > SDK setup)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHpc6-trtp3ZjTvrWApR1UYrtDYVU59FM",
  authDomain: "website-soullinkai.firebaseapp.com",
  projectId: "website-soullinkai",
  storageBucket: "website-soullinkai.firebasestorage.app",
  messagingSenderId: "900739891617",
  appId: "1:900739891617:web:026958a61d5ee9c0278be0",
  measurementId: "G-HDCK7JSWLS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
