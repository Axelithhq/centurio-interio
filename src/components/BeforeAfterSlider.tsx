"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { transformations } from "@/lib/data";

export default function BeforeAfterSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const rafId = useRef<number>(0);
  const targetX = useRef(50);

  const sliderX = useMotionValue(50);
  const beforeClip = useTransform(sliderX, (v) => `inset(0 ${100 - v}% 0 0)`);
  const dividerLeft = useTransform(sliderX, (v) => `${v}%`);

  const activeItem = transformations[currentIndex];

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    targetX.current = Math.max(0, Math.min(100, (x / rect.width) * 100));
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
    if (e.key === "ArrowLeft") sliderX.set(Math.max(0, current - step));
    if (e.key === "ArrowRight") sliderX.set(Math.min(100, current + step));
  }, [sliderX]);

  const switchSlide = useCallback((idx: number) => {
    setCurrentIndex(idx);
    animate(sliderX, 50, { type: "spring", stiffness: 200, damping: 25 });
  }, [sliderX]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-gold text-xs font-mono tracking-widest uppercase block mb-1">
            Interior Revelations
          </span>
          <h3 className="font-serif-luxury text-2xl md:text-4xl text-charcoal">
            Before & After <span className="gold-text">Transformations</span>
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {transformations.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => switchSlide(idx)}
              className={`group relative px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-all duration-300 rounded-sm overflow-hidden ${
                idx === currentIndex
                  ? "gold-bg text-white shadow-lg shadow-gold/25"
                  : "bg-sand text-charcoal hover:bg-gray-200"
              }`}
            >
              <span className="relative z-10">{t.title.split(" ").slice(0, 2).join(" ")}</span>
              {idx === currentIndex && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 gold-bg rounded-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuenow={Math.round(sliderX.get())}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative h-[350px] sm:h-[450px] md:h-[560px] w-full overflow-hidden rounded-md select-none cursor-ew-resize outline-none ring-1 ring-gold/10 hover:ring-gold/30 transition-shadow duration-500 shadow-2xl shadow-black/20"
      >
        {/* After (base layer) */}
        <div className="absolute inset-0">
          <Image
            src={activeItem.afterImage}
            alt={activeItem.afterText}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Before (clipped via clip-path) */}
        <motion.div
          className="absolute inset-0"
          style={{ clipPath: beforeClip }}
        >
          <Image
            src={activeItem.beforeImage}
            alt={activeItem.beforeText}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 z-20 pointer-events-none"
          style={{ left: dividerLeft }}
        >
          {/* Glow backdrop */}
          <div className="absolute inset-0 w-8 -ml-4 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
          {/* Line */}
          <div className="absolute inset-0 w-0.5 bg-gradient-to-b from-white/80 via-gold to-white/80" />
          {/* Handle */}
          <motion.div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm border-2 border-gold shadow-xl shadow-black/30 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-0.5">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="text-charcoal/70">
                <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="w-px h-4 bg-gold/40 mx-0.5" />
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="text-charcoal/70">
                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Labels */}
        <motion.div
          className="absolute top-5 left-5 z-10 glass-dark text-white px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-sm border border-white/15 backdrop-blur-md"
          style={{ opacity: useTransform(sliderX, [0, 15, 30], [1, 1, 0]) }}
        >
          BEFORE
        </motion.div>
        <motion.div
          className="absolute top-5 right-5 z-10 glass-dark text-white px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-sm border border-gold/30 backdrop-blur-md"
          style={{ opacity: useTransform(sliderX, [70, 85, 100], [0, 1, 1]) }}
        >
          AFTER
        </motion.div>

        {/* Drag hint (fades out on first interaction) */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 text-white/70 text-xs font-mono tracking-widest uppercase pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: isDragging.current ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-pulse">
            <path d="M3 8H13M3 8L5 6M3 8L5 10M13 8L11 6M13 8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Drag to compare
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-pulse">
            <path d="M3 8H13M3 8L5 6M3 8L5 10M13 8L11 6M13 8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500 font-mono">
        <span>LOCATION: {activeItem.location}</span>
        <span className="hidden sm:inline">← → KEYS · DRAG SLIDER · {activeItem.beforeText}</span>
      </div>
    </div>
  );
}
