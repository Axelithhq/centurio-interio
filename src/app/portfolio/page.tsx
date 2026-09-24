"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import SelectedPortfolioSection from "@/components/SelectedPortfolioSection";
import HorizontalGallery from "@/components/HorizontalGallery";
import PrivateEngagementSection from "@/components/PrivateEngagementSection";

export default function PortfolioPage() {
  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="Selected Portfolio"
        subtitle="A Curated Exhibition of Minimal Luxury Penthouses & Villa Sanctuaries"
      />

      {/* ===== 2. FEATURED PORTFOLIO CAROUSEL & SPECS ===== */}
      <SelectedPortfolioSection />

      {/* ===== 3. HORIZONTAL ARCHITECTURAL EXHIBITION ===== */}
      <HorizontalGallery />

      {/* ===== 4. PRIVATE CONSULTATION ===== */}
      <PrivateEngagementSection />
    </>
  );
}
