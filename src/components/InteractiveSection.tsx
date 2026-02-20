"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

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

  useEffect(() => {
    if (isInView) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedCode((prev) => prev + codeString[index]);
        index++;
        if (index === codeString.length - 1) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section 
      ref={containerRef}
      className="py-32 w-full bg-background border-t border-border/10 overflow-hidden"
    >
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-outfit text-foreground mb-4">
            Under The Hood
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl shadow-primary/20 border border-border/50 bg-[#0d1117]"
        >
          {/* Editor Header */}
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
          
          {/* Editor Body */}
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
