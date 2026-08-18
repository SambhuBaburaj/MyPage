"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, Github, Linkedin, ArrowRight, Instagram } from "lucide-react";
import { useRef } from "react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [90, -70]);
  const panelY = useTransform(scrollYProgress, [0, 1], [-20, 65]);
  const gridY = useTransform(scrollYProgress, [0, 1], [-80, 110]);
  const outlineY = useTransform(scrollYProgress, [0, 1], [180, -160]);
  const ruleScale = useTransform(scrollYProgress, [0.12, 0.72], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[86svh] w-full items-center justify-center overflow-hidden parallax-surface py-32"
      id="contact"
    >
      <motion.div
        aria-hidden="true"
        className="section-grid absolute inset-0 opacity-25"
        style={{ y: gridY }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[-12vw] top-[12%] font-outfit text-[22vw] font-black uppercase leading-none tracking-normal text-outline text-transparent text-primary opacity-[0.06]"
        style={{ y: outlineY }}
      >
        Hello
      </motion.div>
      
      <div className="container relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 md:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ y: headlineY }}
          className="max-w-4xl"
        >
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.34em] text-primary">
            Contact
          </p>
          <h2 className="text-balance font-outfit text-6xl font-black uppercase leading-[0.86] tracking-normal text-foreground md:text-8xl lg:text-9xl">
            Let&apos;s build the useful thing.
          </h2>

          <motion.div
            aria-hidden="true"
            className="mt-10 h-px w-full max-w-2xl origin-left bg-linear-to-r from-primary via-secondary-foreground to-accent-foreground"
            style={{ scaleX: ruleScale }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: panelY }}
          className="border-y border-border/70 py-8"
        >
          <p className="mb-10 text-pretty text-lg leading-8 text-muted-foreground">
            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
          </p>

          <div className="mb-12 grid gap-4">
            <a href="mailto:sambhubaburaj513@gmail.com" className="group flex min-w-0 items-center gap-4 text-foreground transition-colors hover:text-primary">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/80 bg-foreground/[0.03] transition-colors group-hover:bg-primary/15">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <span className="min-w-0 break-all text-base font-semibold md:text-lg">
                sambhubaburaj513@gmail.com
              </span>
            </a>
            
            <a href="tel:+919746369882" className="group flex min-w-0 items-center gap-4 text-foreground transition-colors hover:text-primary">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/80 bg-foreground/[0.03] transition-colors group-hover:bg-primary/15">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <span className="text-base font-semibold md:text-lg">
                +91 9746369882
              </span>
            </a>
          </div>

          <div className="mb-12 flex gap-3">
            <a 
              href="https://github.com/SambhuBaburaj" 
              target="_blank" 
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border/80 bg-foreground/[0.03] text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/sambhu-baburaj/" 
              target="_blank" 
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border/80 bg-foreground/[0.03] text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a 
              href="http://instagram.com/itz_s13_/" 
              target="_blank" 
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border/80 bg-foreground/[0.03] text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>

          <a href="mailto:sambhubaburaj513@gmail.com" className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/25">
            Start a Conversation <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
