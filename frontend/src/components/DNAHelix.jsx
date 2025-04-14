import { motion } from "framer-motion";

export default function DnaMotion() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 600"
        className="w-40 h-auto"
        initial={{ y: -600 }}
        animate={{ y: 600 }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "linear",
        }}
      >
        <defs>
          <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#ff00ff" />
          </linearGradient>
        </defs>

        {[...Array(30)].map((_, i) => {
          const y = i * 20;
          const x1 = 50 + 30 * Math.sin(i);
          const x2 = 150 - 30 * Math.sin(i);
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke="url(#neon)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx={x1} cy={y} r="2" fill="#00f0ff" />
              <circle cx={x2} cy={y} r="2" fill="#ff00ff" />
            </g>
          );
        })}
      </motion.svg>
    </div>
  );
}
