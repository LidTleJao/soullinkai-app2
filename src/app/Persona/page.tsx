

// // app/Persona/[id]/page.tsx
// import Navbar from "@/app/components/Navbar";
// import Protected from "@/app/components/Protected";
// import CardPersona from "@/app/components/CardPersona";
// import { notFound } from "next/navigation";

// export const dynamic = "force-dynamic"; // กัน Next บังคับให้เป็น static เมื่อมี params

// type PageProps = {
//   params: { id: string };
// };

// export default function PersonaDetail({ params }: PageProps) {
//   const id = params?.id;

//   if (!id) {
//     // ถ้าไม่มี id ใน path ให้ 404 ไปเลย
//     notFound();
//   }

//   return (
//     <Protected>
//       <Navbar />
//       <CardPersona id={id} />
//     </Protected>
//   );
// }

"use client";

import { Suspense } from "react";
import Navbar from "@/app/components/Navbar";
import Protected from "@/app/components/Protected";
import CardPersona from "@/app/components/CardPersona";
import { useSearchParams } from "next/navigation";

function PersonaContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  return (
    <>
      <Navbar />
      {id ? (
        <CardPersona id={id} />
      ) : (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <p className="opacity-80">
              Missing persona id. Try <code>?id=YOUR_ID</code>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default function PersonaPage() {
  return (
    <Protected>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center p-6">
            <span className="loading loading-dots loading-lg" />
          </div>
        }
      >
        <PersonaContent />
      </Suspense>
    </Protected>
  );
}

