import { api } from "./api";

export async function loginWithGoogle(idToken: string) {
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
