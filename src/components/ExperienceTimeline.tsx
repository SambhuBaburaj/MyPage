"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Calendar } from "lucide-react";

const impacts = [
  {
    id: 1,
    company: "Lifology",
    location: "Thiruvananthapuram, Kerala",
    role: "Full Stack Developer",
    period: "May 2024 – Present",
    description: (
      <>
        <p className="mb-4">
          At Lifology, I architected and delivered the entire frontend ecosystem for a large-scale coach-student platform used for assessments, communication, and performance tracking.
        </p>
        <p className="mb-4">
          I engineered a highly dynamic dashboard powered by TanStack Table and optimized GraphQL queries to handle complex filtering and real-time data updates with precision.
        </p>
        <p className="mb-4">
          One of my key contributions was building a real-time chat system using Centrifugal — supporting unread counts, delivery state tracking, and smooth UX animations.
        </p>
        <p className="mb-4">
          I also designed and implemented an offline-compatible FACE & MIO assessment system, backed by a heartbeat API that ensured seamless syncing once connectivity was restored.
        </p>
        <p>
          Beyond frontend ownership, I contributed to backend logic and multi-login architecture, enabling secure access for both students and coaches.
        </p>
      </>
    ),
    tags: ["React", "Next.js", "GraphQL", "Centrifugal", "TanStack"],
    color: "from-blue-600/20 to-indigo-600/20",
    glowColor: "rgba(79, 70, 229, 0.15)",
  },
  {
    id: 2,
    company: "Bestway Exims",
    location: "Malappuram, Kerala",
    role: "Team Lead - Health Care Super App",
    period: "2023 – 2024",
    description: (
      <>
        <p className="mb-4">
          At Bestway Exims, I led a team of four developers to deliver a fully functional healthcare admin panel within a 15-day sprint cycle.
        </p>
        <p className="mb-4">
          I architected dashboards for order tracking, payment monitoring, and advanced user analytics — ensuring real-time operational visibility.
        </p>
        <p className="mb-4">
          Integrated Firebase for live notifications and activity tracking for doctors, and connected the Zoom API to enable seamless virtual consultations.
        </p>
        <p>
          Balanced leadership and engineering responsibilities, ensuring both code quality and timely execution under tight deadlines.
        </p>
      </>
    ),
    tags: ["Team Leadership", "Real-time Systems", "API Integrations", "Agile Delivery"],
    color: "from-emerald-600/20 to-teal-600/20",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    id: 3,
    company: "Packapeer Academy",
    location: "Ernakulam",
    role: "Full Stack Development Intern",
    period: "Previous",
    description: (
      <>
        <p className="mb-4">
          Completed an intensive MERN stack internship, designing and deploying multiple scalable, full-stack applications from scratch to master end-to-end development.
        </p>
        <p className="mb-4">
          Engineered a complete production-ready e-commerce platform featuring RESTful APIs, cart functionality, integrated gateways (PayPal/Razorpay), and a comprehensive admin analytics dashboard.
        </p>
        <p className="mb-4">
          Architected a real-time social media application using Socket.IO for live chat, JWT for secure routing, and a scalable MongoDB schema to support media uploads and engagement features.
        </p>
      
      </>
    ),
    tags: ["MERN Stack", "Socket.IO", "AWS EC2", "RESTful APIs", "Payment Gateways"],
    color: "from-violet-600/20 to-fuchsia-600/20",
    glowColor: "rgba(139, 92, 246, 0.15)",
  },
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Global parallax for background elements
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full bg-[#050810] py-32 border-t border-border/10 overflow-hidden"
      id="experience"
    >
      {/* Subtle parallax background grid/grain could go here */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary-foreground/5 rounded-full blur-[150px]" />
      </motion.div>

      <div className="container px-4 md:px-6 z-10 mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-outfit text-foreground mb-6 tracking-tight">
            Where I've Built <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary-foreground">Impact</span>
          </h2>
          <div className="h-1 w-24 bg-primary/50 rounded-full mx-auto" />
        </motion.div>

        <div className="flex flex-col gap-16 md:gap-24 relative">
          {/* Central progress accent line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[2px] bg-linear-to-b from-primary/0 via-primary/20 to-primary/0" />

          {impacts.map((impact, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={impact.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative group w-full"
              >
                {/* Visual marker connecting to the line */}
                <div className="absolute left-8 md:left-12 top-10 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-20 group-hover:bg-primary transition-colors duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,1)]" />

                <div className="ml-16 md:ml-24">
                  <div 
                    className="relative p-8 md:p-12 rounded-3xl bg-card/40 backdrop-blur-xl border border-border/40 hover:border-border/80 transition-all duration-700 hover:-translate-y-2"
                    style={{
                      boxShadow: `0 20px 40px -20px ${impact.glowColor}`
                    }}
                  >
                    {/* Glowing background inside card */}
                    <div className={`absolute inset-0 bg-linear-to-br ${impact.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none`} />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
                      
                      {/* Meta Info Sidebar */}
                      <div className="md:min-w-[280px] shrink-0">
                        <h3 className="text-3xl md:text-4xl font-extrabold font-outfit text-foreground group-hover:text-primary transition-colors duration-500 mb-2 tracking-tight">
                          {impact.company}
                        </h3>
                        
                        <div className="flex flex-col gap-3 mt-6">
                          <div className="flex items-center gap-2 text-muted-foreground font-medium bg-background/50 w-fit px-3 py-1.5 rounded-lg border border-border/20">
                            <Briefcase size={16} className="text-primary" />
                            <span>{impact.role}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-muted-foreground/80 text-sm pl-1">
                            <MapPin size={16} />
                            <span>{impact.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-muted-foreground/80 text-sm pl-1">
                            <Calendar size={16} />
                            <span>{impact.period}</span>
                          </div>
                        </div>
                      </div>

                      {/* Story Content */}
                      <div className="flex-1 border-t md:border-t-0 md:border-l border-border/20 pt-8 md:pt-0 md:pl-8 lg:pl-12">
                        <div className="text-muted-foreground text-lg leading-relaxed font-inter opacity-90 group-hover:opacity-100 transition-opacity">
                          {impact.description}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-10">
                          {impact.tags.map(tag => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="bg-secondary/30 hover:bg-secondary/60 text-secondary-foreground font-mono transition-colors shadow-sm"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
