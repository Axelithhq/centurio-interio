"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "rotate" | "scale" | "flip";
}

export default function ScrollReveal3D({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const getHiddenStyle = (): React.CSSProperties => {
    switch (direction) {
      case "up":
        return { transform: "perspective(800px) rotateX(8deg) translateY(60px) translateZ(-50px)", opacity: 0 };
      case "left":
        return { transform: "perspective(800px) rotateY(-12deg) translateX(-80px) translateZ(-30px)", opacity: 0 };
      case "right":
        return { transform: "perspective(800px) rotateY(12deg) translateX(80px) translateZ(-30px)", opacity: 0 };
      case "rotate":
        return { transform: "perspective(800px) rotateY(-15deg) rotateX(10deg) scale(0.85)", opacity: 0 };
      case "scale":
        return { transform: "perspective(800px) scale(0.7) translateZ(-100px)", opacity: 0 };
      case "flip":
        return { transform: "perspective(800px) rotateX(90deg) translateZ(-50px)", opacity: 0 };
      default:
        return { transform: "translateY(40px)", opacity: 0 };
    }
  };

  const getVisibleStyle = (): React.CSSProperties => {
    return { transform: "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) translateX(0) translateZ(0) scale(1)", opacity: 1 };
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(visible ? getVisibleStyle() : getHiddenStyle()),
        transition: `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease`,
        transitionDelay: `${delay}ms`,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
