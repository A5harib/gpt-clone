// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDTrDOaeTG3ccZAtVgSTkWI-N_dBSY3aE",
  authDomain: "gpt-clone-36a0d.firebaseapp.com",
  projectId: "gpt-clone-36a0d",
  storageBucket: "gpt-clone-36a0d.firebasestorage.app",
  messagingSenderId: "107484125212",
  appId: "1:107484125212:web:7ed3e8b84668dd175ca7d9",
  measurementId: "G-5C21GZBFES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);