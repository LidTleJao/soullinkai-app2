import CardSummarize from "../components/CardSummarize";
import Navbar from "../components/Navbar";
import Protected from "../components/Protected";

export default function SummarizePage() {
  return (
    <>
      <Protected>
        <Navbar />
        <CardSummarize />
      </Protected>
    </>
  );
}
