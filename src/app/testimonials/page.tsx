"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import TestimonialsSection from "@/components/TestimonialsSection";
import PrivateEngagementSection from "@/components/PrivateEngagementSection";

export default function TestimonialsPage() {
  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="Client Reverence & Patron Reflections"
        subtitle="3D Curved Arc Carousel with Fast Autoplay & Dynamic Glass Shifting"
      />

      {/* ===== 2. TESTIMONIALS SECTION WITH FAST AUTOPLAY & DYNAMIC GLASS ===== */}
      <TestimonialsSection />

      {/* ===== 3. PRIVATE CONSULTATION ===== */}
      <PrivateEngagementSection />
    </>
  );
}
