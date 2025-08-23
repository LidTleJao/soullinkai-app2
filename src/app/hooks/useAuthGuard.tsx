'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "../services/authService";

export default function useAuthGuard() {
  const router = useRouter();
  useEffect(()=>{ if(!isLoggedIn()) router.replace("/Login"); },[router]);
}
