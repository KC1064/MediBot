import React from "react";
import { motion } from "framer-motion";

const Button = ({ name, type }) => {
  const isPrimary = type === "primary";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 15,
      }}
      className={`w-max h-max px-4 py-1 text-lg font-medium rounded-xl shadow-lg transition-all duration-50 transform-gpu font-[polin-medium]
        ${
          isPrimary
            ? "bg-gradient-to-r from-[#7209b7] to-[#560bad] text-white"
            : "bg-gradient-to-r from-[#b5179e] to-[#f72585] text-white"
        }`}
    >
      {name}
    </motion.button>
  );
};

export default Button;
