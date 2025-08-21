"use client";

import Theme_Controller from "../Theme_Controller";

const Navbar = () => {
  return (
    <>
      {/* <div className="navbar shadow-sm no-caret">
        <div className="flex items-center justify-between w-full">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <div>
            <div className="flex items-center space-x-4">
              <a className="btn btn-ghost">Home</a>
              <a className="btn btn-ghost">About</a>
              <a className="btn btn-ghost">Contact</a>
              <Theme_Controller />
            </div>
          </div>
        </div>
      </div> */}
      <div className="navbar background-navbar shadow-sm no-caret">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2 sm:px-5 md:px-10">
            <p className="font-[family-name:var(--font-rufina)] text-xl md:text-3xl text-white">
              SmartQueue
            </p>
          </div>
          <div className="w-32">
            <figure className="px-6">
              <img
                className="rounded-full"
                src="/Image/smart_queue.jpg"
                alt="logo"
              />
            </figure>
          </div>
          <div className="flex gap-2 px-6 font-[family-name:var(--font-Noto-Sans-Thai)]">
            <a
              href={"/booking"}
              aria-label="link booking page"
              className="btn hidden md:flex text-white font-light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                />
              </svg>
              จองคิว
            </a>
            <a
              href={"/admin/login"}
              aria-label="link login admin page"
              className="btn hidden md:flex text-white font-light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              แอดมิน
            </a>
            <div className="dropdown dropdown-end">
              <button
                type="button"
                aria-label="dropdown menu"
                tabIndex={0}
                className="btn flex md:hidden text-white font-light"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a
                    href={"/booking"}
                    aria-label="link booking page"
                    className="btn text-white font-light"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-white "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                      />
                    </svg>
                    จองคิว
                  </a>
                </li>
                <li>
                  <a
                    href={"/admin/login"}
                    aria-label="link login admin page"
                    className="btn text-white font-light"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    แอดมิน
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
