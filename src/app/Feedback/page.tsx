import CardFeedback from "../components/CardFeedback";
import Navbar from "../components/Navbar";
import Protected from "../components/Protected";

export default function FeedbackPage() {
  return (
    <>
      <Protected>
        <Navbar />
        <CardFeedback />
      </Protected>
    </>
  );
}
