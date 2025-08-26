// 'use client';
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { isLoggedIn } from "../services/authService";

// export default function useAuthGuard() {
//   const router = useRouter();
//   useEffect(()=>{ if(!isLoggedIn()) router.replace("/Login"); },[router]);
// }

// src/app/hooks/useAuthGuard.ts
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../config/firebaseClient";
import { onIdTokenChanged } from "firebase/auth";

export default function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    // ฟังทุกครั้งที่ token เปลี่ยน (login/logout/refresh)
    const unsub = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        // ไม่มี user -> เด้ง login พร้อม next
        if (typeof window !== "undefined") {
          localStorage.removeItem("idToken");
          localStorage.removeItem("uid");
          localStorage.removeItem("profile");
          const next = encodeURIComponent(
            window.location.pathname + window.location.search
          );
          router.replace(`/Login?next=${next}`);
        }
        return;
      }

      // มี user -> อัปเดต token ใส่ localStorage (force refresh ให้แน่ใจว่าทันสมัย)
      const token = await user.getIdToken(/* forceRefresh */ true);
      localStorage.setItem("idToken", token);
      localStorage.setItem("uid", user.uid);
    });

    // refresh token เป็นระยะ (กัน token ใกล้หมดอายุ)
    const interval = setInterval(async () => {
      const u = auth.currentUser;
      if (u) await u.getIdToken(true);
    }, 10 * 60 * 1000); // ทุก 10 นาที

    return () => {
      unsub();
      clearInterval(interval);
    };
  }, [router]);
}
