// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBx_wvy8ezwzZGacaf5vqX9Mr1CnXCx9Mc",
    authDomain: "advtodo-72750.firebaseapp.com",
    projectId: "advtodo-72750",
    storageBucket: "advtodo-72750.firebasestorage.app",
    messagingSenderId: "878348718867",
    appId: "1:878348718867:web:1e6d62bd4f0cbff29200e6"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();