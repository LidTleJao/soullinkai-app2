/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";
import useAuthGuard from "../hooks/useAuthGuard";
import { getPersonaById, Persona } from "../services/personaService";
import { savePersonaJson, uploadPersonaImage } from "../services/fileService";
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
    await uploadPersonaImage(String(id), f);
    await load(); // ✅ อัปเดตใหม่ เพื่อรับ imageUrl ล่าสุด
  };

  const save = async (s: string) => {
    await savePersonaJson(String(id), s, "personality");
    // จะ toast ตรงนี้ก็ได้
  };

  if (loading && !persona) return <p>Loading...</p>;
  if (!persona) return <p>Not found</p>;

  return (
    <>
      <div 
      // className="min-h-screen bg-[url(https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Flogin.jpg?alt=media&token=22362023-f57d-4066-b91d-209b63c9880e)] bg-cover bg-center font-[family-name:var(--font-el-messiri)]"
      className="min-h-screen p-4 text-base-content bg-base-100 bg-cover bg-center font-[family-name:var(--font-el-messiri)]"
      >
        <div className="grid md:grid-cols-2 gap-6 no-caret">
          <div className="card border-2 border-green-300 p-4 rounded-xl">
            <h2 className="font-semibold mb-3">Picture</h2>

            {/* ✅ แสดงรูปถ้ามี */}
            {persona.imageUrl ? (
              <img
                src={persona.imageUrl}
                alt={persona.name}
                width={200}
                height={200}
                className="w-30 h-30 object-cover rounded mb-3 border-2 border-amber-100"
              />
            ) : (
              <div className="w-48 h-48 rounded mb-3 border-2 border-amber-100 flex items-center justify-center ">
                No image
              </div>
            )}

            <FileUploader onUpload={sendImage} />
          </div>

          <div className="card border-2 border-blue-300 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">Personality JSON</h2>
            <JsonEditor onSave={save} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPersona;
