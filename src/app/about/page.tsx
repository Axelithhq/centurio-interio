"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import StudioPhilosophySection from "@/components/StudioPhilosophySection";
import StatsCounter from "@/components/StatsCounter";
import PrivateEngagementSection from "@/components/PrivateEngagementSection";
import FounderCard from "@/components/FounderCard";
import { teamMembers, whyChooseUs } from "@/lib/data";

const whyIcons: Record<string, React.ReactNode> = {
  sparkles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
      <path d="M18 14l-.5 2.5L15 17l2.5.5.5 2.5.5-2.5L21 17l-2.5-.5L18 14z" />
    </svg>
  ),
  gem: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M6 2L2 8l10 12L22 8l-4-6H6z" />
      <path d="M2 8h20" />
      <path d="M12 20L7 8" />
      <path d="M12 20l5-12" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
};

export default function AboutPage() {
  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="About CENTURIO ATELIER"
        subtitle="Crafting Minimal Luxury Architectural Sanctuaries Since 2015"
      />

      {/* ===== 2. STUDIO PHILOSOPHY (3D INTERACTIVE HIGHLIGHTS) ===== */}
      <StudioPhilosophySection />

      {/* ===== 3. METRIC BENCHMARKS & STATS COUNTER ===== */}
      <StatsCounter />

      {/* ===== 4. ARCHITECTURAL LEADERSHIP (FOUNDER WASIM AKRAM) ===== */}
      <FounderCard />

      {/* ===== 5. WHY WORK WITH CENTURIO ===== */}
      <section className="py-24 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#ECE5D8] text-charcoal relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold text-xs font-mono tracking-widest uppercase block mb-2">
              The CENTURIO Distinction
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#181512] font-normal">
              Why Commission <span className="gold-text italic">Our Studio</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.slice(0, 4).map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 bg-white/90 backdrop-blur-md border border-amber-900/15 rounded-sm hover:border-gold text-center shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 flex items-center justify-center text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-sm">
                  {whyIcons[item.icon] || "✦"}
                </div>
                <h3 className="font-serif-luxury text-xl text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. PRIVATE CONSULTATION ENGAGEMENT ===== */}
      <PrivateEngagementSection />
    </>
  );
}
