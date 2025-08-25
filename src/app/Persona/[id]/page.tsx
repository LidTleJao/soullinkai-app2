import CardPersona from "@/app/components/CardPersona";
import Navbar from "@/app/components/Navbar";
import { use } from "react";

export default function PersonaDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } =  use(params);
  return (
    <>
      <Navbar />
      <CardPersona id={id} />
    </>
  );
}

// 👉 ถ้าคุณใช้ output: "export" ต้องมี generateStaticParams()
// export async function generateStaticParams() {
//   // TODO: ถ้ามี service จริง ดึง listPersona() มาแทน
//   return [
//     { id: "1" },
//     { id: "2" },
//   ];
// }
