import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaCommentDots,
  FaRobot,
  FaUserMd,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaCommentDots />,
    title: "Natural Chat Analysis",
    description:
      "Describe symptoms in plain English - no medical forms or jargon. Our AI understands like a human doctor would.",
  },
  {
    id: 2,
    icon: <FaRobot />,
    title: "AI-Powered Insights",
    description:
      "Advanced algorithms cross-reference thousands of medical cases to provide accurate assessments.",
  },
  {
    id: 3,
    icon: <FaUserMd />,
    title: "Personalized Care",
    description:
      "Custom recommendations based on your medical history, age, and symptom patterns.",
  },
  {
    id: 4,
    icon: <FaShieldAlt />,
    title: "Bank-Level Security",
    description:
      "End-to-end encrypted health data that never gets shared without your permission.",
  },
  {
    id: 5,
    icon: <FaChartLine />,
    title: "Trend Analysis",
    description:
      "Visualize symptom patterns over time to spot potential chronic conditions early.",
  },
];

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 0.77, 0.47, 0.97],
    },
  },
};

const FeatureItem = ({ feature }) => (
  <motion.div
    className="p-6 relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg group"
    variants={featureVariants}
    initial="hidden"
    whileInView="visible"
    whileHover={{ scale: 1.05, y: -5 }}
    viewport={{ once: true }}
  >
    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink-500 group-hover:shadow-[0_0_20px_2px_rgba(236,72,153,0.4)] transition-all duration-300 bg-gradient-to-br from-purple-500/30 to-pink-500/30 group-hover:from-purple-500/50 group-hover:to-pink-500/50 pointer-events-none z-0" />
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="text-white text-4xl p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-white/80">{feature.description}</p>
    </div>
  </motion.div>
);

const Features = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      <motion.div
        className="w-full text-center leading-tight mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 0.77, 0.47, 0.97] }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-6xl font-bold font-[chopra] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Why Choose Healio?
        </motion.h2>
        <motion.p
          className="text-xl mt-2 font-[chopra-extended] bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Your Health, Simplified
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      ></motion.div>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.slice(0, 2).map((feature) => (
            <FeatureItem key={feature.id} feature={feature} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.slice(2).map((feature) => (
            <FeatureItem key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
