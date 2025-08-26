import CardPersona from "@/app/components/CardPersona";
import Navbar from "@/app/components/Navbar";
import Protected from "@/app/components/Protected";
import { use } from "react";

export default function PersonaDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <>
      <Protected>
        <Navbar />
        <CardPersona id={id} />
      </Protected>
    </>
  );
}
