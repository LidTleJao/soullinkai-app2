"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Theme_Controller from "./Theme_Controller";
import { isLoggedIn, logout } from "@/app/services/authService";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // รอให้ client mount แล้วค่อยอ่านค่า login จาก localStorage
  useEffect(() => {
    setMounted(true);
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setIsMenuOpen(false);
    router.push("/Login");
  };

  // ปุ่ม/ลิงก์ด้านขวา (desktop)
  const RightActions = () => {
    if (!mounted) {
      return (
        <div className="hidden md:flex items-center space-x-4 opacity-50">
          <span className="btn btn-ghost btn-sm pointer-events-none">
            Loading…
          </span>
          <Theme_Controller />
        </div>
      );
    }

    if (loggedIn) {
      return (
        <div className="hidden md:flex items-center space-x-4">
          {/* <Link href="/" className="btn btn-neutral rounded-lg">
            Home
          </Link> */}
          <Link
            href="/Personas"
            className="btn btn-neutral bg-green-300 hover:bg-green-500 text-white border-0 rounded-lg"
          >
            Dashboard
          </Link>
          <Link
            href="/Subscription"
            className="btn btn-neutral bg-green-300 hover:bg-green-500 text-white border-0 rounded-lg"
          >
            Subscription
          </Link>
          <Link
            href="/Feedback"
            className="btn btn-neutral bg-green-300 hover:bg-green-500 text-white border-0 rounded-lg"
          >
            Feedback
          </Link>
          <Link
            href="/Security"
            className="btn btn-neutral bg-blue-300 hover:bg-blue-500 text-white border-0 rounded-lg"
          >
            Security
          </Link>
          <Link
            href="/Summarize"
            className="btn btn-neutral bg-blue-300 hover:bg-blue-500 text-white border-0 rounded-lg"
          >
            Summarize
          </Link>
          <button
            onClick={handleLogout}
            className="btn btn-ghost hover:bg-red-500 rounded-lg border-0"
          >
            Logout
          </button>
          <Theme_Controller />
        </div>
      );
    }

    return (
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/" className="btn btn-neutral bg-green-300 hover:bg-green-500 text-white border-0 rounded-lg">
          Home
        </Link>
        <Link href="/Login" className="btn btn-neutral bg-blue-300 hover:bg-blue-500 text-white border-0 rounded-lg">
          Login
        </Link>
        <Theme_Controller />
      </div>
    );
  };

  // เมนูมือถือ (slide-in)
  const MobileMenu = () => (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-base-content text-base-100 p-6 shadow-lg transform transition-transform duration-300 no-caret ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsMenuOpen(false)}
          className="mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col space-y-4">
          {mounted && loggedIn ? (
            <>
              <Link
                href="/Personas"
                className="btn btn-neutral bg-green-300 hover:bg-green-500 text-white border-0 rounded-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/Subscription"
                className="btn btn-neutral bg-green-300 hover:bg-green-500 text-white border-0 rounded-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Subscription
              </Link>
              <Link
                href="/Feedback"
                className="btn btn-neutral bg-green-300 hover:bg-green-500 text-white border-0 rounded-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Feedback
              </Link>
              <Link
                href="/Security"
                className="btn btn-neutral bg-blue-300 hover:bg-blue-500 text-white border-0 rounded-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Security
              </Link>
              <Link
                href="/Summarize"
                className="btn bg-blue-300 hover:bg-blue-500 text-white border-0 rounded-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Summarize
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-ghost hover:bg-red-500 border-0 rounded-2xl"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="btn btn-neutral bg-green-300 text-white border-0 rounded-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/Login"
                className="btn btn-neutral bg-blue-300 hover:bg-blue-500 text-white border-0 rounded-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </>
          )}

          <Theme_Controller />
        </div>
      </div>
    </>
  );

  return (
    <>
      <div
        className="navbar sticky bg-base-content text-base-100 border-0 shadow-sm no-caret"
      >
        <div className="flex px-4 items-center justify-between w-full">
          <div className="flex-1">
            <p className="text-xl font-[family-name:var(--font-el-messiri)]">
              E v e r L i n k
            </p>
          </div>

          {/* hamburger (mobile) */}
          <button
            type="button"
            aria-label="Open navigation menu"
            className="md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>

          {/* desktop actions */}
          <RightActions />
        </div>
      </div>

      {/* mobile drawer */}
      <MobileMenu />
    </>
  );
};

export default Navbar;
