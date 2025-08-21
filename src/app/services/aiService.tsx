// src/services/aiService.ts
import { api } from "./api";

export async function summarize(text: string, mode: "history" | "personality") {
  const r = await api.post("/ai/summarize", { text, mode });
  return r.data;
}

export async function chat(messages: []) {
  const r = await api.post("/ai/chat", { messages });
  return r.data;
}
