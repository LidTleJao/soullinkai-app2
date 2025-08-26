"use client";
import { useState } from "react";
import { sendFeedback } from "../services/feedbackService";
import useAuthGuard from "../hooks/useAuthGuard";
import { toast } from "react-toastify";

const CardFeedback = () => {
  useAuthGuard();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!text.trim()) {
      toast.warn("กรุณากรอกข้อความก่อนส่ง", { position: "top-right" });
      return;
    }
    try {
      setLoading(true);
      await sendFeedback(text.trim());
      setText("");
      toast.success("ขอบคุณสำหรับ Feedback ของคุณ 🎉", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("ส่ง feedback ล้มเหลว:", err);
      toast.error("ส่ง feedback ไม่สำเร็จ ลองใหม่อีกครั้ง", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url(https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Flogin.jpg?alt=media&token=22362023-f57d-4066-b91d-209b63c9880e)] bg-cover bg-center font-[family-name:var(--font-el-messiri)]">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="card bg-black/80 border border-white/10 p-6 rounded-xl w-full max-w-lg">
          <h1 className="text-3xl font-extrabold mb-4 no-caret">
            Send Feedback
          </h1>
          <textarea
            value={text}
            minLength={10}
            maxLength={1000}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your suggestion..."
            className="w-full h-64 bg-black/40 border border-white/20 rounded p-3"
          />
          <button
            onClick={submit}
            disabled={loading}
            className={`btn mt-3 px-6 py-2 rounded-full no-caret ${
              loading
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-white text-black"
            }`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default CardFeedback;
