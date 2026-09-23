"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate, useScroll, AnimatePresence } from "framer-motion";
import { transformations } from "@/lib/data";

export default function BeforeAfterSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"slider" | "side-by-side">("slider");
  const [isAutoSwiping, setIsAutoSwiping] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);

  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const rafId = useRef<number>(0);
  const targetX = useRef(50);

  const sliderX = useMotionValue(50);
  const beforeClip = useTransform(sliderX, (v) => `inset(0 ${100 - v}% 0 0)`);
  const dividerLeft = useTransform(sliderX, (v) => `${v}%`);

  const activeItem = transformations[currentIndex];

  /* ── Unique 3D Bottom-Right Isometric Unfold Entrance ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const frameX = useTransform(scrollYProgress, [0, 1], [240, 0]);
  const frameY = useTransform(scrollYProgress, [0, 1], [180, 0]);
  const frameRotateY = useTransform(scrollYProgress, [0, 1], [-32, 0]);
  const frameRotateX = useTransform(scrollYProgress, [0, 1], [-18, 0]);
  const frameScale = useTransform(scrollYProgress, [0, 1], [0.76, 1]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 1]);
  const scanBeamY = useTransform(scrollYProgress, [0.2, 0.8], ["-100%", "200%"]);

  /* ── Pointer Drag Physics ── */
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    targetX.current = pct;
    setSliderPos(Math.round(pct));
  }, []);

  const tick = useCallback(() => {
    const current = sliderX.get();
    const diff = targetX.current - current;
    if (Math.abs(diff) < 0.05) {
      sliderX.set(targetX.current);
    } else {
      sliderX.set(current + diff * 0.35);
    }
    if (isDragging.current) {
      rafId.current = requestAnimationFrame(tick);
    }
  }, [sliderX]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsAutoSwiping(false);
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
    rafId.current = requestAnimationFrame(tick);
  }, [updatePosition, tick]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    cancelAnimationFrame(rafId.current);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    const current = sliderX.get();
    if (e.key === "ArrowLeft") {
      const next = Math.max(0, current - step);
      sliderX.set(next);
      setSliderPos(Math.round(next));
    }
    if (e.key === "ArrowRight") {
      const next = Math.min(100, current + step);
      sliderX.set(next);
      setSliderPos(Math.round(next));
    }
  }, [sliderX]);

  const switchSlide = useCallback((idx: number) => {
    setCurrentIndex(idx);
    targetX.current = 50;
    setSliderPos(50);
    animate(sliderX, 50, { type: "spring", stiffness: 200, damping: 25 });
  }, [sliderX]);

  /* ── Automated Auto-Swipe Feature ── */
  useEffect(() => {
    if (!isAutoSwiping || viewMode !== "slider") return;

    let forward = true;
    const interval = setInterval(() => {
      const target = forward ? 85 : 15;
      forward = !forward;
      targetX.current = target;
      animate(sliderX, target, {
        duration: 2.8,
        ease: [0.25, 1, 0.5, 1],
        onUpdate: (v) => setSliderPos(Math.round(v)),
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [isAutoSwiping, viewMode, sliderX]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="transformations"
      className="relative py-28 sm:py-36 md:py-44 bg-gradient-to-b from-[#0A0908] via-[#121110] to-[#0C0B0A] text-white overflow-hidden select-none border-t border-gold/15"
    >
      {/* Background Ambient Orbs */}
      <div className="ambient-orb ambient-orb-gold w-[500px] h-[500px] top-10 -right-40 animate-orb-float opacity-30" />
      <div className="ambient-orb ambient-orb-warm w-[400px] h-[400px] bottom-10 -left-20 animate-orb-float-2 opacity-30" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-white/10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs font-mono tracking-[0.28em] uppercase font-semibold">
                06 // INTERIOR REVELATIONS
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.15] font-semibold"
            >
              Before & After <br />
              <span className="gold-text italic">Architectural Transformations.</span>
            </motion.h2>
          </div>

          {/* Controls: Mode Switcher & Project Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/15">
              <button
                onClick={() => {
                  setViewMode("slider");
                  setIsAutoSwiping(false);
                }}
                className={`px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-full transition-all duration-300 ${
                  viewMode === "slider"
                    ? "bg-gold text-black font-semibold shadow-md shadow-gold/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                ⇄ SPLIT SLIDER
              </button>
              <button
                onClick={() => {
                  setViewMode("side-by-side");
                  setIsAutoSwiping(false);
                }}
                className={`px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-full transition-all duration-300 ${
                  viewMode === "side-by-side"
                    ? "bg-gold text-black font-semibold shadow-md shadow-gold/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                ⧉ SIDE-BY-SIDE
              </button>
            </div>

            {/* Auto Swipe Button */}
            {viewMode === "slider" && (
              <button
                onClick={() => setIsAutoSwiping(!isAutoSwiping)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-full border transition-all duration-300 flex items-center gap-2 shadow-lg ${
                  isAutoSwiping
                    ? "border-amber-400 bg-amber-400 text-black font-bold animate-pulse shadow-amber-400/30"
                    : "border-gold/50 bg-gold/10 text-gold hover:bg-gold hover:text-black font-semibold"
                }`}
              >
                <span>{isAutoSwiping ? "⏸ PAUSE SWEEP" : "🎬 AUTO-SWIPE"}</span>
              </button>
            )}
          </div>
        </div>

        {/* ── PROJECT SELECTION TABS ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-8 no-scrollbar">
          {transformations.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => switchSlide(idx)}
                className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap rounded-full border transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "border-gold bg-gold text-black font-semibold shadow-lg shadow-gold/20"
                    : "border-white/10 text-gray-400 hover:text-white hover:border-gold/40 bg-white/[0.02]"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-black" : "bg-gold/60"}`} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* ── UNIQUE 3D BOTTOM-RIGHT ISOMETRIC UNFOLD FRAME ── */}
        <motion.div
          style={{
            x: frameX,
            y: frameY,
            rotateY: frameRotateY,
            rotateX: frameRotateX,
            scale: frameScale,
            opacity: frameOpacity,
          }}
          className="perspective-1000 relative transform-gpu"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id + viewMode}
              initial={{ opacity: 0, rotateY: 8, scale: 0.96 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -8, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {viewMode === "slider" ? (
                /* ── SPLIT SLIDER MODE ── */
                <div
                  ref={containerRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  role="slider"
                  aria-label="Before and after transformation comparison slider"
                  aria-valuenow={sliderPos}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="relative h-[480px] sm:h-[580px] lg:h-[640px] w-full rounded-2xl overflow-hidden border border-gold/40 bg-[#141210] shadow-2xl shadow-black select-none cursor-ew-resize outline-none group"
                >
                  {/* Holographic Beam Scan Line */}
                  <motion.div
                    style={{ y: scanBeamY }}
                    className="absolute inset-x-0 h-1 z-30 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60 blur-xs pointer-events-none"
                  />

                  {/* After (Base Full Image) */}
                  <div className="absolute inset-0">
                    <Image
                      src={activeItem.afterImage}
                      alt={activeItem.afterText}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                  </div>

                  {/* Before (Clipped Image Layer) */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ clipPath: beforeClip }}
                  >
                    <Image
                      src={activeItem.beforeImage}
                      alt={activeItem.beforeText}
                      fill
                      priority
                      className="object-cover filter contrast-[1.05]"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                  </motion.div>

                  {/* Vertical Laser Divider Line & Handle */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-0.5 z-20 pointer-events-none"
                    style={{ left: dividerLeft }}
                  >
                    {/* Laser Glow Effect */}
                    <div className="absolute inset-0 w-12 -ml-6 bg-gradient-to-r from-transparent via-gold/40 to-transparent blur-md animate-pulse" />
                    <div className="absolute inset-0 w-0.5 bg-gradient-to-b from-white via-gold to-white shadow-[0_0_16px_#C8A96A]" />

                    {/* Handle Circle */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 90 }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black/85 backdrop-blur-xl border-2 border-gold shadow-2xl shadow-black flex items-center justify-center pointer-events-none transition-transform"
                    >
                      <div className="flex items-center gap-1 text-gold text-xs font-bold font-mono">
                        <span>‹</span>
                        <span className="w-1 h-3 bg-gold/60 rounded-full" />
                        <span>›</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Floating BEFORE & AFTER Corner Badges */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-black/80 text-amber-300 px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-full border border-amber-400/40 backdrop-blur-md shadow-lg flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      BEFORE: {sliderPos}%
                    </span>
                  </div>
                  <div className="absolute top-6 right-6 z-10">
                    <span className="bg-black/80 text-gold px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-full border border-gold/40 backdrop-blur-md shadow-lg flex items-center gap-2">
                      AFTER: {100 - sliderPos}%
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    </span>
                  </div>

                  {/* Drag Hint */}
                  {!isAutoSwiping && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-mono text-gray-300 shadow-xl pointer-events-none hidden sm:flex items-center gap-2">
                      <span>←</span>
                      <span>DRAG OR USE ARROW KEYS TO COMPARE</span>
                      <span>→</span>
                    </div>
                  )}
                </div>
              ) : (
                /* ── SIDE-BY-SIDE COMPARISON GRID MODE ── */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[580px] lg:h-[640px] w-full">
                  {/* Before Card */}
                  <div className="relative h-full rounded-2xl overflow-hidden border border-amber-500/30 bg-[#141210] group">
                    <Image
                      src={activeItem.beforeImage}
                      alt={activeItem.beforeText}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute top-6 left-6 bg-black/80 text-amber-300 px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-full border border-amber-400/40 backdrop-blur-md">
                      BEFORE TRANSFORMATION
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                      <p className="text-amber-300 text-xs font-mono uppercase tracking-wider">Initial Condition</p>
                      <h4 className="font-serif-luxury text-xl text-white font-medium">{activeItem.beforeText}</h4>
                    </div>
                  </div>

                  {/* After Card */}
                  <div className="relative h-full rounded-2xl overflow-hidden border border-gold/50 bg-[#141210] group">
                    <Image
                      src={activeItem.afterImage}
                      alt={activeItem.afterText}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute top-6 left-6 bg-black/80 text-gold px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-full border border-gold/50 backdrop-blur-md shadow-lg">
                      AFTER ARCHITECTURAL REVELATION
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                      <p className="text-gold text-xs font-mono uppercase tracking-wider">Finished Design</p>
                      <h4 className="font-serif-luxury text-xl text-white font-medium">{activeItem.afterText}</h4>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── PROJECT SPECIFICATIONS BOTTOM CARDS ── */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex flex-col justify-between">
              <span className="text-gold text-[10px] font-mono uppercase tracking-widest">Location</span>
              <span className="text-white text-sm font-semibold font-mono mt-2">{activeItem.location}</span>
            </div>
            <div className="p-5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex flex-col justify-between">
              <span className="text-gold text-[10px] font-mono uppercase tracking-widest">Spatial Footprint</span>
              <span className="text-white text-sm font-semibold font-mono mt-2">{activeItem.area}</span>
            </div>
            <div className="p-5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex flex-col justify-between">
              <span className="text-gold text-[10px] font-mono uppercase tracking-widest">Execution Timeline</span>
              <span className="text-white text-sm font-semibold font-mono mt-2">{activeItem.duration}</span>
            </div>
            <div className="p-5 rounded-xl bg-black/60 backdrop-blur-md border border-gold/30 flex flex-col justify-between">
              <span className="text-gold text-[10px] font-mono uppercase tracking-widest">Category</span>
              <span className="text-gold text-sm font-semibold font-mono mt-2">{activeItem.category}</span>
            </div>
          </div>

          {/* Key Design Highlights */}
          <div className="mt-4 p-6 rounded-xl bg-black/70 backdrop-blur-md border border-gold/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
              <span className="text-white text-xs font-mono uppercase tracking-widest font-semibold">
                Key Interventions:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {activeItem.highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono"
                >
                  ✦ {h}
                </span>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
