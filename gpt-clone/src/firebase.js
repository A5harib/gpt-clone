// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
  appId: "1:107484125212:web:9a72ca9f36b3eba25ca7d9",
  measurementId: "G-E1M92LYHMF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User signed in:", result.user);
    alert(`Welcome, ${result.user.displayName}!`);
  } catch (error) {
    console.error("Google sign-in error:", error);
    alert(error.message);
  }
};

export { app, auth, googleProvider };
