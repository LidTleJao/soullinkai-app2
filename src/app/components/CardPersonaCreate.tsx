"use client";

import { useState } from "react";
import { createPersona } from "../services/personaService";
import { useRouter } from "next/navigation";
import useAuthGuard from "../hooks/useAuthGuard";
import { toast } from "react-toastify";

const CardPersonaCreate = () => {
  useAuthGuard();
  const router = useRouter();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name.trim()) {
      toast.error("กรุณาใส่ชื่อ Persona", { position: "top-right" });
      return;
    }

    try {
      setLoading(true);
      const created = await createPersona({ name: name.trim(), description: desc.trim() });

      toast.success("สร้าง Persona สำเร็จ ✨", {
        position: "top-right",
        autoClose: 2500,
      });

      router.push(`/Persona/${created.id}`);
    } catch (err) {
      console.error(err);
      toast.error("สร้าง Persona ไม่สำเร็จ ลองใหม่อีกครั้ง", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div 
      // className="min-h-screen flex items-center justify-center bg-[url('/Image/persona.jpg')] bg-cover bg-center p-4 font-[family-name:var(--font-el-messiri)]"
      className="min-h-screen flex items-center justify-center bg-[url(https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Fpersona.jpg?alt=media&token=c514724f-feec-446f-8361-e8ce25ed8492)] bg-cover bg-center p-4 font-[family-name:var(--font-el-messiri)]"
      >
        <div className="max-w-xl mx-auto bg-black/80 border border-white/10 p-6 rounded-xl">
          <h1 className="text-2xl font-bold mb-3 no-caret">Create new persona</h1>

          <label className="block text-sm mb-1 no-caret">Name your character</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 px-3 py-2 bg-black/40 border border-white/20 rounded"
            placeholder="e.g., Luna"
          />

          <label className="block text-sm mb-1 no-caret">Short description (optional)</label>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full mb-4 px-3 py-2 bg-black/40 border border-white/20 rounded"
            placeholder="e.g., calm strategist"
          />

          <p className="text-sm text-white/70 mb-2 no-caret">
            Upload picture after creating on the detail page.
          </p>

          <div className="flex gap-4 justify-end" role="group" aria-label="Action buttons">
            <button
              onClick={submit}
              disabled={loading}
              className={`btn bg-white text-black px-5 py-2 rounded-full ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
            <button
              onClick={() => router.back()}
              disabled={loading}
              className="btn bg-gray-500 text-white px-5 py-2 rounded-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPersonaCreate;
