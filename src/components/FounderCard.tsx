"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FounderCard() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [cardSide, setCardSide] = useState<"front" | "back">("front");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rY = ((mouseX - width / 2) / (width / 2)) * 12; // max 12 deg tilt
    const rX = -((mouseY - height / 2) / (height / 2)) * 12;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <section className="py-24 bg-[#0B0A09] text-white relative overflow-hidden">
      {/* Background Orbs & Radial Laser Spot */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.06] pointer-events-none" />
      <div className="ambient-orb ambient-orb-gold w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orb-float opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span>Architectural Leadership</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-normal tracking-tight mb-4">
            Studio Founder &amp; <span className="gold-text italic font-serif">Principal Architect</span>
          </h2>
          <p className="text-gray-400 text-sm font-light leading-relaxed max-w-xl mx-auto">
            Interactive executive business card of our founder and CEO. Tilt or flip to inspect direct concierge credentials.
          </p>
        </motion.div>

        {/* Card Controls & Flip Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#141210] p-1.5 rounded-full border border-gold/30 shadow-xl">
            <button
              onClick={() => setCardSide("front")}
              className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                cardSide === "front"
                  ? "gold-bg text-white font-bold shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Executive Card (Front)
            </button>
            <button
              onClick={() => setCardSide("back")}
              className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                cardSide === "back"
                  ? "gold-bg text-white font-bold shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Studio Monogram (Back)
            </button>
          </div>
        </div>

        {/* 3D PERSPECTIVE BUSINESS CARD CONTAINER */}
        <div className="perspective-1000 flex justify-center py-4">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            animate={{
              rotateX: rotateX,
              rotateY: rotateY,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-full max-w-4xl rounded-xl overflow-hidden border transition-all duration-500 relative shadow-[0_30px_70px_rgba(0,0,0,0.85)] cursor-pointer ${
              isHovered ? "border-gold shadow-[0_35px_90px_rgba(197,160,89,0.3)]" : "border-gold/30"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Dynamic Gold Laser Edge Reflection */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
              style={{
                background: `radial-gradient(circle at ${isHovered ? "50% 50%" : "0% 0%"}, rgba(197,160,89,0.15), transparent 70%)`,
              }}
            />

            {cardSide === "front" ? (
              /* ===== FRONT BUSINESS CARD DESIGN (EXACT MATCH TO ATTACHED IMAGE + FOUNDER PHOTO) ===== */
              <div className="relative min-h-[440px] flex flex-col justify-between overflow-hidden">
                
                {/* TOP HALF: LIGHT SAND / CREAM BACKGROUND (#EBE7E1) */}
                <div className="bg-[#EAE5DF] text-[#1E2228] p-8 sm:p-10 md:p-12 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 min-h-[220px]">
                  
                  {/* Founder Title Details */}
                  <div className="space-y-2 z-10 max-w-md">
                    <span className="text-gold font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold block">
                      FOUNDER &amp; CHIEF EXECUTIVE
                    </span>
                    <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#181C22] tracking-wide font-medium uppercase leading-tight">
                      WASIM AKRAM
                    </h3>
                    <p className="text-[#555C66] text-xs sm:text-sm font-sans tracking-wide font-light">
                      CEO &amp; Senior Interior Designer
                    </p>
                  </div>

                  {/* Founder Portrait Photo Frame */}
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-lg overflow-hidden border-2 border-[#1E2228]/20 shadow-2xl shrink-0 z-10 group-hover:border-gold transition-colors">
                    <Image
                      src="/founder.png"
                      alt="Wasim Akram - Founder & CEO"
                      fill
                      className="object-cover object-top transition-transform duration-700 hover:scale-110"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181C22]/40 to-transparent pointer-events-none" />
                  </div>

                </div>

                {/* BOTTOM HALF: DARK CHARCOAL BACKGROUND (#181C24) WITH WHITE TEXT */}
                <div className="bg-[#16191E] text-white p-8 sm:p-10 md:p-12 relative flex flex-col justify-between min-h-[220px] border-t border-[#2A303A]">
                  
                  {/* WHITE NAME IN THE DOWN PLACE (USER SPECIFIC REQUEST) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 z-10 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-gold text-lg">✦</span>
                      <div>
                        <h4 className="font-serif-luxury text-2xl sm:text-3xl text-white font-medium tracking-wider uppercase">
                          WASIM AKRAM
                        </h4>
                        <span className="text-gray-400 text-[10px] font-mono tracking-widest uppercase block">
                          Architectural Design Governance • Jaipur Atelier
                        </span>
                      </div>
                    </div>

                    {copiedItem && (
                      <span className="bg-gold text-white text-[11px] font-mono px-3 py-1 rounded-sm shadow-md animate-bounce">
                        ✓ {copiedItem} Copied!
                      </span>
                    )}
                  </div>

                  {/* CONTACT & SOCIAL GRID (MATCHING IMAGE LAYOUT) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono relative z-10">
                    
                    {/* Left Items: Instagram, Web, Email */}
                    <div className="space-y-3">
                      <button
                        onClick={() => copyToClipboard("@centurio.in", "Instagram")}
                        className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors text-left group w-full"
                      >
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gold text-xs shrink-0 group-hover:bg-gold group-hover:text-white transition-all">📷</span>
                        <span className="tracking-wider">@centurio.in</span>
                      </button>

                      <a
                        href="https://www.centuriodesigns.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors text-left group w-full"
                      >
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gold text-xs shrink-0 group-hover:bg-gold group-hover:text-white transition-all">🌐</span>
                        <span className="tracking-wider">www.centuriodesigns.com</span>
                      </a>

                      <button
                        onClick={() => copyToClipboard("info@centuriodesigns.com", "Email")}
                        className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors text-left group w-full"
                      >
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gold text-xs shrink-0 group-hover:bg-gold group-hover:text-white transition-all">✉️</span>
                        <span className="tracking-wider">info@centuriodesigns.com</span>
                      </button>
                    </div>

                    {/* Right Items: Phone, Address */}
                    <div className="space-y-3">
                      <button
                        onClick={() => copyToClipboard("+91-9929484849", "Phone")}
                        className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors text-left group w-full"
                      >
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gold text-xs shrink-0 group-hover:bg-gold group-hover:text-white transition-all">📞</span>
                        <span className="text-sm font-semibold text-white group-hover:text-gold tracking-wider">+91-9929484849</span>
                      </button>

                      <div className="flex items-start gap-3 text-gray-300">
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gold text-xs shrink-0 mt-0.5">📍</span>
                        <span className="leading-relaxed text-gray-300">
                          A-3 Deepak Marg, Adarsh Nagar, Jaipur
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* OVERLAY GEOMETRIC EMBLEM WATERMARK (RIGHT SIDE OF CARD OVERLAPPING SPLIT) */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 pointer-events-none opacity-20 z-0">
                  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold">
                    <path d="M100 20C144.183 20 180 55.8172 180 100C180 144.183 144.183 180 100 180" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                    <path d="M100 45C130.376 45 155 69.6243 155 100C155 130.376 130.376 155 100 155" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
                    <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="8"/>
                    <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="8"/>
                  </svg>
                </div>

              </div>
            ) : (
              /* ===== BACK BUSINESS CARD DESIGN (ARCHITECTURAL MONOGRAM & DIRECT QR CONCIERGE) ===== */
              <div className="bg-[#14171C] text-white p-10 md:p-14 min-h-[440px] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

                <div className="flex items-center justify-between z-10 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-gold text-xs font-mono tracking-widest uppercase">CENTURIO DESIGNS</span>
                    <h3 className="font-serif-luxury text-2xl text-white mt-1">Jaipur Atelier Headquarters</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold font-serif font-bold text-xl">
                    C
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-6 z-10">
                  <div className="space-y-4">
                    <span className="text-gold text-xs font-mono uppercase block">EXECUTIVE DIRECT CHANNEL</span>
                    <h4 className="font-serif-luxury text-3xl text-white">Wasim Akram</h4>
                    <p className="text-gray-400 text-xs leading-relaxed font-light">
                      Chief Executive Officer &amp; Principal Designer governing minimal luxury architectural commissions across Rajasthan &amp; Pan-India.
                    </p>
                    <div className="pt-2">
                      <a
                        href="https://wa.me/919929484849"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 gold-bg text-white px-6 py-3 rounded-sm text-xs font-mono uppercase tracking-widest hover:shadow-xl transition-all"
                      >
                        <span>Direct WhatsApp Line</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-white/5 border border-gold/30 p-6 rounded-sm text-center">
                    <div className="w-36 h-36 bg-white p-2.5 rounded-sm mb-3 shadow-2xl relative">
                      {/* REAL SCANNABLE QR CODE FOR WHATSAPP CONCIERGE & VCARD */}
                      <Image
                        src="/founder_qr.png"
                        alt="Scannable QR Code for Wasim Akram WhatsApp Concierge"
                        width={144}
                        height={144}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                    <span className="text-[10px] font-mono text-gold uppercase tracking-widest font-semibold block">
                      ✦ Scan to Chat with Wasim Akram
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 z-10 border-t border-white/10 pt-4">
                  <span>CENTURIO REGISTERED ATELIER</span>
                  <span>TEL: +91-9929484849</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
