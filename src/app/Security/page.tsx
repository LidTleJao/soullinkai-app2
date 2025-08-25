import Navbar from "../components/Navbar";
import SecurityForm from "../components/SecurityForm";

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Security</h1>
      <SecurityForm />
    </>
  );
}
