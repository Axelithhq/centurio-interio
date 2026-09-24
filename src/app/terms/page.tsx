"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Engagement & Architectural SLA"
        subtitle="Operational Principles & Turnkey Contractual Standards for CENTURIO DESIGNS"
      />

      <div className="py-24 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#ECE5D8] text-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 space-y-10">
          
          <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-sm border border-gold/30 shadow-xl space-y-8">
            <div className="border-b border-gold/20 pb-4 flex items-center justify-between">
              <span className="text-gold font-mono text-xs tracking-widest uppercase">
                CONTRACT STANDARD: SLA-2026-TERMS
              </span>
              <span className="text-gray-500 font-mono text-xs">
                EFFECTIVE DATE: SEPTEMBER 2026
              </span>
            </div>

            <section className="space-y-4">
              <h2 className="font-serif-luxury text-2xl text-[#181512]">1. Scope of Turnkey Architecture Services</h2>
              <p className="text-gray-700 text-sm leading-relaxed font-light">
                CENTURIO INTERIOR STUDIO provides full-service minimal luxury architectural design, civil execution, 3D WebGL spatial modeling, imported material procurement, custom joinery, and site management. All execution follows locked itemized Bill of Quantities (BOQ).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif-luxury text-2xl text-[#181512]">2. Fixed Pricing & Zero Hidden Variation SLA</h2>
              <p className="text-gray-700 text-sm leading-relaxed font-light">
                Upon mutual sign-off of final 3D renders and itemized BOQ, project costs are 100% locked. Any scope modifications requested during construction will be documented via formal Change Order Addendums with prior client authorization.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif-luxury text-2xl text-[#181512]">3. Milestone Payments & Timeline SLAs</h2>
              <p className="text-gray-700 text-sm leading-relaxed font-light">
                Projects adhere to an 8–16 week timeline SLA (depending on estate scale). Payments are structured strictly according to verified site milestones (Discovery, Civil Framing, Joinery Assembly, Finishing, Final Styling & Handover).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif-luxury text-2xl text-[#181512]">4. 10-Year Structural & Joinery Warranty</h2>
              <p className="text-gray-700 text-sm leading-relaxed font-light">
                All structural civil alterations and bespoke joinery built by CENTURIO carry a 10-Year Warranty against manufacturing defects, structural warping, or joint failure, backed by complimentary 1-year quarterly maintenance audits.
              </p>
            </section>

            <div className="pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-gray-500">
                Studio Concierge: concierge@centuriodesigns.com
              </span>
              <Link
                href="/"
                className="gold-bg text-white px-6 py-2.5 rounded-sm text-xs font-mono tracking-widest uppercase hover:shadow-lg transition-all"
              >
                Return to Studio Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
