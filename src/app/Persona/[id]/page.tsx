// import CardPersona from "@/app/components/CardPersona";
// import Navbar from "@/app/components/Navbar";
// import Protected from "@/app/components/Protected";

// export default function PersonaDetail({
//   searchParams,
// }: {
//   searchParams: { id?: string };
// }) {
//   // const { id } = use(params);

//   const id = searchParams?.id ?? "";
//   return (
//     <>
//       {/* <Protected>
//         <Navbar />
//         <CardPersona id={id} />
//       </Protected> */}
//       <Protected>
//         <Navbar />
//         {id ? (
//           <CardPersona id={id} />
//         ) : (
//           <div className="min-h-screen flex items-center justify-center p-6">
//             <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
//               <p className="opacity-80">
//                 Missing persona id. Try <code>?id=YOUR_ID</code>
//               </p>
//             </div>
//           </div>
//         )}
//       </Protected>
//     </>
//   );
// }

import Navbar from "@/app/components/Navbar";
import Protected from "@/app/components/Protected";
import CardPersona from "@/app/components/CardPersona";

// ❗บังคับว่าเส้นทางต้องเป็น static เท่าที่ให้มาเท่านั้น (ต้องมี generateStaticParams)
export const dynamicParams = false;

// ✅ ดึงลิสต์ id จาก env ระบุด้วย comma
export async function generateStaticParams() {
  // PREGEN_PERSONA_IDS="id1,id2,id3"
  const envIds = process.env.PREGEN_PERSONA_IDS ?? "";
  const ids = envIds
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // ถ้าไม่มีเลย ให้คืน array ว่าง (จะไม่มีเพจ /Persona/[id] ถูก generate)
  return ids.map((id) => ({ id }));
}

// (ถ้าต้องการ static metadata ต่อ id — optional)
// export async function generateMetadata({ params }: { params: { id: string } }) {
//   return { title: `Persona | ${params.id}` };
// }

export default function PersonaDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <>
      <Protected>
        <Navbar />
        <CardPersona id={id} />
      </Protected>
    </>
  );
}
