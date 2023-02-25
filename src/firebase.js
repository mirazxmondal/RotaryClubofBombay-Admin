// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBVEo-op24ZqVBokMsXbJU1yR8cYsL1Lk",
  authDomain: "awsome-d5559.firebaseapp.com",
  projectId: "awsome-d5559",
  storageBucket: "awsome-d5559.appspot.com",
  messagingSenderId: "325004279528",
  appId: "1:325004279528:web:0f47769e83f69d13b1d35d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
