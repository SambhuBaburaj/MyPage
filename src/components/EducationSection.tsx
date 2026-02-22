"use client";

import { motion } from "framer-motion";
import ExperienceBlock, { ExperienceItem } from "./ExperienceBlock";

const educationData: ExperienceItem[] = [
  {
    id: 1,
    company: "University of Kerala",
    role: "Bachelor of Computer Applications",
    period: "2019 – 2022",
    description:
      "Graduated with a strong foundation in computer science, software engineering principles, algorithms, and database management. Developed multiple academic projects focusing on web technologies.",
    align: "left",
    color: "from-blue-600/20 to-indigo-600/20",
  },
  {
    id: 2,
    company: "Packapeer Academy",
    role: "MERN Stack Specialization",
    period: "2022 – 2023",
    description:
      "Completed an intensive full-stack development program. Mastered end-to-end application development using MongoDB, Express.js, React, and Node.js. Built and deployed production-ready scalable applications.",
    align: "right",
    color: "from-violet-600/20 to-fuchsia-600/20",
  },
];

export default function EducationSection() {
  return (
    <section 
      className="relative min-h-screen w-full bg-[#050810] py-32 border-t border-border/10 overflow-hidden"
      id="education"
    >
      <div className="container px-4 md:px-6 z-10 mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-outfit text-foreground mb-6 tracking-tight">
            Academic <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary-foreground">Journey</span>
          </h2>
          <div className="h-1 w-24 bg-primary/50 rounded-full mx-auto" />
        </motion.div>

        <div className="flex flex-col gap-8 md:gap-16">
          {educationData.map((item) => (
            <ExperienceBlock key={item.id} exp={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
