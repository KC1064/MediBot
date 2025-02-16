import React from "react";
import bg from "./assets/bg.jpg";
import Navbar from "./component/Navbar";
import { motion } from "framer-motion";

const App = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-screen w-screen"
    >
      <Navbar />
      <div className="h-[60%] w-full flex flex-col justify-center items-center gap-8 mt-8">
        <h2 className="text-5xl text-center tracking-tight">AI-Powered Diagnosis for a Healthier You</h2>
        <p className="text-lg tracking-tight text-center font-bold w-[90%]">
        Your AI-powered health assistant, analyzing symptoms, 
        predicting conditions, 
        and guiding you toward better well-being with precision and care.
        </p>
       
       
        <motion.button
  initial={{ boxShadow: "none" }}
  animate={{
    transition: { duration: 5, repeat: Infinity, repeatType: "reverse" },
  }}
  whileHover={{
    scale: 1.1,
    boxShadow: "10px 16px 35px #FF92CC, -10px -16px 35px #FF92CC"
  }}
  className="w-auto h-auto py-2 px-12 text-xl font-bold rounded-3xl border-2 border-black text-white bg-[#EA9AC6]"
>
  Get Started
        </motion.button>

      </div>


    </div>
  );
};

export default App;
