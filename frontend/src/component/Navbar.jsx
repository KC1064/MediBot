import React from "react";
import Buttons from "../utils/Buttons";
import { motion } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login"
import SignUp from "./SignUp"

const Navbar = () => {
  return (
    <div className="w-full flex justify-center pt-5 md:pt-8 lg:pt-8">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          boxShadow:
            "6px 8px 20px rgb(247, 138, 141), -6px -8px 20px rgb(245, 88, 253)",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        className="w-[95%] lg:w-[50%] rounded-xl border-3 border-black flex justify-between items-center px-2 py-1"
      >
        {/* <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter> */}
        <div
          style={{
            fontFamily: "Jaro",
          }}
          className="text-4xl lg:text-5xl"
        >
          MB.
        </div>
        <div className="flex items-center gap-1 lg:gap-3">
          <Buttons name={"SignUp"} type={"secondary"} dest={"/login"} />
          <Buttons name={"Login"} type={"primary"} dest={"/signup"} />
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
