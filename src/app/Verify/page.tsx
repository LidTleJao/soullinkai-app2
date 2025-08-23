// "use client";

// import { useEffect, useState } from "react";
// import { verifyIdToken, logout } from "../services/authService";
// import { useRouter } from "next/navigation";

// export default function VerifyPage() {
//   const [status, setStatus] = useState("กำลังตรวจสอบ...");
//   const router = useRouter();

//   useEffect(() => {
//     const idToken = localStorage.getItem("idToken");
//     if (!idToken) {
//       setStatus("ยังไม่ได้เข้าสู่ระบบ");
//       router.push("/Login");
//       return;
//     }
//     (async () => {
//       try {
//         const res = await verifyIdToken(idToken);
//         setStatus(`✅ ยืนยันแล้ว: UID = ${res.uid}`);
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       } catch (err) {
//         setStatus("❌ Token ไม่ถูกต้อง กรุณา login ใหม่");
//         logout();
//         router.push("/Login");
//       }
//     })();
//   }, [router]);

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <p className="text-xl">{status}</p>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, logout } from "../services/authService";

interface Profile {
  email: string;
  role: string;
  // Add other properties if needed
}

export default function VerifyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const p = getProfile();
    if (!p) {
      logout();
      router.push("/login");
    } else {
      setProfile(p);

      // ✅ Redirect ตาม role
      if (p.role === "admin") {
        router.push("/Dashboard");
      } else {
        router.push("/Personas");
      }
    }
    setLoading(false);
  }, [router]);

  if (loading) return <div>กำลังตรวจสอบ...</div>;

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-2xl font-bold">กำลังตรวจสอบสิทธิ์...</h1>
        {profile && (
          <p className="mt-2">Welcome {profile.email} (role: {profile.role})</p>
        )}
      </div>
    </div>
  );
}
