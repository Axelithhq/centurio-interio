"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, ShieldCheck, Cpu, Layers, Compass } from "lucide-react";

interface LoaderProps {
  progress?: number;
  isDone?: boolean;
  subtitle?: string;
  onComplete?: () => void;
}

export default function Loader({
  progress: externalProgress,
  isDone,
  subtitle,
  onComplete,
}: LoaderProps) {
  const [internalProgress, setInternalProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  // If no external progress is provided, simulate a realistic smooth luxury load (0% -> 100%)
  useEffect(() => {
    if (typeof externalProgress === "number") return;

    const interval = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        // Smooth logarithmic increments for realistic loading feel
        const diff = 100 - prev;
        const inc = Math.max(1, Math.floor(Math.random() * 12 + diff * 0.1));
        return Math.min(100, prev + inc);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [externalProgress, onComplete]);

  const currentProgress =
    typeof externalProgress === "number"
      ? Math.min(100, Math.max(0, externalProgress))
      : internalProgress;

  const isCompleted = isDone || currentProgress >= 100;

  // Dynamic phase messages based on percentage
  const getPhaseText = (pct: number) => {
    if (pct < 20) return "INITIALIZING SPATIAL MATRIX & 3D ENGINE...";
    if (pct < 45) return "LOADING 1080p FULL HD ARCHITECTURAL SEQUENCES...";
    if (pct < 70) return "SYNCHRONIZING MATERIAL SHADERS & RAYTRACING...";
    if (pct < 92) return "CALIBRATING LIGHTING, TEXTURES & ACOUSTICS...";
    if (pct < 100) return "FINALIZING LUXURY ATELIER INTERFACE...";
    return "WELCOME TO CENTURIO INTERIOR ATELIER";
  };

  return (
    <AnimatePresence>
      {visible && !isCompleted && (
        <motion.div
          key="luxury-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07080B] text-white overflow-hidden select-none"
        >
          {/* Ambient Background Gold Glow Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-gold/15 via-gold-dark/5 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Architectural Background Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Top & Bottom HUD Telemetry Bars */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-[10px] tracking-[0.3em] font-mono text-gold/60 uppercase">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
              <span>CENTURIO // ATELIER JAIPUR</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-gold" /> RES: 1920x1080 FULL HD
              </span>
              <span className="text-gray-600">|</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-gold" /> SECURE ATELIER
              </span>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-[10px] tracking-[0.3em] font-mono text-gray-400 uppercase">
            <span>EST. 2012 // LUXURY ARCHITECTURE</span>
            <span className="text-gold/80 font-semibold">
              {currentProgress < 100 ? "LOADING ASSETS..." : "ATELIER READY"}
            </span>
          </div>

          {/* Center Main Graphic Container */}
          <div className="relative z-10 flex flex-col items-center max-w-xl px-6 text-center">
            {/* Holographic 3D Rotating Compass Rings & Logo Shield */}
            <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center mb-8">
              {/* Outer Rotating Compass Ring with Cardinal Degrees */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-gold/30 border-dashed"
              />

              {/* Counter-Rotating Precision Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-gold/15"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_#D4AF37]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_#D4AF37]" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_#D4AF37]" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_#D4AF37]" />
              </motion.div>

              {/* Pulsing Radial Progress Indicator Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="44%"
                  className="stroke-gold/10"
                  strokeWidth="2"
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="44%"
                  className="stroke-gold transition-all duration-300 ease-out"
                  strokeWidth="3"
                  strokeDasharray="500"
                  strokeDashoffset={500 - (500 * currentProgress) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    filter: "drop-shadow(0px 0px 6px rgba(212,175,55,0.8))",
                  }}
                />
              </svg>

              {/* Floating Logo Container with Glassmorphism & Gold Glow */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-b from-[#181B22] to-[#0D0F14] border border-gold/50 flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.3)] overflow-hidden group"
              >
                <Image
                  src="/logo.png"
                  alt="CENTURIO DESIGNS Emblem"
                  width={90}
                  height={90}
                  priority
                  className="w-16 h-16 md:w-20 md:h-20 object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                />

                {/* Laser Sweep Light Beam */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "easeInOut",
                    repeatDelay: 0.5,
                  }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-gold/30 to-transparent transform -skew-x-12 pointer-events-none"
                />
              </motion.div>
            </div>

            {/* Brand Title with Metallic Gold Shimmer Gradient */}
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-3xl md:text-5xl font-bold tracking-wider text-white mb-2"
            >
              CENTURIO
              <span className="bg-gradient-to-r from-gold-light via-gold to-amber-500 bg-clip-text text-transparent ml-2">
                DESIGNS
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-xs md:text-sm tracking-[0.35em] uppercase font-poppins font-light mb-8 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span>{subtitle || "LUXURY ARCHITECTURAL ATELIER"}</span>
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            </motion.p>

            {/* Telemetry Progress Percentage counter */}
            <div className="relative mb-6">
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-mono text-4xl md:text-6xl font-bold text-white tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  {String(Math.floor(currentProgress)).padStart(3, "0")}
                </span>
                <span className="font-mono text-xl md:text-2xl text-gold font-semibold">
                  %
                </span>
              </div>
            </div>

            {/* Double-Layered Gold Laser Progress Bar */}
            <div className="w-64 md:w-80 h-1.5 bg-white/10 rounded-full relative overflow-hidden p-[1px] border border-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.15)] mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full relative"
                style={{ width: `${currentProgress}%` }}
                transition={{ duration: 0.2 }}
              >
                {/* Glowing Laser Leading Head */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_12px_#ffffff,0_0_20px_#D4AF37]" />
              </motion.div>
            </div>

            {/* Dynamic Real-Time Phase Subtitle */}
            <motion.div
              key={getPhaseText(currentProgress)}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-gold-light/90 uppercase"
            >
              <Layers className="w-3 h-3 text-gold animate-spin" />
              <span>{getPhaseText(currentProgress)}</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
