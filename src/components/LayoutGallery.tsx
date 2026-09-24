"use client";

import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup, useScroll, useTransform } from "framer-motion";
import { galleryImages } from "@/lib/data";

type LayoutMode = "grid-2" | "grid-3" | "mosaic" | "focus" | "scattered";
type CategoryFilter = "ALL" | "Residential" | "Commercial" | "Heritage";

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
    getStyle: () => ({}),
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
    getStyle: () => ({}),
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
    getStyle: () => ({}),
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
    getStyle: () => ({}),
    className: (i) => {
      if (i === 0) return "col-span-3 row-span-2";
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
    getStyle: (i: number) => {
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
const CATEGORIES: CategoryFilter[] = ["ALL", "Residential", "Commercial", "Heritage"];

export default function LayoutGallery() {
  const [mode, setMode] = useState<LayoutMode>("mosaic");
  const [category, setCategory] = useState<CategoryFilter>("ALL");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  /* ── 3D Spiral Zoom Entrance Motion ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const frameRotateZ = useTransform(scrollYProgress, [0, 1], [-10, 0]);
  const frameRotateX = useTransform(scrollYProgress, [0, 1], [26, 0]);
  const frameY = useTransform(scrollYProgress, [0, 1], [180, 0]);
  const frameScale = useTransform(scrollYProgress, [0, 1], [0.78, 1]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 1]);

  const filteredImages = galleryImages.filter(
    (img) => category === "ALL" || img.category === category
  );

  const currentLayout = LAYOUTS[mode];

  const cycleLayout = useCallback(() => {
    setMode((prev) => {
      const idx = LAYOUT_ORDER.indexOf(prev);
      return LAYOUT_ORDER[(idx + 1) % LAYOUT_ORDER.length];
    });
  }, []);

  const selectedImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-28 sm:py-36 md:py-44 bg-gradient-to-b from-[#0A0908] via-[#141210] to-[#0A0908] text-white overflow-hidden select-none border-t border-gold/15"
    >
      {/* Background Ambient Orbs */}
      <div className="ambient-orb ambient-orb-gold w-[500px] h-[500px] top-10 -right-40 animate-orb-float opacity-30" />
      <div className="ambient-orb ambient-orb-warm w-[400px] h-[400px] bottom-10 -left-20 animate-orb-float-2 opacity-30" />

      <LayoutGroup>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

          {/* ── SECTION HEADER & CONTROLS ── */}
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
                  05 // VISUAL ARCHITECTURAL GALLERY
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.15] font-semibold"
              >
                Architectural <br />
                <span className="gold-text italic">Spatial Aperture & Detail.</span>
              </motion.h2>
            </div>

            {/* Layout Toggle Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/15">
                {CATEGORIES.map((cat) => {
                  const isActive = category === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-gold text-black font-semibold shadow-md shadow-gold/20"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Layout Mode Switcher */}
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/15">
                {LAYOUT_ORDER.map((layoutMode) => (
                  <button
                    key={layoutMode}
                    onClick={() => setMode(layoutMode)}
                    className={`group relative flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all duration-300 ${
                      mode === layoutMode
                        ? "bg-gold text-black font-semibold shadow-md shadow-gold/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                    title={LAYOUTS[layoutMode].label}
                  >
                    {LAYOUTS[layoutMode].icon}
                    <span className="hidden xl:inline">{LAYOUTS[layoutMode].label}</span>
                  </button>
                ))}

                <button
                  onClick={cycleLayout}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-gold hover:text-white transition-colors rounded-full"
                  title="Cycle layout"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-500" style={{ transform: `rotate(${LAYOUT_ORDER.indexOf(mode) * 72}deg)` }}>
                    <path d="M1 7C1 3.686 3.686 1 7 1C9.21 1 11.117 2.231 12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12 7C12 10.314 9.314 13 6 13C3.79 13 1.883 11.769 1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="hidden xl:inline">Cycle</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── 3D KALEIDOSCOPE SPATIAL APERTURE FRAME ── */}
          <motion.div
            style={{
              rotateZ: frameRotateZ,
              rotateX: frameRotateX,
              y: frameY,
              scale: frameScale,
              opacity: frameOpacity,
            }}
            className="perspective-1000 transform-gpu relative"
          >
            <motion.div
              layout
              className={`grid gap-4 auto-rows-[200px] sm:auto-rows-[240px] md:auto-rows-[280px] ${
                mode === "grid-2" ? "grid-cols-2" :
                mode === "focus" ? "grid-cols-3" :
                "grid-cols-2 md:grid-cols-3"
              }`}
              transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.8 }}
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((img, i) => {
                  const spanClass = currentLayout.className(i, filteredImages.length);
                  const extraStyle = currentLayout.getStyle(i, filteredImages.length);
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
                      whileHover={{ scale: 1.03, y: -6 }}
                      className={`relative rounded-2xl overflow-hidden cursor-pointer border border-gold/30 hover:border-gold shadow-2xl shadow-black group ${spanClass}`}
                      style={{ zIndex: isHovered ? 20 : 1, rotate: extraStyle.rotate ?? 0 }}
                      onHoverStart={() => setHoveredId(img.id)}
                      onHoverEnd={() => setHoveredId(null)}
                      onClick={() => setSelectedIndex(i)}
                    >
                      {/* Image */}
                      <motion.div layout className="absolute inset-0">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          priority={i < 3}
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </motion.div>

                      {/* Dark Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent group-hover:via-black/40 transition-colors duration-300" />

                      {/* Top Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-gold border border-gold/40 tracking-wider uppercase">
                          {img.category}
                        </span>
                      </div>

                      {/* Hover Info & Specs */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col justify-end">
                        <h4 className="font-serif-luxury text-lg text-white font-medium group-hover:text-gold transition-colors duration-300">
                          {img.alt}
                        </h4>
                        <p className="text-gray-300 text-xs font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {img.location} • {img.specs}
                        </p>
                      </div>

                      {/* Gold Frame Bracket Corners */}
                      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Layout mode label */}
            <motion.div
              className="mt-8 flex items-center justify-center gap-3"
              key={mode + category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="h-px w-12 bg-gold/40" />
              <span className="text-gold text-xs font-mono tracking-widest uppercase font-semibold">
                {currentLayout.label} Mode — Displaying {filteredImages.length} Portfolio Works
              </span>
              <div className="h-px w-12 bg-gold/40" />
            </motion.div>
          </motion.div>

        </div>
      </LayoutGroup>

      {/* ── HIGH-RES INSPECTION LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {selectedImage && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl p-4 md:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-6xl w-full h-[85vh] bg-[#12100E] rounded-3xl border border-gold/40 overflow-hidden shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Full Image */}
              <div className="relative w-full h-full">
                <Image src={selectedImage.src} alt={selectedImage.alt} fill className="object-contain" sizes="100vw" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-6 right-6 text-white text-sm bg-black/80 backdrop-blur-md w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300 shadow-xl z-20 font-mono"
              >
                ✕
              </button>

              {/* Previous / Next Image Switchers */}
              <button
                onClick={() => setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length)}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/20 hover:border-gold text-white hover:text-gold flex items-center justify-center text-xl transition-all duration-300 z-20 shadow-xl"
              >
                ‹
              </button>
              <button
                onClick={() => setSelectedIndex((selectedIndex + 1) % filteredImages.length)}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/20 hover:border-gold text-white hover:text-gold flex items-center justify-center text-xl transition-all duration-300 z-20 shadow-xl"
              >
                ›
              </button>

              {/* Bottom Metadata Drawer */}
              <div className="absolute bottom-0 inset-x-0 bg-black/90 backdrop-blur-md p-6 border-t border-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-20">
                <div>
                  <span className="text-gold text-[10px] font-mono tracking-widest uppercase font-semibold">
                    {selectedImage.category} ARCHITECTURE // {selectedImage.location}
                  </span>
                  <h3 className="font-serif-luxury text-2xl text-white font-semibold mt-1">{selectedImage.alt}</h3>
                  <p className="text-gray-300 text-xs font-mono mt-0.5">{selectedImage.specs}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-4 py-2 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs font-mono">
                    Work {selectedIndex + 1} of {filteredImages.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
