import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="flex justify-between gap-2 mb-3 items-center flex-col">
      <motion.p
      initial={{y:-20,opacity:0}}
      animate={{
        y:0,opacity:1
      }}
      transition={{duration:1,delay:2.5}}
        style={{
          fontFamily: "Nexus",
        }}
        className="font-bold text-sm italic text-center md:text-lg lg:text-xl"
      >
        Disclaimer: MediBot provides AI-generated health insights but is not a
        substitute for professional medical advice. Always consult a doctor for
        medical concerns.
      </motion.p>
      <motion.p
      initial={{y:-20,opacity:0}}
      animate={{
        y:0,opacity:1
      }}
      transition={{duration:1,delay:2.5}}
        style={{
          fontFamily: "Nexus",
        }}

        className="text-sm md:text-lg lg:text-xl"
      >
        © 2025 MediBot. All Rights Reserved.
      </motion.p>
    </div>
  );
};
export default Footer;
