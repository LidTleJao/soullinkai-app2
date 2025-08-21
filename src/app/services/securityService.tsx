// src/services/securityService.ts
import { api } from "./api";

export async function requestOtp() {
  const r = await api.post("/security/otp/request");
  return r.data;
}

export async function verifyOtp(code: string) {
  const r = await api.post("/security/otp/verify", { code });
  return r.data;
}

export async function setupSecurityQuestions(questions: { question: string; answer: string }[]) {
  const r = await api.post("/security/security/setup", { questions });
  return r.data;
}

export async function verifySecurityAnswers(answers: { question: string; answer: string }[]) {
  const r = await api.post("/security/security/verify", { answers });
  return r.data;
}
