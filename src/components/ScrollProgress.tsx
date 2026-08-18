"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-foreground/5"
    >
      <motion.div
        className="h-full origin-left bg-linear-to-r from-primary via-secondary-foreground to-accent-foreground shadow-[0_0_24px_rgba(20,184,166,0.45)]"
        style={{ scaleX }}
      />
    </div>
  );
}
