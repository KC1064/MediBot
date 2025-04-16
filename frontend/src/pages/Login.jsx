import React, { useState } from "react";
import { Lock, Mail, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
    // Add your login logic here
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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.2 },
    },
  };

  const inputContainerVariants = {
    rest: {
      borderColor: "rgb(209, 213, 219)",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    },
    focus: {
      borderColor: "rgb(59, 130, 246)",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.15)",
    },
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-transparent">
      {/* Glass Morphism Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl rounded-2xl overflow-hidden flex shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] z-10 backdrop-filter backdrop-blur-xl border border-white/40 relative"
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
            src="./login.png"
            alt="Login Visual"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-8 left-8 text-white"
          >
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent font-[polin-medium]"
            >
              Welcome Back
            </motion.h2>
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-xs max-w-xs bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent font-[polin-medium]"
            >
              Sign in to continue your journey with our platform
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 backdrop-blur-xl p-10 relative">
          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 flex items-center gap-2"
          >
            <Home className="w-6 h-6 text-purple-500" />
          </button>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="h-full flex flex-col justify-center relative z-10"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <motion.div
                variants={logoVariants}
                initial="rest"
                whileHover="hover"
                className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20 backdrop-blur-sm border border-white/20"
              >
                <Lock className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold text-center font-[chopra] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
              >
                Sign in to your account
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="mt-2 text-sm text-center font-[chopra] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
              >
                Enter your credentials to access the dashboard
              </motion.p>
            </motion.div>

            <motion.form
              variants={containerVariants}
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              {/* Email */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800 mb-1 font-[chopra] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="h-5 w-5 text-gray-400" />
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
                    className="block w-full pl-10 pr-3 py-3 border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm transition-all bg-white/20 backdrop-blur-sm"
                    placeholder="m@example.com"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1 font-[chopra] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm transition-all bg-white/20 backdrop-blur-sm"
                  />
                </div>
              </motion.div>

              {/* Forgot password link */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-end"
              >
                <motion.a
                  whileHover={{ x: 2 }}
                  href="#"
                  className="font-medium text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </motion.a>
              </motion.div>

              {/* Sign In Button */}
              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-lg shadow-md text-sm font-medium font-[chopra] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 backdrop-blur-sm border border-white/10"
              >
                Sign In
              </motion.button>
            </motion.form>

            {/* Create Account Link */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-center text-sm bg-gradient-to-br from-pink-200 via-purple-300 to-indigo-600 text-transparent bg-clip-text"
            >
              Don&apos;t have an account?{" "}
              <motion.a
                whileHover={{ x: 2 }}
                href="#"
                className="font-medium hover:text-blue-500 transition-colors bg-gradient-to-br from-pink-600 via-purple-500 to-indigo-600 text-transparent bg-clip-text"
              >
                Create an account
              </motion.a>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;