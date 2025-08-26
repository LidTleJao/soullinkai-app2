import CardPersona from "@/app/components/CardPersona";
import Navbar from "@/app/components/Navbar";
import Protected from "@/app/components/Protected";

export default function PersonaDetail({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  // const { id } = use(params);

  const id = searchParams?.id ?? "";
  return (
    <>
      {/* <Protected>
        <Navbar />
        <CardPersona id={id} />
      </Protected> */}
      <Protected>
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
      </Protected>
    </>
  );
}
