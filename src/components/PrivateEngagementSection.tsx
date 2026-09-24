"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { businessInfo } from "@/lib/data";

interface PrivateEngagementSectionProps {
  className?: string;
}

type FormMode = "express" | "configurator";

export default function PrivateEngagementSection({ className = "" }: PrivateEngagementSectionProps) {
  const [formMode, setFormMode] = useState<FormMode>("express");
  const [step, setStep] = useState<number>(1);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>("");

  // Express Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "residential",
    sqft: "",
    budgetTier: "$300k - $750k",
    timeline: "Q4 2026",
    vision: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate a unique luxury ticket ID
    const randomTicket = `CENT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(randomTicket);

    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(businessInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <section id="contact" className={`relative py-28 md:py-36 bg-[#0E0D0C] text-white overflow-hidden ${className}`}>
      {/* Background Ambient Orbs & Gold Laser Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.06] pointer-events-none" />
      <div className="ambient-orb ambient-orb-gold w-[600px] h-[600px] top-1/4 -left-48 animate-orb-float pointer-events-none opacity-30" />
      <div className="ambient-orb ambient-orb-gold w-[400px] h-[400px] bottom-10 -right-20 animate-orb-float-2 pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* ===== SECTION TITLE HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 35, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono tracking-widest uppercase mb-4 shadow-lg shadow-gold/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>06 // Private Engagement</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight mb-4">
            Commission Your <span className="gold-text italic font-serif">Sanctuary.</span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            We limit studio commissions annually to preserve uncompromising architectural detail. Request your private consultation session below.
          </p>
        </motion.div>

        {/* ===== DUAL 3D PRISM LAYOUT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: INQUIRY WIZARD & FORM (7 COLS) */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#141210]/90 backdrop-blur-xl p-7 sm:p-10 rounded-sm border border-gold/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            {/* Top Golden Light Edge */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />

            {formSubmitted ? (
              /* LUXURY COMMISSION TICKET (SUCCESS SCREEN) */
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="py-6 text-center space-y-6"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold text-2xl shadow-inner">
                  ✦
                </div>

                <div className="space-y-2">
                  <span className="text-gold text-xs font-mono tracking-widest uppercase block">
                    Commission Request Registered
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white">
                    Private Sanctuary Ticket
                  </h3>
                  <span className="inline-block px-3 py-1 bg-gold/10 border border-gold/30 rounded-sm text-gold font-mono text-xs tracking-wider">
                    TICKET #: {ticketId}
                  </span>
                </div>

                <div className="bg-[#0A0908] border border-gold/20 p-6 rounded-sm text-left space-y-4 max-w-md mx-auto">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-3">
                    <span className="text-gray-400">CLIENT NAME</span>
                    <span className="text-white font-semibold">{formData.name || "Valued Client"}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-3">
                    <span className="text-gray-400">PROJECT TYPE</span>
                    <span className="text-gold uppercase font-semibold">{formData.projectType}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-3">
                    <span className="text-gray-400">SLA GUARANTEE</span>
                    <span className="text-emerald-400 font-semibold">Response within 12 Hours</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-400">STUDIO CONCIERGE</span>
                    <span className="text-white">Direct Advisory Assigned</span>
                  </div>
                </div>

                <p className="text-gray-400 text-xs font-light max-w-md mx-auto leading-relaxed">
                  Our principal architect will contact you directly at <span className="text-white font-mono">{formData.email || formData.phone}</span> to schedule a private studio walkthrough.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <a
                    href={businessInfo.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-sm text-xs font-mono tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <span>Send Ticket to WhatsApp</span>
                    <span>→</span>
                  </a>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setStep(1);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 rounded-sm text-xs font-mono tracking-widest uppercase transition-all"
                  >
                    New Consultation
                  </button>
                </div>
              </motion.div>
            ) : (
              /* FORM INQUIRY WIZARD */
              <div>
                {/* Mode Selector Tabs */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormMode("express")}
                      className={`px-4 py-2 rounded-sm text-xs font-mono tracking-wider uppercase transition-all ${
                        formMode === "express"
                          ? "gold-bg text-white shadow-md font-semibold"
                          : "bg-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      Express Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormMode("configurator")}
                      className={`px-4 py-2 rounded-sm text-xs font-mono tracking-wider uppercase transition-all ${
                        formMode === "configurator"
                          ? "gold-bg text-white shadow-md font-semibold"
                          : "bg-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      3-Step Configurator
                    </button>
                  </div>

                  <span className="hidden sm:inline-block text-[11px] font-mono text-gray-500 uppercase">
                    Annual Quota: 12 Estates
                  </span>
                </div>

                {formMode === "express" ? (
                  /* EXPRESS SINGLE-PAGE FORM */
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1.5">
                          Full Name <span className="text-gold">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Lord Alexander Wright"
                          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-sm text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1.5">
                          Email Address <span className="text-gold">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="alexander@estate.com"
                          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-sm text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1.5">
                          Phone Number <span className="text-gold">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-sm text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1.5">
                          Commission Scope
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 bg-[#1C1A18] border border-white/10 rounded-sm text-xs text-gray-200 focus:outline-none focus:border-gold transition-colors"
                        >
                          <option value="residential">Residential Villa / Penthouse</option>
                          <option value="commercial">Commercial & Corporate Suite</option>
                          <option value="renovation">Heritage Architecture Renovation</option>
                          <option value="consultation">Bespoke Material Consultation</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1.5">
                          Estimated Area (Sq. Ft)
                        </label>
                        <input
                          type="text"
                          name="sqft"
                          value={formData.sqft}
                          onChange={handleInputChange}
                          placeholder="e.g. 6,500 Sq. Ft"
                          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-sm text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1.5">
                          Investment Scale Tier
                        </label>
                        <select
                          name="budgetTier"
                          value={formData.budgetTier}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 bg-[#1C1A18] border border-white/10 rounded-sm text-xs text-gray-200 focus:outline-none focus:border-gold transition-colors"
                        >
                          <option value="$150k - $300k">Premium ($150,000 – $300,000)</option>
                          <option value="$300k - $750k">High Luxury ($300,000 – $750,000)</option>
                          <option value="$750k+ Bespoke">Ultra Estate ($750,000+ Bespoke)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1.5">
                        Architectural Vision &amp; Notes
                      </label>
                      <textarea
                        rows={3}
                        name="vision"
                        value={formData.vision}
                        onChange={handleInputChange}
                        placeholder="Share details on your site location, timber/marble preferences, spatial flow requirements..."
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-sm text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gold-bg text-white py-4 rounded-sm text-xs font-mono tracking-widest uppercase hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Encrypting Commission Request...</span>
                        </>
                      ) : (
                        <span>Submit Private Consultation Request →</span>
                      )}
                    </button>
                  </form>
                ) : (
                  /* 3-STEP CONFIGURATOR WIZARD */
                  <div className="space-y-6">
                    {/* Step Progress Bar */}
                    <div className="flex items-center justify-between gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex-1">
                          <div className={`h-1 rounded-full transition-all ${
                            step >= i ? "bg-gold" : "bg-white/10"
                          }`} />
                          <span className={`text-[10px] font-mono uppercase block mt-1 ${
                            step === i ? "text-gold font-bold" : "text-gray-500"
                          }`}>
                            Step 0{i}
                          </span>
                        </div>
                      ))}
                    </div>

                    {step === 1 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <h4 className="font-serif-luxury text-lg text-white">Select Your Estate Type</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { title: "Residential Villa", desc: "Private estate, 4,000+ sq ft" },
                            { title: "Penthouse Suite", desc: "Skyline luxury penthouse" },
                            { title: "Commercial Suite", desc: "Boutique HQ or executive lounge" },
                            { title: "Heritage Renovation", desc: "Architectural restoration" },
                          ].map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, projectType: item.title }))}
                              className={`p-4 rounded-sm border text-left transition-all ${
                                formData.projectType === item.title
                                  ? "bg-gold/15 border-gold text-white"
                                  : "bg-white/5 border-white/10 text-gray-300 hover:border-gold/40"
                              }`}
                            >
                              <div className="font-medium text-xs text-gold mb-1">{item.title}</div>
                              <div className="text-[11px] text-gray-400 font-mono">{item.desc}</div>
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setStep(2)}
                          className="w-full gold-bg text-white py-3.5 rounded-sm text-xs font-mono uppercase tracking-widest hover:shadow-lg"
                        >
                          Next: Scale &amp; Budget →
                        </button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <h4 className="font-serif-luxury text-lg text-white">Estimated Scale &amp; Timeline</h4>
                        <div className="space-y-3">
                          <label className="block text-[11px] font-mono text-gray-400 uppercase">Project Investment Tier</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {["$150k - $300k", "$300k - $750k", "$750k+ Bespoke"].map((tier) => (
                              <button
                                key={tier}
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, budgetTier: tier }))}
                                className={`p-3 rounded-sm border text-xs font-mono transition-all ${
                                  formData.budgetTier === tier
                                    ? "bg-gold border-gold text-white font-bold"
                                    : "bg-white/5 border-white/10 text-gray-300"
                                }`}
                              >
                                {tier}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={() => setStep(1)}
                            className="w-1/3 bg-white/5 border border-white/10 text-gray-300 py-3 rounded-sm text-xs font-mono uppercase"
                          >
                            ← Back
                          </button>
                          <button
                            onClick={() => setStep(3)}
                            className="w-2/3 gold-bg text-white py-3 rounded-sm text-xs font-mono uppercase tracking-widest"
                          >
                            Next: Contact Details →
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <h4 className="font-serif-luxury text-lg text-white">Client Information</h4>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name *"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-xs text-white"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-xs text-white"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-xs text-white"
                        />

                        <div className="flex gap-3">
                          <button
                            onClick={() => setStep(2)}
                            className="w-1/3 bg-white/5 border border-white/10 text-gray-300 py-3 rounded-sm text-xs font-mono uppercase"
                          >
                            ← Back
                          </button>
                          <button
                            onClick={handleSubmit}
                            className="w-2/3 gold-bg text-white py-3 rounded-sm text-xs font-mono uppercase tracking-widest hover:shadow-xl"
                          >
                            Complete Request
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* RIGHT COLUMN: STUDIO CONCIERGE & MAP (5 COLS) */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Studio Concierge Glass Card */}
            <div className="bg-[#141210]/90 backdrop-blur-xl p-8 rounded-sm border border-gold/20 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-gold block mb-1">
                    Direct Channel
                  </span>
                  <h3 className="font-serif-luxury text-2xl text-white">Studio Concierge</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold text-sm font-mono">
                  24/7
                </div>
              </div>

              {/* Direct Phone */}
              <div className="group bg-white/5 hover:bg-white/10 p-4 rounded-sm border border-white/10 transition-all flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">
                    Direct Phone Line
                  </span>
                  <a href={`tel:${businessInfo.phone}`} className="text-white font-mono text-base hover:text-gold transition-colors">
                    {businessInfo.phone}
                  </a>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="px-3 py-1.5 bg-gold/20 hover:bg-gold text-gold hover:text-white rounded-sm text-[10px] font-mono uppercase transition-all"
                >
                  {copiedPhone ? "Copied ✓" : "Copy"}
                </button>
              </div>

              {/* Studio Address */}
              <div className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">
                  Private Studio Atelier
                </span>
                <p className="text-gray-300 text-xs leading-relaxed font-mono">
                  {businessInfo.address.full}
                </p>
              </div>

              {/* Instant WhatsApp Action */}
              <a
                href={businessInfo.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between bg-emerald-800/90 hover:bg-emerald-700 text-white px-6 py-4 rounded-sm text-xs font-mono tracking-widest uppercase transition-all shadow-lg hover:shadow-emerald-900/40 group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Instant WhatsApp Private Chat</span>
                </div>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Studio Map Container with Dark Overlay */}
            <div className="h-72 rounded-sm overflow-hidden border border-gold/20 relative shadow-2xl group">
              <iframe
                src={businessInfo.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(110%)" }}
                allowFullScreen
                loading="lazy"
                title="Studio Location Map"
              />
              <div className="absolute inset-0 bg-gold/5 pointer-events-none group-hover:opacity-0 transition-opacity" />
              
              <div className="absolute bottom-3 left-3 bg-[#0E0D0C]/90 backdrop-blur-md px-3 py-1.5 border border-gold/30 rounded-sm text-[10px] font-mono text-gold uppercase tracking-wider">
                📍 Jaipur Atelier Headquarters
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
