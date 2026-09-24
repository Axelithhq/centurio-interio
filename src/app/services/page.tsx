"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import ServicesSuiteSection from "@/components/ServicesSuiteSection";
import PrivateEngagementSection from "@/components/PrivateEngagementSection";

export default function ServicesPage() {
  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="Bespoke Services Suite"
        subtitle="Minimal Architectural Interiors, Interactive 3D Twins & Turnkey Execution"
      />

      {/* ===== 2. SERVICES SUITE (3D INTERACTIVE TABS & DELIVERABLES) ===== */}
      <ServicesSuiteSection />

      {/* ===== 3. PRIVATE ENGAGEMENT CONSULTATION ===== */}
      <PrivateEngagementSection />
    </>
  );
}
