"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-32 w-full bg-background relative overflow-hidden flex items-center justify-center" id="contact">
      {/* Ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-gradient-to-r from-primary/20 to-secondary-foreground/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto rounded-3xl bg-card/40 backdrop-blur-xl border border-border/50 p-8 md:p-12 text-center shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-outfit text-foreground mb-4">
            Let's Talk
          </h2>
          <p className="text-lg text-muted-foreground mb-10 font-inter">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <a href="mailto:sambhubaburaj513@gmail.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors text-lg font-medium group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              sambhubaburaj513@gmail.com
            </a>
            
            <a href="tel:+919746369882" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors text-lg font-medium group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              +91 9746369882
            </a>
          </div>

          <div className="flex justify-center gap-6 mb-12">
            <a 
              href="https://github.com/SambhuBaburaj" 
              target="_blank" 
              rel="noreferrer"
              className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 text-muted-foreground"
            >
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/sambhu-baburaj/" 
              target="_blank" 
              rel="noreferrer"
              className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 text-muted-foreground"
            >
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

          {/* Animated Gradient Border Button */}
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary-foreground to-primary rounded-full blur opacity-50 group-hover:opacity-100 animate-pulse transition duration-1000 group-hover:duration-200" />
            <button className="relative px-8 py-4 bg-background border border-border/50 text-foreground font-semibold rounded-full flex items-center gap-3 transition-colors hover:text-primary">
              Let's Build Something Together <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
