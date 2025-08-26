import Navbar from "../components/Navbar";
import Protected from "../components/Protected";
import SubscriptionForm from "../components/SubscriptionForm";

export default function SubscriptionPage() {
  return (
    <>
      <Protected>
        <Navbar />
        <SubscriptionForm />
      </Protected>
    </>
  );
}
