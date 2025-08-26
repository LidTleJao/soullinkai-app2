import Navbar from "../components/Navbar";
import Protected from "../components/Protected";
import SecurityForm from "../components/SecurityForm";

export default function SecurityPage() {
  return (
    <>
      <Protected>
        <Navbar />
        <SecurityForm />
      </Protected>
    </>
  );
}
