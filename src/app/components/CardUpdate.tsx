"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAuthGuard from "../hooks/useAuthGuard";
import { savePersonaJson } from "../services/fileService";
import { toast } from "react-toastify";
import { api } from "../services/api";

type Mode = "history" | "personality" | "memory";

export default function CardUpdate() {
  useAuthGuard();
  const router = useRouter();
  const sp = useSearchParams();
  const personaId = useMemo(
    () => sp.get("persona") || sp.get("Persona") || "",
    [sp]
  );

  const [mode, setMode] = useState<Mode>("memory");
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

  // ใช้รูปแบบเดียวกับ CardSummarize
  function formatTimestamp(d = new Date()) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    let hh = d.getHours();
    const ampm = hh >= 12 ? "pm" : "am";
    hh = hh % 12 || 12;
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy} ${hh}:${mi}${ampm}`;
  }

  function toMemorySchema(raw: string) {
    return JSON.stringify(
      [
        {
          summary: raw,
          "speaker 1": "user",
          "intend&emotions 1": "",
          "speaker 2": "AI",
          "intend&emotions 2": "",
          timestamp: formatTimestamp(),
        },
      ],
      null,
      2
    );
  }

  const summarize = async () => {
    if (!text.trim()) {
      toast.warn("กรุณาวางข้อความก่อน", { position: "top-right" });
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post("/ai/summarize", { text, mode });
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

    let payload = jsonOut;

    if (mode === "memory") {
      // memory: อนุโลมข้อความดิบ -> ห่อเป็น schema
      try {
        // ถ้าเป็น JSON อยู่แล้ว ให้บันทึกตามนั้น
        JSON.parse(jsonOut);
      } catch {
        payload = toMemorySchema(jsonOut);
      }
    } else {
      // personality/history: ต้องเป็น JSON เท่านั้น
      try {
        payload = JSON.stringify(JSON.parse(jsonOut));
      } catch {
        const ok = confirm(
          "ผลลัพธ์ไม่ใช่ JSON ที่ถูกต้อง โหมดนี้ต้องเป็น JSON เท่านั้น"
        );
        if (!ok) return;
        return; // ไม่บันทึกถ้าไม่ถูกต้อง
      }
    }

    try {
      setSaving(true);
      await savePersonaJson(personaId, payload, mode);
      toast.success("บันทึก JSON สำเร็จ", { position: "top-right" });
    } catch (e) {
      console.error(e);
      toast.error("บันทึกไม่สำเร็จ", { position: "top-right" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 font-[family-name:var(--font-el-messiri)]">
      <div className="min-h-screen p-6 max-w-5xl mx-auto text-base-content">
        <h1 className="text-2xl font-bold mb-4">Update Persona JSON</h1>

        <div className="flex flex-col gap-4">
          {/* โหมดแบบเดียวกับ CardSummarize */}
          <div className="flex gap-4 items-center">
            <span className="font-semibold">Mode:</span>
            <label className="label cursor-pointer gap-2">
              <input
                type="radio"
                checked={mode === "memory"}
                onChange={() => setMode("memory")}
              />
              memory
            </label>
            <label className="label cursor-pointer gap-2">
              <input
                type="radio"
                checked={mode === "history"}
                onChange={() => setMode("history")}
              />
              history
            </label>
            <label className="label cursor-pointer gap-2">
              <input
                type="radio"
                checked={mode === "personality"}
                onChange={() => setMode("personality")}
              />
              personality
            </label>
          </div>

          <div>
            <label className="font-semibold block mb-2">Paste text</label>
            <textarea
              className="w-full h-40 bg-white border-green-300 text-black border-2 rounded-xl p-2 font-[family-name:var(--font-noto-sans-thai)]"
              placeholder="วางข้อความที่ต้องการให้ AI สรุปเป็น JSON"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              disabled={loading}
              onClick={summarize}
              className={`btn btn-neutral mt-2 px-3 py-1 rounded border-0 text-white ${
                loading ? "bg-blue-300/60" : "bg-blue-300 hover:bg-blue-500"
              }`}
            >
              {loading ? "Summarizing..." : "Summarize with AI"}
            </button>
          </div>

          <div>
            <label className="font-semibold block mb-2">JSON Result</label>
            <textarea
              className="w-full h-60 bg-white border-blue-300 border-2 text-black rounded-xl p-2 font-mono text-sm"
              placeholder='{"...": "..."}'
              value={jsonOut}
              onChange={(e) => setJsonOut(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <button
                disabled={saving}
                onClick={save}
                className={`btn btn-neutral border-0 px-3 py-1 rounded text-white ${
                  saving
                    ? "bg-green-300/60"
                    : "bg-green-300 hover:bg-green-500"
                }`}
              >
                {saving ? "Saving..." : "Save JSON"}
              </button>
              <button
                onClick={() => router.push(`/Personas`)}
                className="btn btn-neutral border-0 px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-700"
              >
                Back to Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
