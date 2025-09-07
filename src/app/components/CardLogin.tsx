"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../services/authService";
import GoogleSigninButton from "./GoogleSigninButton";
import { toast } from "react-toastify";
import Image from "next/image";

const CardLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      toast.success("เข้าสู่ระบบสำเร็จ 🎉", {
        position: "top-right",
        autoClose: 3000,
      });

      router.push("/Verify");
    } catch (err: unknown) {
      if (err) {
        // alert(err.message);
        toast.error(`เข้าสู่ระบบไม่สำเร็จ`, {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Login failed:", err);
      } else {
        // alert("Something went wrong");
        toast.error(`Something went wrong`, {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Login failed:", err);
      }
    } finally {
      setLoading(false);
    }
  }

  const onSuccess = () => router.push("/Verify");

  return (
    <>
      {/* <div
        className="min-h-screen flex flex-row items-center justify-center lg:pr-44 bg-base-100 bg-cover bg-center font-[family-name:var(--font-el-messiri)]"
      >
        <div className="hidden lg:flex items-center justify-center">
          <img
            src="/Image/bg_login.jpg"
            alt="login_background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="card card-border bg-base-100 backdrop-blur-md rounded-xl items-center max-w-md mx-auto lg:ml-auto lg:mr-20 border-2 border-blue-300">
          <div className="card-body">
            <h1 className="flex justify-center text-2xl font-bold mb-4 no-caret text-base-content font-[family-name:var(--font-noto-sans-thai)]">
              เข้าสู่ระบบ
            </h1>
            <form
              // onSubmit={handleLogin}
              className="space-y-4"
            >
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
                    className="text-black"
                    required
                  />
                </label>
              </div>
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
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="input password"
                    className="text-black"
                    required
                  />
                </label>
              </div>
              <div className="form-control flex flex-col space-y-6 items-center max-w-full">
                <div className="flex flex-row justify-between w-full p-2">
                  <a
                    href={"/Register"}
                    aria-label="register button"
                    className="btn btn-neutral bg-blue-300 hover:bg-blue-500 text-white mt-4 border-0 rounded-xl font-[family-name:var(--font-noto-sans-thai)]"
                  >
                    สมัครสมาชิก
                  </a>
                  <button
                    type="submit"
                    aria-label="submit login admin form"
                    className="btn btn-neutral bg-green-300 hover:bg-green-500 text-white mt-4 border-0 rounded-xl font-[family-name:var(--font-noto-sans-thai)]"
                    onClick={handleLogin}
                  >
                    {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                  </button>
                </div>
                <GoogleSigninButton onSuccess={onSuccess} />
              </div>
            </form>
          </div>
        </div>
      </div> */}
      <div className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-2 items-center gap-8 bg-base-100 font-[family-name:var(--font-el-messiri)]">
        <div className="hidden lg:block">
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
        <div className="flex justify-center lg:justify-start lg:ml-20 p-8">
          <div className="card card-border bg-base-100 backdrop-blur-md rounded-xl items-center w-full max-w-md border-2 border-blue-300 shadow-sm">
            <div className="card-body">
              <h1 className="flex justify-center text-2xl font-bold mb-4 no-caret text-base-content font-[family-name:var(--font-noto-sans-thai)]">
                เข้าสู่ระบบ
              </h1>
              <form onSubmit={handleLogin} className="space-y-4">
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
                      className="text-black"
                      required
                    />
                  </label>
                </div>

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
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-label="input password"
                      className="text-black"
                      required
                    />
                  </label>
                </div>

                <div className="form-control flex flex-col space-y-6 items-center max-w-full">
                  <div className="flex flex-row justify-between w-full p-2">
                    <a
                      href={"/Register"}
                      aria-label="register button"
                      className="btn btn-neutral bg-blue-300 hover:bg-blue-500 text-white mt-4 border-0 rounded-xl font-[family-name:var(--font-noto-sans-thai)]"
                    >
                      สมัครสมาชิก
                    </a>
                    <button
                      type="submit"
                      aria-label="submit login admin form"
                      className="btn btn-neutral bg-green-300 hover:bg-green-500 text-white mt-4 border-0 rounded-xl font-[family-name:var(--font-noto-sans-thai)]"
                      disabled={loading}
                    >
                      {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                    </button>
                  </div>
                  <GoogleSigninButton onSuccess={onSuccess} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardLogin;
