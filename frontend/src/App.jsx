import React from "react";
// import bg from "./assets/bg.jpg"
import bg from "./assets/as.png";
import Navbar from "./component/Navbar";
import { motion } from "framer-motion";
import Footer from "./component/Footer";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./component/Login";
import SignUp from "./component/SignUp";

import FlipText from "./utils/FlipText";

// Separate Home component for the main content
const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-screen w-screen flex flex-col justify-between items-center"
    >
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center gap-8 mt-8">
        <motion.h2
          initial="hidden"
          animate="visible"
          style={{ fontFamily: "Nexus" }}
          className="text-5xl text-center tracking-tight md:text-6xl md:max-w-3xl lg:max-w-3xl lg:text-7xl bg-gradient-to-tl from-slate-50 via-violet-500 to-zinc-400 bg-clip-text text-transparent"
        >
          {Array.from("AI-Powered Diagnosis for a Healthier You").map(
            (char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: index * 0.03,
                }}
                style={{ display: "inline" }}
              >
                {char}
              </motion.span>
            )
          )}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          style={{ fontFamily: "Nexus" }}
          className="text-lg italic tracking-tight text-center font-bold w-[90%] lg:max-w-4xl md:text-xl lg:text-2xl"
        >
          Your AI-powered health assistant, analyzing symptoms, predicting
          conditions, and guiding you toward better well-being with precision
          and care.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
        >
          <button
            className="bg-purple-500 px-8 py-2 rounded-3xl"
            onClick={() => navigate("/signup")}
          >
            <FlipText text={"Get Started"} />
          </button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
