// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj0GdqzmyKFN6lR2BjQhJEFhem61P0gC4",
  authDomain: "employeesapp-d4069.firebaseapp.com",
  projectId: "employeesapp-d4069",
  storageBucket: "employeesapp-d4069.firebasestorage.app",
  messagingSenderId: "792002238003",
  appId: "1:792002238003:web:781508010ea9a6d9c5f546",
  measurementId: "G-LX2NGDDSSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);