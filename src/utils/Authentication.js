import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { analytics, auth, googleAuth } from "../firebase";
import { logEvent } from "firebase/analytics";

export function EmailRegister(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      logEvent(analytics, "loggen_in", user);
      return true;
    })
    .catch((e) => {
      const error = e.code.split("/")[1];
      switch (error) {
        case "invalid-email":
          return { error: { email: "Invalid Email" } };
        case "email-already-in-use":
          return { error: { email: "Email is already taken" } };
        case "missing-password":
          return { error: { password: "Please enter a password" } };
        case "weak-password":
          return {
            error: { password: "Password should be at least 6 characters" },
          };
        default:
          return error;
      }
    });
}

export function EmailLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      logEvent(analytics, "logged_in", user);
      return true;
    })
    .catch((e) => {
      const error = e.code.split("/")[1];
      switch (error) {
        case "invalid-email":
          return { error: { email: "Invalid Email" } };
        case "missing-password":
          return { error: { password: "Please enter a password" } };
        case "wrong-password":
          return { error: { password: "Incorrect Password" } };
        default:
          return error;
      }
    });
}

export function GoogleSignIn() {
  return signInWithPopup(auth, googleAuth)
    .then((userCredential) => {
      const user = userCredential.user;
      logEvent(analytics, "logged_in", user);
      return true;
    })
    .catch((error) => {
      return error;
    });
}
