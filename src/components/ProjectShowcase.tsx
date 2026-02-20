"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Coach Platform",
    description: "A comprehensive platform for coaches to manage clients, sessions, and track progress with real-time features.",
    tags: ["Next.js", "GraphQL", "Tailwind CSS", "PostgreSQL"],
    demoUrl: "#",
    githubUrl: "#",
    color: "from-blue-500/20 to-purple-500/20",
    borderGlow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
  },
  {
    id: 2,
    title: "Social Media App",
    description: "A feature-rich social media application with real-time chat, notifications, and personalized content feeds.",
    tags: ["React", "Socket.IO", "Node.js", "MongoDB"],
    demoUrl: "#",
    githubUrl: "#",
    color: "from-pink-500/20 to-orange-500/20",
    borderGlow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]"
  },
  {
    id: 3,
    title: "Health Care Admin",
    description: "Admin portal for healthcare professionals with role-based access control, analytics, and record management.",
    tags: ["Next.js", "TypeScript", "Prisma", "AWS"],
    demoUrl: "#",
    githubUrl: "#",
    color: "from-emerald-500/20 to-teal-500/20",
    borderGlow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
  },
  {
    id: 4,
    title: "E-Commerce Web App",
    description: "Scalable e-commerce solution with integrated payment gateways, dynamic cart, and inventory management.",
    tags: ["Next.js", "Stripe", "Express", "Redux"],
    demoUrl: "#",
    githubUrl: "#",
    color: "from-violet-500/20 to-fuchsia-500/20",
    borderGlow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
  }
];

export default function ProjectShowcase() {
  return (
    <section 
      className="min-h-screen w-full bg-background py-32 border-t border-border/10 relative overflow-hidden"
      id="projects"
    >
      <div className="container px-4 md:px-6 z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-outfit text-foreground mb-4">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              {/* Card Container */}
              <div className={`h-full rounded-3xl bg-card border border-border/50 overflow-hidden transition-all duration-500 ${project.borderGlow} hover:-translate-y-2`}>
                
                {/* Image Placeholder with Hover Zoom */}
                <div className="relative w-full h-[250px] overflow-hidden bg-muted/30">
                  <div className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500 z-10`} />
                  
                  {/* Mock UI Elements matching project style */}
                  <div className="absolute inset-0 w-full h-full p-6 opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 pointer-events-none flex flex-col gap-4">
                    <div className="h-8 w-3/4 bg-foreground/20 rounded-md" />
                    <div className="h-32 w-full bg-foreground/10 rounded-xl" />
                    <div className="flex gap-2">
                        <div className="h-10 w-1/3 bg-foreground/20 rounded-lg" />
                        <div className="h-10 w-1/3 bg-foreground/10 rounded-lg" />
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <Button variant="secondary" className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background">
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold font-outfit mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground font-inter mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-secondary/40 hover:bg-secondary/60">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    <Button variant="default" className="rounded-full shadow-lg gap-2">
                      <ExternalLink size={16} /> Live Demo
                    </Button>
                    <Button variant="outline" className="rounded-full gap-2 border-border/50 hover:bg-secondary/50">
                      <Github size={16} /> Source
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
