
import { api } from "./api";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseClient";

export async function verifyIdToken(idToken: string) {
  const res = await api.post("/auth/verify", { idToken });
  localStorage.setItem("idToken", idToken);
  localStorage.setItem("uid", res.data.uid);
  return res.data;
}

export function logout() {
  localStorage.removeItem("idToken");
  localStorage.removeItem("uid");
}

export function getUid() {
  return localStorage.getItem("uid");
}

export function isLoggedIn() {
  return !!(typeof window !== "undefined" && localStorage.getItem("idToken"));
}

// ✅ Register ด้วย email+password
export async function register(email: string, password: string) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const token = await userCred.user.getIdToken();
  return verifyIdToken(token);
}

// ✅ Login ด้วย email+password
export async function login(email: string, password: string) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCred.user.getIdToken();
  return verifyIdToken(token);
}
