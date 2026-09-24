"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import PrivateEngagementSection from "@/components/PrivateEngagementSection";
import FaqSection from "@/components/FaqSection";

export default function ContactPage() {
  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="Private Engagement & Concierge"
        subtitle="Commission Your Sanctuary with Jaipur's Principal Architectural Interior Studio"
      />

      {/* ===== 2. PRIVATE CONSULTATION SUITE & CONFIGURATOR ===== */}
      <PrivateEngagementSection />

      {/* ===== 3. QUESTIONS & GUIDANCE ===== */}
      <FaqSection />
    </>
  );
}
