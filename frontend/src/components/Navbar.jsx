import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4">
      <div>
        <p className="text-teal-400 font-[Roboto] text-2xl">SymptoSense</p>
      </div>
      <div className="text-white flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/guide">Guide</Link>
        <Link to="/faqs">FAQs</Link>
      </div>
      <div className="flex gap-6 items-center">
        <Link
          to="/signup"
          className="px-1 py-1 bg-blue-300 w-20 text-base text-center"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-1 py-1 bg-blue-500 w-20 text-base text-center"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
