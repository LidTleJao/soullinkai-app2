'use client';
// src/app/update/page.tsx

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAuthGuard from "../hooks/useAuthGuard"; // ปรับ path ตามโปรเจคคุณ
import { saveJson } from "../services/personaService"; // ปรับ path
import { toast } from "react-toastify";
import api from "../services/api"; // axios instance ของคุณ

export default function CardUpdate() {
  useAuthGuard();
  const router = useRouter();
  const sp = useSearchParams();
  // แนะนำให้ใช้คีย์ param เป็นตัวพิมพ์เล็ก เช่น ?persona=<id>
  const personaId = useMemo(() => sp.get("persona") || sp.get("Persona") || "", [sp]);

  const [mode, setMode] = useState<"history" | "personality">("personality");
  const [text, setText] = useState("");
  const [jsonOut, setJsonOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!personaId) {
      toast.error("ไม่พบ personaId", { position: "top-right" });
      router.push("/Personas");
    }
  }, [personaId, router]);

  const summarize = async () => {
    if (!text.trim()) {
      toast.warn("กรุณาวางข้อความก่อน", { position: "top-right" });
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post("/ai/summarize", { text, mode });
      // xAI (OpenAI-compatible) มักจะคืน choices[0].message.content
      const content = data?.choices?.[0]?.message?.content ?? "";
      if (!content) {
        toast.error("ไม่ได้รับผลลัพธ์จาก AI", { position: "top-right" });
        return;
      }
      setJsonOut(content);
      toast.success("สรุปสำเร็จ ✨", { position: "top-right" });
    } catch (e) {
      console.error(e);
      toast.error("สรุปไม่สำเร็จ", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    if (!personaId) return;
    if (!jsonOut.trim()) {
      toast.warn("ยังไม่มี JSON ให้บันทึก", { position: "top-right" });
      return;
    }
    // ตรวจ JSON ก่อน
    try {
      JSON.parse(jsonOut);
    } catch {
      const ok = confirm("JSON ยังไม่ถูกต้อง ต้องการบันทึกเป็นข้อความดิบหรือไม่?");
      if (!ok) return;
    }

    try {
      setSaving(true);
      await saveJson(personaId, jsonOut, mode);
      toast.success("บันทึก JSON สำเร็จ", { position: "top-right" });
    } catch (e) {
      console.error(e);
      toast.error("บันทึกไม่สำเร็จ", { position: "top-right" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Persona JSON</h1>

      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <label className="font-semibold">Mode:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as "history" | "personality")}
            className="bg-black/40 border border-white/20 rounded px-2 py-1"
          >
            <option value="personality">personality</option>
            <option value="history">history</option>
          </select>
        </div>

        <div>
          <label className="font-semibold block mb-2">Paste text</label>
          <textarea
            className="w-full h-40 bg-black/40 border border-white/20 rounded p-2"
            placeholder="วางข้อความที่ต้องการให้ AI สรุปเป็น JSON"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            disabled={loading}
            onClick={summarize}
            className={`btn mt-2 px-3 py-1 rounded border-0 text-white ${loading ? "bg-indigo-500/60" : "bg-indigo-500 hover:bg-indigo-600"}`}
          >
            {loading ? "Summarizing..." : "Summarize with AI"}
          </button>
        </div>

        <div>
          <label className="font-semibold block mb-2">JSON Result</label>
          <textarea
            className="w-full h-60 bg-black/40 border border-white/20 rounded p-2 font-mono text-sm"
            placeholder='{"...": "..."}'
            value={jsonOut}
            onChange={(e) => setJsonOut(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <button
              disabled={saving}
              onClick={save}
              className={`btn border-0 px-3 py-1 rounded text-white ${saving ? "bg-emerald-600/60" : "bg-emerald-600 hover:bg-emerald-700"}`}
            >
              {saving ? "Saving..." : "Save JSON"}
            </button>
            <button
              onClick={() => router.push(`/Persona/${personaId}`)}
              className="btn border-0 px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700"
            >
              Back to Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
