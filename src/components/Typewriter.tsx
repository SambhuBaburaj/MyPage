"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Next.js Developer",
  "React Specialist",
  "Real-Time Systems Builder",
  "Performance-Focused Engineer"
];

export default function Typewriter() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-10 overflow-hidden relative w-full flex justify-center mt-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute text-xl md:text-2xl font-medium text-secondary-foreground"
        >
          {roles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
