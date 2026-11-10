// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOArVbX1Wha8is0h61H2Uym_sCF1sPJxM",
  authDomain: "naijahub-b31a4.firebaseapp.com",
  projectId: "naijahub-b31a4",
  storageBucket: "naijahub-b31a4.firebasestorage.app",
  messagingSenderId: "714016533648",
  appId: "1:714016533648:web:6972c6c8b50148f1687c15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

const db = getFirestore(app);
export{db}