import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { motion } from "framer-motion";

const navLinks = ["Home", "Features", "Guide", "FAQs"];

const Navbar = () => {
  return (
    <motion.nav
      className="w-full flex justify-between items-center px-8 py-6 bg-transparent"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link
          to="/"
          className="text-3xl font-bold font-[chopra-extended] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-glow"
        >
          Healio.
        </Link>
      </motion.div>

      <motion.div
        className="text-white hidden md:flex gap-12 text-lg bg-purple-400/20 backdrop-blur-lg px-10 py-2 rounded-2xl shadow-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {navLinks.map((link, index) => (
          <motion.a
            key={index}
            href="#"
            whileHover={{ scale: 1.1, color: "#e0aaff" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="hover:text-white/90 transition-colors duration-200 font-bold"
          >
            {link}
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button name="Sign Up" type="primary" link={"signup"} />
        <Button name="Sign In" type="secondary" link={"login"} />
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
