"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef} 
      className="relative flex min-h-screen w-full items-center justify-center py-32 overflow-hidden bg-background"
      id="about"
    >
      <div className="absolute inset-0 z-0 bg-background/90" />
      
      <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Profile Image Side */}
        <div className="relative aspect-square w-full max-w-md mx-auto group perspective-1000">
          <motion.div 
            style={{ y, opacity }}
            className="w-full h-full relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-[0_0_50px_rgba(139,92,246,0.15)] transition-all duration-700 group-hover:shadow-[0_0_80px_rgba(139,92,246,0.3)] transform-gpu group-hover:rotate-y-12 group-hover:rotate-x-12"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-violet-500/20 z-10 mix-blend-overlay pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
            <Image
              src="/profile.jpg"
              alt="Sambhu Baburaj"
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 grayscale-50 group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Soft glow border */}
            <div className="absolute inset-0 border border-white/5 rounded-2xl z-20 pointer-events-none group-hover:border-violet-500/30 transition-colors duration-500" />
          </motion.div>
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 blur-[80px] bg-violet-600/20 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        {/* Content Side */}
        <motion.div 
          ref={contentRef}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex max-w-fit items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2">
             <span className="text-xs font-semibold tracking-wider text-violet-300 uppercase">The Architect</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mix-blend-difference text-white">
            Engineer. <br/>
            Problem Solver. <br/>
            <span className="text-zinc-500">System Thinker.</span>
          </h2>
          
          <div className="h-1 w-20 bg-linear-to-r from-blue-500 to-violet-500 rounded-full" />
          
          <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
            I specialize in designing and building the foundation for scalable, high-performance applications. Whether it is real-time engines, offline-first architectures, or complex dashboards—I create elegant solutions to difficult technical challenges.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
