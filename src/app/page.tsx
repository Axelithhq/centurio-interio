"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Lightweight components — loaded eagerly
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal3D from "@/components/ScrollReveal3D";
import TiltCard from "@/components/TiltCard";
import StudioPhilosophySection from "@/components/StudioPhilosophySection";
import ServicesSuiteSection from "@/components/ServicesSuiteSection";
import SelectedPortfolioSection from "@/components/SelectedPortfolioSection";

// Heavy components — loaded on demand
const SmoothScrollWrapper = dynamic(() => import("@/components/SmoothScrollWrapper"), { ssr: false });
const CursorSpotlight = dynamic(() => import("@/components/CursorSpotlight"), { ssr: false });
const HeroScrollCanvas = dynamic(() => import("@/components/HeroScrollCanvas"), { ssr: false });
const Background3D = dynamic(() => import("@/components/Background3D"), { ssr: false });
const Room360Inspector = dynamic(() => import("@/components/Room360Inspector"), { ssr: false, loading: () => <div className="h-screen bg-charcoal" /> });
const BeforeAfterSlider = dynamic(() => import("@/components/BeforeAfterSlider"), { ssr: false });
const LayoutGallery = dynamic(() => import("@/components/LayoutGallery"), { ssr: false });
const ProcessTimeline = dynamic(() => import("@/components/ProcessTimeline"), { ssr: false });
const HorizontalGallery = dynamic(() => import("@/components/HorizontalGallery"), { ssr: false });
const StatsCounter = dynamic(() => import("@/components/StatsCounter"), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"), { ssr: false });
const FaqSection = dynamic(() => import("@/components/FaqSection"), { ssr: false });
const PrivateEngagementSection = dynamic(() => import("@/components/PrivateEngagementSection"), { ssr: false });
const MouseParallax3D = dynamic(() => import("@/components/MouseParallax3D"), { ssr: false });

import {
  businessInfo,
  services,
  testimonials,
  faqs,
  materialSwatches,
} from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

function SectionSkeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-charcoal/5 ${className}`} />;
}

export default function HomePage() {
  const [activeMaterial, setActiveMaterial] = useState(materialSwatches[0]);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <SmoothScrollWrapper>
      <div className="relative bg-luxury-dark text-charcoal selection:bg-gold selection:text-white min-h-screen">
        <Background3D />
        <CursorSpotlight />

        <HeroScrollCanvas />

        <div className="relative z-[1]">

        {/* 2. STUDIO PHILOSOPHY & MATERIAL LAB */}
        <StudioPhilosophySection />

        {/* 3. SERVICES SUITE */}
        <ServicesSuiteSection />

        {/* 4. SELECTED PORTFOLIO */}
        <SelectedPortfolioSection />

        {/* 5. 360 INSPECTOR */}
        <Suspense fallback={<div className="h-screen bg-charcoal" />}>
          <section id="inspector" className="relative">
            <Room360Inspector />
          </section>
        </Suspense>

        {/* 6. BEFORE & AFTER */}
        <Suspense fallback={<SectionSkeleton className="h-[600px] bg-luxury-dark" />}>
          <BeforeAfterSlider />
        </Suspense>

        {/* 7. PROCESS TIMELINE */}
        <Suspense fallback={<SectionSkeleton className="h-[800px] bg-luxury-dark" />}>
          <section id="process" className="relative py-24 md:py-32 bg-luxury-dark text-white overflow-hidden">
            <div className="ambient-orb ambient-orb-gold w-[500px] h-[500px] top-20 -right-40 animate-orb-float" />
            <div className="ambient-orb ambient-orb-gold w-[300px] h-[300px] bottom-20 -left-20 animate-orb-float-2" />
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="text-gold text-xs font-mono tracking-widest uppercase block mb-2">03 // Execution Methodology</span>
                <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white">Our Architectural <span className="gold-text">Design Process</span></h2>
                <p className="text-gray-400 text-sm font-light mt-4">A structured journey from conceptual discovery to turnkey presentation.</p>
              </div>
              <ProcessTimeline />
            </div>
          </section>
        </Suspense>

        {/* 8. STATS */}
        <Suspense fallback={<SectionSkeleton className="h-[280px] bg-luxury-dark" />}>
          <StatsCounter />
        </Suspense>

        {/* 9. TESTIMONIALS */}
        <Suspense fallback={<SectionSkeleton className="h-[600px] bg-luxury-dark" />}>
          <TestimonialsSection />
        </Suspense>

        {/* 10. GALLERY */}
        <Suspense fallback={<SectionSkeleton className="h-[700px] bg-luxury-dark" />}>
          <LayoutGallery />
        </Suspense>

        {/* 11. FAQ / QUESTIONS & GUIDANCE */}
        <Suspense fallback={<SectionSkeleton className="h-[600px] bg-luxury-sand" />}>
          <FaqSection />
        </Suspense>

        {/* 12. CONTACT / PRIVATE ENGAGEMENT */}
        <Suspense fallback={<SectionSkeleton className="h-[700px] bg-luxury-dark" />}>
          <PrivateEngagementSection />
        </Suspense>

        </div>
      </div>
    </SmoothScrollWrapper>
  );
}
