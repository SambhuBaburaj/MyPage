"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

function ParallaxRail({
  className,
  reverse = false,
}: {
  className: string;
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const easedScroll = useSpring(scrollYProgress, {
    stiffness: 48,
    damping: 24,
    mass: 0.35,
  });
  const x = useTransform(
    easedScroll,
    [0, 1],
    reduceMotion
      ? ["0%", "0%"]
      : reverse
        ? ["8%", "-7%"]
        : ["-7%", "8%"],
  );

  return <motion.div className={className} style={{ x }} />;
}

export default function ParallaxEnvironment() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const easedScroll = useSpring(scrollYProgress, {
    stiffness: 48,
    damping: 24,
    mass: 0.35,
  });

  const deepY = useTransform(
    easedScroll,
    [0, 1],
    reduceMotion ? [0, 0] : [-120, 360],
  );
  const midY = useTransform(
    easedScroll,
    [0, 1],
    reduceMotion ? [0, 0] : [120, -260],
  );
  const gridY = useTransform(
    easedScroll,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -180],
  );
  const rotate = useTransform(
    easedScroll,
    [0, 1],
    reduceMotion ? [0, 0] : [-9, 11],
  );
  const x = useTransform(
    easedScroll,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-10%", "9%"],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background"
    >
      <motion.div
        className="section-grid absolute -inset-x-24 -top-28 bottom-0 opacity-25"
        style={{ y: gridY }}
      />

      <motion.div
        className="absolute left-[-16vw] top-[9vh] h-[34vh] w-[78vw] -skew-y-6 border-y border-primary/20 bg-linear-to-r from-transparent via-primary/[0.08] to-transparent"
        style={{ x, y: deepY, rotate }}
      />

      <motion.div
        className="absolute right-[-20vw] top-[42vh] h-[38vh] w-[82vw] skew-y-6 border-y border-secondary-foreground/20 bg-linear-to-r from-transparent via-secondary-foreground/[0.06] to-transparent"
        style={{ y: midY }}
      />

      <motion.div
        className="absolute left-[5vw] top-[15vh] font-outfit text-[18vw] font-black uppercase leading-none tracking-normal text-outline text-transparent text-primary opacity-[0.08]"
        style={{ y: midY }}
      >
        Build
      </motion.div>

      <motion.div
        className="absolute right-[-7vw] top-[54vh] font-outfit text-[15vw] font-black uppercase leading-none tracking-normal text-outline text-transparent text-accent-foreground opacity-[0.075]"
        style={{ y: deepY }}
      >
        Ship
      </motion.div>

      <ParallaxRail className="absolute left-[-12vw] top-[8%] h-14 w-[124vw] -rotate-6 border-y border-primary/20 bg-primary/[0.045]" />
      <ParallaxRail
        reverse
        className="absolute left-[-12vw] top-[34%] h-14 w-[124vw] -rotate-6 border-y border-secondary-foreground/20 bg-secondary-foreground/[0.045]"
      />
      <ParallaxRail className="absolute left-[-12vw] top-[67%] h-14 w-[124vw] -rotate-6 border-y border-accent-foreground/20 bg-accent-foreground/[0.045]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_18%,transparent_72%,var(--background)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_46%,var(--background)_95%)]" />
    </div>
  );
}
