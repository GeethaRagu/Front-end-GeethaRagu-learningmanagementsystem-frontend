// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "learning-management-syst-670d2.firebaseapp.com",
  projectId: "learning-management-syst-670d2",
  storageBucket: "learning-management-syst-670d2.appspot.com",
  messagingSenderId: "22033005904",
  appId: "1:22033005904:web:33af5f4d648e30ffe94055"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);