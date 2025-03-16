import React from "react";
import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

// const FlipText = ({ text }) => {
//   return (
//     <motion.div
//       initial="initial"
//       whileHover="hovered"
//       className="relative inline-block overflow-hidden whitespace-nowrap text-3xl font-bold uppercase"
//     >
//       <div>
//         {text.split("").map((l, i) => (
//           <motion.span
//             variants={{
//               initial: {
//                 y: 0,
//               },
//               hovered: {
//                 y: "-100%",
//               },
//             }}
//             transition={{
//               duration: DURATION,
//               ease: "easeInOut",
//               delay: STAGGER * i,
//             }}
//             className="inline-block"
//             key={i}
//           >
//             {l}
//           </motion.span>
//         ))}
//       </div>
//       <div className="absolute inset-0">
//         {text.split("").map((l, i) => (
//           <motion.span
//             variants={{
//               initial: {
//                 y: "100%",
//               },
//               hovered: {
//                 y: 0,
//               },
//             }}
//             transition={{
//               duration: DURATION,
//               ease: "easeInOut",
//               delay: STAGGER * i,
//             }}
//             className="inline-block"
//             key={i}
//           >
//             {l}
//           </motion.span>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default FlipText;

const FlipText = ({ text }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative inline-block overflow-hidden whitespace-nowrap text-xl font-bold uppercase text-white cursor-pointer"
    >
      <div>
        <motion.span
          variants={{
            initial: {
              y: 0,
            },
            hovered: {
              y: "-100%",
            },
          }}
          transition={{
            duration: DURATION,
            ease: "easeInOut",
            delay: STAGGER * 1,
          }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </div>
      <div className="absolute inset-0">
        <motion.span
          variants={{
            initial: {
              y: "100%",
            },
            hovered: {
              y: 0,
            },
          }}
          transition={{
            duration: DURATION,
            ease: "easeInOut",
            delay: STAGGER * 1,
          }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default FlipText;
