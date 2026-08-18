"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const codeFragments = [
  { label: "</>", className: "left-[8vw] top-[18vh] text-primary", speed: [-70, 180] },
  { label: "git", className: "right-[13vw] top-[22vh] text-secondary-foreground", speed: [130, -190] },
  { label: "API", className: "left-[13vw] top-[58vh] text-accent-foreground", speed: [180, -230] },
  { label: "JSON", className: "right-[8vw] top-[68vh] text-primary", speed: [-120, 220] },
  { label: "npm", className: "left-[38vw] top-[38vh] text-secondary-foreground", speed: [80, -150] },
];

const codeShards = [
  { label: "CI", className: "left-[18vw] top-[29vh] text-primary", speed: [120, -170], rotate: [-18, 24] },
  { label: "PR", className: "right-[22vw] top-[12vh] text-secondary-foreground", speed: [-110, 210], rotate: [20, -28] },
  { label: "DB", className: "right-[12vw] top-[47vh] text-accent-foreground", speed: [180, -160], rotate: [-10, 34] },
  { label: "UI", className: "left-[28vw] top-[76vh] text-primary", speed: [-160, 190], rotate: [28, -22] },
];

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

function FloatingCode({
  label,
  className,
  speed,
}: {
  label: string;
  className: string;
  speed: number[];
}) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const easedScroll = useSpring(scrollYProgress, {
    stiffness: 44,
    damping: 24,
    mass: 0.38,
  });
  const y = useTransform(easedScroll, [0, 1], reduceMotion ? [0, 0] : speed);
  const rotate = useTransform(easedScroll, [0, 1], reduceMotion ? [0, 0] : [-12, 12]);

  return (
    <motion.div
      className={`absolute font-mono text-sm font-bold uppercase tracking-[0.28em] opacity-45 ${className}`}
      style={{ y, rotate }}
    >
      {label}
    </motion.div>
  );
}

function CodeShard({
  label,
  className,
  speed,
  rotate,
}: {
  label: string;
  className: string;
  speed: number[];
  rotate: number[];
}) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const easedScroll = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 23,
    mass: 0.42,
  });
  const y = useTransform(easedScroll, [0, 1], reduceMotion ? [0, 0] : speed);
  const spin = useTransform(easedScroll, [0, 1], reduceMotion ? [0, 0] : rotate);

  return (
    <motion.div
      className={`absolute rounded border border-current/35 bg-background/25 px-3 py-2 font-mono text-xs font-black uppercase tracking-[0.22em] opacity-45 shadow-[0_0_28px_rgba(20,184,166,0.12)] backdrop-blur-[1px] ${className}`}
      style={{ y, rotate: spin }}
    >
      {label}
    </motion.div>
  );
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
        className="absolute left-1/2 top-[12vh] h-[62vh] w-[62vh] -translate-x-1/2 rounded-full border border-primary/15 opacity-50"
        style={{ y: midY, rotate }}
      />

      <motion.div
        className="absolute left-1/2 top-[8vh] h-[82vh] w-[82vh] -translate-x-1/2 rounded-full border border-secondary-foreground/10 opacity-45"
        style={{ y: deepY, rotate }}
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

      {codeShards.map((shard) => (
        <CodeShard
          key={shard.className}
          label={shard.label}
          className={shard.className}
          speed={shard.speed}
          rotate={shard.rotate}
        />
      ))}

      {codeFragments.map((fragment) => (
        <FloatingCode
          key={fragment.label}
          label={fragment.label}
          className={fragment.className}
          speed={fragment.speed}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_18%,transparent_72%,var(--background)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_46%,var(--background)_95%)]" />
    </div>
  );
}
