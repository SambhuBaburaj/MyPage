"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";

type DriftObject = {
  id: string;
  label: string;
  meta: string;
  range: [number, number, number];
  x: [string, string];
  y: [string, string];
  rotate: [number, number];
  scale: [number, number];
  tone: "primary" | "amber" | "sky";
  size: "sm" | "md" | "lg";
};

const codeMeteors: DriftObject[] = [
  {
    id: "hero-fetch",
    label: "fetch('/api')",
    meta: "request",
    range: [0.02, 0.1, 0.2],
    x: ["-26vw", "116vw"],
    y: ["22vh", "8vh"],
    rotate: [-8, -8],
    scale: [0.9, 1.08],
    tone: "primary",
    size: "lg",
  },
  {
    id: "about-component",
    label: "<Profile />",
    meta: "render",
    range: [0.12, 0.23, 0.35],
    x: ["108vw", "6vw"],
    y: ["16vh", "62vh"],
    rotate: [18, -14],
    scale: [0.78, 1.18],
    tone: "sky",
    size: "md",
  },
  {
    id: "about-hook",
    label: "useEffect()",
    meta: "sync",
    range: [0.18, 0.29, 0.42],
    x: ["-26vw", "88vw"],
    y: ["74vh", "18vh"],
    rotate: [-18, 12],
    scale: [0.82, 1.16],
    tone: "primary",
    size: "md",
  },
  {
    id: "experience-git",
    label: "git push",
    meta: "ship",
    range: [0.34, 0.46, 0.58],
    x: ["-24vw", "74vw"],
    y: ["28vh", "64vh"],
    rotate: [-16, 10],
    scale: [0.72, 1.08],
    tone: "amber",
    size: "md",
  },
  {
    id: "experience-test",
    label: "npm test",
    meta: "green",
    range: [0.42, 0.53, 0.64],
    x: ["118vw", "-28vw"],
    y: ["18vh", "74vh"],
    rotate: [148, 148],
    scale: [0.86, 1.22],
    tone: "primary",
    size: "lg",
  },
  {
    id: "systems-api",
    label: "GraphQL",
    meta: "query",
    range: [0.56, 0.66, 0.76],
    x: ["96vw", "12vw"],
    y: ["72vh", "16vh"],
    rotate: [12, -22],
    scale: [0.82, 1.28],
    tone: "sky",
    size: "md",
  },
  {
    id: "systems-cache",
    label: "cache.hit",
    meta: "fast",
    range: [0.62, 0.72, 0.84],
    x: ["-20vw", "104vw"],
    y: ["12vh", "68vh"],
    rotate: [8, 26],
    scale: [0.7, 1.18],
    tone: "primary",
    size: "sm",
  },
  {
    id: "contact-json",
    label: "{ status: 200 }",
    meta: "ok",
    range: [0.78, 0.88, 0.98],
    x: ["-30vw", "82vw"],
    y: ["22vh", "58vh"],
    rotate: [-18, 16],
    scale: [0.72, 1.14],
    tone: "amber",
    size: "lg",
  },
];

const stagePanels = [
  {
    title: "interface",
    code: "render(<Dashboard />)",
    tone: "primary",
    x: -190,
    y: -118,
    z: 120,
    rotateY: -30,
  },
  {
    title: "realtime",
    code: "socket.emit('sync')",
    tone: "sky",
    x: 170,
    y: -88,
    z: 40,
    rotateY: 28,
  },
  {
    title: "data",
    code: "await api.query()",
    tone: "amber",
    x: -120,
    y: 116,
    z: -40,
    rotateY: 34,
  },
  {
    title: "release",
    code: "deploy.preview()",
    tone: "primary",
    x: 156,
    y: 124,
    z: 100,
    rotateY: -24,
  },
] as const;

function toneClasses(tone: DriftObject["tone"] | (typeof stagePanels)[number]["tone"]) {
  if (tone === "amber") {
    return "border-secondary-foreground/60 text-secondary-foreground shadow-[0_0_32px_rgba(245,158,11,0.28)]";
  }

  if (tone === "sky") {
    return "border-accent-foreground/60 text-accent-foreground shadow-[0_0_32px_rgba(56,189,248,0.28)]";
  }

  return "border-primary/65 text-primary shadow-[0_0_32px_rgba(20,184,166,0.28)]";
}

function sizeClasses(size: DriftObject["size"]) {
  if (size === "lg") {
    return "min-w-48 px-5 py-3 text-sm md:min-w-64 md:text-base";
  }

  if (size === "md") {
    return "min-w-36 px-4 py-3 text-xs md:min-w-52 md:text-sm";
  }

  return "min-w-32 px-3 py-2 text-[10px] md:min-w-44 md:text-xs";
}

function CodeMeteor({
  label,
  meta,
  tone,
  size,
}: Pick<DriftObject, "label" | "meta" | "tone" | "size">) {
  return (
    <div className="relative">
      <div className="absolute right-[92%] top-1/2 h-px w-32 -translate-y-1/2 bg-linear-to-l from-current/70 to-transparent md:w-56" />
      <div className="absolute right-[88%] top-[calc(50%+9px)] h-px w-20 bg-linear-to-l from-current/45 to-transparent md:w-40" />
      <div
        className={`relative overflow-hidden rounded-md border bg-background/35 font-mono font-black uppercase tracking-[0.18em] backdrop-blur-[2px] ${toneClasses(
          tone,
        )} ${sizeClasses(size)}`}
      >
        <span className="mb-1 block text-[0.62em] font-semibold tracking-[0.32em] opacity-55">
          {meta}
        </span>
        <span>{label}</span>
        <span className="absolute inset-x-0 bottom-0 h-px bg-current/45" />
      </div>
    </div>
  );
}

function DriftLayer({
  item,
  progress,
}: {
  item: DriftObject;
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, [item.range[0], item.range[2]], item.x);
  const y = useTransform(progress, [item.range[0], item.range[2]], item.y);
  const rotate = useTransform(progress, [item.range[0], item.range[2]], item.rotate);
  const scale = useTransform(progress, [item.range[0], item.range[2]], item.scale);
  const opacity = useTransform(progress, item.range, [0, 0.9, 0]);

  return (
    <motion.div
      className="absolute left-0 top-0 will-change-transform"
      style={{ x, y, rotate, scale, opacity }}
    >
      <CodeMeteor
        label={item.label}
        meta={item.meta}
        tone={item.tone}
        size={item.size}
      />
    </motion.div>
  );
}

function DepthPanel({
  panel,
  progress,
}: {
  panel: (typeof stagePanels)[number];
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, [0.39, 0.54, 0.72], [panel.x * 1.7, panel.x, panel.x * 0.45]);
  const y = useTransform(progress, [0.39, 0.54, 0.72], [panel.y * 1.35, panel.y, panel.y * 0.35]);
  const opacity = useTransform(progress, [0.39, 0.48, 0.66, 0.76], [0, 0.46, 0.46, 0]);
  const scale = useTransform(progress, [0.39, 0.54, 0.72], [0.78, 1, 0.82]);
  const rotateX = useTransform(progress, [0.39, 0.72], [24, -14]);
  const rotateZ = useTransform(progress, [0.39, 0.72], [-10, 12]);

  return (
    <motion.div
      className={`absolute left-1/2 top-1/2 min-w-52 rounded-md border bg-background/45 px-4 py-3 font-mono text-xs font-black uppercase tracking-[0.18em] backdrop-blur-md md:min-w-64 ${toneClasses(
        panel.tone,
      )}`}
      style={{
        x,
        y,
        opacity,
        scale,
        rotateX,
        rotateY: panel.rotateY,
        rotateZ,
        transformStyle: "preserve-3d",
      }}
    >
      <span className="mb-2 block text-[0.68em] tracking-[0.34em] opacity-55">
        {panel.title}
      </span>
      {panel.code}
    </motion.div>
  );
}

function ScrollDepthStage({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.35, 0.45, 0.72, 0.82], [0, 0.56, 0.56, 0]);
  const scale = useTransform(progress, [0.35, 0.52, 0.82], [0.72, 1.08, 0.8]);
  const rotateX = useTransform(progress, [0.35, 0.82], [62, -42]);
  const rotateY = useTransform(progress, [0.35, 0.82], [-38, 42]);
  const z = useTransform(progress, [0.35, 0.52, 0.82], [-280, 120, -180]);
  const tunnelScale = useTransform(progress, [0.35, 0.82], [0.55, 1.8]);
  const tunnelOpacity = useTransform(progress, [0.36, 0.52, 0.8], [0, 0.55, 0]);
  const scanX = useTransform(progress, [0.35, 0.82], ["-42%", "42%"]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-[72vh] w-[76vw] -translate-x-1/2 -translate-y-1/2"
      style={{ opacity, perspective: 900 }}
    >
      <motion.div
        className="absolute inset-0 rounded-[50%] border border-primary/35"
        style={{ scale: tunnelScale, opacity: tunnelOpacity, rotateX: 74 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary-foreground/25"
        style={{ scale: tunnelScale, opacity: tunnelOpacity, rotateX: 78 }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-primary/40 bg-background/20 backdrop-blur-[1px] md:h-96 md:w-96"
        style={{
          scale,
          rotateX,
          rotateY,
          z,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 rounded-xl bg-[linear-gradient(to_right,rgba(20,184,166,0.13)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,184,166,0.12)_1px,transparent_1px)] bg-[size:38px_38px]" />
        <motion.div
          className="absolute inset-y-0 w-20 bg-linear-to-r from-transparent via-primary/35 to-transparent"
          style={{ x: scanX }}
        />
        <div className="absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 rounded-md border border-primary/55 bg-background/55 px-5 py-4 font-mono text-primary shadow-[0_0_48px_rgba(20,184,166,0.24)] backdrop-blur-md md:w-96">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.42em] opacity-65">
            scroll-linked 3D system
          </span>
          <span className="block text-lg font-black uppercase tracking-[0.18em] md:text-2xl">
            build pipeline
          </span>
          <div className="mt-4 grid gap-2 text-[10px] uppercase tracking-[0.2em] text-foreground/65 md:text-xs">
            <span>frontend {">"} api {">"} realtime</span>
            <span>tests {">"} deploy {">"} monitor</span>
          </div>
        </div>
      </motion.div>

      {stagePanels.map((panel) => (
        <DepthPanel key={panel.title} panel={panel} progress={progress} />
      ))}
    </motion.div>
  );
}

export default function ScrollParallaxOverlay() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 76,
    damping: 20,
    mass: 0.22,
  });
  const hudY = useTransform(progress, [0, 1], ["92vh", "8vh"]);
  const hudOpacity = useTransform(progress, [0.04, 0.16, 0.92, 1], [0, 0.45, 0.45, 0]);

  if (reduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden mix-blend-screen"
    >
      {codeMeteors.map((item) => (
        <DriftLayer key={item.id} item={item} progress={progress} />
      ))}

      <ScrollDepthStage progress={progress} />

      <motion.div
        className="absolute right-4 hidden h-24 w-px bg-linear-to-b from-transparent via-primary to-transparent md:block"
        style={{ y: hudY, opacity: hudOpacity }}
      />
      <motion.div
        className="absolute right-8 hidden font-mono text-[10px] uppercase tracking-[0.24em] text-primary md:block"
        style={{ y: hudY, opacity: hudOpacity }}
      >
        scroll velocity
      </motion.div>
    </div>
  );
}
