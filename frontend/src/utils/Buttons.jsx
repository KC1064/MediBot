import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Buttons = ({ name, type,dest }) => {
  return (
    <motion.button
      className={`relative w-20 h-8 lg:w-24 lg:h-10 rounded-md border-2 border-black 
      ${type === "primary" ? "bg-[#EA9DC5]" : "bg-[#EEB9A6]"} overflow-hidden`}
      whileHover={{
        scale: 1.1, // Slightly enlarges the button
        borderColor: "#FF4081", // Changes border color on hover
        boxShadow: "0px 0px 15px 4px #FF4081", // Adds a glowing effect
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <Link className="text-lg font-bold lg:text-xl"
      style={{
        fontFamily:'Nexus'
      }} to={dest}
      >{name}</Link>
    </motion.button>
  );
};

export default Buttons;
