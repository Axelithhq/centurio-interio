"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import Room360Inspector from "@/components/Room360Inspector";
import PrivateEngagementSection from "@/components/PrivateEngagementSection";

export default function InspectorPage() {
  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="360° Architectural Inspector"
        subtitle="Real-Time WebGL 3D Apartment Model Exploration with Interactive Camera Controls & Autopilot Tour"
      />

      {/* ===== 2. 360° INSPECTOR WEBGL CANVAS SECTION ===== */}
      <Room360Inspector />

      {/* ===== 3. PRIVATE CONSULTATION ===== */}
      <PrivateEngagementSection />
    </>
  );
}
