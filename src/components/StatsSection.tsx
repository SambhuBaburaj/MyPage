"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const stats = [
  { label: "Years Experience", value: 2, suffix: "+" },
  { label: "Production Features Built", value: 10, suffix: "+" },
  { label: "Large Scale Projects", value: 4, suffix: "+" },
  { label: "Client Delivery", value: 100, suffix: "%" },
];

function Counter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [110, -120]);
  const headingY = useTransform(scrollYProgress, [0, 1], [60, -50]);
  const cardY = useTransform(scrollYProgress, [0, 1], [-20, 50]);
  const railX = useTransform(scrollYProgress, [0, 1], ["14%", "-16%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-border/70 parallax-surface py-24 md:py-32"
    >
      <motion.div
        aria-hidden="true"
        className="fine-grid absolute inset-0 opacity-35"
        style={{ y: gridY }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute left-[-14vw] top-[28%] h-16 w-[128vw] -rotate-3 border-y border-accent-foreground/20 bg-accent-foreground/[0.045]"
        style={{ x: railX }}
      />
      
      <div className="container relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
        <motion.div style={{ y: headingY }}>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.34em] text-secondary-foreground">
            Proof
          </p>
          <h2 className="text-balance font-outfit text-4xl font-black uppercase leading-[0.95] tracking-normal md:text-6xl">
            Small numbers, real delivery.
          </h2>
        </motion.div>

        <motion.div
          style={{ y: cardY }}
          className="grid grid-cols-2 gap-px overflow-hidden border border-border/70 bg-border/70 text-center lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex min-h-44 flex-col items-center justify-center bg-background/80 p-6 backdrop-blur-sm"
            >
              <div className="text-4xl md:text-5xl font-bold font-outfit text-foreground mb-2 flex items-center">
                <Counter from={0} to={stat.value} duration={2} />
                <span className="text-primary ml-1">{stat.suffix}</span>
              </div>
              <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
