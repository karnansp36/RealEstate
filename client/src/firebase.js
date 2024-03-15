// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernstack-fe2bf.firebaseapp.com",
  projectId: "mernstack-fe2bf",
  storageBucket: "mernstack-fe2bf.appspot.com",
  messagingSenderId: "325975084064",
  appId: "1:325975084064:web:6dc02a7f74ee670e888045"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);