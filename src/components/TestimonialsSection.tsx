"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  const activeTestimonial = testimonials[activeIndex];

  /* ── 3D Curved Arc Entrance Motion ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const frameRotateX = useTransform(scrollYProgress, [0, 1], [-25, 0]);
  const frameY = useTransform(scrollYProgress, [0, 1], [160, 0]);
  const frameScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 1]);

  /* ── Slide Navigation Controls ── */
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  /* ── Automated Autoplay Timer (Faster 4.2s pace) ── */
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(nextSlide, 4200);
    return () => clearInterval(interval);
  }, [isAutoplay, nextSlide]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-28 sm:py-36 md:py-44 bg-gradient-to-b from-[#0A0908] via-[#141210] to-[#0A0908] text-white overflow-hidden select-none border-t border-gold/15"
    >
      {/* Background Project Atmosphere Image with Glass Blur */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTestimonial.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.18, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <Image
            src={activeTestimonial.projectImage}
            alt={activeTestimonial.project}
            fill
            className="object-cover filter blur-md"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0908] via-black/80 to-[#0A0908]" />
        </motion.div>
      </AnimatePresence>

      {/* Ambient Lighting Orbs */}
      <div className="ambient-orb ambient-orb-gold w-[500px] h-[500px] top-10 -right-40 animate-orb-float opacity-30" />
      <div className="ambient-orb ambient-orb-warm w-[400px] h-[400px] bottom-10 -left-20 animate-orb-float-2 opacity-30" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ── SECTION HEADER ── */}
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
              <span className="text-gold text-xs font-mono tracking-[0.28em] uppercase font-semibold">
                08 // CLIENT REVERENCE
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.15] font-semibold"
            >
              What Our <br />
              <span className="gold-text italic">Patrons Express.</span>
            </motion.h2>
          </div>

          {/* Autoplay & Directional Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className={`px-4 py-2.5 text-xs font-mono uppercase tracking-widest rounded-full border transition-all duration-300 flex items-center gap-2 shadow-lg ${
                isAutoplay
                  ? "border-gold bg-gold text-black font-semibold shadow-gold/20"
                  : "border-white/20 bg-black/60 text-gray-400 hover:text-white hover:border-gold/50"
              }`}
            >
              <span>{isAutoplay ? "⏸ PAUSE STAGE" : "▶ AUTOPLAY STAGE"}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsAutoplay(false);
                  prevSlide();
                }}
                className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 hover:border-gold text-white hover:text-gold flex items-center justify-center text-lg transition-all duration-300 shadow-lg"
                title="Previous Patron"
              >
                ‹
              </button>
              <button
                onClick={() => {
                  setIsAutoplay(false);
                  nextSlide();
                }}
                className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 hover:border-gold text-white hover:text-gold flex items-center justify-center text-lg transition-all duration-300 shadow-lg"
                title="Next Patron"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* ── 3D STAGE SHOWCASE FRAME ── */}
        <motion.div
          style={{
            rotateX: frameRotateX,
            y: frameY,
            scale: frameScale,
            opacity: frameOpacity,
          }}
          className="perspective-1000 transform-gpu relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, rotateY: 12, scale: 0.94 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -12, scale: 0.94 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#12100E]/90 backdrop-blur-2xl rounded-3xl border border-gold/40 p-8 sm:p-12 lg:p-14 shadow-2xl shadow-black relative overflow-hidden"
            >
              {/* Autoplay Slide Progress Bar */}
              {isAutoplay && (
                <motion.div
                  key={`progress-${activeTestimonial.id}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4.2, ease: "linear" }}
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-gold via-amber-400 to-gold z-30 shadow-[0_0_12px_#C8A96A]"
                />
              )}

              {/* Decorative Background Quote Mark */}
              <div className="absolute top-4 right-8 font-serif-luxury text-[140px] sm:text-[200px] leading-none text-gold/10 select-none pointer-events-none">
                “
              </div>

              {/* Left Column: Patron Quote & Details */}
              <div className="lg:col-span-7 space-y-6 relative z-10">

                {/* Rating & Category Pills */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 text-gold text-sm tracking-widest bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                    <span>★★★★★</span>
                    <span className="text-[10px] font-mono text-gold font-bold ml-1">5.0 LUXURY RATING</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/15 text-gray-300 text-xs font-mono">
                    {activeTestimonial.category}
                  </span>
                </div>

                {/* Quote Text */}
                <blockquote className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl text-white font-light leading-relaxed italic">
                  &ldquo;{activeTestimonial.text}&rdquo;
                </blockquote>

                {/* Patron Metadata */}
                <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold/70 shadow-lg shrink-0">
                    <Image
                      src={activeTestimonial.image}
                      alt={activeTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-lg text-white font-semibold">
                      {activeTestimonial.name}
                    </h3>
                    <p className="text-gold text-xs font-mono tracking-wider">
                      {activeTestimonial.role} • {activeTestimonial.location}
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Architectural Project Showcase Card */}
              <div className="lg:col-span-5 relative z-10">
                <div className="relative h-64 sm:h-72 lg:h-80 w-full rounded-2xl overflow-hidden border border-gold/40 shadow-2xl group">
                  <Image
                    src={activeTestimonial.projectImage}
                    alt={activeTestimonial.project}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Floating Project Specs Badge */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-gold/40 px-3 py-1.5 rounded-full text-[10px] font-mono text-gold uppercase tracking-wider">
                    {activeTestimonial.scope}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-gold text-[10px] font-mono uppercase tracking-widest">Completed Residency</p>
                    <h4 className="font-serif-luxury text-lg text-white font-semibold">{activeTestimonial.project}</h4>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* ── PATRON AVATAR SELECTOR DOTS ── */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {testimonials.map((t, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setIsAutoplay(false);
                    setActiveIndex(idx);
                  }}
                  className={`group relative flex items-center gap-2 p-1.5 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "border-gold bg-gold/20 pr-4 shadow-lg shadow-gold/20"
                      : "border-white/15 bg-black/40 hover:border-gold/40"
                  }`}
                >
                  <div className={`relative w-8 h-8 rounded-full overflow-hidden border transition-all ${
                    isActive ? "border-gold scale-110" : "border-white/30 group-hover:border-gold/60"
                  }`}>
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                  {isActive && (
                    <span className="text-gold text-xs font-mono font-semibold tracking-wider whitespace-nowrap">
                      {t.name.split(" ")[0]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
