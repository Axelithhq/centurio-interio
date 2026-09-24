"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import ProcessTimeline from "@/components/ProcessTimeline";
import PrivateEngagementSection from "@/components/PrivateEngagementSection";

export default function DesignProcessPage() {
  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="Execution Methodology & Timeline"
        subtitle="3D Alternating Helix Process from Concept & Discovery to White-Glove Handover"
      />

      {/* ===== 2. 3D ALTERNATING HELIX TIMELINE ===== */}
      <ProcessTimeline />

      {/* ===== 3. PRIVATE CONSULTATION ===== */}
      <PrivateEngagementSection />
    </>
  );
}
