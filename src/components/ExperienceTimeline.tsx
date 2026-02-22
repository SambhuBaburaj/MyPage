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
    color: "from-blue-500/10 to-transparent",
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
    color: "from-violet-500/10 to-transparent",
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
    color: "from-indigo-500/10 to-transparent",
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
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div 
      ref={ref} 
      className={`relative min-h-[60vh] flex items-center w-full overflow-hidden py-24 border-t border-zinc-900 ${exp.align === "left" ? "justify-start" : "justify-end"}`}
    >
      <motion.div 
        className={`absolute inset-0 bg-linear-to-b ${exp.color} -z-10`}
        style={{ y: backgroundY }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          style={{ opacity, x }}
          className={`max-w-3xl flex flex-col gap-6 ${exp.align === "right" ? "ml-auto" : ""}`}
        >
          <div className="flex flex-col gap-2 relative">
            <span className="text-sm font-mono tracking-widest text-zinc-500 uppercase">{exp.duration} &mdash; {exp.location}</span>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-white mix-blend-difference">{exp.company}</h3>
            <h4 className="text-2xl md:text-3xl font-light text-zinc-300">{exp.role}</h4>
          </div>

          <div className="h-px w-full max-w-sm bg-zinc-800" />
          
          <div className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            {exp.content}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {exp.tech.map((t, i) => (
              <span key={i} className="px-4 py-2 text-sm rounded-full border border-zinc-700 bg-zinc-900/50 text-zinc-300">
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
  return (
    <section className="relative w-full flex flex-col pt-32 pb-16 bg-background" id="experience">
      <div className="container mx-auto px-6 mb-24">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mix-blend-difference">
          Where I Built <span className="text-violet-500">Impact.</span>
        </h2>
      </div>

      <div className="flex flex-col w-full">
        {experiences.map((exp, idx) => (
          <ExperienceBlock key={idx} exp={exp} index={idx} />
        ))}
      </div>
    </section>
  );
}
