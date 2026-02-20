"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import Typewriter from "./Typewriter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <motion.div style={{ y: yBg, opacity }} className="absolute inset-0 z-0">
        <HeroCanvas />
      </motion.div>

      {/* Interactive Glow tracking mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      <div className="z-10 flex flex-col items-center text-center px-4 max-w-4xl pt-20">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-2xl text-muted-foreground mb-4 font-inter"
        >
          Full Stack Developer crafting scalable digital experiences.
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-2 font-outfit"
        >
          Hi, I'm <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary-foreground">Sambhu</span>.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full"
        >
          <Typewriter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105">
            View Projects
          </Button>
          <Button size="lg" variant="outline" className="rounded-full bg-background/50 backdrop-blur-md border-border/50 hover:bg-secondary/50 transition-all hover:scale-105">
            Download Resume
          </Button>
          <Button size="lg" variant="ghost" className="rounded-full hover:bg-white/5 transition-all hover:scale-105">
            Contact Me
          </Button>
        </motion.div>
      </div>

      {/* Decorative Parallax Orbs */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] opacity-50 mix-blend-screen pointer-events-none" 
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-foreground/10 rounded-full blur-[100px] opacity-50 mix-blend-screen pointer-events-none" 
      />
    </section>
  );
}
