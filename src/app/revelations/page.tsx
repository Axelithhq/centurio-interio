"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import PrivateEngagementSection from "@/components/PrivateEngagementSection";

export default function RevelationsPage() {
  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="Interior Revelations"
        subtitle="Photorealistic 1:1 Pixel Alignment Before & After Construction Transformations"
      />

      {/* ===== 2. BEFORE & AFTER TRANSFORMATIONS SECTION ===== */}
      <BeforeAfterSlider />

      {/* ===== 3. PRIVATE CONSULTATION ===== */}
      <PrivateEngagementSection />
    </>
  );
}
