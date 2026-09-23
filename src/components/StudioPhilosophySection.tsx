"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { materialSwatches } from "@/lib/data";

const studioPillars = [
  {
    num: "01",
    title: "Spatial Choreography",
    desc: "Balancing wall geometry, shadow gaps, and ceiling heights to create effortless human flow.",
  },
  {
    num: "02",
    title: "Material Authenticity",
    desc: "Unfiltered natural stone, wire-brushed woods, and hand-troweled plasters that age gracefully.",
  },
  {
    num: "03",
    title: "Light & Shadow Balance",
    desc: "Designing around morning sunrise angles and indirect evening warm LED ambient diffusion.",
  },
];

export default function StudioPhilosophySection() {
  const [activeMaterial, setActiveMaterial] = useState(materialSwatches[0]);
  const [activePillar, setActivePillar] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress as Section 01 enters the screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "center 55%"],
  });

  // 3D Card launches smoothly from top-left corner and locks into its exact place
  const cardX = useTransform(scrollYProgress, [0, 1], [-360, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [-260, 0]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-28, 0]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const cardRotateY = useTransform(scrollYProgress, [0, 1], [-28, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.65, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0.9, 1]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-24 sm:py-32 md:py-40 bg-gradient-to-b from-[#0C0B0A] via-[#121110] to-[#0A0908] text-white overflow-hidden select-none border-t border-gold/15"
    >
      {/* ─── Ambient Glow Orbs ─── */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-gold/10 via-transparent to-transparent pointer-events-none blur-3xl opacity-60" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-gradient-radial from-[#C8A96A]/10 via-transparent to-transparent pointer-events-none blur-3xl opacity-40" 
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(#C8A96A_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ─── TOP SECTION HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-white/10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs font-mono tracking-[0.28em] uppercase">
                01 // STUDIO PHILOSOPHY & MATERIAL LAB
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.15] font-semibold"
            >
              Restraint, Material Authenticity & <br />
              <span className="gold-text italic">Timeless Form.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base max-w-md font-light leading-relaxed"
          >
            At CENTURIO INTERIOR STUDIO, we view interior architecture not merely as decoration, but as spatial choreography. Every wall line, shadow gap, and light beam is tuned to evoke serenity.
          </motion.p>
        </div>

        {/* ─── MAIN TWO-COLUMN GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">

          {/* ─── LEFT COLUMN: STUDIO PILLARS & MATERIAL SWATCH LAB (5/12) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-5">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                We balance raw organic textures—bookmatched Italian marble, wire-brushed white oak, and brushed champagne metals—with razor-sharp modern precision.
              </p>

              {/* Interactive Pillars Accordion */}
              <div className="space-y-2.5 pt-2">
                {studioPillars.map((pillar, idx) => {
                  const isActive = activePillar === idx;
                  return (
                    <div
                      key={pillar.num}
                      onClick={() => setActivePillar(idx)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? "bg-white/[0.05] border-gold/60 shadow-lg shadow-gold/10"
                          : "bg-white/[0.02] border-white/10 hover:border-gold/30 hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-gold font-semibold tracking-widest">
                            {pillar.num}
                          </span>
                          <h4 className="font-serif-luxury text-base sm:text-lg text-white font-medium">
                            {pillar.title}
                          </h4>
                        </div>
                        <span className={`text-gold text-sm transition-transform duration-300 ${isActive ? "rotate-90" : ""}`}>
                          →
                        </span>
                      </div>

                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-400 text-xs sm:text-sm mt-2.5 leading-relaxed font-light pt-2 border-t border-white/5"
                        >
                          {pillar.desc}
                        </motion.p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Material Lab Selector */}
            <div className="pt-5 border-t border-white/10 space-y-3">
              <span className="text-[11px] font-mono text-gold uppercase tracking-widest block font-medium">
                [ Curated Material Swatch Lab ]
              </span>
              <div className="flex flex-wrap gap-2">
                {materialSwatches.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveMaterial(m)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all duration-300 border flex items-center gap-2 ${
                      activeMaterial.id === m.id
                        ? "border-gold bg-gold/25 text-white shadow-md shadow-gold/20 font-medium scale-105"
                        : "border-white/15 text-gray-400 hover:border-gold/50 hover:text-white bg-white/[0.02]"
                    }`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-white/30 shrink-0" 
                      style={{ backgroundColor: m.color }}
                    />
                    <span>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT COLUMN: PERFECTLY ALIGNED 3D SHOWCASE CARD (7/12) ─── */}
          <motion.div
            style={{
              x: cardX,
              y: cardY,
              rotate: cardRotate,
              rotateX: cardRotateX,
              rotateY: cardRotateY,
              scale: cardScale,
              opacity: cardOpacity,
            }}
            className="lg:col-span-7 relative perspective-1000 origin-top-left"
          >
            {/* Main 3D Card Container */}
            <div className="relative h-[480px] sm:h-[540px] lg:h-[580px] w-full rounded-2xl overflow-hidden border border-gold/40 bg-[#161412] shadow-2xl shadow-black/90 group flex flex-col justify-between p-6 sm:p-8">
              
              {/* Active Material / Showcase Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMaterial.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full z-0"
                >
                  <Image
                    src={activeMaterial.image}
                    alt={activeMaterial.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/40 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0C0B0A]/70 via-transparent to-transparent z-10 pointer-events-none" />

              {/* ─── CARD HEADER BAR ─── */}
              <div className="relative z-20 flex items-center justify-between gap-3 flex-wrap">
                <div className="bg-black/60 backdrop-blur-md border border-gold/30 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono text-gold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                  <span>MATERIAL LAB // {activeMaterial.type}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-[11px] font-mono text-gray-300">
                    REF: {activeMaterial.id.toUpperCase()}
                  </div>
                  <div className="hidden sm:flex bg-gold/20 backdrop-blur-md border border-gold/40 px-3 py-1.5 rounded-full text-[11px] font-mono text-gold font-semibold">
                    14+ YRS HERITAGE
                  </div>
                </div>
              </div>

              {/* ─── CARD FOOTER INFO BAR ─── */}
              <div className="relative z-20 p-5 sm:p-6 bg-black/80 backdrop-blur-xl rounded-xl border border-gold/30 shadow-2xl transition-all duration-300 group-hover:border-gold/60">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeMaterial.accent || "#C8A96A" }} />
                      <span className="text-gold text-[11px] font-mono tracking-widest uppercase font-medium">
                        {activeMaterial.type} • AUTHENTIC SELECTION
                      </span>
                    </div>
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-semibold leading-tight">
                      {activeMaterial.name}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm font-light max-w-md leading-relaxed pt-1">
                      {activeMaterial.desc}
                    </p>
                  </div>

                  <div className="shrink-0 pt-1 sm:pt-0">
                    <button
                      onClick={() => {
                        const el = document.getElementById("portfolio");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full sm:w-auto gold-bg text-white px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase hover:scale-105 transition-all duration-300 shadow-lg shadow-gold/20 flex items-center justify-center gap-2 font-medium"
                    >
                      <span>Explore Works</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
