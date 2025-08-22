// 'use client';
// import useAuthGuard from "../hooks/useAuthGuard";
// import { getUid, logout } from "../services/authService";
// import { useRouter } from "next/navigation";

// export default function ProfilePage(){
//   useAuthGuard();
//   const router = useRouter(); const uid = getUid();
//   return (
//     <div className="bg-white/5 border border-white/10 p-6 rounded-xl max-w-xl">
//       <h1 className="text-2xl font-bold mb-3">Profile</h1>
//       <div className="text-white/80">UID: {uid}</div>
//       <button onClick={()=>{logout(); router.push("/auth");}} className="mt-4 bg-red-600 px-4 py-2 rounded">Logout</button>
//     </div>
//   );
// }

'use client';
import { useEffect, useState } from "react";
import useAuthGuard from "../hooks/useAuthGuard";
import { getUid, logout } from "../services/authService";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  useAuthGuard();
  const router = useRouter();
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    // เรียก getUid เฉพาะ client
    setUid(getUid());
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  if (!uid) return <p>Loading...</p>; // รอโหลด client

  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl max-w-xl">
      <h1 className="text-2xl font-bold mb-3">Profile</h1>
      <div className="text-white/80">UID: {uid}</div>
      <button onClick={handleLogout} className="mt-4 bg-red-600 px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
