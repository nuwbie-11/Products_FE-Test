import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <header className="z-[999] relative">
      <div className="w-screen flex justify-center items-center">
        <nav
          className="w-screen flex justify-center items-center fixed rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg
            shadow-black/[0.03] backdrop-blur-[0.35rem] top-0 h-[4.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full"
        >
          <ul className="px-5 gap-y-1 text-[0.9rem] font-medium text-zinc-500 flex items-center justify-center sm:w-[initial] w-[22rem] sm:flex-nowrap sm:gap-5 ">
            <li className="flex items-center justify-center">
              <Link
                className="flex w-full items-center rounded-full hover:bg-zinc-200 justify-center px-5 py-2 hover:text-zinc-900 transition"
                to={"/"}
              >
                Go To Login
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <Link
                className="flex w-full items-center rounded-full hover:bg-zinc-200 justify-center px-5 py-2 hover:text-zinc-900 transition"
                to={"/dashboard"}
              >
                Go To Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
