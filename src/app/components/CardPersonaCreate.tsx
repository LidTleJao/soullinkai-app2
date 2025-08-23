"use client";
import { useState } from "react";
import { createPersona } from "../services/personaService";
import { useRouter } from "next/navigation"; // ✅
import useAuthGuard from "../hooks/useAuthGuard";

const CardPersonaCreate = () => {
  useAuthGuard();
  const router = useRouter();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const submit = async () => {
    if (!name) return alert("Name required");
    const created = await createPersona({ name, description: desc });
    alert("Persona created");
    router.push(`/persona/${created.id}`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white/5 border border-white/10 p-6 rounded-xl">
      <h1 className="text-2xl font-bold mb-3">Create new persona</h1>
      <label className="block text-sm mb-1">Name your character</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3 px-3 py-2 bg-black/40 border border-white/20 rounded"
        placeholder="e.g., Luna"
      />
      <label className="block text-sm mb-1">Short description (optional)</label>
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full mb-4 px-3 py-2 bg-black/40 border border-white/20 rounded"
        placeholder="e.g., calm strategist"
      />

      <p className="text-sm text-white/70 mb-2">
        Upload picture after creating on the detail page.
      </p>
      <button
        onClick={submit}
        className="bg-white text-black px-5 py-2 rounded-full"
      >
        Create
      </button>
    </div>
  );
};

export default CardPersonaCreate;