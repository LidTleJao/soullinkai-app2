"use client";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { savePersonaJson } from "../services/fileService";

const CardSummarize = () => {
  const [text, setText] = useState("");
  // const [mode, setMode] = useState<"history" | "personality">("history");
  const [mode, setMode] = useState<"history" | "personality" | "memory">(
    "memory"
  );
  const [personaId, setPersonaId] = useState("");
  const [result, setResult] = useState("");
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

  // helper สำหรับ memory
  function toMemorySchema(text: string) {
    return JSON.stringify(
      [
        {
          summary: text,
          "speaker 1": "user",
          "intend&emotions 1": "",
          "speaker 2": "AI",
          "intend&emotions 2": "",
          timestamp: new Date()
            .toLocaleString("en-GB", { hour12: true })
            .replace(",", ""), // ใกล้เคียง 26/08/2025 3:12pm
        },
      ],
      null,
      2
    );
  }

  async function save() {
    if (!personaId)
      return toast.warn("กรุณาเลือก Persona", { position: "top-right" });
    if (!result.trim())
      return toast.warn("ยังไม่มีผลลัพธ์ให้บันทึก", { position: "top-right" });

    let payload = result;
    if (mode === "memory") {
      // ถ้าไม่ใช่ JSON ให้แปลงเป็น schema memory
      try {
        JSON.parse(result);
      } catch {
        payload = toMemorySchema(result);
      }
    } else {
      // personality/history ต้องเป็น JSON เสมอ
      try {
        payload = JSON.stringify(JSON.parse(result));
      } catch {
        return toast.error("ผลลัพธ์ไม่ใช่ JSON ที่ถูกต้อง", {
          position: "top-right",
        });
      }
    }

    setSaving(true);
    try {
      // await api.post(`/files/save-json/${personaId}`, {
      //   json: payload,
      //   kind: mode,
      // });
      await savePersonaJson(personaId, payload, mode); // ✅ ใช้ fileService
      toast.success("บันทึก JSON สำเร็จ ✅", { position: "top-right" });
    } catch (e) {
      console.error(e);
      toast.error("บันทึกไม่สำเร็จ", { position: "top-right" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      // className="min-h-screen bg-[url(https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Flogin.jpg?alt=media&token=22362023-f57d-4066-b91d-209b63c9880e)] bg-cover bg-center flex flex-col items-center justify-center p-4 font-[family-name:var(--font-el-messiri)]"
      className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4 font-[family-name:var(--font-el-messiri)]"
    >
      {/* Responsive grid: 1 col บนมือถือ, 2 cols บนจอใหญ่ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Summarize Card */}
        <div className="card border-2 border-green-300 p-6 rounded-xl space-y-6">
          <h1 className="text-2xl font-bold no-caret text-base-content">
            Summarize to JSON
          </h1>

          <select
            className="select w-full bg-white border-2 border-blue-300 text-black rounded no-caret"
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

          <div className="flex gap-3 no-caret text-base-content">
            <label className="label cursor-pointer gap-2 no-caret">
              <input
                type="radio"
                checked={mode === "memory"}
                onChange={() => setMode("memory")}
              />
              memory
            </label>
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
            className="textarea h-48 bg-white border-2 border-blue-300 text-black w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="paste text here..."
          />

          <div className="flex gap-2 no-caret">
            <button
              className="btn btn-neutral bg-blue-300 hover:bg-blue-500 text-white rounded-xl border-0"
              onClick={run}
              disabled={loadingSumm}
            >
              {loadingSumm ? "Summarizing..." : "Summarize"}
            </button>
            {/* <button
              className="btn bg-white text-black"
              onClick={save}
              disabled={!result || !personaId || saving}
            >
              {saving ? "Saving..." : "Save JSON"}
            </button> */}
            <button
              className={`btn btn-neutral bg-green-300 hover:bg-green-500 text-white rounded-xl border-0 ${
                saving ? "btn-disabled opacity-50" : ""
              }`}
              onClick={() => {
                if (!personaId) {
                  toast.warn("⚠️ กรุณาเลือก Persona ก่อนบันทึก", {
                    position: "top-right",
                  });
                  return;
                }
                if (!result.trim()) {
                  toast.warn("⚠️ ยังไม่มีผลลัพธ์ให้บันทึก", {
                    position: "top-right",
                  });
                  return;
                }
                save(); // ✅ เรียกฟังก์ชันจริง
              }}
            >
              {saving ? "Saving..." : "Save JSON"}
            </button>
          </div>
        </div>

        {/* Result Card */}
        <div className="card border-2 border-blue-300 p-6 rounded-xl flex flex-col">
          <h2 className="text-2xl font-bold mb-2 no-caret text-base-content">
            Result
          </h2>
          <pre className="bg-white border-2 border-green-300 text-black text-sm p-3 rounded whitespace-pre-wrap break-words flex-1 overflow-auto min-h-[400px] font-[family-name:var(--font-noto-sans-thai)]">
            {result || "ยังไม่มีผลลัพธ์"}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CardSummarize;
