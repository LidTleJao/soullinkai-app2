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
  const [qs, setQs] = useState([
    { question: "Your first school?", answer: "" },
  ]);

  // loading flags
  const [loadingReq, setLoadingReq] = useState(false);
  const [loadingVer, setLoadingVer] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const req = async () => {
    try {
      setLoadingReq(true);
      // const r = await requestOtp();
      const r = await requestOtp();
      // toast.success("ส่ง OTP ไปยังอีเมลของคุณแล้ว", { position: "top-right" });

      if (r?.ok) {
        toast.success("ยืนยัน OTP สำเร็จ 🎉", { position: "top-right" });
      } else {
        toast.error("OTP ไม่ถูกต้องหรือหมดอายุ", { position: "top-right" });
      }
    } catch (err) {
      console.error("requestOtp failed:", err);
      toast.error("ขอ OTP ไม่สำเร็จ ลองใหม่อีกครั้ง", {
        position: "top-right",
      });
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
      toast.warn("กรุณากรอกคำถามและคำตอบให้ครบทุกข้อ", {
        position: "top-right",
      });
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
    <div 
    // className="min-h-screen flex flex-col bg-[url(https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2FadminDB.jpg?alt=media&token=f83560b4-9acf-43f5-85dc-7925c3e71fce)] bg-cover bg-center items-center justify-center p-4 font-[family-name:var(--font-el-messiri)]"
    className="min-h-screen flex flex-col bg-base-100 items-center justify-center p-4 font-[family-name:var(--font-el-messiri)]"
    >
      <div className="flex flex-col items-center space-y-8 mb-10 w-full max-w-3xl">
        <h1 className="text-2xl lg:text-6xl font-bold text-base-content no-caret">Security</h1>

        {/* OTP Section */}
        <div className="p-4 rounded-xl border-2 border-blue-300 ">
          <div className="font-semibold mb-2 text-base-content">One-Time Password</div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={req}
              disabled={loadingReq}
              className={`btn btn-neutral border-0 text-white px-3 py-1 rounded ${
                loadingReq ? "bg-blue-300/60 cursor-not-allowed" : "bg-blue-300 hover:bg-blue-500"
              }`}
            >
              {loadingReq ? "Requesting..." : "Request OTP"}
            </button>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="input px-2 py-1 bg-white border-2 border-green-300 rounded max-w-max text-black"
            />
            <button
              onClick={ver}
              disabled={loadingVer}
              className={`btn btn-neutral border-0 text-white px-3 py-1 rounded ${
                loadingVer
                  ? "bg-green-300/60 cursor-not-allowed"
                  : "bg-green-300 hover:bg-green-500"
              }`}
            >
              {loadingVer ? "Verifying..." : "Verify"}
            </button>
          </div>
          <p className="text-xs text-base-content mt-5 font-[family-name:var(--font-noto-sans-thai)]">
            * โปรดเปลี่ยนเป็นส่ง OTP ทาง Email/SMS ใน production
          </p>
        </div>

        {/* Security Questions */}
        <div className="p-4 rounded-xl border-2 border-green-300">
          <div className="font-semibold text-base-content">Security Questions</div>
          {qs.map((q, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-2 mt-2">
              <input
                className="flex-1 px-2 py-1 bg-white border-2 border-blue-300 rounded text-black"
                placeholder="Question"
                value={q.question}
                onChange={(e) => {
                  const a = [...qs];
                  a[i].question = e.target.value;
                  setQs(a);
                }}
              />
              <input
                className="flex-1 px-2 py-1 bg-white border-2 border-blue-300 rounded text-black"
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
              className="btn btn-neutral border-0 text-black bg-white px-3 py-1 rounded"
            >
              Add
            </button>
            <button
              onClick={save}
              disabled={loadingSave}
              className={`btn btn-neutral border-0 text-black px-3 py-1 rounded ${
                loadingSave
                  ? "bg-purple-300/60 cursor-not-allowed"
                  : "bg-purple-300 hover:bg-purple-500"
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
