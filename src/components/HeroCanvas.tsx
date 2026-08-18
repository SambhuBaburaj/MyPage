"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { Object3D } from "three";
import type { InstancedMesh, Points as ThreePoints } from "three";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function StarBackground() {
  const ref = useRef<ThreePoints>(null);

  const sphere = useMemo(() => {
    const count = 5000;
    const points = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 1.5 * Math.cbrt(seededRandom(i + 1));
      const theta = seededRandom(i + 2) * 2 * Math.PI;
      const phi = Math.acos(2 * seededRandom(i + 3) - 1);
      points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      points[i * 3 + 2] = r * Math.cos(phi);
    }

    return points;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#14B8A6"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function CodeDebrisBelt() {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const debris = useMemo(
    () =>
      Array.from({ length: 48 }, (_, index) => {
        const lane = index % 4;
        const depth = -0.85 - lane * 0.32;
        const angle = seededRandom(index + 21) * Math.PI * 2;
        const radius = 1.55 + seededRandom(index + 31) * 1.25;
        return {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius * 0.48 + (seededRandom(index + 41) - 0.5) * 0.7,
          z: depth - seededRandom(index + 51) * 0.8,
          scale: 0.028 + seededRandom(index + 61) * 0.075,
          spin: 0.35 + seededRandom(index + 71) * 0.95,
          drift: seededRandom(index + 81) * Math.PI * 2,
        };
      }),
    [],
  );

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.elapsedTime;
    debris.forEach((chip, index) => {
      const orbital = time * 0.045 + chip.drift;
      dummy.position.set(
        chip.x + Math.cos(orbital) * 0.12,
        chip.y + Math.sin(orbital * 1.4) * 0.08,
        chip.z,
      );
      dummy.rotation.set(
        time * chip.spin + index,
        time * chip.spin * 0.72,
        time * chip.spin * 0.38,
      );
      dummy.scale.set(chip.scale * 2.3, chip.scale * 0.75, chip.scale * 0.28);
      dummy.updateMatrix();
      ref.current?.setMatrixAt(index, dummy.matrix);
    });

    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, debris.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#7dd3fc"
        emissive="#0f766e"
        emissiveIntensity={0.28}
        roughness={0.92}
        metalness={0.18}
      />
    </instancedMesh>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1.15] }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.62} />
        <pointLight position={[2.2, 1.4, 1.4]} intensity={1.4} color="#14b8a6" />
        <pointLight position={[-2.4, -1.6, 0.4]} intensity={0.75} color="#f59e0b" />
        <StarBackground />
        <CodeDebrisBelt />
      </Canvas>
    </div>
  );
}
