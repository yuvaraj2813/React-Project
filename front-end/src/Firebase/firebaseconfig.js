// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6LF2XY9IkX8CnodiwYz5Sx1NCOUdy4Ys",
  authDomain: "food-donate-e7841.firebaseapp.com",
  projectId: "food-donate-e7841",
  storageBucket: "food-donate-e7841.firebasestorage.app",
  messagingSenderId: "839685539130",
  appId: "1:839685539130:web:e5d98925247699dbaa3c03",
  measurementId: "G-26VC71X6VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth =getAuth(app);
const db = getFirestore(app);



export {auth, db};
