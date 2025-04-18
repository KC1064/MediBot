import React, { useState } from "react";
import {
  Lock,
  Mail,
  User,
  Ruler,
  Weight,
  Calendar,
  Users,
  Heart,
  Home,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Onboarding() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [medicalHistoryList, setMedicalHistoryList] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration attempted with:", {
      firstName,
      lastName,
      email,
      password,
      height,
      weight,
      age,
      gender,
      medicalHistoryList,
    });
    // Add your registration logic here
  };

  const handleAddMedicalHistory = () => {
    if (medicalHistory.trim()) {
      setMedicalHistoryList([...medicalHistoryList, medicalHistory]);
      setMedicalHistory("");
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
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.2 },
    },
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-transparent">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl rounded-2xl overflow-hidden flex shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] z-10 backdrop-filter backdrop-blur-xl border border-white/40 relative flex-row-reverse h-[90vh]"
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
            alt="Sign In Visual"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-8 right-8 text-white text-right"
          >
            <motion.h2
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-2xl font-bold mb-2 bg-gradient-to-br from-green-600 via-lime-500 to-yellow-600 text-transparent bg-clip-text font-[polin-medium]"
            >
              Onboarding
            </motion.h2>
            <motion.p
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-xs max-w-xs bg-gradient-to-br from-green-600 via-lime-500 to-yellow-600 text-transparent bg-clip-text font-[polin-medium]"
            >
              Fill out the details and start getting insights on your health.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Right Side - Sign In Form */}
        <div className="w-1/2 backdrop-blur-xl p-6 relative">
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
            <motion.div variants={itemVariants} className="mb-4">
              <motion.div
                variants={logoVariants}
                initial="rest"
                whileHover="hover"
                className="w-14 h-14 bg-gradient-to-br from-green-500 via-lime-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-lime-500/20 backdrop-blur-sm border border-white/20"
              >
                <Heart className="w-7 h-7 text-white" />
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="text-xl font-bold text-center font-[chopra] bg-gradient-to-br from-green-500 via-lime-500 to-yellow-500 text-transparent bg-clip-text mb-1"
              >
                Health Profile
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="mt-0 text-xs text-center font-[chopra] bg-gradient-to-br from-green-500 via-lime-500 to-yellow-500 text-transparent bg-clip-text mb-3"
              >
                Complete your health information
              </motion.p>
            </motion.div>

            <motion.form
              variants={containerVariants}
              className="space-y-3 "
              onSubmit={handleSubmit}
              style={{ maxHeight: "calc(90vh - 160px)" }}
            >
              {/* Full Name */}
              {/* <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.005 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={`${firstName} ${lastName}`}
                  onChange={(e) => {
                    const names = e.target.value.split(" ");
                    setFirstName(names[0] || "");
                    setLastName(names.slice(1).join(" ") || "");
                  }}
                  className="block w-full pl-10 pr-3 py-2.5 border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 sm:text-sm transition-all bg-white/20 backdrop-blur-sm"
                  placeholder="FullName"
                />
              </motion.div> */}
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.005 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={`${firstName} ${lastName}`}
                  onChange={(e) => {
                    const names = e.target.value.split(" ");
                    setFirstName(names[0] || "");
                    setLastName(names.slice(1).join(" ") || "");
                  }}
                  className="block w-full pl-10 pr-3 py-2.5 border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 sm:text-sm transition-all bg-white/20 backdrop-blur-sm"
                  placeholder="Full Name"
                />
              </motion.div>

              {/* Height and Weight Row */}
              <motion.div variants={itemVariants} className="flex gap-3">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Ruler className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    id="height"
                    name="height"
                    type="text"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 sm:text-sm transition-all bg-white/20 backdrop-blur-sm"
                    placeholder="Height (cm)"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Weight className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    id="weight"
                    name="weight"
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 sm:text-sm transition-all bg-white/20 backdrop-blur-sm"
                    placeholder="Weight (kg)"
                  />
                </div>
              </motion.div>

              {/* Age and Gender Row */}
              <motion.div variants={itemVariants} className="flex gap-3">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    id="age"
                    name="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 text-lime-400 border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 sm:text-sm transition-all bg-white/20 backdrop-blur-sm"
                    placeholder="Age"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Users className="h-5 w-5 text-lime-400" />
                  </div>
                  <motion.select
                    whileFocus={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 sm:text-sm transition-all bg-white/20 backdrop-blur-sm appearance-none text-lime-400"
                  >
                    <option value="" disabled selected>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </motion.select>
                </div>
              </motion.div>

              {/* Email */}

              {/* Medical History Input */}
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Heart className="h-5 w-5 text-gray-400" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.005 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  id="medicalHistory"
                  name="medicalHistory"
                  type="text"
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  className="block w-full pl-10 pr-16 py-2.5 border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 sm:text-sm transition-all bg-white/20 backdrop-blur-sm"
                  placeholder="Add medical history"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddMedicalHistory();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddMedicalHistory}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-medium text-lime-500 hover:text-lime-600 focus:outline-none"
                >
                  Add
                </button>
              </motion.div>

              {/* Medical History List */}
              <motion.div
                variants={itemVariants}
                className="max-h-28 overflow-y-auto border border-white/30 rounded-lg bg-white/10 backdrop-blur-sm p-2"
              >
                {medicalHistoryList.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-2">
                    No medical history added
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {medicalHistoryList.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm bg-white/20 rounded px-3 py-1.5 flex justify-between items-center"
                      >
                        <span className="text-gray-800">{item}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setMedicalHistoryList(
                              medicalHistoryList.filter((_, i) => i !== index)
                            );
                          }}
                          className="text-red-500 hover:text-red-600 focus:outline-none"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>

              {/* Sign Up Button */}
              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 rounded-lg shadow-md text-sm font-medium font-[chopra] bg-gradient-to-br from-green-500 via-lime-500 to-yellow-500 text-white hover:from-emerald-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-all duration-200 backdrop-blur-sm border border-white/10"
              >
                Create Health Profile
              </motion.button>
            </motion.form>

            {/* Already have an account link */}
            <motion.p
              variants={itemVariants}
              className="mt-3 text-center text-xs bg-gradient-to-br from-green-200 via-lime-300 to-yellow-600 text-transparent bg-clip-text"
            >
              Already have an account?{" "}
              <motion.a
                whileHover={{ x: 2 }}
                href="/login"
                className="font-medium hover:text-lime-500 transition-colors bg-gradient-to-br from-green-600 via-lime-500 to-yellow-600 text-transparent bg-clip-text"
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

export default Onboarding;
