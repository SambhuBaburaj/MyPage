"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const puns = [
  "> Turning bugs into features...",
  "> Compiling caffeine into code...",
  "> Git commit, push, and pray...",
  "> RM -RF /ing the competition...",
  "> Finding the missing semicolon...",
  "> Blaming the compiler...",
  "> Restarting the router...",
  "> Waiting for npm install...",
  "> It compiles on my machine...",
  "> Updating dependencies...",
  "> Exiting VIM...",
  "> Downloading more RAM...",
  "> Aligning the divs...",
  "> Trying to read my own code...",
  "> Pressing Ctrl+S out of paranoia..."
];

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [pun, setPun] = useState("> Loading...");

  useEffect(() => {
    setPun(puns[Math.floor(Math.random() * puns.length)]);
    
    // Lock body scroll while loading
    document.body.style.overflow = "hidden";

    const finishLoading = () => {
      setProgress(100);
      setIsLoading(false);
      document.body.style.overflow = "";
    };

    // Simulate loading progress
    const duration = 2000; // 2 seconds total loading animation
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    let currentStep = 0;
    const fallbackTimer = window.setTimeout(finishLoading, 3400);

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      
      // Add slight easing to the progress curve (fast start, slow end)
      const easedProgress = Math.pow(newProgress / 100, 0.5) * 100;
      setProgress(easedProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Add a small delay at 100% before triggering exit
        setTimeout(() => {
          finishLoading();
        }, 400); 
      }
    }, interval);

    return () => {
      clearInterval(timer);
      window.clearTimeout(fallbackTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%", // Slide up on exit
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // Smooth elegant ease
          }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background pointer-events-none"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[100px]" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-8">
            {/* Logo / Name Reveal */}
            <div className="mb-8 flex items-center justify-center overflow-hidden py-1">
              <motion.h1 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="text-xl md:text-3xl font-bold font-mono tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary-foreground text-center"
              >
                {pun}
              </motion.h1>
            </div>

            {/* Progress Container */}
            <div className="w-full relative">
              {/* Progress Percentage */}
              <motion.div 
                className="absolute -top-8 right-0 text-sm font-mono text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {Math.round(progress)}%
              </motion.div>

              {/* Progress Bar Track */}
              <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="h-[2px] w-full bg-border/40 rounded-full overflow-hidden origin-left"
              >
                {/* Progress Bar Fill */}
                <motion.div
                  className="h-full bg-primary"
                  style={{ width: `${progress}%` }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
