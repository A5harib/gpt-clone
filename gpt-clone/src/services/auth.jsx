import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase"; // Ensure this file exists

// Sign up new users
const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Signup error:", error.message);
    alert(error.message);
  }
};

// Log in existing users
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user);
    return userCredential.user; // Return user if login succeeds
  } catch (error) {
    console.error("Login error:", error.message);
    alert(error.message);
    throw error; // 🔥 Re-throw the error so handleSubmit() can catch it
  }
};

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

export { createUser, login, signInWithGoogle };
