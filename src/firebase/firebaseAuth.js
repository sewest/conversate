import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export const handleRegister = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
  } catch (error) {
    console.log(error);
  }
};

export const handleLogin = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  }
};

export const handleRecover = async (email) => {
  try {
    const response = await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
  }
};
