import CardPersona from "@/app/components/CardPersona";
import Navbar from "@/app/components/Navbar/Navbar";

export default function PersonaDetail({ params }: { params: { id: string } }) {
  return (
    <>
      <Navbar />
      <CardPersona id={params.id} />
    </>
  );
}

// 👉 ถ้าคุณใช้ output: "export" ต้องมี generateStaticParams()
export async function generateStaticParams() {
  // TODO: ถ้ามี service จริง ดึง listPersona() มาแทน
  return [
    { id: "1" },
    { id: "2" },
  ];
}
