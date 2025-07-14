import React, { useState } from "react";
import { Lock, Mail, User, Home } from "lucide-react"; // Import Home icon
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosInstance  from "../utils/axiosInstance"; // Adjust the import path as necessary

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      console.log("Signup successful:", response.data);

      // Save token (optional, for auth)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);

      // Redirect to onboarding page
      navigate("/onboarding");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message || "Something went wrong during signup."
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.03,
      boxShadow:
        "0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
    tap: { scale: 0.98 },
  };

  const logoVariants = {
    rest: { rotate: 0 },
    hover: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const imageContainerVariants = {
    hidden: { x: 50, opacity: 0 }, // Changed slide direction
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.2 },
    },
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-transparent">
      {/* Glass Morphism Sign In Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl rounded-2xl overflow-hidden flex shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] z-10 backdrop-filter backdrop-blur-xl border border-white/40 relative flex-row-reverse h-[90vh]" // Reversed flex direction and increased height
      >
        {/* Decorative Border Circles */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full filter blur-xl bg-blue-300 opacity-30" />
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full filter blur-xl bg-purple-300 opacity-30" />
        <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-48 h-48 rounded-full filter blur-xl bg-pink-300 opacity-30" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-36 h-36 rounded-full filter blur-xl bg-indigo-300 opacity-30" />

        {/* Left Side - Image */}
        <motion.div
          variants={imageContainerVariants}
          initial="hidden"
          animate="visible"
          className="w-1/2 relative overflow-hidden"
        >
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="./login.png" // Changed image
            alt="Sign In Visual"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-8 right-8 text-white text-right" // Adjusted alignment
          >
            <motion.h2
              initial={{ x: 20, opacity: 0 }} // Changed slide direction
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-2xl font-bold mb-2 bg-gradient-to-br from-green-600 via-lime-500 to-yellow-600 text-transparent bg-clip-text font-[polin-medium]" // Changed gradient direction
            >
              Create Account
            </motion.h2>
            <motion.p
              initial={{ x: 20, opacity: 0 }} // Changed slide direction
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-xs max-w-xs bg-gradient-to-br from-green-600 via-lime-500 to-yellow-600 text-transparent bg-clip-text font-[polin-medium]" // Changed gradient direction
            >
              Register yourself to join our platform
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Right Side - Sign In Form */}
        <div className="w-1/2 backdrop-blur-xl p-10 relative">
          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 flex items-center gap-2"
          >
            <Home className="w-6 h-6 text-lime-300" />
          </button>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="h-full flex flex-col justify-center relative z-10"
          >
            <motion.div variants={itemVariants} className="mb-6">
              {" "}
              {/* Reduced margin */}
              <motion.div
                variants={logoVariants}
                initial="rest"
                whileHover="hover"
                className="w-16 h-16 bg-gradient-to-br from-green-500 via-lime-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-lime-500/20 backdrop-blur-sm border border-white/20" // Reduced margin
              >
                <User className="w-8 h-8 text-white" /> {/* Changed icon */}
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold text-center font-[chopra] bg-gradient-to-br from-green-500 via-lime-500 to-yellow-500 text-transparent bg-clip-text mb-1" // Reduced margin
              >
                Sign Up
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="mt-0 text-sm text-center font-[chopra] bg-gradient-to-br from-green-500 via-lime-500 to-yellow-500 text-transparent bg-clip-text mb-4" // Adjusted margin
              >
                Create your account to get started
              </motion.p>
            </motion.div>

            <motion.form
              variants={containerVariants}
              className="space-y-3"
              onSubmit={handleSubmit}
            >
              {/* First and Last Name Row */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 text-lime-400"
              >
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <User className="h-5 w-5 text-lime-400" />{" "}
                    {/* Changed icon */}
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 sm:text-sm transition-all bg-white/20 backdrop-blur-sm" // Changed focus color
                    placeholder="First Name"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-lime-400">
                    <User className="h-5 w-5 text-lime-400" />{" "}
                    {/* Changed icon */}
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 sm:text-sm transition-all bg-white/20 backdrop-blur-sm" // Changed focus color
                    placeholder="Last Name"
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-y-0 text-lime-400 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-lime-400" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.005 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 sm:text-sm transition-all bg-white/20 backdrop-blur-sm" // Changed focus color
                  placeholder="Email address"
                />
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-y-0 text-lime-400 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-lime-400" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.005 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 sm:text-sm transition-all bg-white/20 backdrop-blur-sm" // Changed focus color
                />
              </motion.div>

              {/* Sign Up Button */}
              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-lg shadow-md text-sm font-medium font-[chopra] bg-gradient-to-br from-green-500 via-lime-500 to-yellow-500 text-white hover:from-emerald-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-all duration-200 backdrop-blur-sm border border-white/10" // Changed gradient and focus color
              >
                Sign Up
              </motion.button>
            </motion.form>

            {/* Already have an account link */}
            <motion.p
              variants={itemVariants}
              className="mt-4 text-center text-sm bg-gradient-to-br from-green-200 via-lime-300 to-yellow-600 text-transparent bg-clip-text" // Changed gradient
            >
              Already have an account?{" "}
              <motion.a
                whileHover={{ x: 2 }}
                href="/login" // Changed link
                className="font-medium hover:text-lime-500 transition-colors bg-gradient-to-br from-green-600 via-lime-500 to-yellow-600 text-transparent bg-clip-text" // Changed gradient
              >
                Log in
              </motion.a>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default SignUp;
