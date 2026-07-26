"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useTransform } from "framer-motion";
import { galleryImages } from "@/lib/data";

type LayoutMode = "grid-2" | "grid-3" | "mosaic" | "focus" | "scattered";

interface LayoutConfig {
  label: string;
  icon: React.ReactNode;
  getStyle: (i: number, total: number) => { rotate?: number; scale?: number };
  className: (i: number, total: number) => string;
}

const LAYOUTS: Record<LayoutMode, LayoutConfig> = {
  "grid-2": {
    label: "2 × Grid",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="1" width="6" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    getStyle: (_i, _total) => ({}),
    className: (i) => {
      const isHero = i === 0 || i === 5;
      return `col-span-2 ${isHero ? "row-span-2" : "row-span-1"}`;
    },
  },
  "grid-3": {
    label: "3 × Grid",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="6" y="1" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="1" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    getStyle: (_i, _total) => ({}),
    className: () => "",
  },
  mosaic: {
    label: "Mosaic",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="9" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="1" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="1" y="8" width="4" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="6" y="8" width="9" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    getStyle: (_i, _total) => ({}),
    className: (i) => {
      const patterns = [
        "col-span-2 row-span-2",
        "col-span-1 row-span-1",
        "col-span-1 row-span-2",
        "col-span-1 row-span-1",
        "col-span-2 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
        "col-span-2 row-span-1",
        "col-span-1 row-span-1",
      ];
      return patterns[i % patterns.length];
    },
  },
  focus: {
    label: "Focus",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="1" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="1" y="5" width="2" height="6" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <rect x="13" y="5" width="2" height="6" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
    getStyle: (_i, _total) => ({}),
    className: (i, _total) => {
      if (i === 0) return "col-span-3 row-span-2";
      if (i < 3) return "col-span-1 row-span-1";
      return "col-span-1 row-span-1";
    },
  },
  scattered: {
    label: "Scattered",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="2" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" transform="rotate(-5 3.5 4)"/>
        <rect x="8" y="1" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" transform="rotate(3 11 3.5)"/>
        <rect x="2" y="9" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" transform="rotate(2 5 11.5)"/>
        <rect x="10" y="8" width="5" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" transform="rotate(-4 12.5 11)"/>
      </svg>
    ),
    getStyle: (i: number, _total: number): { rotate?: number; scale?: number } => {
      const rotations = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2.5, -1];
      const scales = [1, 0.95, 1.02, 0.97, 1.03, 0.98, 1.01, 0.96, 1];
      return {
        rotate: rotations[i % rotations.length],
        scale: scales[i % scales.length],
      };
    },
    className: (i) => {
      const spans = [
        "col-span-2 row-span-1",
        "col-span-1 row-span-2",
        "col-span-1 row-span-1",
        "col-span-2 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-2",
        "col-span-2 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
      ];
      return spans[i % spans.length];
    },
  },
};

const LAYOUT_ORDER: LayoutMode[] = ["mosaic", "grid-2", "grid-3", "focus", "scattered"];

export default function LayoutGallery() {
  const [mode, setMode] = useState<LayoutMode>("mosaic");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const currentLayout = LAYOUTS[mode];
  const total = galleryImages.length;

  const cycleLayout = useCallback(() => {
    setMode((prev) => {
      const idx = LAYOUT_ORDER.indexOf(prev);
      return LAYOUT_ORDER[(idx + 1) % LAYOUT_ORDER.length];
    });
  }, []);

  return (
    <LayoutGroup>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-gold text-xs font-mono tracking-widest uppercase block mb-1">
              05 // Visual Gallery
            </span>
            <h3 className="font-serif-luxury text-2xl md:text-4xl text-charcoal">
              Architectural <span className="gold-text">Detail &amp; Light</span>
            </h3>
          </div>

          {/* Layout Toggle Bar */}
          <div className="flex items-center gap-1 bg-sand/80 backdrop-blur-sm p-1 rounded-md border border-gray-200/60">
            {LAYOUT_ORDER.map((layoutMode) => (
              <button
                key={layoutMode}
                onClick={() => setMode(layoutMode)}
                className={`group relative flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-300 ${
                  mode === layoutMode
                    ? "bg-charcoal text-white shadow-md"
                    : "text-gray-500 hover:text-charcoal hover:bg-white/60"
                }`}
                title={LAYOUTS[layoutMode].label}
              >
                {LAYOUTS[layoutMode].icon}
                <span className="hidden md:inline">{LAYOUTS[layoutMode].label}</span>
                {mode === layoutMode && (
                  <motion.div
                    layoutId="layoutIndicator"
                    className="absolute inset-0 bg-charcoal rounded-sm -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}

            <div className="w-px h-6 bg-gray-300 mx-1" />

            <button
              onClick={cycleLayout}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider text-gold hover:text-charcoal transition-colors rounded-sm hover:bg-white/60"
              title="Cycle layout"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-500" style={{ transform: `rotate(${LAYOUT_ORDER.indexOf(mode) * 72}deg)` }}>
                <path d="M1 7C1 3.686 3.686 1 7 1C9.21 1 11.117 2.231 12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 7C12 10.314 9.314 13 6 13C3.79 13 1.883 11.769 1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 1L12 4.5L8.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 13L2 9.5L5.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="hidden md:inline">Cycle</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid — FLIP Layout */}
        <motion.div
          layout
          className={`grid gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px] ${
            mode === "grid-2" ? "grid-cols-2 md:grid-cols-2" :
            mode === "focus" ? "grid-cols-3 md:grid-cols-3" :
            "grid-cols-2 md:grid-cols-3"
          }`}
          transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.8 }}
        >
          <AnimatePresence mode="popLayout">
            {galleryImages.map((img, i) => {
              const spanClass = currentLayout.className(i, total);
              const extraStyle = currentLayout.getStyle(i, total);
              const isHovered = hoveredId === img.id;

              return (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    layout: { type: "spring", stiffness: 250, damping: 25, mass: 0.8 },
                    opacity: { duration: 0.3, delay: i * 0.03 },
                    scale: { duration: 0.4, delay: i * 0.03 },
                  }}
                  className={`relative rounded-md overflow-hidden cursor-pointer group ${spanClass}`}
                  style={{ zIndex: isHovered ? 20 : 1, rotate: extraStyle.rotate ?? 0, scale: extraStyle.scale ?? 1 }}
                  onHoverStart={() => setHoveredId(img.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={() => setSelectedImage(img.src)}
                >
                  {/* Image */}
                  <motion.div layout className="absolute inset-0">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        mode === "scattered" ? "" : "group-hover:scale-110"
                      }`}
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </motion.div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                    initial={false}
                    animate={{
                      backgroundColor: isHovered ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className="text-white font-mono text-xs uppercase tracking-[0.2em] border-b border-gold/60 pb-1 text-center"
                      initial={false}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10,
                      }}
                      transition={{ duration: 0.25, delay: isHovered ? 0.1 : 0 }}
                    >
                      {img.alt}
                    </motion.span>
                    <motion.div
                      className="flex items-center gap-1.5 mt-2"
                      initial={false}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 8,
                      }}
                      transition={{ duration: 0.25, delay: isHovered ? 0.15 : 0 }}
                    >
                      <div className="w-5 h-px bg-gold/60" />
                      <span className="text-gold text-[10px] font-mono tracking-widest uppercase">View</span>
                      <div className="w-5 h-px bg-gold/60" />
                    </motion.div>
                  </motion.div>

                  {/* Corner accent */}
                  <motion.div
                    className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-px bg-gold" />
                    <div className="absolute top-0 left-0 w-px h-full bg-gold" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute bottom-0 right-0 w-full h-px bg-gold" />
                    <div className="absolute bottom-0 right-0 w-px h-full bg-gold" />
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Layout mode label */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-3"
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="h-px w-12 bg-gold/30" />
          <span className="text-gray-400 text-xs font-mono tracking-widest uppercase">
            {currentLayout.label} — {galleryImages.length} works
          </span>
          <div className="h-px w-12 bg-gold/30" />
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-6xl w-full h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImage} alt="Gallery Full" fill className="object-contain" sizes="100vw" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 text-white text-sm bg-charcoal/90 backdrop-blur-sm w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
              >
                ✕
              </button>
              {/* Gold accent corners */}
              <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gold/50" />
                <div className="absolute top-0 left-0 w-px h-full bg-gold/50" />
              </div>
              <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-full h-px bg-gold/50" />
                <div className="absolute bottom-0 right-0 w-px h-full bg-gold/50" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
