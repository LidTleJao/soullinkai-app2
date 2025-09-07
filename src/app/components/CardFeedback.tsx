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
    <div
      // className="min-h-screen bg-[url(https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Flogin.jpg?alt=media&token=22362023-f57d-4066-b91d-209b63c9880e)] bg-cover bg-center font-[family-name:var(--font-el-messiri)]"
      className="min-h-screen bg-base-100 font-[family-name:var(--font-el-messiri)]"
    >
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="card  border-2 border-green-300 rounded-xl w-full max-w-lg p-5">
          <h1 className="text-3xl font-extrabold mb-4 no-caret text-base-content">
            Send Feedback
          </h1>
          <textarea
            value={text}
            minLength={10}
            maxLength={1000}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your suggestion..."
            className="textarea w-full h-64 bg-white border-2 border-blue-300 p-3 text-black rounded-xl"
          />
          <button
            onClick={submit}
            disabled={loading}
            className={`btn btn-neutral mt-3 px-6 py-2 border-0 rounded-full no-caret ${
              loading
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-blue-300 hover:bg-blue-500 text-white"
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
