// src/services/personaService.ts
import { api } from "./api";

export async function listPersonas() {
  const r = await api.get("/personas");
  return r.data;
}

export async function createPersona(payload: { name: string; description?: string }) {
  const r = await api.post("/personas", payload);
  return r.data;
}

export async function updatePersona(id: string, payload: { name?: string; description?: string }) {
  const r = await api.put(`/personas/${id}`, payload);
  return r.data;
}

export async function deletePersona(id: string) {
  const r = await api.delete(`/personas/${id}`);
  return r.data;
}

export async function uploadImage(personaId: string, file: File) {
  const form = new FormData();
  form.append("file", file);
  const r = await api.post(`/files/upload-image/${personaId}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return r.data;
}

export async function saveJson(personaId: string, json: string, kind = "personality") {
  const r = await api.post(`/files/save-json/${personaId}`, { json, kind });
  return r.data;
}
