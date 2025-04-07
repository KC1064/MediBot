import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4">
      <div>
        <p className="text-teal-400 font-[Roboto] text-2xl">SymptoSense</p>
      </div>
      <div className="text-white flex gap-4 items-center">
        <a href="">Home</a>
        <a href="">Features</a>
        <a href="">Guide</a>
        <a href="">FAQs</a>
      </div>
      <div className="flex gap-6 items-center">
        <button className="px-1 py-1 bg-blue-300 w-20 text-base">Sign Up</button>
        <button className="px-1 py-1 bg-blue-500 w-20 text-base">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
