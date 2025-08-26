// // src/app/components/Protected.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { auth } from "../config/firebaseClient";
// import { onIdTokenChanged } from "firebase/auth";

// export default function Protected({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const sp = useSearchParams();
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     const unsub = onIdTokenChanged(auth, async (user) => {
//       if (!user) {
//         // เคลียร์ session ฝั่ง client เผื่อหลงเหลือ
//         localStorage.removeItem("idToken");
//         localStorage.removeItem("uid");
//         localStorage.removeItem("profile");

//         const next = encodeURIComponent(
//           window.location.pathname + window.location.search
//         );
//         router.replace(`/Login?next=${next}`);
//         return;
//       }
//       // มี user -> รีเฟรช token เก็บไว้ใช้กับ axios interceptor
//       const token = await user.getIdToken(true);
//       localStorage.setItem("idToken", token);
//       localStorage.setItem("uid", user.uid);

//       setChecking(false);
//     });

//     return () => unsub();
//   }, [router, sp]);

//   // กันกระพริบ: โชว์ loader เต็มหน้าจอระหว่างตรวจสอบสิทธิ์
//   if (checking) {
//     return (
//       <div className="min-h-screen w-full flex items-center justify-center">
//         <span className="loading loading-spinner loading-lg" />
//       </div>
//     );
//   }

//   return <>{children}</>;
// }

"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isLoggedIn } from "../services/authService"; // ฟังก์ชันของคุณที่เช็ค localStorage

export default function Protected({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // รันบน client เท่านั้น
    const ok = isLoggedIn(); // อ่านจาก localStorage
    if (!ok) {
      const next = encodeURIComponent(pathname || "/");
      router.replace(`/Login?next=${next}`);
      return;
    }
    setReady(true);
  }, [router, pathname]);

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="loading loading-spinner" />
      </div>
    );
  }
  return <>{children}</>;
}
