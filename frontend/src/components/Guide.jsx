import React from "react";
import { motion } from "framer-motion";
import {
  FaKeyboard,
  FaRobot,
  FaQuestionCircle,
  FaBrain,
  FaClinicMedical,
} from "react-icons/fa";

const guideData = {
  sectionTitle: "How Healio Works",
  subtitle: "Your 5-Step Path to Better Health Insights",
  steps: [
    {
      id: 1,
      icon: <FaKeyboard />,
      title: "Describe Your Symptoms",
      description:
        "Start by typing or speaking your symptoms naturally, like you would to a doctor. Example: 'I've had headache and nausea since morning'",
      animation: "fadeIn",
    },
    {
      id: 2,
      icon: <FaRobot />,
      title: "AI Symptom Analysis",
      description:
        "Our AI instantly analyzes 100+ factors from your description, comparing against medical databases",
      animation: "slideUp",
    },
    {
      id: 3,
      icon: <FaQuestionCircle />,
      title: "Smart Follow-Up Questions",
      description:
        "Healio asks clarifying questions to pinpoint causes: 'Is the pain throbbing or constant? Any fever?'",
      animation: "slideUp",
    },
    {
      id: 4,
      icon: <FaBrain />,
      title: "Instant Differential Diagnosis",
      description:
        "Receive ranked possible conditions based on likelihood, with confidence percentages for each",
      animation: "fadeIn",
    },
    {
      id: 5,
      icon: <FaClinicMedical />,
      title: "Personalized Action Plan",
      description:
        "Get clear next steps: home care instructions, OTC med suggestions, or urgent care recommendations",
      animation: "zoomIn",
    },
  ],
};

const stepVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const Guide = () => {
  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-6xl font-bold font-[chopra] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            {guideData.sectionTitle}
          </h2>
          <p className="text-xl mt-2 font-[chopra-extended] bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            {guideData.subtitle}
          </p>
        </motion.div>

        {/* Layout */}
        <div className="md:flex gap-10 rounded-3xl p-6 md:p-10">
          {/* Left - Image */}
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0 flex items-center justify-center rounded-xl overflow-hidden shadow-md bg-gradient-to-br from-indigo-100/10 to-purple-100/10 min-h-[500px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-gray-400 font-semibold text-lg">
              Image Placeholder (Replace me!)
            </div>
          </motion.div>

          {/* Right - Steps */}
          {/* Right - Steps */}
          <motion.div
            className="md:w-1/2 flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {guideData.steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex items-start gap-5 bg-white/10 hover:bg-white/20 hover:shadow-lg transition-all duration-300 rounded-xl p-5 border border-white/10 min-h-[150px]"
                variants={stepVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex-shrink-0 text-indigo-500 text-3xl p-3 bg-white/10 rounded-full">
                  {step.icon}
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Guide;
