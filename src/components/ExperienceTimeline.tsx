"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    id: 1,
    role: "FULL STACK DEVELOPER",
    company: "Lifology",
    period: "May 2024 - Present",
    points: [
      "Built dashboard with TanStack Table",
      "Live chat with Centrifugal",
      "Offline assessment system",
      "GraphQL optimization",
      "Multi-login architecture",
    ],
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Ajay's App",
    period: "Previous",
    points: [
      "Weekly task management system",
      "Ionic + Capacitor",
      "GraphQL integration",
      "Mobile-first design",
    ],
  },
  {
    id: 3,
    role: "Team Lead",
    company: "Health Care Super App",
    period: "Previous",
    points: [
      "Admin panel",
      "Firebase real-time notifications",
      "Zoom API integration",
      "Team of 4 developers",
    ],
  },
  {
    id: 4,
    role: "Backend Engineer",
    company: "E-Commerce Platform",
    period: "Previous",
    points: [
      "Node.js, Express",
      "Payment gateway integration",
      "AWS EC2 + Nginx deployment",
      "Admin analytics dashboard",
    ],
  },
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full bg-background py-32 border-t border-border/10"
      id="experience"
    >
      <div className="container px-4 md:px-6 z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-outfit text-foreground mb-4">
            Experience
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-border/30 -translate-x-1/2 rounded-full" />
          
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-primary -translate-x-1/2 rounded-full origin-top"
            style={{ scaleY: pathLength }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={exp.id} 
                  className={`relative flex items-center justify-between md:justify-normal ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  } group`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 z-10 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-300" />
                  
                  {/* Content Box */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`ml-12 md:ml-0 md:w-5/12 ${
                      isEven ? "md:pl-10 text-left" : "md:pr-10 md:text-right text-left"
                    }`}
                  >
                    <div className="bg-card/30 backdrop-blur-md border border-border/50 p-6 rounded-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] relative overflow-hidden group/card">
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10">
                        <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
                          {exp.period}
                        </Badge>
                        <h3 className="text-2xl font-bold font-outfit text-foreground group-hover/card:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <h4 className="text-lg font-medium text-muted-foreground mb-4">
                          {exp.company}
                        </h4>
                        
                        <ul className={`space-y-2 text-muted-foreground/80 font-inter ${isEven ? "" : "md:flex md:flex-col md:items-end"}`}>
                          {exp.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 max-w-sm">
                              <span className={`text-primary mt-1 ${isEven ? "" : "md:hidden"}`}>&bull;</span>
                              <span className="text-sm">{point}</span>
                              <span className={`text-primary mt-1 hidden ${isEven ? "" : "md:inline-block"}`}>&bull;</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
