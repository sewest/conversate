import { auth } from "./firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { notifications } from "@mantine/notifications";

export const handleRegister = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;

    //Verify email
    await sendEmailVerification(user);
  } catch (error) {
    notifications.show({
      title: "Uh oh!",
      message: "Something went wrong while registering.",
      color: "red",
      autoClose: 5000,
    });
    console.error(error);
  }
};

export const handleLogin = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
  } catch (error) {
    notifications.show({
      title: "Uh oh!",
      message: "Something went wrong while logging in.",
      color: "red",
      autoClose: 5000,
    });
    console.error(error);
  }
};

export const handleRecover = async (email) => {
  try {
    const response = await sendPasswordResetEmail(auth, email);
  } catch (error) {
    notifications.show({
      title: "Uh oh.",
      message: "Something went wrong while trying to recover your password.",
      color: "red",
      autoClose: 5000,
    });
    console.error(error);
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    notifications.show({
      title: "Uh oh.",
      message: "Something went wrong while trying to sign out.",
      color: "red",
      autoClose: 5000,
    });
    console.error(error);
  }
};
