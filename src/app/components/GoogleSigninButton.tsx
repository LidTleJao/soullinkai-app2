"use client";

import {
  signInWithPopup,
  signInWithRedirect,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebaseClient";
import { verifyIdToken } from "../services/authService";
import { toast } from "react-toastify";

export default function GoogleSigninButton({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const handleGoogle = async () => {
    try {
      // ให้ Firebase เก็บ session ไว้ใน localStorage
      await auth.setPersistence(browserLocalPersistence);

      // ช่วยลดปัญหา auto-select บัญชี
      googleProvider.setCustomParameters({ prompt: "select_account" });

      // เรียก popup "ตรงๆ" ใน onClick
      const res = await signInWithPopup(auth, googleProvider);

      const token = await res.user.getIdToken(true); // Firebase ID token
      await verifyIdToken(token);
      onSuccess();
    } catch (e) {
      console.warn("Google sign-in failed:", e);

      // ถ้าถูกบล็อก popup → fallback เป็น redirect
      const error = e as { code?: string; message?: string };
      if (
        error.code === "auth/popup-blocked" ||
        error.message?.includes("popup-blocked")
      ) {
        try {
          await auth.setPersistence(browserLocalPersistence);
          googleProvider.setCustomParameters({ prompt: "select_account" });
          await signInWithRedirect(auth, googleProvider);
          // กลับมาหลัง redirect แล้ว หน้า app ของคุณควรตรวจ auth state / getIdToken และเรียก verify เอง
        } catch (err) {
          console.error("Google sign-in redirect failed:", err);
          toast.error("ไม่สามารถเข้าสู่ระบบด้วย Google ได้ (redirect).", {
            position: "top-right",
          });
          // alert("ไม่สามารถเข้าสู่ระบบด้วย Google ได้ (redirect).");
        }
        return;
      }

      // กรณีอื่น ๆ
      toast.error("เข้าสู่ระบบด้วย Google ไม่สำเร็จ", {
        position: "top-right",
      });
      // alert("เข้าสู่ระบบด้วย Google ไม่สำเร็จ");
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogle}
      className="btn bg-white text-black w-full"
      aria-label="Sign in with Google"
    >
      <svg
        aria-label="Google logo"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <g>
          <path d="m0 0H512V512H0" fill="#fff"></path>
          <path
            fill="#34a853"
            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
          ></path>
          <path
            fill="#4285f4"
            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
          ></path>
          <path
            fill="#fbbc02"
            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
          ></path>
          <path
            fill="#ea4335"
            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
          ></path>
        </g>
      </svg>
      Sign in with Google
    </button>
  );
}
