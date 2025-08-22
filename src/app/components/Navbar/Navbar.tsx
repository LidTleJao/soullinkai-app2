"use client";

import { useState } from "react";
import Theme_Controller from "../Theme_Controller";
import { isLoggedIn, logout } from "@/app/services/authService";
import router from "next/router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div
        className={`navbar sticky bg-base-content text-base-100 shadow-sm no-caret`}
      >
        <div className="flex px-4 items-center justify-between w-full">
          <div className="flex-1">
            <p className=" text-xl font-[family-name:var(--font-el-messiri)]">S o u l L i n k A I</p>
          </div>
          <div>
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
            <div className="hidden md:flex items-center space-x-4">
              <a href={"/"} className="btn btn-ghost">
                Home
              </a>
              {isLoggedIn() ? (
                <>
                  <a href={"/personas"} className="btn btn-ghost">
                    Dashboard
                  </a>
                  <a href={"/subscription"} className="btn btn-ghost">
                    Subscription
                  </a>
                  <a href={"/feedback"} className="btn btn-ghost">
                    Feedback
                  </a>
                  <a href={"/security"} className="btn btn-ghost">
                    Security
                  </a>
                  <a href={"/privacy"} className="btn btn-ghost">
                    Privacy
                  </a>
                  <a
                    onClick={() => {
                      logout();
                      router.push("/Login");
                    }}
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    Logout
                  </a>
                </>
              ) : (
                <a href={"/Login"} className="btn btn-ghost">
                  Login
                </a>
              )}
              <Theme_Controller />
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-base-content text-base-100 p-6 shadow-lg transform transition-transform duration-300 no-caret ${
          isMenuOpen ? "translate-x-0 " : "translate-x-full "
        } md:hidden `}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsMenuOpen(false)}
          className=" mb-6"
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
        <div className="flex flex-col space-y-4 ">
          <a href={"/"} className="btn btn-ghost border-2 border-base-100 rounded-2xl">
            Home
          </a>
          {isLoggedIn() ? (
            <>
              <a href={"/personas"} className="btn btn-ghost border-2 border-base-100 rounded-2xl">
                Dashboard
              </a>
              <a href={"/subscription"} className="btn btn-ghost border-2 border-base-100 rounded-2xl">
                Subscription
              </a>
              <a href={"/feedback"} className="btn btn-ghost border-2 border-base-100 rounded-2xl">
                Feedback
              </a>
              <a href={"/security"} className="btn btn-ghost border-2 border-base-100 rounded-2xl">
                Security
              </a>
              <a href={"/privacy"} className="btn btn-ghost border-2 border-base-100 rounded-2xl">
                Privacy
              </a>
              <a
                onClick={() => {
                  logout();
                  router.push("/Login");
                }}
                className="bg-red-500 px-3 py-1 rounded-2xl border-2"
              >
                Logout
              </a>
            </>
          ) : (
            <a href={"/Login"} className="btn btn-ghost border-2 border-base-100 rounded-2xl">
              Login
            </a>
          )}
          <Theme_Controller />
        </div>
      </div>
    </>
  );
};

export default Navbar;
