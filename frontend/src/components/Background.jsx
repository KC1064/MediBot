import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Background = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#05020a] to-[#0d0d0d]">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#b48cde]/5"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0], // fixed missing comma
              scale: [1, Math.random() * 0.3 + 0.8, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-[#b48cde]/10 blur-3xl"
          style={{ top: "10%", left: "5%" }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-[#b48cde]/5 blur-3xl"
          style={{ bottom: "5%", right: "10%" }}
          animate={{
            x: [0, -70, 0],
            y: [0, -4, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default Background;
