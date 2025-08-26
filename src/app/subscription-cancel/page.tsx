import CardSubscriptionCancel from "../components/CardSubscriptionCancel";
import Navbar from "../components/Navbar";
import Protected from "../components/Protected";

export default function SubscriptionCancelPage() {
  return (
    <>
      <Protected>
        <Navbar />
        <CardSubscriptionCancel />
      </Protected>
    </>
  );
}
