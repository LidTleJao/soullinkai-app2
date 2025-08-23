"use client";
import { useEffect, useState } from "react";
import useAuthGuard from "../hooks/useAuthGuard";
import { summarize } from "../services/aiService";
import { listPersonas, saveJson } from "../services/personaService";

interface Persona {
  id: string;
  name: string;
  description?: string;
}
type Mode = "personality" | "history";

const CardUpdate = () => {
      useAuthGuard();
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<Mode>("personality");
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [pid, setPid] = useState<string>("");

  // สร้างตัว state รอให้ client mount ก่อนใช้ router
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // client-side เท่านั้น
  }, []);

  useEffect(() => {
    if (!mounted) return;
    (async () => {
      const ps = await listPersonas();
      setPersonas(ps);
      // ตัวอย่าง router query ใน app dir: router.searchParams.get('persona')
      // หรือถ้าใช้ page params ให้ใช้ prop params
    })();
  }, [mounted]);

  if (!mounted) return <p>Loading...</p>; // ป้องกัน SSR error

  const run = async () => {
    if (!input) return alert("Paste text first");
    const r = await summarize(input, mode);
    // const content =
    //   (r as any)?.choices?.[0]?.message?.content ??
    //   (typeof r === "string" ? r : JSON.stringify(r, null, 2));
    // ใช้ type แทน any
  const content =
    r.choices?.[0]?.message?.content ??
    (typeof r === "string" ? r : JSON.stringify(r, null, 2));

    setResult(content);
  };

  const save = async () => {
    if (!pid) return alert("Select persona");
    await saveJson(pid, result, mode);
    alert("Saved to storage");
  };
return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <select
            value={pid}
            onChange={(e) => setPid(e.target.value)}
            className="bg-black/40 border border-white/20 rounded px-2 py-1"
          >
            <option value="">-- Select persona --</option>
            {personas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="bg-black/40 border border-white/20 rounded px-2 py-1"
          >
            <option value="personality">Update personality</option>
            <option value="history">Update history</option>
          </select>
          <button onClick={run} className="bg-indigo-600 px-3 py-1 rounded">
            Summarize
          </button>
          <button onClick={save} className="bg-emerald-600 px-3 py-1 rounded">
            Save result
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste here..."
          className="w-full h-64 bg-black/40 border border-white/20 rounded p-2"
        />
      </div>
      <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
        <div className="font-semibold mb-2">Your result…</div>
        <textarea
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="w-full h-64 bg-black/40 border border-white/20 rounded p-2 font-mono text-xs"
        />
      </div>
    </div>
  );
};

export default CardUpdate;