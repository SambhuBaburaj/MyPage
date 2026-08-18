"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    company: "Lifology",
    location: "Thiruvananthapuram",
    role: "Full Stack Developer",
    duration: "May 2024 – Present",
    content: (
      <>
        <p>
          At Lifology, I architected and delivered the frontend foundation for a scalable coach-student platform powering real-time communication, performance dashboards, and assessment systems.
        </p>
        <p className="mt-4">
          Engineered dynamic dashboards using TanStack and optimized GraphQL queries for complex filtering scenarios. Designed and implemented a real-time chat infrastructure with message state tracking and delivery management.
        </p>
        <p className="mt-4">
          Built an offline-compatible assessment engine backed by a heartbeat sync API to ensure seamless data reconciliation. Contributed to backend authentication flows and multi-role access architecture.
        </p>
      </>
    ),
    tech: ["Next.js", "GraphQL", "TanStack", "WebSockets"],
    color: "from-primary/12 via-transparent to-transparent",
    align: "left",
  },
  {
    company: "Bestway Exims",
    location: "Malappuram",
    role: "Team Lead",
    duration: "2023 – 2024",
    content: (
      <>
        <p>
          Led a team of 4 developers to deliver critical business applications under tight deadlines.
        </p>
        <p className="mt-4">
          Successfully delivered a comprehensive admin panel within a 15-day sprint. Integrated real-time notifications via Firebase and built Zoom API integrations for virtual operations.
        </p>
        <p className="mt-4">
          Developed a specialized healthcare order analytics dashboard providing actionable insights.
        </p>
      </>
    ),
    tech: ["React", "Firebase", "Node.js", "Zoom API"],
    color: "from-secondary-foreground/12 via-transparent to-transparent",
    align: "right",
  },
  {
    company: "Packapeer Academy",
    location: "Ernakulam",
    role: "Full Stack Intern (MERN Stack)",
    duration: "2022 – 2023",
    content: (
      <>
        <p>
          Completed an intensive full-stack engineering internship focused on building production-grade applications using the MERN stack.
        </p>
        <p className="mt-4">
          Designed and deployed a complete e-commerce platform with payment integration, admin analytics, and AWS deployment.
        </p>
        <p className="mt-4">
          Built a fully interactive social networking platform featuring JWT authentication, real-time messaging with Socket.IO, media uploads, and dynamic user interaction systems. This experience laid the foundation for scalable backend design, real-time architecture, and production deployment workflows.
        </p>
      </>
    ),
    tech: ["MongoDB", "Express", "React", "Node.js", "AWS", "Socket.IO"],
    color: "from-accent-foreground/12 via-transparent to-transparent",
    align: "left",
  },
];

const ExperienceBlock = ({ 
  exp, 
  index 
}: { 
  exp: typeof experiences[0], 
  index: number 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const xOffset = exp.align === "left" ? -50 : 50;
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [xOffset, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [90, -40]);
  const numberY = useTransform(scrollYProgress, [0, 1], [130, -130]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-16%", "34%"]);
  const railX = useTransform(
    scrollYProgress,
    [0, 1],
    exp.align === "left" ? ["-18%", "10%"] : ["12%", "-18%"],
  );
  const ruleScale = useTransform(scrollYProgress, [0.15, 0.78], [0, 1]);

  return (
    <div 
      ref={ref} 
      className={`relative flex min-h-[76vh] w-full items-center overflow-hidden border-t border-border/70 py-24 ${exp.align === "left" ? "justify-start" : "justify-end"}`}
    >
      <motion.div 
        className={`absolute inset-x-0 top-[-18%] h-[140%] bg-linear-to-b ${exp.color} -z-10`}
        style={{ y: backgroundY }}
      />

      <motion.div
        aria-hidden="true"
        className="fine-grid absolute inset-0 z-0 opacity-25"
        style={{ y: numberY }}
      />

      <motion.div
        aria-hidden="true"
        className={`absolute top-8 z-0 font-outfit text-[34vw] font-black leading-none tracking-normal text-outline text-transparent opacity-[0.07] md:text-[22vw] ${
          exp.align === "right" ? "left-4 text-secondary-foreground" : "right-4 text-primary"
        }`}
        style={{ y: numberY }}
      >
        0{index + 1}
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute left-[-14vw] top-[46%] z-0 h-px w-[128vw] bg-linear-to-r from-transparent via-foreground/20 to-transparent"
        style={{ x: railX }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          style={{ opacity, x, y }}
          className={`max-w-3xl flex flex-col gap-6 ${exp.align === "right" ? "ml-auto" : ""}`}
        >
          <div className="flex flex-col gap-2 relative">
            <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">{exp.duration} / {exp.location}</span>
            <h3 className="text-balance font-outfit text-5xl font-black uppercase leading-[0.92] tracking-normal text-foreground md:text-7xl">{exp.company}</h3>
            <h4 className="text-2xl md:text-3xl font-light text-foreground/75">{exp.role}</h4>
          </div>

          <motion.div
            aria-hidden="true"
            className={`h-px w-full max-w-sm origin-left bg-linear-to-r ${
              exp.align === "right"
                ? "from-secondary-foreground to-transparent lg:ml-auto lg:origin-right"
                : "from-primary to-transparent"
            }`}
            style={{ scaleX: ruleScale }}
          />
          
          <div className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {exp.content}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {exp.tech.map((t, i) => (
              <span key={i} className="rounded-full border border-border/80 bg-foreground/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground/75">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 0.35], [120, 0]);
  const outlineY = useTransform(scrollYProgress, [0, 1], [120, -180]);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col overflow-hidden parallax-surface pb-16 pt-32"
      id="experience"
    >
      <motion.div
        aria-hidden="true"
        className="absolute right-[-10vw] top-6 font-outfit text-[18vw] font-black uppercase leading-none tracking-normal text-outline text-transparent text-accent-foreground opacity-[0.06]"
        style={{ y: outlineY }}
      >
        Work
      </motion.div>

      <div className="container relative z-10 mx-auto mb-24 px-6">
        <motion.div style={{ y: headingY }} className="max-w-5xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.34em] text-primary">
            Experience
          </p>
          <h2 className="text-balance font-outfit text-5xl font-black uppercase leading-[0.92] tracking-normal md:text-7xl">
            Where I built <span className="text-secondary-foreground">impact.</span>
        </h2>
        </motion.div>
      </div>

      <div className="flex flex-col w-full">
        {experiences.map((exp, idx) => (
          <ExperienceBlock key={idx} exp={exp} index={idx} />
        ))}
      </div>
    </section>
  );
}
