"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { businessInfo } from "@/lib/data";

type ModalType = "privacy" | "terms" | "cookie" | "sla" | null;

export default function Footer() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [journalEmail, setJournalEmail] = useState<string>("");
  const [journalSubscribed, setJournalSubscribed] = useState<boolean>(false);

  // Track page scroll percentage for back-to-top indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(Math.round(progress));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalEmail) return;
    setJournalSubscribed(true);
    setTimeout(() => {
      setJournalEmail("");
    }, 4000);
  };

  return (
    <footer className="bg-[#0C0B0A] text-white border-t border-gold/30 relative overflow-hidden">
      {/* ===== Top Laser Sweep Beam & Ambient Warm Gold Lighting ===== */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />
      <div className="ambient-orb ambient-orb-gold w-[500px] h-[500px] -top-40 left-1/4 animate-orb-float opacity-20 pointer-events-none" />
      <div className="ambient-orb ambient-orb-gold w-[400px] h-[400px] bottom-0 right-10 animate-orb-float-2 opacity-15 pointer-events-none" />

      {/* ===== MAIN FOOTER CONTAINER ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        
        {/* 3D Horizon Unfold Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 pb-16 border-b border-white/10"
        >
          {/* BRAND COLUMN (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gold/50 p-0.5 shadow-[0_0_20px_rgba(197,160,89,0.3)] bg-[#141210]">
                <Image
                  src="/logo.png"
                  alt="CENTURIO DESIGNS Architectural Emblem"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif-luxury text-2xl tracking-wider text-white block leading-none">
                  CENTURIO
                </span>
                <span className="text-[9px] font-mono tracking-[0.25em] text-gold uppercase block mt-1">
                  Minimal Luxury Architecture
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
              Award-winning architectural interior studio crafting minimal luxury sanctuaries, private penthouses, and modern corporate headquarters across Jaipur &amp; Rajasthan.
            </p>

            {/* Live Atelier Status Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-gold/20 text-xs font-mono text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>JAIPUR ATELIER • OPEN FOR Q4 COMMISSIONS</span>
            </div>

            {/* Social Connect Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {[
                { name: "Instagram", href: businessInfo.social.instagram, icon: "IG" },
                { name: "WhatsApp", href: businessInfo.social.whatsapp, icon: "WA" },
                { name: "Facebook", href: businessInfo.social.facebook, icon: "FB" },
                { name: "Call Direct", href: `tel:${businessInfo.phone}`, icon: "TEL" },
                { name: "Email Studio", href: `mailto:${businessInfo.email}`, icon: "MAIL" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-sm border border-white/10 bg-white/5 hover:bg-gold hover:border-gold text-gray-300 hover:text-white text-[11px] font-mono tracking-wider uppercase transition-all duration-300 shadow-sm hover:scale-105"
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* STUDIO NAVIGATION LINK BUTTONS (3 COLS) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs text-gold uppercase tracking-[0.2em] flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Studio Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              {[
                { href: "#hero", label: "01 // Home Sanctuary", page: "/" },
                { href: "#about", label: "02 // Design Philosophy", page: "/about" },
                { href: "#services", label: "03 // Services Suite", page: "/services" },
                { href: "#portfolio", label: "04 // Selected Portfolio", page: "/portfolio" },
                { href: "#inspector", label: "05 // 360° Inspector", page: "/#inspector" },
                { href: "#revelations", label: "06 // Interior Revelations", page: "/#revelations" },
                { href: "#process", label: "07 // Process Methodology", page: "/design-process" },
                { href: "#gallery", label: "08 // Visual Gallery", page: "/gallery" },
                { href: "#testimonials", label: "09 // Client Reverence", page: "/testimonials" },
                { href: "#faq", label: "10 // Questions & Guidance", page: "/faq" },
                { href: "#contact", label: "11 // Private Engagement", page: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.page}
                    className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-gold">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ARCHITECTURAL SPECIALTIES (2 COLS) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs text-gold uppercase tracking-[0.2em] flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Specialties</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-gray-400">
              {[
                "Residential Penthouses",
                "Luxury Villa Architecture",
                "Corporate Headquarters",
                "Heritage Restoration",
                "WebGL 3D Twin Renders",
                "Custom Italian Joinery",
                "Subterranean Spa Design",
              ].map((spec) => (
                <li key={spec} className="hover:text-white transition-colors">
                  ✦ {spec}
                </li>
              ))}
            </ul>
          </div>

          {/* JOURNAL NEWSLETTER & CONCIERGE (3 COLS) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-mono text-xs text-gold uppercase tracking-[0.2em] flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Architectural Journal</span>
            </h4>
            <p className="text-gray-400 text-xs font-light leading-relaxed">
              Receive quarterly private briefings on European material trends, rare stone imports, and luxury spatial innovations.
            </p>

            {journalSubscribed ? (
              <div className="p-4 bg-gold/15 border border-gold/40 rounded-sm text-center text-xs font-mono text-gold">
                ✓ Registered for Private Journal
              </div>
            ) : (
              <form onSubmit={handleJournalSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  value={journalEmail}
                  onChange={(e) => setJournalEmail(e.target.value)}
                  placeholder="Enter your private email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="submit"
                  className="w-full gold-bg text-white py-3 rounded-sm text-xs font-mono tracking-widest uppercase hover:shadow-lg hover:shadow-gold/20 transition-all"
                >
                  Subscribe Journal
                </button>
              </form>
            )}

            <div className="pt-2 border-t border-white/10 space-y-1 text-xs font-mono text-gray-400">
              <span className="text-gray-200 block font-semibold">Direct Concierge:</span>
              <div>{businessInfo.phoneDisplay}</div>
              <div className="text-gold">{businessInfo.email}</div>
            </div>
          </div>
        </motion.div>

        {/* ===== FOOTER SUB-BAR: COMPLIANCE HYPERLINKS & BACK-TO-TOP ===== */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs font-mono text-gray-500">
          
          {/* Copyright Line */}
          <div className="flex items-center gap-2 text-center lg:text-left">
            <span>&copy; {new Date().getFullYear()} CENTURIO INTERIOR STUDIO.</span>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span className="hidden sm:inline text-gray-400">All Rights Reserved.</span>
          </div>

          {/* Legal Compliance Hyperlinks */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-gray-400">
            <Link
              href="/privacy"
              onClick={() => setActiveModal("privacy")}
              className="hover:text-gold transition-colors underline underline-offset-4 decoration-gold/30 hover:decoration-gold"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-700">•</span>
            <Link
              href="/terms"
              onClick={() => setActiveModal("terms")}
              className="hover:text-gold transition-colors underline underline-offset-4 decoration-gold/30 hover:decoration-gold"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-gray-700">•</span>
            <button
              onClick={() => setActiveModal("cookie")}
              className="hover:text-gold transition-colors underline underline-offset-4 decoration-gold/30 hover:decoration-gold"
            >
              Cookie Governance
            </button>
            <span className="text-gray-700">•</span>
            <button
              onClick={() => setActiveModal("sla")}
              className="hover:text-gold transition-colors underline underline-offset-4 decoration-gold/30 hover:decoration-gold"
            >
              10-Year SLA
            </button>
          </div>

          {/* Floating Back-to-Top Button with Scroll Ring */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-gold border border-white/10 hover:border-gold rounded-full text-gold hover:text-white transition-all duration-300 shadow-lg"
          >
            <span className="text-xs font-mono font-bold tracking-widest uppercase">
              TOP ({scrollProgress}%)
            </span>
            <span className="w-5 h-5 rounded-full bg-gold/20 group-hover:bg-white/20 flex items-center justify-center text-xs group-hover:-translate-y-0.5 transition-transform">
              ↑
            </span>
          </button>

        </div>
      </div>

      {/* ===== INTERACTIVE LEGAL MODAL VIEWER ===== */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141210] border border-gold/40 rounded-sm p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto text-white shadow-2xl relative space-y-6"
            >
              <div className="flex items-center justify-between border-b border-gold/30 pb-4">
                <div>
                  <span className="text-gold text-[10px] font-mono tracking-widest uppercase block">
                    CENTURIO ARCHITECTURAL COMPLIANCE
                  </span>
                  <h3 className="font-serif-luxury text-xl text-white">
                    {activeModal === "privacy" && "Privacy Policy & Confidentiality"}
                    {activeModal === "terms" && "Terms of Engagement & Contract SLA"}
                    {activeModal === "cookie" && "Cookie Governance & Security"}
                    {activeModal === "sla" && "10-Year Structural SLA Warranty"}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors font-mono"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed space-y-4">
                {activeModal === "privacy" && (
                  <>
                    <p>CENTURIO INTERIOR STUDIO respects the privacy of all high-net-worth clients. All site blueprints, spatial audits, financial budgets, and 3D WebGL models are held strictly confidential under Non-Disclosure Protocols.</p>
                    <p>We do not monetize, distribute, or share client spatial data with un-vetted external vendors. You retain complete ownership of all bespoke CAD models generated during your commission.</p>
                  </>
                )}

                {activeModal === "terms" && (
                  <>
                    <p>All architectural interior commissions operate under locked itemized Bill of Quantities (BOQ). Scope alterations requested during civil construction require formal Change Order sign-off.</p>
                    <p>Timelines adhere to an 8–16 week SLA backed by milestone progress updates delivered directly to your private client portal.</p>
                  </>
                )}

                {activeModal === "cookie" && (
                  <>
                    <p>Our WebGL studio platform uses essential session cookies to preserve your 3D inspection camera presets, material filter choices, and interactive lighting preferences.</p>
                    <p>Zero third-party tracking scripts are used to preserve your browsing confidentiality.</p>
                  </>
                )}

                {activeModal === "sla" && (
                  <>
                    <p>Every CENTURIO residential villa and commercial penthouse includes a 10-Year Warranty covering structural civil works, custom millwork joinery, and architectural lighting fixtures.</p>
                    <p>Includes 1-Year complimentary quarterly preventive maintenance health audits for home automation, stone sealants, and plumbing joinery.</p>
                  </>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono">
                <span className="text-gray-500">Document Code: CENT-{activeModal?.toUpperCase()}-2026</span>
                <button
                  onClick={() => setActiveModal(null)}
                  className="gold-bg text-white px-5 py-2 rounded-sm text-xs font-mono uppercase tracking-widest hover:shadow-lg"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
