
// src/app/components/SubscriptionForm.tsx
"use client";
import { useEffect, useState } from "react";
import { createCheckout, getSubscriptionStatus } from "../services/subscriptionService";
import { toast } from "react-toastify";

type SubStatus = { plan: string; status: string } | null;

export default function SubscriptionForm() {
  const [sub, setSub] = useState<SubStatus>(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await getSubscriptionStatus();
        setSub(r.subscription || null);
      } catch (e) {
        console.error(e);
        toast.error("โหลดสถานะไม่สำเร็จ", { position: "top-right" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const go = async () => {
    try {
      setRedirecting(true);
      const r = await createCheckout();
      if (r?.url) {
        toast.info("กำลังไปยังหน้าชำระเงิน…", {
          position: "top-right",
          autoClose: 1500,
        });
        window.location.href = r.url;
      } else {
        toast.error("Checkout error: ไม่มี URL", { position: "top-right" });
        setRedirecting(false);
      }
    } catch (e) {
      console.error(e);
      toast.error("สร้าง checkout ไม่สำเร็จ", { position: "top-right" });
      setRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/Image/heroBottom.jpg')] bg-cover bg-center flex flex-col items-center justify-center p-4 font-[family-name:var(--font-el-messiri)]">
      <h1 className="text-2xl lg:text-5xl font-bold mb-4 text-[#EAF2FF] no-caret">Subscription</h1>
      <div className="w-full max-w-xl">
        {loading ? (
          <div
            className="rounded-xl p-6"
            style={{ background: "#111419", border: "1px solid #2A2F3A", color: "#EAF2FF" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Your Plan</h2>
              <div className="skeleton h-6 w-20 bg-[#2A2F3A]" />
            </div>
            <div className="skeleton h-4 w-1/2 mt-2 bg-[#2A2F3A]" />
            <div className="skeleton h-10 w-36 mt-4 bg-[#2A2F3A]" />
          </div>
        ) : (
          <div
            className="rounded-xl p-6 space-y-6"
            style={{ background: "#111419", border: "1px solid #2A2F3A", color: "#EAF2FF" }}
          >
            <div className="flex items-center justify-between  no-caret ">
              <h2 className="font-bold">Your Plan</h2>
              <div
                className={`badge${sub?.status === "active" ? "badge-success" : "badge-neutral"} badge-outline`}
                style={{ color: "#EAF2FF" }}
                title={sub ? `${sub.plan} / ${sub.status}` : "Free / inactive"}
              >
                {sub ? `${sub.plan} • ${sub.status}` : "Free • inactive"}
              </div>
            </div>

            <p className="opacity-80 mt-2  no-caret ">
              {sub?.status === "active"
                ? "ขอบคุณที่เป็นสมาชิก! คุณสามารถอัปเกรดหรือจัดการการสมัครได้ทุกเมื่อ"
                : "อัปเกรดเพื่อปลดล็อกฟีเจอร์เพิ่มเติมและโควต้าใช้งานสูงขึ้น"}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 space-y-5">
              <button
                className="btn"
                style={{ background: "#2563EB", color: "#fff" }}
                onClick={go}
                disabled={redirecting}
              >
                {redirecting ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    กำลังไปหน้าเช็คเอาต์…
                  </>
                ) : (
                  "Subscribe / Upgrade"
                )}
              </button>

              <div className="hidden sm:flex gap-2  no-caret ">
                <div className="badge badge-outline" style={{ color: "#EAF2FF", borderColor: "#2A2F3A" }}>
                  เพิ่มโควต้า AI
                </div>
                <div className="badge badge-outline" style={{ color: "#EAF2FF", borderColor: "#2A2F3A" }}>
                  อัปโหลดได้มากขึ้น
                </div>
                <div className="badge badge-outline" style={{ color: "#EAF2FF", borderColor: "#2A2F3A" }}>
                  ซัพพอร์ตเร็วขึ้น
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
