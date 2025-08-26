import CardUpdate from "../components/CardUpdate";
import Navbar from "../components/Navbar";
import Protected from "../components/Protected";

export default function UpdatePage() {
  return (
    <>
      <Protected>
        <Navbar />
        <CardUpdate />
      </Protected>
    </>
  );
}
