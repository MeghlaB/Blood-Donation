// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPOSkNi0X3O2lfqLJsY-Ebdt6PAz4QcP4",
  authDomain: "blood-donation-6ebb1.firebaseapp.com",
  projectId: "blood-donation-6ebb1",
  storageBucket: "blood-donation-6ebb1.firebasestorage.app",
  messagingSenderId: "462478706327",
  appId: "1:462478706327:web:5c1a2abf648c46966f8bd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
export default auth
