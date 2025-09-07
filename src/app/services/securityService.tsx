// // src/services/securityService.ts
// import { api } from "./api";

// export async function requestOtp() {
//   const r = await api.post("/security/otp/request");
//   return r.data;
// }

// export async function verifyOtp(code: string) {
//   const r = await api.post("/security/otp/verify", { code });
//   return r.data;
// }

// export async function setupSecurityQuestions(questions: { question: string; answer: string }[]) {
//   const r = await api.post("/security/security/setup", { questions });
//   return r.data;
// }

// export async function verifySecurityAnswers(answers: { question: string; answer: string }[]) {
//   const r = await api.post("/security/security/verify", { answers });
//   return r.data;
// }

// src/app/services/securityService.ts
import { api } from "./api";

export async function requestOtp() {
  const r = await api.post("/security/otp/request");
  return r.data;
}

export async function verifyOtp(code: string) {
  const r = await api.post("/security/otp/verify", { code });
  return r.data;
}

// ✅ เปลี่ยนเป็นเส้นทางใหม่ที่ backend เพิ่ม: /security/questions/setup
export async function setupSecurityQuestions(questions: { question: string; answer: string }[]) {
  const r = await api.post("/security/questions/setup", { questions });
  return r.data;
}

// ✅ เปลี่ยนเป็น /security/questions/verify
export async function verifySecurityAnswers(answers: { question: string; answer: string }[]) {
  const r = await api.post("/security/questions/verify", { answers });
  return r.data;
}
