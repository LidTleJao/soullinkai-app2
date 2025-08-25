"use client";
import { useEffect, useState } from "react";
import { api } from "../services/api";

const CardSummarize = () => {
//   const [summary, setSummary] = useState<string>("");

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const response = await api.get("/summarize");
//         setSummary(response.data.summary);
//       } catch (error) {
//         console.error("Error fetching summary:", error);
//       }
//     };

//     fetchSummary();
//   }, []);
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"history" | "personality">("history");
  const [personaId, setPersonaId] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [personas, setPersonas] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    api.get("/personas").then(({ data }) => setPersonas(data));
  }, []);

  async function run() {
    const { data } = await api.post("/ai/summarize", { text, mode });
    const jsonText = data?.choices?.[0]?.message?.content || "{}";
    setResult(jsonText);
  }
  async function save() {
    if (!personaId || !result) return;
    await api.post(`/files/save-json/${personaId}`, {
      json: result,
      kind: mode,
    });
    alert("saved");
  }


  return (
    <div className="grid gap-4 p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Summarize to JSON</h1>
        <select
          className="select"
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
        <div className="flex gap-3">
          <label className="label cursor-pointer gap-2">
            <input
              type="radio"
              checked={mode === "history"}
              onChange={() => setMode("history")}
            />{" "}
            history
          </label>
          <label className="label cursor-pointer gap-2">
            <input
              type="radio"
              checked={mode === "personality"}
              onChange={() => setMode("personality")}
            />{" "}
            personality
          </label>
        </div>
        <textarea
          className="textarea h-48 bg-neutral-900"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="paste text here..."
        />
        <div className="flex gap-2">
          <button className="btn" onClick={run}>
            Summarize
          </button>
          <button
            className="btn bg-white text-black"
            onClick={save}
            disabled={!result || !personaId}
          >
            Save JSON
          </button>
        </div>
        <pre className="bg-black/40 p-3 rounded whitespace-pre-wrap break-words">
          {result}
        </pre>
      </div>
  );
}
export default CardSummarize;