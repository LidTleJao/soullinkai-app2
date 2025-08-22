"use client";

import { useEffect, useState } from "react";
import { verifyIdToken, logout } from "../services/authService";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const [status, setStatus] = useState("กำลังตรวจสอบ...");
  const router = useRouter();

  useEffect(() => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      setStatus("ยังไม่ได้เข้าสู่ระบบ");
      router.push("/login");
      return;
    }
    (async () => {
      try {
        const res = await verifyIdToken(idToken);
        setStatus(`✅ ยืนยันแล้ว: UID = ${res.uid}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setStatus("❌ Token ไม่ถูกต้อง กรุณา login ใหม่");
        logout();
        router.push("/login");
      }
    })();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-xl">{status}</p>
    </div>
  );
}
