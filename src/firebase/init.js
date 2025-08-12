import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZKzgD9hGNBxaNKPwQ32rtYm5QRAvsELo",
  authDomain: "week7-dailinjiang.firebaseapp.com",
  projectId: "week7-dailinjiang",
  storageBucket: "week7-dailinjiang.firebasestorage.app",
  messagingSenderId: "1039427613509",
  appId: "1:1039427613509:web:b4fa0d02d184bf1026442c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

export default db; 