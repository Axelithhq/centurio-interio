"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { portfolioItems } from "@/lib/data";

/**
 * SelectedPortfolioSection Component (Redesigned)
 * 
 * Distinct Asymmetric Editorial Architecture Layout featuring:
 *  - Asymmetric magazine grid layout (varied span 8/4, 5/7 columns)
 *  - Internal image parallax Y motion on scroll
 *  - Horizontal curtain clip-path reveals
 *  - Interactive category filter tabs with dynamic grid morphing
 *  - Deep project modal case study view
 */
export default function SelectedPortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState<typeof portfolioItems[0] | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Track overall scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const categories = ["All", "Residential", "Commercial", "Hospitality"];

  const filteredItems = selectedCategory === "All"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <section
      ref={containerRef}
      id="portfolio"
      className="relative py-28 sm:py-36 md:py-44 bg-[#090807] text-white overflow-hidden select-none border-t border-gold/20"
    >
      {/* Background Ambient Glows & Lines */}
      <div 
        className="absolute top-1/4 right-0 w-[800px] h-[500px] bg-gradient-radial from-gold/10 via-transparent to-transparent pointer-events-none blur-3xl opacity-50" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 left-0 w-[600px] h-[450px] bg-gradient-radial from-[#C8A96A]/8 via-transparent to-transparent pointer-events-none blur-3xl opacity-40" 
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ─── EDITORIAL HEADER & FILTER BAR ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 pb-8 border-b border-white/10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs font-mono tracking-[0.3em] uppercase font-semibold">
                03 // CURATED ARCHITECTURAL ARCHIVE
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.12] font-semibold"
            >
              Featured <span className="gold-text italic">Landmark</span> <br />
              Sanctuaries & Suites.
            </motion.h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Category Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap items-center gap-2 p-1.5 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-md"
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-300 rounded-full ${
                      isActive
                        ? "text-black font-semibold shadow-lg shadow-gold/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{cat}</span>
                    {isActive && (
                      <motion.div
                        layoutId="editorialFilterPill"
                        className="absolute inset-0 bg-gold rounded-full z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* ─── DISTINCT ASYMMETRIC EDITORIAL MASONRY GRID ─── */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              // Asymmetric grid spans for a magazine-like layout:
              // Index 0: 8 cols (Large Hero Feature)
              // Index 1: 4 cols (Tall Portrait Feature)
              // Index 2: 5 cols (Mid Showcase)
              // Index 3: 7 cols (Wide Showcase)
              // Index 4+: alternating 6 cols
              const isLargeHero = idx % 4 === 0;
              const isTallPortrait = idx % 4 === 1;
              const isMidShowcase = idx % 4 === 2;
              const colSpan = isLargeHero
                ? "lg:col-span-8"
                : isTallPortrait
                ? "lg:col-span-4"
                : isMidShowcase
                ? "lg:col-span-5"
                : "lg:col-span-7";

              const cardHeight = isLargeHero
                ? "h-[460px] sm:h-[540px] lg:h-[600px]"
                : isTallPortrait
                ? "h-[460px] sm:h-[540px] lg:h-[600px]"
                : "h-[420px] sm:h-[480px] lg:h-[520px]";

              return (
                <EditorialPortfolioCard
                  key={item.id}
                  item={item}
                  index={idx}
                  colSpan={colSpan}
                  cardHeight={cardHeight}
                  isLargeHero={isLargeHero}
                  sectionScrollProgress={scrollYProgress}
                  onClick={() => setActiveProject(item)}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* ─── FULLSCREEN CASE STUDY MODAL ─── */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 bg-black/94 backdrop-blur-2xl p-4 sm:p-6 md:p-10 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden border border-gold/40 shadow-2xl bg-[#141210]"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[560px] overflow-hidden">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent lg:hidden" />
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between relative">
                  <button
                    onClick={() => setActiveProject(null)}
                    className="absolute top-6 right-6 z-20 text-white/60 bg-white/10 hover:bg-gold hover:text-black w-9 h-9 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 font-mono text-xs"
                    aria-label="Close case study"
                  >
                    ✕
                  </button>

                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold/30 bg-gold/10 mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="text-gold text-[10px] font-mono uppercase tracking-[0.25em]">
                        {activeProject.category} • {activeProject.year}
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white mb-3 leading-tight font-semibold">
                      {activeProject.title}
                    </h3>

                    <p className="text-gold/80 text-xs font-mono uppercase tracking-widest mb-6">
                      📍 {activeProject.location}
                    </p>

                    <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8">
                    <a
                      href="#contact"
                      onClick={() => setActiveProject(null)}
                      className="gold-bg text-white px-6 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase text-center hover:scale-105 transition-all duration-300 shadow-lg shadow-gold/20 font-medium"
                    >
                      Commission Similar Sanctuary →
                    </a>
                    <button
                      onClick={() => setActiveProject(null)}
                      className="px-5 py-3.5 rounded-full border border-white/15 text-gray-400 text-xs font-mono tracking-widest uppercase hover:text-white hover:border-white/40 transition-colors text-center"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Sub-component for Editorial Asymmetric Card with Parallax Image & Dynamic Curtain Reveal
function EditorialPortfolioCard({
  item,
  index,
  colSpan,
  cardHeight,
  isLargeHero,
  sectionScrollProgress,
  onClick,
}: {
  item: (typeof portfolioItems)[0];
  index: number;
  colSpan: string;
  cardHeight: string;
  isLargeHero: boolean;
  sectionScrollProgress: any;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Card specific scroll tracking for internal image parallax Y movement
  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Smooth internal parallax translation for the image (-30px to +30px Y)
  const imageY = useTransform(cardScrollProgress, [0, 1], [-30, 30]);

  return (
    <motion.div
      layout
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`${colSpan} relative group cursor-pointer`}
      onClick={onClick}
    >
      <div className={`relative ${cardHeight} w-full rounded-2xl overflow-hidden border border-gold/30 bg-[#161412] shadow-2xl shadow-black/80 flex flex-col justify-between p-6 sm:p-8 transition-all duration-500 group-hover:border-gold/70 group-hover:shadow-gold/10`}>
        
        {/* Parallax Background Image Container */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div style={{ y: imageY }} className="relative w-full h-[120%] -top-[10%]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-108"
              sizes="(max-width: 768px) 100vw, 65vw"
            />
          </motion.div>
        </div>

        {/* Dynamic Dark Gradient Veil */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090807] via-[#090807]/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090807]/80 via-transparent to-transparent z-10" />

        {/* ── CARD TOP CORNER TAGS ── */}
        <div className="relative z-20 flex items-center justify-between gap-3">
          <div className="bg-black/70 backdrop-blur-md border border-gold/40 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono text-gold shadow-md">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            <span>{item.category.toUpperCase()}</span>
          </div>

          <div className="bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-[11px] font-mono text-gray-300">
            {item.year}
          </div>
        </div>

        {/* ── CARD BOTTOM EDITORIAL INFO ── */}
        <div className="relative z-20 p-6 bg-black/80 backdrop-blur-xl rounded-xl border border-gold/30 group-hover:border-gold/70 transition-all duration-500">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-gold text-[11px] font-mono uppercase tracking-widest font-semibold">
                  LOCATION // {item.location}
                </span>
              </div>

              <h3 className={`font-serif-luxury text-2xl ${isLargeHero ? "sm:text-3xl lg:text-4xl" : "sm:text-3xl"} text-white font-semibold group-hover:text-gold transition-colors duration-300 leading-tight`}>
                {item.title}
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm font-light line-clamp-2 leading-relaxed max-w-xl">
                {item.description}
              </p>
            </div>

            {/* Hover CTA Indicator */}
            <div className="shrink-0 pt-2 sm:pt-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 group-hover:bg-gold group-hover:text-black text-gold text-xs font-mono uppercase tracking-widest transition-all duration-300 font-medium">
                <span>View Case Study</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
