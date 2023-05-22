// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite' //desde lite para solo tomar las funcionalidades que queremos
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcCg1I3XK5n4HZ_pa5VSgtIssIU_mYzNw",
    authDomain: "mindscript-1a58e.firebaseapp.com",
    projectId: "mindscript-1a58e",
    storageBucket: "mindscript-1a58e.appspot.com",
    messagingSenderId: "437688985938",
    appId: "1:437688985938:web:b2252c1cddd867a751728b"
  };
  
// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);