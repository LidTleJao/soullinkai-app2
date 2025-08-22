"use client";
import { useState } from "react";
import { requestOtp, verifyOtp, setupSecurityQuestions } from "../services/securityService";

export default function SecurityForm(){
  const [otp,setOtp]=useState("");
  const [qs,setQs]=useState([{question:"Your first school?",answer:""}]);

  const req=async()=>{ const r=await requestOtp(); alert(`OTP (dev only): ${r.otp}`); };
  const ver=async()=>{ const r=await verifyOtp(otp); alert(r.ok?"OTP verified":"OTP invalid"); };

  const add=()=>setQs([...qs,{question:"",answer:""}]);
  const save=async()=>{ await setupSecurityQuestions(qs); alert("Saved security questions"); };

  return (
    <div className="space-y-4">
      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        <div className="font-semibold mb-2">One-Time Password</div>
        <button onClick={req} className="bg-blue-600 px-3 py-1 rounded mr-2">Request OTP</button>
        <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter OTP" className="px-2 py-1 bg-black/40 border border-white/20 rounded"/>
        <button onClick={ver} className="ml-2 bg-emerald-600 px-3 py-1 rounded">Verify</button>
        <p className="text-xs text-white/70 mt-1">* โปรดเปลี่ยนเป็นส่งทาง Email/SMS ใน production</p>
      </div>

      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        <div className="font-semibold">Security Questions</div>
        {qs.map((q,i)=>(
          <div key={i} className="flex gap-2 mt-2">
            <input className="flex-1 px-2 py-1 bg-black/40 border border-white/20 rounded" placeholder="Question" value={q.question} onChange={e=>{const a=[...qs]; a[i].question=e.target.value; setQs(a);}}/>
            <input className="flex-1 px-2 py-1 bg-black/40 border border-white/20 rounded" placeholder="Answer" value={q.answer} onChange={e=>{const a=[...qs]; a[i].answer=e.target.value; setQs(a);}}/>
          </div>
        ))}
        <div className="mt-3 flex gap-2">
          <button onClick={add} className="bg-white/10 px-3 py-1 rounded">Add</button>
          <button onClick={save} className="bg-purple-600 px-3 py-1 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
