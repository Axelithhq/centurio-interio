"use client";

import { useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glare?: boolean;
  scale?: boolean;
  depth?: number;
}

export default function TiltCard({
  children,
  className = "",
  tiltAmount = 12,
  glare = true,
  scale = true,
  depth = 20,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)",
    transition: "transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
  });
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateY = (mouseX / (rect.width / 2)) * tiltAmount;
    const rotateX = -(mouseY / (rect.height / 2)) * tiltAmount;
    const translateZ = scale ? depth : 0;
    const scaleVal = scale ? 1.03 : 1;

    setStyle({
      transform: `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px) scale(${scaleVal})`,
      transition: "transform 0.1s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
    });

    if (glare) {
      const gx = ((e.clientX - rect.left) / rect.width) * 100;
      const gy = ((e.clientY - rect.top) / rect.height) * 100;
      setGlareStyle({ opacity: 0.12, x: gx, y: gy });
    }
  };

  const handleLeave = () => {
    setStyle({
      transform: "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)",
      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    });
    setGlareStyle({ opacity: 0, x: 50, y: 50 });
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div style={style}>
        {children}
      </div>
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-10"
          style={{
            background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(200,169,106,0.2) 0%, transparent 55%)`,
            opacity: glareStyle.opacity,
            transition: "opacity 0.3s ease",
          }}
        />
      )}
    </div>
  );
}
