// 'use client'
// import { motion } from "motion/react"

// export default function ProgressStats() {
//   return (
//     <div className="space-y-5">
//       {stats.map((s) => {
//         const percent = (s.value / s.max) * 100;

//         return (
//           <div key={s.label}>
//             <div className="mb-1 flex justify-between font-mono text-sm">
//               <span className="text-zinc-800 dark:text-zinc-200">
//                 {s.label}
//               </span>
//               <span className="text-sky-500">
//                 {s.value} / {s.max} {s.unit}
//               </span>
//             </div>

//             <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
//               <motion.div initial={{ width: 0 }} whileInView={{ width: percent + "%" }}
//                 className="h-full rounded-full bg-sky-500 transition-all"
//                 // style={{ width: percent + "%" }}
//               />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
"use client";

import { useEffect, useRef } from "react";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

const stats = [
  { label: "Bench", value: 45, max: 100, unit: "kg" },
  { label: "Squat", value: 50, max: 100, unit: "kg" },
  { label: "Leg Press", value: 80, max: 150, unit: "kg" },
  { label: "Shoulder", value: 35, max: 80, unit: "kg" },
  { label: "Deadlift", value: 85, max: 150, unit: "kg" },
];
function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
    });

    return controls.stop;
  }, [isInView, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function ProgressStats() {
  return (
    <motion.div
      className="space-y-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      {stats.map((s) => {
        const percent = (s.value / s.max) * 100;

        return (
          <motion.div
            key={s.label}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {/* Label + Counter */}
            <div className="mb-1 flex justify-between font-mono text-sm">
              <span className="text-zinc-800 dark:text-zinc-200">
                {s.label}
              </span>

              <span className="text-sky-500">
                <AnimatedNumber value={s.value} /> / {s.max} {s.unit}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <motion.div
                className="h-full rounded-full bg-sky-500"
                initial={{ width: 0 }}
                variants={{
                  hidden: { width: 0 },
                  visible: { width: `${percent}%` },
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
