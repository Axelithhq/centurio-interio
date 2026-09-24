"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { designProcess } from "@/lib/data";

function ProcessStepCard({
  proc,
  index,
  isActive,
  onSelect,
}: {
  proc: (typeof designProcess)[number];
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const stepRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  /* ── Unique Alternating 3D Spiral Entrance Motion ── */
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start end", "center center"],
  });

  // Even steps (01, 03, 05) enter from Left (+24deg Y-rotate)
  // Odd steps (02, 04) enter from Right (-24deg Y-rotate)
  const initialX = isEven ? -260 : 260;
  const initialRotateY = isEven ? 24 : -24;

  const cardX = useTransform(scrollYProgress, [0, 1], [initialX, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const cardRotateY = useTransform(scrollYProgress, [0, 1], [initialRotateY, 0]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1]);

  return (
    <div ref={stepRef} className="relative mb-20 md:mb-32 last:mb-0">
      <motion.div
        style={{
          x: cardX,
          y: cardY,
          rotateY: cardRotateY,
          rotateX: cardRotateX,
          scale: cardScale,
          opacity: cardOpacity,
        }}
        onClick={onSelect}
        className={`perspective-1000 relative flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-8 md:gap-16 transform-gpu cursor-pointer group`}
      >
        {/* Central Pulse Node (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center">
          <div className="relative flex items-center justify-center">
            <span className={`absolute w-12 h-12 rounded-full border border-gold/40 transition-transform duration-500 ${
              isActive ? "scale-150 animate-ping border-gold" : "group-hover:scale-125"
            }`} />
            <div className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center backdrop-blur-md ${
              isActive
                ? "bg-gold border-gold text-black shadow-lg shadow-gold/50 scale-110 font-bold"
                : "bg-[#141210] border-gold/60 text-gold group-hover:bg-gold group-hover:text-black"
            }`}>
              <span className="font-mono text-xs font-bold">{proc.step}</span>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className={`w-full md:w-1/2 ${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
          <div className={`p-8 rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
            isActive
              ? "bg-black/85 border-gold/60 shadow-2xl shadow-gold/20"
              : "bg-black/60 border-white/10 hover:border-gold/40 group-hover:bg-black/75"
          }`}>

            {/* Header Badge */}
            <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
              <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] font-mono tracking-widest uppercase">
                Phase {proc.step} // {proc.duration}
              </span>
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-white font-semibold leading-snug mb-3">
              {proc.title}
            </h3>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light mb-6">
              {proc.description}
            </p>

            {/* Key Deliverable Badges */}
            <div className={`pt-4 border-t border-white/10 flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
              {proc.deliverables.map((del, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/15 text-gray-300 text-[11px] font-mono flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>{del}</span>
                </span>
              ))}
            </div>

          </div>
        </div>

        {/* Image Side */}
        <div className="w-full md:w-1/2">
          <div className="relative h-64 sm:h-72 lg:h-80 w-full rounded-2xl overflow-hidden border border-gold/40 shadow-2xl shadow-black group-hover:border-gold transition-colors duration-500">
            <Image
              src={proc.image}
              alt={proc.title}
              fill
              priority={index < 2}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Dark Vignette & Gold Frame Brackets */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/70 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/70 opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="text-gold text-xs font-mono tracking-widest uppercase font-semibold">
                ARCHITECTURAL METHODOLOGY // {proc.step}
              </span>
              <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Scroll Tracker for Central Spine Laser ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const spineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">

      {/* ── INTERACTIVE PHASE SELECTOR HEADER BAR ── */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-8 mb-16 no-scrollbar">
        {designProcess.map((proc, idx) => {
          const isActive = idx === activeStep;
          return (
            <button
              key={proc.step}
              onClick={() => setActiveStep(idx)}
              className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap rounded-full border transition-all duration-300 flex items-center gap-2 shadow-lg ${
                isActive
                  ? "border-gold bg-gold text-black font-semibold shadow-gold/20 scale-105"
                  : "border-white/15 text-gray-400 hover:text-white hover:border-gold/50 bg-black/40"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-black" : "bg-gold"}`} />
              <span>{proc.step} // {proc.subtitle.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* ── CENTRAL SPINE LASER LINE ── */}
      <div className="hidden md:block absolute left-1/2 top-32 bottom-20 w-0.5 -translate-x-px z-0 pointer-events-none">
        <div className="w-full h-full bg-white/10" />
        <motion.div
          style={{ height: spineHeight }}
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold via-gold/90 to-amber-300 shadow-[0_0_16px_2px_rgba(200,169,106,0.8)]"
        />
      </div>

      {/* ── 3D HELIX STEP CARDS ── */}
      <div className="relative z-10">
        {designProcess.map((proc, i) => (
          <ProcessStepCard
            key={proc.step}
            proc={proc}
            index={i}
            isActive={i === activeStep}
            onSelect={() => setActiveStep(i)}
          />
        ))}
      </div>

      {/* ── FINAL HANDOVER BADGE ── */}
      <div className="mt-16 text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/80 border border-gold/50 text-gold text-xs font-mono tracking-widest uppercase shadow-2xl backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
          <span>TURNKEY ARCHITECTURAL EXCELLENCE ASSURED</span>
        </div>
      </div>

    </div>
  );
}
