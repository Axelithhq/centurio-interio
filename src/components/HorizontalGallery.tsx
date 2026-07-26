"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioItems } from "@/lib/data";

export default function HorizontalGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState<typeof portfolioItems[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Residential", "Commercial", "Hospitality"];

  const filteredItems = selectedCategory === "All"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="relative py-20 md:py-28 bg-charcoal text-white overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 20% 30%, rgba(200,169,106,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(200,169,106,0.03) 0%, transparent 50%)",
      }} />

      {/* ── Header ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold text-[10px] font-mono tracking-[0.4em] uppercase">Selected Portfolio</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
            >
              Featured <span className="gold-text italic">Architectural</span>
              <br className="hidden sm:block" /> Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-sm font-light mt-3 max-w-md"
            >
              Curated showcase of our finest residential, commercial &amp; hospitality interiors across Rajasthan.
            </motion.p>
          </div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-400 rounded-sm ${
                  selectedCategory === cat
                    ? "bg-gold text-charcoal shadow-lg shadow-gold/25 font-semibold"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-gold/40 hover:bg-white/8"
                }`}
              >
                {cat}
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gold rounded-sm -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Horizontal Scroll Track ── */}
      <div className="relative z-10">
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-6 overflow-x-auto no-scrollbar px-4 md:px-8 pb-4 scroll-smooth snap-x snap-mandatory"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex-shrink-0 snap-center"
              >
                <TiltCard
                  item={item}
                  isHovered={hoveredId === item.id}
                  onHover={() => setHoveredId(item.id)}
                  onLeave={() => setHoveredId(null)}
                  onClick={() => setActiveProject(item)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Scroll hint fade edges */}
        <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-charcoal to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-charcoal to-transparent pointer-events-none z-10" />

        {/* Scroll progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {filteredItems.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/15 transition-all duration-300"
            />
          ))}
        </div>
      </div>

      {/* ── Project Detail Modal ── */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 md:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-sm overflow-hidden border border-gold/20"
              style={{ background: "linear-gradient(135deg, #1a1815 0%, #121010 100%)" }}
            >
              {/* Gold accent top line */}
              <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 md:h-[480px] overflow-hidden">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <button
                      onClick={() => setActiveProject(null)}
                      className="absolute top-6 right-6 z-20 text-white/50 bg-white/5 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-charcoal hover:border-gold transition-all text-xs backdrop-blur-sm"
                    >
                      ✕
                    </button>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 mb-6">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="text-gold text-[9px] font-mono uppercase tracking-[0.25em]">
                        {activeProject.category} • {activeProject.year}
                      </span>
                    </div>

                    <h3 className="font-playfair text-2xl md:text-4xl text-white mb-3 leading-tight">
                      {activeProject.title}
                    </h3>

                    <p className="text-gold/60 text-[11px] font-mono mb-6">
                      {activeProject.location}
                    </p>

                    <p className="text-gray-300 text-sm leading-relaxed font-light">
                      {activeProject.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                    <a
                      href="#contact"
                      onClick={() => setActiveProject(null)}
                      className="group relative px-8 py-3 text-[10px] font-mono tracking-[0.25em] uppercase rounded-sm overflow-hidden transition-all hover:shadow-lg hover:shadow-gold/20"
                      style={{
                        background: "linear-gradient(135deg, #C8A96A 0%, #E8D3A7 40%, #9E7B3B 100%)",
                        color: "#fff",
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Commission Similar
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </a>
                    <button
                      onClick={() => setActiveProject(null)}
                      className="text-gray-400 text-[10px] font-mono tracking-widest uppercase hover:text-gold transition-colors"
                    >
                      Close Preview
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

/* ── Tilt Card Component ── */
function TiltCard({
  item,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  item: typeof portfolioItems[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -12,
      y: (x - 0.5) * 12,
    });
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    onLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className="group relative w-[300px] sm:w-[360px] md:w-[420px] h-[420px] md:h-[520px] rounded-sm overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 300px, 420px"
      />

      {/* Gradient overlay — always visible, intensifies on hover */}
      <div className="absolute inset-0 transition-all duration-500" style={{
        background: `linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 40%, transparent 70%)`,
      }} />

      {/* Glare highlight on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(200,169,106,0.12) 0%, transparent 50%)`,
        }}
      />

      {/* Top badge */}
      <div className="absolute top-5 left-5 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-black/40 backdrop-blur-sm border border-white/10">
          <span className="text-gold text-[9px] font-mono uppercase tracking-[0.2em]">{item.category}</span>
          <div className="w-px h-3 bg-white/20" />
          <span className="text-white/50 text-[9px] font-mono">{item.year}</span>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
        {/* Gold accent line */}
        <div className="w-0 group-hover:w-12 h-[2px] bg-gradient-to-r from-gold to-transparent mb-4 transition-all duration-500" />

        <h3 className="font-playfair text-xl md:text-2xl text-white group-hover:text-gold transition-colors duration-300 leading-tight mb-2">
          {item.title}
        </h3>

        <p className="text-gray-400 text-xs line-clamp-2 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-4">
          {item.description}
        </p>

        {/* View CTA */}
        <div className="flex items-center gap-3 text-gold transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-medium">View Project</span>
          <div className="w-6 h-[1px] bg-gold group-hover:w-10 transition-all duration-300" />
          <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-sm border border-transparent group-hover:border-gold/25 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}
