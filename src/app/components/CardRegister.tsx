"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../services/authService";
import { toast } from "react-toastify";
import Image from "next/image";

const CardRegister = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

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

      toast.success("สมัครสมาชิกสำเร็จ 🎉", {
        position: "top-right",
        autoClose: 3000,
      });

      router.push("/Verify");
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
    <div 
    // className="flex items-center justify-between lg:pl-44 bg-base-100 bg-cover bg-center font-[family-name:var(--font-el-messiri)]"
    className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-2 items-center gap-8 bg-base-100 font-[family-name:var(--font-el-messiri)]"
    >
      <div className="card card-border bg-base-100 backdrop-blur-md rounded-xl items-center max-w-md mx-auto lg:mr-auto border-2 border-blue-300">
        <div className="card-body">
          <h1 className="flex justify-center text-2xl font-bold mb-4 no-caret text-base-content font-[family-name:var(--font-noto-sans-thai)]">
            สมัครสมาชิก
          </h1>

          <form onSubmit={handleRegister} className="space-y-4 ">
            <div className="form-control">
              <label className="label no-caret">
                <span className="text-lg text-base-content">Email</span>
              </label>
              <label className="input validator bg-white border-2 border-blue-300">
                <svg
                  className="h-[1em] opacity-50 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="input email"
                  required
                  className="w-full bg-transparent outline-none text-black"
                />
              </label>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label no-caret">
                <span className="text-lg text-base-content">Password</span>
              </label>
              <label className="input validator bg-white border-2 border-green-300">
                <svg
                  className="h-[1em] opacity-50 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="input password"
                  required
                  className="w-full bg-transparent outline-none text-black"
                />
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-neutral w-full py-2 rounded-xl text-white border-0 font-[family-name:var(--font-noto-sans-thai)] ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-300 hover:bg-blue-500"
              }`}
            >
              {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block ">
        <figure>
          <Image
            width={800}
            height={600}
            // src="/Image/bg_login.jpg"
            src={`https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Fbg_login.jpg?alt=media&token=b04c2227-43cb-4365-93aa-8bada7e5ae9f`}
            alt="login illustration"
            className="w-full h-[95vh] max-h-[95vh] object-cover"
          />
        </figure>
      </div>
    </div>
  );
};

export default CardRegister;
