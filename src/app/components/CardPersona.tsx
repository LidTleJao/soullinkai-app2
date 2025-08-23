// "use client";

// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import useAuthGuard from "../hooks/useAuthGuard";
// import {
//   listPersonas,
//   uploadImage,
//   saveJson,
// } from "../services/personaService";
// import FileUploader from "../components/FileUploader";
// import JsonEditor from "../components/JsonEditor";

// interface Persona {
//   id: string;
//   name: string;
//   description?: string;
//   // เพิ่ม property อื่น ๆ ตามที่มีใน persona จริง
// }

// const CardPersona = () => {
//   useAuthGuard();
//   const router = useRouter();
//   const { id } = router.query;
//   const [persona, setPersona] = useState<Persona | null>(null);

//   useEffect(() => {
//     (async () => {
//       if (!id) return;
//       const all = await listPersonas();
//       // type assertion หรือ filter ให้ถูกต้อง
//       const found = (all as Persona[]).find((x) => x.id === id) || null;
//       setPersona(found);
//     })();
//   }, [id]);

//   const sendImage = async (f: File) => {
//     await uploadImage(String(id), f);
//     alert("Uploaded.");
//   };

//   const save = async (s: string) => {
//     await saveJson(String(id), s, "personality");
//     alert("Saved JSON");
//   };

//   if (!persona) return <p>Loading...</p>;
//   return (
//     <div className="grid md:grid-cols-2 gap-6">
//       <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
//         <h2 className="font-semibold mb-2">Upload picture</h2>
//         <FileUploader onUpload={sendImage} />
//       </div>
//       <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
//         <h2 className="font-semibold mb-2">Personality JSON</h2>
//         <JsonEditor onSave={save} />
//       </div>
//     </div>
//   );
// };

// export default CardPersona;

"use client";

import { useEffect, useState } from "react";
import useAuthGuard from "../hooks/useAuthGuard";
import {
  listPersonas,
  uploadImage,
  saveJson,
} from "../services/personaService";
import FileUploader from "../components/FileUploader";
import JsonEditor from "../components/JsonEditor";

interface Persona {
  id: string;
  name: string;
  description?: string;
}

const CardPersona = ({ id }: { id: string }) => {
  useAuthGuard();
  const [persona, setPersona] = useState<Persona | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const all = await listPersonas();
      const found = (all as Persona[]).find((x) => x.id === id) || null;
      setPersona(found);
    })();
  }, [id]);

  const sendImage = async (f: File) => {
    await uploadImage(String(id), f);
    alert("Uploaded.");
  };

  const save = async (s: string) => {
    await saveJson(String(id), s, "personality");
    alert("Saved JSON");
  };

  if (!persona) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
        <h2 className="font-semibold mb-2">Upload picture</h2>
        <FileUploader onUpload={sendImage} />
      </div>
      <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
        <h2 className="font-semibold mb-2">Personality JSON</h2>
        <JsonEditor onSave={save} />
      </div>
    </div>
  );
};

export default CardPersona;
