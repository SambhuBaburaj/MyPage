"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export type ExperienceItem = {
  id: string | number;
  company: string;
  role: string;
  period: string;
  description: React.ReactNode;
  align: "left" | "right";
  color: string; // e.g. "from-blue-500/10 to-transparent"
};

export default function ExperienceBlock({ exp }: { exp: ExperienceItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll Tracking: useScroll attached to a ref on the block's container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Directional Slide: look at exp.align
  const startX = exp.align === "left" ? -50 : 50;
  const x = useTransform(scrollYProgress, [0, 1], [startX, 0]);

  // Fade In: As it slides inward, opacity transitions from 0 to 1
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Background Parallax: absolute div behind content holding gradient color. y moves 0% to 50%
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex py-16 ${
        exp.align === "left" ? "justify-start" : "justify-end"
      }`}
    >
      <motion.div
        style={{ x, opacity }}
        className="relative w-full md:w-[80%] lg:w-[70%] p-8 md:p-12 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl overflow-hidden"
      >
        {/* Background Parallax */}
        <motion.div
          style={{ y: yBg }}
          className={`absolute inset-0 bg-linear-to-br ${exp.color} pointer-events-none -z-10 opacity-60`}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col space-y-6">
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-black mix-blend-difference text-white uppercase tracking-tighter leading-none">
            {exp.company}
          </h3>
          
          <div className="flex flex-wrap items-center gap-3 text-white/80 font-medium text-lg md:text-xl">
            <span className="text-primary">{exp.role}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span>{exp.period}</span>
          </div>
          
          <div className="text-white/70 text-lg md:text-xl leading-relaxed font-inter">
            {exp.description}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
