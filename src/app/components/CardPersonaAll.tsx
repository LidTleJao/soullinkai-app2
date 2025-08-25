// 'use client';
// import { useEffect, useState } from 'react';
// import useAuthGuard from '../hooks/useAuthGuard';
// import { listPersonas, createPersona } from '../services/personaService';
// import PersonaCard from '../components/PersonaCard';
// import Link from 'next/link';

// interface Persona {
//   id: string;
//   name: string;
//   description?: string;
// }

// const CardPersonaAll = () => {
//     useAuthGuard();
//   const [items, setItems] = useState<Persona[]>([]);
//   const [name, setName] = useState('');
//   const [desc, setDesc] = useState('');

//   const load = async () => {
//     const all = await listPersonas();
//     setItems(all as Persona[]);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const add = async () => {
//     if (!name) return alert('Name required');
//     await createPersona({ name, description: desc });
//     setName('');
//     setDesc('');
//     load();
//   };
//     return (
//         <>
//         <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">Your Personas</h1>
//         <Link href="/create" className="bg-white text-black px-4 py-1 rounded-full">
//           Create new
//         </Link>
//       </div>

//       <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
//         <div className="font-semibold mb-2">Quick create</div>
//         <input
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="mr-2 px-2 py-1 bg-black/40 border border-white/20 rounded"
//         />
//         <input
//           placeholder="Description"
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//           className="mr-2 px-2 py-1 bg-black/40 border border-white/20 rounded"
//         />
//         <button onClick={add} className="bg-emerald-600 px-3 py-1 rounded">
//           Create
//         </button>
//       </div>

//       <div className="grid md:grid-cols-3 gap-4">
//         {items.map((p) => (
//           <PersonaCard key={p.id} persona={p} onChange={load} />
//         ))}
//       </div>
//         </>
//     );
// };

// export default CardPersonaAll;

// src/app/components/CardPersonaAll.tsx
"use client";
import { useEffect, useState } from "react";
import useAuthGuard from "../hooks/useAuthGuard";
import { listPersonas, createPersona } from "../services/personaService";
import PersonaCard from "./PersonasCard";
import Link from "next/link";
import { toast } from "react-toastify";

interface Persona {
  id: string;
  name: string;
  description?: string;
}

const CardPersonaAll = () => {
  useAuthGuard();
  const [items, setItems] = useState<Persona[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setErrMsg(null);
      const all = await listPersonas();
      setItems(all as Persona[]);
    } catch (e) {
      console.error("listPersonas failed:", e);
      toast.error("โหลด personas ไม่สำเร็จ", { position: "top-right" });
      // setErrMsg(e?.response?.data?.error || e?.message || "Failed to load personas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!name) return alert("Name required");
    try {
      await createPersona({ name, description: desc });
      setName("");
      setDesc("");
      await load();
    } catch (e) {
      console.error("createPersona failed:", e);
      toast.error("โหลด personas ไม่สำเร็จ", { position: "top-right" });
      // alert(e?.response?.data?.error || e?.message || "Create failed");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 font-[family-name:var(--font-el-messiri)]">
        <div className="flex flex-col items-center space-y-8 mb-10 no-caret">
          <h1 className="text-2xl lg:text-6xl font-bold">Your Personas</h1>
          <Link
            href="/PersonaCreate"
            className="bg-white text-black px-4 py-1 rounded-full"
          >
            Create new
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 space-y-6 lg:space-y-0 items-center bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <div className="font-semibold no-caret">Quick create</div>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mr-2 px-2 py-1 bg-black/40 border border-white/20 rounded"
          />
          <input
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mr-2 px-2 py-1 bg-black/40 border border-white/20 rounded"
          />
          <button onClick={add} className="bg-emerald-600 px-3 py-1 rounded">
            Create
          </button>
        </div>

        {loading && <div className="opacity-70">Loading personas…</div>}
        {errMsg && (
          <div className="bg-red-500/10 text-red-300 border border-red-500/30 p-3 rounded mb-4">
            {errMsg}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-4">
          {items.map((p) => (
            <PersonaCard key={p.id} persona={p} onChange={load} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CardPersonaAll;
