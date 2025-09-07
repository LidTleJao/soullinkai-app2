// src/app/services/fileService.ts
import { api } from "./api";

// export async function savePersonaJson(personaId: string, jsonStr: string, kind: "history"|"personality") {
//   return api.post(`/files/save-json/${personaId}`, { json: jsonStr, kind });
// }

export async function savePersonaJson(
  personaId: string,
  jsonStr: string,
  kind: "history" | "personality" | "memory"
) {
  return api.post(`/files/save-json/${personaId}`, { json: jsonStr, kind });
}

export async function uploadPersonaImage(personaId: string, file: File) {
  const form = new FormData();
  form.append("file", file, file.name);
  return api.post(`/files/upload-image/${personaId}`, form);
}
