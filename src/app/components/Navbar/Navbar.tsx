"use client";

import Theme_Controller from "../Theme_Controller";

const Navbar = () => {
  return (
    <>
      <div className={`navbar sticky bg-base-content text-base-100 shadow-sm no-caret`}>
        <div className="flex px-4 items-center justify-between w-full">
          <div className="flex-1">
            <p className=" text-xl">S o u l  L i n k  A I</p>
          </div>
          <div>
            <div className="flex items-center space-x-4">
              <a className="btn btn-ghost text-lg">Log in</a>
              <Theme_Controller />
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Navbar;
