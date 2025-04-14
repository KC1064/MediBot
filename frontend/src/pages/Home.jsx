import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaComments } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";

const Home = () => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <motion.div
        className="text-white flex justify-center items-center flex-col w-full h-[calc(100vh-200px)] text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h3
          className="text-7xl/20 font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent font-[polin-medium]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          AI-Powered Symptom Analysis <br /> Get Instant Health Insights
        </motion.h3>

        <motion.p
          className="text-lg/snug mt-6 max-w-4xl text-white/80 font-[polin-hair-italic]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Worried about a headache, fever, or unexplained pain? Healio uses
          advanced AI to analyze your symptoms through simple conversation. It's
          fast, free, and designed to help you decide when to rest, visit a
          doctor, or seek urgent care.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, background:'transparent' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform font-[polin-medium] border border-transparent hover:border-pink-500 hover:text-pink-500"
          >
            <FaComments className="text-xl" />
            Start Chat Now
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 border border-pink-500 text-pink-400 font-semibold px-6 py-3 rounded-xl hover:bg-pink-500 hover:text-white transition duration-200 font-[polin-medium]"
          >
            <HiOutlineLightBulb className="text-2xl" />
            How it Works
          </motion.button>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Home;
