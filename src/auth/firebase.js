// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXX43fGu7jSGuT-fdv00LcH-Ds6dPpOr0",
  authDomain: "codeit-49c2d.firebaseapp.com",
  projectId: "codeit-49c2d",
  storageBucket: "codeit-49c2d.firebasestorage.app",
  messagingSenderId: "44741109007",
  appId: "1:44741109007:web:4409cd571bc1383bb50a7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getDatabase(app);