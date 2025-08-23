// import { api } from "./api";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { auth } from "../config/firebaseClient";

// export type Role = "admin" | "user";
// export interface UserProfile {
//   uid: string;
//   email: string;
//   role: Role;
//   displayName?: string;
//   createdAt?: number;
//   updatedAt?: number;
// }

// function storeSession(idToken: string, uid: string, profile?: UserProfile) {
//   if (typeof window === "undefined") return;
//   localStorage.setItem("idToken", idToken);
//   localStorage.setItem("uid", uid);
//   if (profile) localStorage.setItem("profile", JSON.stringify(profile));
// }

// export function getUid() {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("uid");
// }

// export function getProfile(): UserProfile | null {
//   if (typeof window === "undefined") return null;
//   const raw = localStorage.getItem("profile");
//   return raw ? (JSON.parse(raw) as UserProfile) : null;
// }

// export function isLoggedIn() {
//   return !!(typeof window !== "undefined" && localStorage.getItem("idToken"));
// }

// export function logout() {
//   if (typeof window === "undefined") return;
//   localStorage.removeItem("idToken");
//   localStorage.removeItem("uid");
//   localStorage.removeItem("profile");
// }

// /** เรียก backend /auth/verify แล้วเก็บ session + profile */
// export async function verifyIdToken(idToken: string) {
//   const res = await api.post("/auth/verify", { idToken });
//   const uid = res.data.uid as string;
//   const profile = res.data.profile as UserProfile | undefined;
//   storeSession(idToken, uid, profile);
//   return res.data; // { ok, uid, email, profile }
// }

// /** ✅ Register */
// export async function register(email: string, password: string) {
//   const userCred = await createUserWithEmailAndPassword(auth, email, password);
//   const token = await userCred.user.getIdToken();
//   return verifyIdToken(token);
// }

// /** ✅ Login */
// export async function login(email: string, password: string) {
//   const userCred = await signInWithEmailAndPassword(auth, email, password);
//   const token = await userCred.user.getIdToken();
//   return verifyIdToken(token);
// }


import { api } from "./api";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebaseClient";

export type Role = "admin" | "user";
export interface UserProfile {
  uid: string;
  email: string;
  role: Role;
  displayName?: string;
  createdAt?: number;
  updatedAt?: number;
}

function storeSession(idToken: string, uid: string, profile?: UserProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem("idToken", idToken);
  localStorage.setItem("uid", uid);
  if (profile) localStorage.setItem("profile", JSON.stringify(profile));
}

export function getUid() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("uid");
}

export function getProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("profile");
  return raw ? (JSON.parse(raw) as UserProfile) : null;
}

export function isLoggedIn() {
  return !!(typeof window !== "undefined" && localStorage.getItem("idToken"));
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("idToken");
  localStorage.removeItem("uid");
  localStorage.removeItem("profile");
}

// เรียก backend /auth/verify -> เก็บ session
export async function verifyIdToken(idToken: string) {
  const res = await api.post("/auth/verify", { idToken });
  const uid = res.data.uid as string;
  const profile = res.data.profile as UserProfile | undefined;
  storeSession(idToken, uid, profile);
  return res.data;
}

// Register email/password
export async function register(email: string, password: string) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const token = await userCred.user.getIdToken();
  return verifyIdToken(token);
}

// Login email/password
export async function login(email: string, password: string) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCred.user.getIdToken();
  return verifyIdToken(token);
}

// Login ด้วย Google (ถ้าจะเรียกตรงจาก service)
export async function googleLogin() {
  const res = await signInWithPopup(auth, googleProvider);
  const token = await res.user.getIdToken(true);
  return verifyIdToken(token);
}
