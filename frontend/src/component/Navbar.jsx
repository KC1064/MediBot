import React from "react";
import { motion } from "framer-motion";


const Navbar = () => {
  return (
    <div className="w-full flex justify-center pt-5 md:pt-8 lg:pt-8">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          // boxShadow:
          //   "6px 8px 20px rgb(247, 138, 141), -6px -8px 20px rgb(245, 88, 253)",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        className="w-[95%] lg:w-[50%] rounded-xl border-3 border-white flex justify-between items-center px-2 py-1"
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
          className="text-4xl lg:text-5xl text-white"
        >
          MB.
        </div>
        <div className="flex items-center gap-1 lg:gap-3">
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
