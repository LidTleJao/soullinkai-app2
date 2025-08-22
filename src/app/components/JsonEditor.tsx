"use client";
import { useState } from "react";

export default function JsonEditor({initial="",onSave}:{initial?:string; onSave:(s:string)=>Promise<void>}){
  const [text,setText]=useState(initial);
  const [saving,setSaving]=useState(false);
  const save=async()=>{ try{ JSON.parse(text); }catch{ if(!confirm("JSON not valid. Save raw text?")) return; }
    setSaving(true); await onSave(text); setSaving(false);
  };
  return (
    <div>
      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-72 bg-black/40 border border-white/10 rounded p-3 font-mono text-sm" placeholder='{"name":"..."}' />
      <button onClick={save} disabled={saving} className="mt-2 bg-emerald-600 px-3 py-1 rounded">{saving?"Saving...":"Save JSON"}</button>
    </div>
  );
}
