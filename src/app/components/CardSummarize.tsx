
"use client";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

const CardSummarize = () => {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"history" | "personality">("history");
  const [personaId, setPersonaId] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [personas, setPersonas] = useState<{ id: string; name: string }[]>([]);
  const [loadingSumm, setLoadingSumm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get("/personas")
      .then(({ data }) => setPersonas(data))
      .catch((err) => {
        console.error("list personas failed:", err);
        toast.error("โหลดรายชื่อ Persona ไม่สำเร็จ", { position: "top-right" });
      });
  }, []);

  async function run() {
    if (!text.trim()) {
      toast.warn("กรุณาวางข้อความก่อนสรุป", { position: "top-right" });
      return;
    }
    setLoadingSumm(true);
    try {
      const { data } = await api.post("/ai/summarize", { text, mode });
      const jsonText = data?.choices?.[0]?.message?.content || "{}";
      setResult(jsonText);
      toast.success("สรุปสำเร็จ ✨", { position: "top-right" });
    } catch (e) {
      console.error("summarize failed:", e);
      toast.error("สรุปไม่สำเร็จ ลองใหม่อีกครั้ง", { position: "top-right" });
    } finally {
      setLoadingSumm(false);
    }
  }

  async function save() {
    if (!personaId) {
      toast.warn("กรุณาเลือก Persona ก่อนบันทึก", { position: "top-right" });
      return;
    }
    if (!result.trim()) {
      toast.warn("ยังไม่มีผลลัพธ์ให้บันทึก", { position: "top-right" });
      return;
    }
    setSaving(true);
    try {
      await api.post(`/files/save-json/${personaId}`, {
        json: result,
        kind: mode,
      });
      toast.success("บันทึก JSON สำเร็จ ✅", { position: "top-right" });
    } catch (e) {
      console.error("save json failed:", e);
      toast.error("บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง", { position: "top-right" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[url('/Image/login.jpg')] bg-cover bg-center flex flex-col items-center justify-center p-4 font-[family-name:var(--font-el-messiri)]">
      {/* Responsive grid: 1 col บนมือถือ, 2 cols บนจอใหญ่ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Summarize Card */}
        <div className="card bg-black/80 border border-white/10 p-6 rounded-xl space-y-6">
          <h1 className="text-2xl font-bold no-caret">Summarize to JSON</h1>

          <select
            className="select w-full bg-black/40 border border-white/20 rounded no-caret"
            value={personaId}
            onChange={(e) => setPersonaId(e.target.value)}
          >
            <option value="">เลือก Persona</option>
            {personas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <div className="flex gap-3 no-caret">
            <label className="label cursor-pointer gap-2 no-caret">
              <input
                type="radio"
                checked={mode === "history"}
                onChange={() => setMode("history")}
              />
              history
            </label>
            <label className="label cursor-pointer gap-2 no-caret">
              <input
                type="radio"
                checked={mode === "personality"}
                onChange={() => setMode("personality")}
              />
              personality
            </label>
          </div>

          <textarea
            className="textarea h-48 bg-neutral-900 w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="paste text here..."
          />

          <div className="flex gap-2 no-caret">
            <button className="btn" onClick={run} disabled={loadingSumm}>
              {loadingSumm ? "Summarizing..." : "Summarize"}
            </button>
            <button
              className="btn bg-white text-black"
              onClick={save}
              disabled={!result || !personaId || saving}
            >
              {saving ? "Saving..." : "Save JSON"}
            </button>
          </div>
        </div>

        {/* Result Card */}
        <div className="card bg-black/80 border border-white/10 p-6 rounded-xl flex flex-col">
          <h2 className="text-2xl font-bold mb-2 no-caret">Result</h2>
          <pre className="bg-white/10 text-sm p-3 rounded whitespace-pre-wrap break-words flex-1 overflow-auto min-h-[400px]">
            {result || "ยังไม่มีผลลัพธ์"}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CardSummarize;
