
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../services/authService";
import { toast } from "react-toastify";

const CardRegister = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ ฟังก์ชันเช็ค email format
  const isValidEmail = (value: string) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    // ✅ validation frontend ก่อนส่งไป backend
    if (!isValidEmail(email)) {
      toast.error("กรุณากรอกอีเมลให้ถูกต้อง", { position: "top-right" });
      return;
    }
    if (password.length < 6) {
      toast.error("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร", {
        position: "top-right",
      });
      return;
    }

    try {
      setLoading(true);

      await register(email, password);

      toast.success("สมัครสมาชิกสำเร็จ ", {
        position: "top-right",
        autoClose: 3000,
      });

      // ✅ ไปหน้า verify (คุณสร้างไว้แล้ว)
      router.push("/verify");
    } catch (err) {
      toast.error(`สมัครสมาชิกไม่สำเร็จ`, {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/Image/herobottom.jpg')] bg-cover bg-center p-4 font-[family-name:var(--font-el-messiri)]">
      <div className="card card-border bg-white/0 backdrop-blur-md rounded-xl items-center max-w-md mx-auto border-2 border-neutral">
        <div className="card-body">
          <h1 className="flex justify-center text-2xl font-bold mb-4 no-caret">
            สมัครสมาชิก
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label no-caret">
                <span className="text-lg ">Email</span>
              </label>
              <label className="input validator bg-neutral-900">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="input email"
                  required
                  className="w-full bg-transparent outline-none"
                />
              </label>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label no-caret">
                <span className="text-lg">Password</span>
              </label>
              <label className="input validator bg-neutral-900">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="input password"
                  required
                  className="w-full bg-transparent outline-none"
                />
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardRegister;
