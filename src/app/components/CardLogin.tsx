"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../services/authService";
import GoogleSigninButton from "./GoogleSigninButton";

const CardLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/verify");
    } catch (err: unknown) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("Something went wrong");
    }
  }
  }

  const onSuccess = () => router.push("/verify");

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[url('/Image/herobottom.jpg')] bg-cover bg-center p-4 font-[family-name:var(--font-el-messiri)]">
        <div className="card card-border bg-white/0 backdrop-blur-md rounded-xl items-center max-w-md mx-auto border-2 border-neutral">
          <div className="card-body">
            <h1 className="flex justify-center text-2xl font-bold mb-4 no-caret">
              เข้าสู่ระบบ
            </h1>
            <form
              // onSubmit={handleLogin}
              className="space-y-4"
            >
              <div className="form-control">
                <label className="label no-caret">
                  <span className="text-lg ">Email</span>
                </label>
                <label className="input validator text-base-content">
                  <svg
                    className="h-[1em] opacity-50"
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
                    type="text"
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="input username"
                    required
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label no-caret">
                  <span className="text-lg">Password</span>
                </label>
                <label className="input validator text-base-content">
                  <svg
                    className="h-[1em] opacity-50"
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
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="input password"
                    required
                  />
                </label>
              </div>
              <div className="form-control flex flex-col space-y-6 items-center max-w-full">
                <div className="flex flex-row justify-between w-full p-4">
                  <button
                    aria-label="submit login admin form"
                    className="btn bg-white text-black mt-4"
                    onClick={() => router.push("/Register")}
                  >
                    สมัครสมาชิก
                  </button>
                  <button
                    type="submit"
                    aria-label="submit login admin form"
                    className="btn bg-white text-black mt-4"
                    onClick={handleLogin}
                  >
                    เข้าสู่ระบบ
                  </button>
                </div>
                <GoogleSigninButton onSuccess={onSuccess} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardLogin;
