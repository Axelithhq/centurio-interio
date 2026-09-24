"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import LayoutGallery from "@/components/LayoutGallery";
import PrivateEngagementSection from "@/components/PrivateEngagementSection";

export default function GalleryPage() {
  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="Visual Architectural Gallery"
        subtitle="3D Spiral Zoom Exhibition with Multi-Layout Modes & Fullscreen Inspection"
      />

      {/* ===== 2. LAYOUT GALLERY WITH MULTI-LAYOUT MODES & LIGHTBOX ===== */}
      <LayoutGallery />

      {/* ===== 3. PRIVATE CONSULTATION ENGAGEMENT ===== */}
      <PrivateEngagementSection />
    </>
  );
}
