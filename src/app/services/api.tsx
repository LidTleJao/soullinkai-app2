// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// export const api = axios.create({
//   baseURL: API_URL,
// });

// // Attach token automatically
// api.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("idToken");
//     if (token) {
//       config.headers = config.headers ?? {};
//       // config.headers.set("Authorization", `Bearer ${token}`);
//       (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

// export default api;

// src/app/services/api.ts
import axios from "axios";

export const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api",
  baseURL: "https://backend-soullinkai-app.onrender.com/api",
  withCredentials: false,
});

// https://backend-soullinkai-app.onrender.com
// === ใส่ token ทุกครั้ง ===
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("idToken");
    if (token) {
      config.headers = config.headers || {};
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// === ดัก 401/403 แล้วพาไป Login ===
let alreadyNotified = false; // กัน toast ซ้ำ/ลูป redirect
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      try {
        if (typeof window !== "undefined") {
          // เคลียร์ session
          localStorage.removeItem("idToken");
          localStorage.removeItem("uid");
          localStorage.removeItem("profile");
          // next= path เดิม เผื่อ login แล้วกลับมา
          const next = encodeURIComponent(
            window.location.pathname + window.location.search
          );
          if (!alreadyNotified) {
            alreadyNotified = true;
            // แจ้งเตือนแบบ quick (ใช้ window.dispatchEvent -> ให้หน้าไหนก็ได้ไป toast ได้)
            window.dispatchEvent(new CustomEvent("auth-expired"));
          }
          window.location.href = `/Login?next=${next}`;
        }
      } catch {}
    }
    return Promise.reject(err);
  }
);
