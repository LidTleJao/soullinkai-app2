import CardPersonaAll from "../components/CardPersonaAll";
import Navbar from "../components/Navbar";
import Protected from "../components/Protected";

export default function PersonasPage() {
  return (
    <>
      <Protected>
        <Navbar />
        <CardPersonaAll />
      </Protected>
    </>
  );
}
