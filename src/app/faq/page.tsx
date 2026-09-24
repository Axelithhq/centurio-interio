"use client";

import PageHeader from "@/components/PageHeader";
import FaqSection from "@/components/FaqSection";

export default function FAQPage() {
  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Comprehensive Guidance & Architectural Clarity for Your Commission"
      />

      {/* ===== 2. FAQ ACCORDION SECTION (LIGHT LUXURY 3D UNFOLD) ===== */}
      <FaqSection />
    </>
  );
}
