// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlbClPxsTe9y5X9Jit9tagPIUmBcH5Vno",
  authDomain: "ai-travel-planner-14b6c.firebaseapp.com",
  projectId: "ai-travel-planner-14b6c",
  storageBucket: "ai-travel-planner-14b6c.firebasestorage.app",
  messagingSenderId: "1045237182452",
  appId: "1:1045237182452:web:91be995e195d55e35d13a1",
  measurementId: "G-ELJTWEZSG8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);