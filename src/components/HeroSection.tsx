"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import Typewriter from "./Typewriter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const canvasY = useTransform(scrollYProgress, [0, 1], ["-8%", "34%"]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.32]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.72, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -170]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.84]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 190]);
  const slabY = useTransform(scrollYProgress, [0, 1], [-80, 230]);
  const slabX = useTransform(scrollYProgress, [0, 1], ["-12%", "9%"]);
  const outlineY = useTransform(scrollYProgress, [0, 1], [120, -180]);
  const railX = useTransform(scrollYProgress, [0, 1], ["-14%", "16%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden parallax-surface"
    >
      <motion.div
        style={{ y: canvasY, scale: canvasScale, opacity: canvasOpacity }}
        className="absolute inset-0 z-0"
      >
        <HeroCanvas />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="section-grid scanline-mask absolute inset-0 z-0 opacity-35"
        style={{ y: gridY }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute left-[-18vw] top-[18vh] z-0 h-32 w-[90vw] -rotate-6 border-y border-primary/25 bg-linear-to-r from-transparent via-primary/15 to-transparent"
        style={{ x: slabX, y: slabY }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute right-[-16vw] top-[52vh] z-0 h-24 w-[74vw] rotate-6 border-y border-secondary-foreground/25 bg-linear-to-r from-transparent via-secondary-foreground/12 to-transparent"
        style={{ x: railX }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute bottom-[-3vw] left-1/2 z-0 -translate-x-1/2 font-outfit text-[24vw] font-black uppercase leading-none tracking-normal text-outline text-transparent text-foreground opacity-[0.055]"
        style={{ y: outlineY }}
      >
        Sambhu
      </motion.div>

      <motion.div
        style={{ y: contentY, scale: contentScale }}
        className="relative z-10 flex max-w-5xl origin-center flex-col items-center px-4 pt-20 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-5 font-mono text-xs uppercase tracking-[0.36em] text-primary md:text-sm"
        >
          Full Stack Developer / Real-Time Systems
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-4 text-balance font-outfit text-[clamp(4.5rem,13vw,12rem)] font-black uppercase leading-[0.82] tracking-normal"
        >
          Sambhu
          <span className="block bg-linear-to-r from-primary via-secondary-foreground to-accent-foreground bg-clip-text text-transparent">
            Baburaj
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.36, ease: "easeOut" }}
          className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl"
        >
          I build fast product interfaces, real-time workflows, and scalable
          dashboards that stay dependable when the requirements get messy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-7 w-full"
        >
          <Typewriter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:shadow-primary/40" asChild>
            <a href="#experience">View Impact</a>
          </Button>
          <Button size="lg" variant="ghost" className="rounded-full border border-border/50 transition-all hover:-translate-y-1 hover:bg-white/5" asChild>
            <a href="#contact">Contact Me</a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
