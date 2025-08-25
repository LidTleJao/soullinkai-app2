import Navbar from "../components/Navbar";
import SubscriptionForm from "../components/SubscriptionForm";

export default function SubscriptionPage() {
  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Subscription</h1>
      <SubscriptionForm />
    </>
  );
}
