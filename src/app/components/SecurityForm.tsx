"use client";
import { useState } from "react";
import {
  requestOtp,
  verifyOtp,
  setupSecurityQuestions,
} from "../services/securityService";
import { toast } from "react-toastify";

export default function SecurityForm() {
  const [otp, setOtp] = useState("");
  const [qs, setQs] = useState([{ question: "Your first school?", answer: "" }]);

  // loading flags
  const [loadingReq, setLoadingReq] = useState(false);
  const [loadingVer, setLoadingVer] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const req = async () => {
    try {
      setLoadingReq(true);
      const r = await requestOtp();

      // DEV-ONLY: แสดง OTP ด้วย toast (โปรดปิดใน production)
      if (r?.otp) {
        toast.info(`OTP (dev only): ${r.otp}`, {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.success("ส่ง OTP แล้ว โปรดตรวจอีเมล/เบอร์โทรของคุณ", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("requestOtp failed:", err);
      toast.error("ขอ OTP ไม่สำเร็จ ลองใหม่อีกครั้ง", { position: "top-right" });
    } finally {
      setLoadingReq(false);
    }
  };

  const ver = async () => {
    if (!otp.trim()) {
      toast.warn("กรุณากรอก OTP ก่อน", { position: "top-right" });
      return;
    }
    try {
      setLoadingVer(true);
      const r = await verifyOtp(otp.trim());
      if (r?.ok) {
        toast.success("ยืนยัน OTP สำเร็จ 🎉", { position: "top-right" });
      } else {
        toast.error("OTP ไม่ถูกต้อง", { position: "top-right" });
      }
    } catch (err) {
      console.error("verifyOtp failed:", err);
      toast.error("ยืนยัน OTP ไม่สำเร็จ", { position: "top-right" });
    } finally {
      setLoadingVer(false);
    }
  };

  const add = () => setQs((prev) => [...prev, { question: "", answer: "" }]);

  const save = async () => {
    // validate
    const invalid = qs.some((q) => !q.question.trim() || !q.answer.trim());
    if (invalid) {
      toast.warn("กรุณากรอกคำถามและคำตอบให้ครบทุกข้อ", { position: "top-right" });
      return;
    }

    try {
      setLoadingSave(true);
      await setupSecurityQuestions(qs);
      toast.success("บันทึกคำถามรักษาความปลอดภัยสำเร็จ ✨", {
        position: "top-right",
      });
    } catch (err) {
      console.error("setupSecurityQuestions failed:", err);
      toast.error("บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง", { position: "top-right" });
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-[family-name:var(--font-el-messiri)]">
      <div className="flex flex-col items-center space-y-8 mb-10 no-caret w-full max-w-3xl">
        <h1 className="text-2xl lg:text-6xl font-bold">Security</h1>

        {/* OTP Section */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 ">
          <div className="font-semibold mb-2">One-Time Password</div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={req}
              disabled={loadingReq}
              className={`btn border-0 text-white px-3 py-1 rounded ${
                loadingReq ? "bg-blue-600/60 cursor-not-allowed" : "bg-blue-600"
              }`}
            >
              {loadingReq ? "Requesting..." : "Request OTP"}
            </button>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="px-2 py-1 bg-black/40 border border-white/20 rounded"
            />
            <button
              onClick={ver}
              disabled={loadingVer}
              className={`btn border-0 text-white px-3 py-1 rounded ${
                loadingVer ? "bg-emerald-600/60 cursor-not-allowed" : "bg-emerald-600"
              }`}
            >
              {loadingVer ? "Verifying..." : "Verify"}
            </button>
          </div>
          <p className="text-xs text-white/70 mt-5">
            * โปรดเปลี่ยนเป็นส่ง OTP ทาง Email/SMS ใน production
          </p>
        </div>

        {/* Security Questions */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="font-semibold">Security Questions</div>
          {qs.map((q, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-2 mt-2">
              <input
                className="flex-1 px-2 py-1 bg-black/40 border border-white/20 rounded"
                placeholder="Question"
                value={q.question}
                onChange={(e) => {
                  const a = [...qs];
                  a[i].question = e.target.value;
                  setQs(a);
                }}
              />
              <input
                className="flex-1 px-2 py-1 bg-black/40 border border-white/20 rounded"
                placeholder="Answer"
                value={q.answer}
                onChange={(e) => {
                  const a = [...qs];
                  a[i].answer = e.target.value;
                  setQs(a);
                }}
              />
            </div>
          ))}
          <div className="mt-3 flex gap-2">
            <button
              onClick={add}
              className="btn border-0 text-white bg-white/10 px-3 py-1 rounded"
            >
              Add
            </button>
            <button
              onClick={save}
              disabled={loadingSave}
              className={`btn border-0 text-white px-3 py-1 rounded ${
                loadingSave ? "bg-purple-600/60 cursor-not-allowed" : "bg-purple-600"
              }`}
            >
              {loadingSave ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
