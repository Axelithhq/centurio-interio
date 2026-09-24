"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { studioStats } from "@/lib/data";

function renderStatIcon(iconType: string) {
  switch (iconType) {
    case "crown":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M2 4l3 12h14l3-12-6 7-4-8-4 8-6-7z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "villa":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 21h18M3 10l9-7 9 7v11H3V10z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 14h6v7H9v-7z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "trophy":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M8 21h8M12 17v4M6 4h12v5a6 6 0 01-12 0V4z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6H4a2 2 0 00-2 2v1a4 4 0 004 4h0M18 6h2a2 2 0 012 2v1a4 4 0 01-4 4h0" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "scale":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3v18M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 8l7-5 7 5M5 16l7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

function CounterItem({
  value,
  suffix,
  label,
  subtitle,
  tag,
  icon,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  subtitle: string;
  tag: string;
  icon: string;
  index: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2200; // 2.2 seconds count up
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, rotateY: 6, scale: 1.04 }}
      className="perspective-1000 relative group p-8 rounded-2xl bg-[#12100E]/85 backdrop-blur-xl border border-gold/30 hover:border-gold transition-all duration-500 shadow-2xl shadow-black/60 hover:shadow-gold/25 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Subtle Radial Glow */}
      <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-gold/10 blur-2xl group-hover:bg-gold/25 transition-colors duration-500 pointer-events-none" />

      {/* Top Header: Tag Badge & Icon */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-[10px] font-mono tracking-widest uppercase font-semibold">
            {tag}
          </span>
          <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all duration-300 shadow-md">
            {renderStatIcon(icon)}
          </div>
        </div>

        {/* Counter Number */}
        <div className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 leading-none flex items-baseline gap-1">
          <span className="gold-text tracking-tight">{count}</span>
          <span className="text-gold font-light text-3xl sm:text-4xl">{suffix}</span>
        </div>

        {/* Label */}
        <h4 className="text-white text-base sm:text-lg font-serif-luxury font-medium mb-2 group-hover:text-gold transition-colors duration-300">
          {label}
        </h4>
      </div>

      {/* Footer Subtitle */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-300">
        <span>{subtitle}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
      </div>

      {/* Corner Bracket Details */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ── 3D Horizon Scroll Entrance ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const frameRotateX = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const frameY = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const frameScale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-24 sm:py-32 bg-gradient-to-r from-[#181614] via-[#221F1C] to-[#181614] text-white overflow-hidden select-none border-y border-gold/30"
    >
      {/* Laser Divider Lines & Orbs */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent shadow-[0_0_15px_#C8A96A]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent shadow-[0_0_15px_#C8A96A]" />

      <div className="ambient-orb ambient-orb-gold w-[400px] h-[400px] top-0 left-1/4 animate-orb-float opacity-35" />
      <div className="ambient-orb ambient-orb-warm w-[350px] h-[350px] bottom-0 right-1/4 animate-orb-float-2 opacity-35" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ── 3D HORIZON FLIP FRAME ── */}
        <motion.div
          style={{
            rotateX: frameRotateX,
            y: frameY,
            scale: frameScale,
            opacity: frameOpacity,
          }}
          className="perspective-1000 transform-gpu"
        >
          {/* Header Tag */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-gold/40 text-gold text-xs font-mono tracking-[0.25em] uppercase shadow-md mb-3">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>07 // METRIC ARCHITECTURAL BENCHMARKS</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-semibold leading-tight">
              Distinction in <span className="gold-text italic">Craft & Scale.</span>
            </h2>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studioStats.map((stat, idx) => (
              <CounterItem
                key={idx}
                index={idx}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                subtitle={stat.subtitle}
                tag={stat.tag}
                icon={stat.icon}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
