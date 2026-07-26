"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  intensity?: number;
  perspective?: number;
  glare?: boolean;
}

export default function MouseParallax3D({
  children,
  className = "",
  intensity = 15,
  perspective = 1200,
  glare = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1200px) rotateY(0deg) rotateX(0deg)");
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateY = (mouseX / (rect.width / 2)) * intensity;
      const rotateX = -(mouseY / (rect.height / 2)) * intensity;

      setTransform(`perspective(${perspective}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(10px)`);

      if (glare) {
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        const glareOpacity = Math.min(0.15, Math.sqrt(mouseX * mouseX + mouseY * mouseY) / 500);
        setGlareStyle({ opacity: glareOpacity, x: glareX, y: glareY });
      }
    };

    const handleLeave = () => {
      setTransform(`perspective(${perspective}px) rotateY(0deg) rotateX(0deg) translateZ(0px)`);
      setGlareStyle({ opacity: 0, x: 50, y: 50 });
    };

    window.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [intensity, perspective, glare]);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ transformStyle: "preserve-3d" }}>
      <div
        style={{
          transform,
          transition: "transform 0.15s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-10"
          style={{
            background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(200,169,106,0.25) 0%, transparent 60%)`,
            opacity: glareStyle.opacity,
            transition: "opacity 0.3s ease",
          }}
        />
      )}
    </div>
  );
}
