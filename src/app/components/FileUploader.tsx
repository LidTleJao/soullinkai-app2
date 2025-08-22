"use client";
import { useState } from "react";

export default function FileUploader({onUpload}:{onUpload:(f:File)=>Promise<void>}){
  const [f,setF]=useState<File|null>(null);
  const [loading,setLoading]=useState(false);
  const go=async()=>{ if(!f) return alert("Choose file"); setLoading(true); await onUpload(f); setF(null); setLoading(false); };
  return (
    <div className="flex items-center gap-2">
      <input type="file" accept="image/*" onChange={(e)=>setF(e.target.files?.[0]||null)} className="text-sm"/>
      <button disabled={loading} onClick={go} className="bg-blue-500 px-3 py-1 rounded">{loading?"Uploading...":"Upload"}</button>
    </div>
  );
}
