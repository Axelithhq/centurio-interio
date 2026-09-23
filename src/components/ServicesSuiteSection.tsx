"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "@/lib/data";

/**
 * ServicesSuiteSection Component
 * 
 * High-end architectural services section with a light warm paper background (#FAF8F5),
 * matching the 3D scroll-driven entrance animation of the upper section.
 */
export default function ServicesSuiteSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress as Section 02 enters viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center 50%"],
  });

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative py-28 sm:py-36 md:py-44 bg-gradient-to-b from-[#FAF8F5] via-[#F4F1EA] to-[#FAF8F5] text-[#1E201D] overflow-hidden select-none border-t border-[#1E201D]/10"
    >
      {/* Ambient Light Orbs */}
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-radial from-gold/10 via-transparent to-transparent pointer-events-none blur-3xl opacity-50" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-gradient-radial from-[#C8A96A]/8 via-transparent to-transparent pointer-events-none blur-3xl opacity-40" 
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(#1E201D_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ─── SECTION HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20 pb-8 border-b border-[#1E201D]/10">
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
                02 // OUR BESPOKE OFFERINGS
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-[#1E201D] leading-[1.15] font-semibold"
            >
              Bespoke Architectural & <br />
              <span className="gold-text italic">Interior Suite.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#5A6057] text-sm sm:text-base max-w-md font-light leading-relaxed"
          >
            From luxury residential estates to high-end corporate flagships, we deliver uncompromised spatial design tailored to refined lifestyles.
          </motion.p>
        </div>

        {/* ─── 3D SCROLL-DRIVEN SERVICES CARDS GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {services.map((service, idx) => (
            <AnimatedServiceCard
              key={service.id}
              service={service}
              index={idx}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// Sub-component for individual card scroll-driven 3D entrance animation
function AnimatedServiceCard({
  service,
  index,
  scrollYProgress,
}: {
  service: (typeof services)[0];
  index: number;
  scrollYProgress: any;
}) {
  // Staggered offsets for 3 columns:
  // Left column (idx 0, 3) comes from left top (-120px X, -100px Y)
  // Middle column (idx 1, 4) comes from top center (0px X, -140px Y)
  // Right column (idx 2, 5) comes from right top (+120px X, -100px Y)
  const col = index % 3;
  
  const startX = col === 0 ? -120 : col === 2 ? 120 : 0;
  const startY = -120 - (index * 20);
  const startRotate = col === 0 ? -14 : col === 2 ? 14 : 0;

  const cardX = useTransform(scrollYProgress, [0, 1], [startX, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [startY, 0]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [startRotate, 0]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0.9, 1]);

  return (
    <motion.div
      style={{
        x: cardX,
        y: cardY,
        rotate: cardRotate,
        rotateX: cardRotateX,
        scale: cardScale,
        opacity: cardOpacity,
      }}
      className="perspective-1000 origin-top"
    >
      <div className="group relative bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden border border-[#1E201D]/12 shadow-xl shadow-black/5 hover:border-gold/60 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 flex flex-col justify-between h-full">
        
        {/* Card Header Image */}
        <div>
          <div className="relative h-64 sm:h-70 w-full overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E201D]/80 via-[#1E201D]/20 to-transparent" />
            
            {/* Category Tag & Service Number */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="bg-[#1E201D]/80 backdrop-blur-md border border-white/20 text-gold text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                {service.tag}
              </span>
              <span className="bg-white/90 backdrop-blur-md text-[#1E201D] text-[11px] font-mono font-bold px-3 py-1 rounded-full shadow-md">
                0{service.id} //
              </span>
            </div>

            {/* Bottom Overlay Title Teaser */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-semibold group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>
            </div>
          </div>

          {/* Card Body Description & Features */}
          <div className="p-6 sm:p-7 space-y-4">
            <p className="text-[#5A6057] text-xs sm:text-sm font-light leading-relaxed">
              {service.description}
            </p>

            {/* Features Bullet List */}
            <div className="border-t border-[#1E201D]/8 pt-4 space-y-2">
              {service.features.map((feat, fi) => (
                <div key={fi} className="flex items-center gap-2.5 text-xs font-mono text-[#1E201D]/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Action Footer */}
        <div className="px-6 pb-6 pt-2">
          <a
            href="#contact"
            className="w-full py-3 px-4 rounded-xl border border-[#1E201D]/15 group-hover:border-gold group-hover:bg-gold group-hover:text-white text-[#1E201D] text-xs font-mono tracking-widest uppercase flex items-center justify-between transition-all duration-300 shadow-sm"
          >
            <span>Inquire Service</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

      </div>
    </motion.div>
  );
}
