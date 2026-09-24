"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs, FAQItem, businessInfo } from "@/lib/data";

interface FaqSectionProps {
  className?: string;
}

export default function FaqSection({ className = "" }: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "faq-1": true, // Open first item by default for great presentation
  });
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, boolean>>({});

  const categories = useMemo(() => {
    return ["ALL", "Philosophy & Design", "Timelines & Budget", "Turnkey & Execution", "Warranty & Support"];
  }, []);

  // Filtered FAQ items based on category and search query
  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchesCategory = activeCategory === "ALL" || item.category === activeCategory;
      const qLower = item.q.toLowerCase();
      const aLower = item.a.toLowerCase();
      const tagMatches = item.tags ? item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) : false;
      const sLower = searchQuery.toLowerCase().trim();
      
      const matchesSearch = !sLower || qLower.includes(sLower) || aLower.includes(sLower) || tagMatches;
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFaqs.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenIds(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenIds({});
  };

  const toggleFeedback = (id: string) => {
    setHelpfulFeedback((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq" className={`relative py-28 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#ECE5D8] text-charcoal overflow-hidden ${className}`}>
      {/* ===== Ambient Warm Sunlight & Geometric Architectural Lines ===== */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none" />
      <div className="ambient-orb ambient-orb-warm w-[450px] h-[450px] top-12 -left-20 animate-orb-float pointer-events-none opacity-40" />
      <div className="ambient-orb ambient-orb-warm w-[350px] h-[350px] bottom-10 right-10 animate-orb-float-2 pointer-events-none opacity-30" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* ===== SECTION HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            <span>05 // Architectural Knowledge Base</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#181512] font-normal tracking-tight mb-5">
            Questions &amp; <span className="gold-text italic font-serif">Guidance</span>
          </h2>
          
          <p className="text-gray-700 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Clear, transparent answers regarding our minimal luxury design philosophy, precision WebGL 3D modeling, timeline commitments, and 10-year structural warranty.
          </p>
        </motion.div>

        {/* ===== SEARCH BAR & CONTROLS BAR ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 space-y-5"
        >
          {/* Search Input Box */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guidance (e.g. warranty, 3D visualization, BOQ, timeline...)"
              className="w-full pl-12 pr-12 py-4 bg-white/90 backdrop-blur-md border border-amber-900/15 rounded-sm text-sm text-charcoal placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gold transition-colors text-xs font-mono uppercase"
              >
                Clear ✕
              </button>
            )}
          </div>

          {/* Category Filter Tabs & Expand Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-sm text-xs font-mono tracking-wider uppercase transition-all duration-300 relative ${
                      isActive
                        ? "bg-[#1A1612] text-white shadow-md"
                        : "bg-white/80 hover:bg-white text-gray-700 border border-amber-900/10 hover:border-gold/30"
                    }`}
                  >
                    {cat}
                    {isActive && (
                      <motion.span
                        layoutId="activeFaqTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 ml-auto text-xs font-mono text-gray-600">
              <span className="hidden sm:inline">Result: {filteredFaqs.length} Guidance Items</span>
              <button
                onClick={handleExpandAll}
                className="px-3 py-1.5 bg-white/80 hover:bg-white border border-amber-900/10 rounded-sm hover:text-gold transition-all"
              >
                Expand All
              </button>
              <button
                onClick={handleCollapseAll}
                className="px-3 py-1.5 bg-white/80 hover:bg-white border border-amber-900/10 rounded-sm hover:text-gold transition-all"
              >
                Collapse
              </button>
            </div>
          </div>
        </motion.div>

        {/* ===== FAQ LIST (3D ORIGAMI ACCORDION CARDS) ===== */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-md rounded-sm border border-amber-900/10 p-8 shadow-sm">
            <span className="text-gold text-4xl block mb-3">🔍</span>
            <h3 className="font-serif-luxury text-xl text-charcoal mb-2">No Matching Guidance Found</h3>
            <p className="text-gray-600 text-xs font-mono mb-6">
              Try searching with another keyword or explore all guidance categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("ALL");
              }}
              className="gold-bg text-white px-6 py-2.5 rounded-sm text-xs font-mono uppercase tracking-widest hover:shadow-lg transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = !!openIds[faq.id];
              const isHelpful = !!helpfulFeedback[faq.id];

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 35, rotateX: -12, rotateY: index % 2 === 0 ? 4 : -4 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className={`group rounded-sm border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white border-gold/60 shadow-[0_20px_50px_-12px_rgba(197,160,89,0.22)] ring-1 ring-gold/30"
                      : "bg-white/85 hover:bg-white border-amber-900/15 hover:border-gold/40 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(197,160,89,0.12)]"
                  }`}
                >
                  {/* Card Header Trigger */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-6 md:p-7 flex items-start sm:items-center justify-between gap-4 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start sm:items-center gap-4 flex-1">
                      {/* Number Badge */}
                      <span className={`w-9 h-9 rounded-sm flex items-center justify-center font-mono text-xs shrink-0 transition-all ${
                        isOpen
                          ? "bg-[#1A1612] text-gold font-bold shadow-sm"
                          : "bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white"
                      }`}>
                        0{index + 1}
                      </span>

                      <div>
                        {/* Category Pill */}
                        <span className="text-[10px] font-mono tracking-widest uppercase text-gold/90 font-semibold block mb-1">
                          {faq.category}
                        </span>
                        
                        {/* Question Title */}
                        <h3 className={`font-serif-luxury text-lg sm:text-xl font-medium transition-colors ${
                          isOpen ? "text-[#1A1612]" : "text-charcoal group-hover:text-gold"
                        }`}>
                          {faq.q}
                        </h3>
                      </div>
                    </div>

                    {/* Expand/Collapse Toggle Button */}
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-gold border-gold text-white rotate-45 shadow-md"
                        : "border-amber-900/20 text-gray-500 group-hover:border-gold group-hover:text-gold"
                    }`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Expand Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-amber-900/10"
                      >
                        <div className="p-6 md:p-8 bg-gradient-to-b from-white to-[#FAF8F4]/80 space-y-6">
                          {/* Detailed Answer */}
                          <p className="text-gray-700 text-sm sm:text-base font-light leading-relaxed">
                            {faq.a}
                          </p>

                          {/* Key Takeaways Section */}
                          {faq.takeaways && faq.takeaways.length > 0 && (
                            <div className="bg-[#FAF6F0] border border-gold/20 rounded-sm p-4 sm:p-5">
                              <span className="text-[11px] font-mono tracking-widest uppercase text-[#1A1612] font-semibold block mb-3 flex items-center gap-2">
                                <span className="text-gold text-sm">✦</span> Key Architectural Commitments
                              </span>
                              <ul className="space-y-2.5">
                                {faq.takeaways.map((takeaway, tIdx) => (
                                  <li key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                                    <span className="text-gold font-bold shrink-0">✓</span>
                                    <span>{takeaway}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tags & Interactive Feedback Bar */}
                          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100">
                            {/* Tags */}
                            <div className="flex flex-wrap items-center gap-2">
                              {faq.tags && faq.tags.map((tag, tagIdx) => (
                                <button
                                  key={tagIdx}
                                  onClick={() => setSearchQuery(tag.replace("#", ""))}
                                  className="text-[11px] font-mono text-gray-600 bg-white hover:bg-gold/10 hover:text-gold border border-gray-200 rounded-sm px-2.5 py-1 transition-all"
                                >
                                  {tag}
                                </button>
                              ))}
                            </div>

                            {/* Helpful Feedback Button */}
                            <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                              <span>Was this guidance helpful?</span>
                              <button
                                onClick={() => toggleFeedback(faq.id)}
                                className={`px-3 py-1 rounded-sm border transition-all flex items-center gap-1.5 ${
                                  isHelpful
                                    ? "bg-gold text-white border-gold shadow-xs"
                                    : "bg-white border-gray-200 hover:border-gold hover:text-gold text-gray-700"
                                }`}
                              >
                                <span>{isHelpful ? "✓ Saved" : "👍 Helpful"}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ===== CONCIERGE HELP CTA BANNER (IN LIGHT LUXURY STYLING) ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 bg-[#1A1612] text-white rounded-sm p-8 md:p-12 border border-gold/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="ambient-orb ambient-orb-gold w-[300px] h-[300px] -top-10 -right-10 pointer-events-none opacity-20" />

          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="text-gold text-xs font-mono tracking-widest uppercase block mb-2">
              Bespoke Advisory
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white mb-3">
              Have a Specific Architectural Inquiry?
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
              Our principal architect concierge is available for private spatial consultations and detailed BOQ line-item walk-throughs.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <a
              href={`tel:${businessInfo.phone}`}
              className="w-full sm:w-auto text-center px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-sm text-xs font-mono tracking-widest uppercase transition-all"
            >
              Direct Studio Call
            </a>
            <a
              href={businessInfo.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-7 py-3.5 gold-bg text-white rounded-sm text-xs font-mono tracking-widest uppercase hover:shadow-xl hover:shadow-gold/30 transition-all"
            >
              WhatsApp Concierge →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
