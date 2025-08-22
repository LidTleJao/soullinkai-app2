"use client";
import { useRouter } from "next/router";
import { deletePersona } from "../services/personaService";

// export default function PersonaCard({
//   persona,
//   onChange,
// }: {
//   persona: any;
//   onChange: () => void;
// }) {
//   const router = useRouter();
//   const del = async () => {
//     if (confirm("Delete this persona?")) {
//       await deletePersona(persona.id);
//       onChange();
//     }
//   };
//   return (
//     <div className="bg-white/5 border border-white/10 rounded-xl p-4">
//       <div className="flex gap-3">
//         <div className="w-16 h-16 bg-white/10 rounded-full shrink-0" />
//         <div className="flex-1">
//           <div className="font-semibold">{persona.name}</div>
//           <div className="text-white/70 text-sm">
//             {persona.description || "—"}
//           </div>
//           <div className="mt-2 flex gap-2">
//             <button
//               onClick={() => router.push(`/persona/${persona.id}`)}
//               className="bg-emerald-500 px-3 py-1 rounded"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => router.push(`/update?persona=${persona.id}`)}
//               className="bg-indigo-500 px-3 py-1 rounded"
//             >
//               Update JSON
//             </button>
//             <button onClick={del} className="bg-red-500 px-3 py-1 rounded">
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

interface Persona {
  id: string;
  name: string;
  description?: string;
}

interface PersonaCardProps {
  persona: Persona;
  onChange: () => void;
}

export default function PersonaCard({ persona, onChange }: PersonaCardProps) {
  const router = useRouter();

  const del = async () => {
    if (confirm("Delete this persona?")) {
      await deletePersona(persona.id);
      onChange();
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex gap-3">
        <div className="w-16 h-16 bg-white/10 rounded-full shrink-0" />
        <div className="flex-1">
          <div className="font-semibold">{persona.name}</div>
          <div className="text-white/70 text-sm">{persona.description || "—"}</div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => router.push(`/persona/${persona.id}`)}
              className="bg-emerald-500 px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => router.push(`/update?persona=${persona.id}`)}
              className="bg-indigo-500 px-3 py-1 rounded"
            >
              Update JSON
            </button>
            <button onClick={del} className="bg-red-500 px-3 py-1 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
