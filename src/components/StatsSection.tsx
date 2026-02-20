"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

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
  return (
    <section className="py-24 bg-primary/5 border-y border-border/10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-card/10 backdrop-blur-sm border border-white/5"
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
        </div>
      </div>
    </section>
  );
}
