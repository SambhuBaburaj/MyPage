"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const strengths = [
  "Product dashboards",
  "Real-time communication",
  "Offline-first workflows",
  "Role-based platforms",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-170, 130]);
  const frameY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], [-5, 7]);
  const contentY = useTransform(scrollYProgress, [0, 1], [70, -60]);
  const outlineY = useTransform(scrollYProgress, [0, 1], [160, -140]);
  const ruleScale = useTransform(scrollYProgress, [0.18, 0.6], [0.15, 1]);

  return (
    <section 
      ref={sectionRef} 
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden parallax-surface py-32"
      id="about"
    >
      <motion.div
        aria-hidden="true"
        className="fine-grid absolute inset-0 z-0 opacity-30"
        style={{ y: frameY }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute -left-[10vw] top-[16%] z-0 font-outfit text-[21vw] font-black uppercase leading-none tracking-normal text-outline text-transparent text-primary opacity-[0.06]"
        style={{ y: outlineY }}
      >
        About
      </motion.div>
      
      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-16 px-6 md:grid-cols-[0.92fr_1.08fr]">
        <div className="group relative mx-auto aspect-[4/5] w-full max-w-md">
          <motion.div
            aria-hidden="true"
            style={{ y: frameY, rotate: frameRotate }}
            className="absolute -left-7 top-9 h-full w-full border border-primary/35"
          />
          <motion.div 
            style={{ y: imageY }}
            className="relative h-full w-full overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-black/35 transition-transform duration-700 group-hover:-translate-y-2"
          >
            <Image
              src="/profile.jpg"
              alt="Sambhu Baburaj"
              fill
              className="object-cover grayscale-[35%] contrast-110 transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/75 via-transparent to-transparent" />
          </motion.div>

          <motion.p
            aria-hidden="true"
            style={{ y: frameY }}
            className="absolute -right-5 bottom-8 hidden max-w-52 border-y border-border/70 py-4 font-mono text-xs uppercase leading-6 tracking-[0.28em] text-muted-foreground md:block"
          >
            Kerala based / Building product systems
          </motion.p>
        </div>

        <motion.div 
          style={{ y: contentY }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-secondary-foreground">
            The Architect
          </p>
          
          <h2 className="text-balance font-outfit text-5xl font-black uppercase leading-[0.92] tracking-normal text-foreground md:text-7xl">
            Engineer. <br/>
            Problem Solver. <br/>
            <span className="text-foreground/45">System Thinker.</span>
          </h2>
          
          <motion.div
            aria-hidden="true"
            className="h-px w-full max-w-lg origin-left bg-linear-to-r from-primary via-secondary-foreground to-transparent"
            style={{ scaleX: ruleScale }}
          />
          
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            I specialize in designing and building the foundation for scalable, high-performance applications. Whether it is real-time engines, offline-first architectures, or complex dashboards—I create elegant solutions to difficult technical challenges.
          </p>

          <div className="mt-4 grid grid-cols-1 border-y border-border/70 md:grid-cols-2">
            {strengths.map((strength, index) => (
              <div
                key={strength}
                className={`border-border/70 py-4 font-mono text-sm uppercase tracking-[0.18em] text-foreground/80 ${
                  index < strengths.length - 1 ? "border-b" : ""
                } ${index % 2 === 0 ? "md:border-r" : "md:pl-6"} ${
                  index < strengths.length - 2 ? "md:border-b" : "md:border-b-0"
                }`}
              >
                {strength}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
