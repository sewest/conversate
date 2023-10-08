import { vi, expect, describe, it, beforeEach } from "vitest";
import { handleRegister, handleLogin, handleRecover, handleSignOut } from "./firebaseAuth";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { notifications } from "@mantine/notifications";

const email = "test@example.com";
const password = "password1234";
const auth = { dummy: "data" };
const mockUser = { email };
const mockError = new Error("Registration failed");

vi.mock("firebase/auth");
vi.mock("@mantine/notifications");
vi.mock("./firebase", () => {
  return {
    auth: { dummy: "data" },
  };
});

describe("handleRegister", () => {
  beforeEach(() => {
    createUserWithEmailAndPassword.mockReset();
    sendEmailVerification.mockReset();
    sendPasswordResetEmail.mockReset();
    signOut.mockReset();
    notifications.show.mockImplementation(() => {});
  });

  it("should successfully register and verify email", async () => {
    createUserWithEmailAndPassword.mockResolvedValue({ user: mockUser });

    sendEmailVerification.mockResolvedValue();

    await handleRegister(email, password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    expect(sendEmailVerification).toHaveBeenCalledWith(mockUser);

    expect(notifications.show).not.toHaveBeenCalled();
  });

  it("should handle errors and show a notification", async () => {
    createUserWithEmailAndPassword.mockRejectedValue(mockError);

    await handleRegister(email, password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);

    expect(sendEmailVerification).not.toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalledWith({
      title: "Uh oh!",
      message: "Something went wrong while registering.",
      color: "red",
      autoClose: 5000,
    });
  });
});

describe("handleLogin()", () => {
  it("should call signInWithEmailAndPassword with the arguments auth, email, and password", async () => {
    await handleLogin(email, password);
    signInWithEmailAndPassword.mockResolvedValue({ user: mockUser });
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });

  it("should handle errors and show a notification", async () => {
    signInWithEmailAndPassword.mockRejectedValue(mockError);
    await handleLogin(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    expect(notifications.show).toHaveBeenCalledWith({
      title: "Uh oh!",
      message: "Something went wrong while logging in.",
      color: "red",
      autoClose: 5000,
    });
  });
});

describe("handleRecover()", () => {
  it("should call sendPasswordResetEmail with the arguments auth, email", async () => {
    sendPasswordResetEmail.mockResolvedValue();
    await handleRecover(email);
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, email);
  });

  it("should handle errors and show a notification", async () => {
    sendPasswordResetEmail.mockRejectedValue(mockError);
    await handleRecover(email);
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, email);
    expect(notifications.show).toHaveBeenCalledWith({
      title: "Uh oh.",
      message: "Something went wrong while trying to recover your password.",
      color: "red",
      autoClose: 5000,
    });
  });
});

describe("handleSignOut()", () => {
  it("should call signOut with the arguments auth", async () => {
    signOut.mockResolvedValue();
    await handleSignOut();
    expect(signOut).toHaveBeenCalledWith(auth);
  });

  it("should handle errors and show a notification", async () => {
    signOut.mockRejectedValue(mockError);
    await handleSignOut();
    expect(signOut).toHaveBeenCalledWith(auth);
    expect(notifications.show).toHaveBeenCalledWith({
      title: "Uh oh.",
      message: "Something went wrong while trying to sign out.",
      color: "red",
      autoClose: 5000,
    });
  });
});
