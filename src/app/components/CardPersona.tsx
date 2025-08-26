/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";
import useAuthGuard from "../hooks/useAuthGuard";
import {
  getPersonaById,
  uploadImage,
  saveJson,
  Persona,
} from "../services/personaService";
import FileUploader from "../components/FileUploader";
import JsonEditor from "../components/JsonEditor";

const CardPersona = ({ id }: { id: string }) => {
  useAuthGuard();
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const p = await getPersonaById(id);
      setPersona(p);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const sendImage = async (f: File) => {
    await uploadImage(String(id), f);
    await load(); // ✅ อัปเดตใหม่ เพื่อรับ imageUrl ล่าสุด
  };

  const save = async (s: string) => {
    await saveJson(String(id), s, "personality");
    // จะ toast ตรงนี้ก็ได้
  };

  if (loading && !persona) return <p>Loading...</p>;
  if (!persona) return <p>Not found</p>;

  return (
    <>
      <div className="min-h-screen bg-[url('/Image/login.jpg')] bg-cover bg-center font-[family-name:var(--font-el-messiri)]">
        <div className="grid md:grid-cols-2 gap-6 no-caret">
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-3">Picture</h2>

            {/* ✅ แสดงรูปถ้ามี */}
            {persona.imageUrl ? (
              <img
                src={persona.imageUrl}
                alt={persona.name}
                width={200}
                height={200}
                className="w-48 h-48 object-cover rounded mb-3 border border-white/10"
              />
            ) : (
              <div className="w-48 h-48 rounded mb-3 bg-white/10 flex items-center justify-center text-white/60">
                No image
              </div>
            )}

            <FileUploader onUpload={sendImage} />
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">Personality JSON</h2>
            <JsonEditor onSave={save} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPersona;
