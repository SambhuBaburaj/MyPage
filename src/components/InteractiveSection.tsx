"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const codeString = `// pages/api/developer.ts

export default function getDeveloperProfile(req, res) {
  const developer = {
    name: "Sambhu Baburaj",
    role: "Full Stack Engineer",
    passion: "Building Real-Time Distributed Systems",
    skills: ["Next.js", "React", "Node.js", "GraphQL"],
    metrics: {
      bugsFixed: "Countless",
      coffeeCups: 1337,
      clientSatisfaction: "100%"
    },
    status: "Available for new challenges"
  };

  return res.status(200).json(developer);
}`;

export default function InteractiveSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [displayedCode, setDisplayedCode] = useState("");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const codeY = useTransform(scrollYProgress, [0, 1], [130, -110]);
  const codeRotate = useTransform(scrollYProgress, [0, 1], [-2.5, 2.5]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [-40, 54]);
  const railX = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const outlineY = useTransform(scrollYProgress, [0, 1], [130, -160]);

  useEffect(() => {
    if (!isInView) return;

    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setDisplayedCode(codeString.slice(0, index));

      if (index >= codeString.length) {
        window.clearInterval(interval);
      }
    }, 18);

    return () => window.clearInterval(interval);
  }, [isInView]);

  return (
    <section 
      ref={containerRef}
      id="systems"
      className="relative w-full overflow-hidden border-y border-border/70 parallax-surface py-32"
    >
      <motion.div
        aria-hidden="true"
        className="absolute left-[-12vw] top-[39%] h-px w-[124vw] bg-linear-to-r from-transparent via-primary/55 to-transparent"
        style={{ x: railX }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[-12vw] top-[58%] h-px w-[124vw] bg-linear-to-r from-transparent via-secondary-foreground/45 to-transparent"
        style={{ x: railX }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[-7vw] top-12 font-outfit text-[18vw] font-black uppercase leading-none tracking-normal text-outline text-transparent text-primary opacity-[0.06]"
        style={{ y: outlineY }}
      >
        Code
      </motion.div>

      <div className="container relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 md:px-6 lg:grid-cols-[0.82fr_1.18fr]">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ y: headlineY }}
          className="max-w-xl"
        >
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.34em] text-accent-foreground">
            Systems
          </p>
          <h2 className="text-balance font-outfit text-5xl font-black uppercase leading-[0.92] tracking-normal text-foreground md:text-7xl">
            Under the hood, it still has to ship.
          </h2>
          <p className="mt-8 text-pretty text-lg leading-8 text-muted-foreground">
            Across dashboards, assessments, chat, and backend workflows, I keep
            the interface close to the data model so complex products stay easy
            to operate.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ y: codeY, rotate: codeRotate }}
          className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-lg border border-border/50 bg-[#0d1117] shadow-2xl shadow-black/40"
        >
          <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-white/10">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto flex text-xs text-muted-foreground font-mono">
              developer.ts &mdash; Portfolio
            </div>
          </div>
          
          <div className="p-6 overflow-x-auto">
            <pre className="font-mono text-sm md:text-base leading-relaxed text-blue-300">
              <code>{displayedCode}</code>
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-5 bg-primary align-middle ml-1"
              />
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
