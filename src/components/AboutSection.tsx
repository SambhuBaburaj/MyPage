"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const skills = [
  "Next.js", "React", "TypeScript", "GraphQL", 
  "Prisma", "PostgreSQL", "MongoDB", "AWS EC2",
  "TanStack", "Framer Motion", "NestJS", "Express"
];

// Split skills into two orbits for visual appeal
const innerOrbit = skills.slice(0, 6);
const outerOrbit = skills.slice(6, 12);

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [360, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background py-32 border-t border-border/10"
      id="about"
    >
      <div className="container px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Professional Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-outfit text-foreground">
              About Me
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
            
            <p className="text-xl text-muted-foreground leading-relaxed font-inter">
              Passionate full-stack developer with 2+ years of experience specializing in Next.js, React, scalable architecture and real-time systems.
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed font-inter">
              I build digital experiences that are fast, accessible, and visually stunning. From crafting intuitive user interfaces to architecting robust backend services, I love turning complex problems into elegant solutions.
            </p>

            <div className="pt-4 h-16 pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredSkill ? 1 : 0 }}
                className="text-primary font-medium tracking-wider text-xl"
              >
                {hoveredSkill ? `> ${hoveredSkill}` : ""}
              </motion.div>
            </div>
            
            {/* Ambient Background Glow for Text Area */}
            <div className="absolute top-1/2 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
          </motion.div>

          {/* Right: Skill Orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] w-[400px] md:h-[500px] md:w-[500px] mx-auto flex items-center justify-center"
          >
            {/* Center Core */}
            <div className="absolute w-24 h-24 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center z-10 shadow-[0_0_50px_rgba(59,130,246,0.5)]">
              <span className="font-bold text-lg">Core</span>
            </div>

            {/* Inner Orbit */}
            <motion.div 
              style={{ rotate: rotate1 }} 
              className="absolute w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full border border-border/20 border-dashed"
            >
              {innerOrbit.map((skill, i) => {
                const angle = (i * 360) / innerOrbit.length;
                return (
                  <motion.div
                    key={skill}
                    className="absolute w-max flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 50}%)`,
                      top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 50}%)`,
                    }}
                  >
                    <motion.div 
                      style={{ rotate: useTransform(rotate1, r => -r) }} // Counter-rotate to keep text upright
                      className="px-4 py-2 bg-card/80 backdrop-blur-md border border-border/50 rounded-full text-sm font-medium hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all cursor-crosshair"
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {skill}
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Outer Orbit */}
            <motion.div 
              style={{ rotate: rotate2 }} 
              className="absolute w-[380px] h-[380px] md:w-[480px] md:h-[480px] rounded-full border border-border/20 border-dotted"
            >
              {outerOrbit.map((skill, i) => {
                const angle = (i * 360) / outerOrbit.length;
                return (
                  <motion.div
                    key={skill}
                    className="absolute w-max flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 50}%)`,
                      top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 50}%)`,
                    }}
                  >
                    <motion.div 
                      style={{ rotate: useTransform(rotate2, r => -r) }} // Counter-rotate to keep text upright
                      className="px-4 py-2 bg-card/80 backdrop-blur-md border border-border/50 rounded-full text-sm font-medium hover:border-secondary-foreground hover:text-secondary-foreground hover:shadow-[0_0_15px_rgba(167,139,250,0.5)] transition-all cursor-crosshair"
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {skill}
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
