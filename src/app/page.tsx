"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Lightweight components — loaded eagerly
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal3D from "@/components/ScrollReveal3D";
import TiltCard from "@/components/TiltCard";

// Heavy components — loaded on demand
const SmoothScrollWrapper = dynamic(() => import("@/components/SmoothScrollWrapper"), { ssr: false });
const CursorSpotlight = dynamic(() => import("@/components/CursorSpotlight"), { ssr: false });
const HeroScrollCanvas = dynamic(() => import("@/components/HeroScrollCanvas"), { ssr: false });
const Background3D = dynamic(() => import("@/components/Background3D"), { ssr: false });
const Room360Inspector = dynamic(() => import("@/components/Room360Inspector"), { ssr: false, loading: () => <div className="h-screen bg-charcoal" /> });
const BeforeAfterSlider = dynamic(() => import("@/components/BeforeAfterSlider"), { ssr: false });
const LayoutGallery = dynamic(() => import("@/components/LayoutGallery"), { ssr: false });
const ProcessTimeline = dynamic(() => import("@/components/ProcessTimeline"), { ssr: false });
const HorizontalGallery = dynamic(() => import("@/components/HorizontalGallery"), { ssr: false });
const StatsCounter = dynamic(() => import("@/components/StatsCounter"), { ssr: false });
const MouseParallax3D = dynamic(() => import("@/components/MouseParallax3D"), { ssr: false });

import {
  businessInfo,
  services,
  testimonials,
  faqs,
  materialSwatches,
} from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

function SectionSkeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-charcoal/5 ${className}`} />;
}

export default function HomePage() {
  const [activeMaterial, setActiveMaterial] = useState(materialSwatches[0]);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <SmoothScrollWrapper>
      <div className="relative bg-luxury-dark text-charcoal selection:bg-gold selection:text-white min-h-screen">
        <Background3D />
        <CursorSpotlight />
        <Navbar />

        <HeroScrollCanvas />

        <div className="relative z-[1]">

        {/* 2. ABOUT */}
        <section id="about" className="relative py-24 md:py-32 bg-luxury-light text-charcoal overflow-hidden">
          <div className="ambient-orb ambient-orb-gold w-[500px] h-[500px] -top-40 -right-40 animate-orb-float" />
          <div className="ambient-orb ambient-orb-warm w-[400px] h-[400px] bottom-20 -left-32 animate-orb-float-2" />
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-6"
              >
                <motion.span variants={fadeUp} className="text-gold text-xs font-mono tracking-widest uppercase block">
                  01 // Design Philosophy
                </motion.span>
                <motion.h2 variants={fadeUp} className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl leading-tight" style={{ textShadow: "0 2px 20px rgba(200,169,106,0.1)" }}>
                  Restraint, Material Authenticity &amp; <span className="gold-text">Timeless Form.</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                  At CENTURIO INTERIOR STUDIO, we view interior architecture not merely as decoration, but as spatial choreography. Every wall line, shadow gap, and light beam is tuned to evoke serenity.
                </motion.p>
                <motion.p variants={fadeUp} className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                  We balance raw organic textures—bookmatched Italian marble, wire-brushed white oak, and brushed champagne metals—with razor-sharp modern precision.
                </motion.p>
                <motion.div variants={fadeUp} className="pt-6 border-t border-gray-200">
                  <span className="text-xs font-mono uppercase text-gray-500 block mb-3">Curated Material Palette Lab:</span>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {materialSwatches.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setActiveMaterial(m)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-all duration-300 border ${
                          activeMaterial.id === m.id
                            ? "border-gold bg-sand text-charcoal font-medium shadow-sm"
                            : "border-gray-200 text-gray-500 hover:border-gold/40"
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                  <div className="p-4 glass-card rounded-sm border border-gold/30 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-sm overflow-hidden shrink-0 border border-gold/40">
                      <Image src={activeMaterial.image} alt={activeMaterial.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif-luxury text-lg font-semibold">{activeMaterial.name}</h4>
                      <span className="text-[11px] font-mono text-gold block mb-1">{activeMaterial.type}</span>
                      <p className="text-gray-500 text-xs">{activeMaterial.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative perspective-1000"
              >
                <div className="relative h-[480px] sm:h-[580px] w-full rounded-sm overflow-hidden shadow-2xl border border-gold/20 hover-3d">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80"
                    alt="Luxury Interior Architecture"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-6 glass-dark text-white rounded-sm border border-white/10">
                    <span className="text-gold text-xs font-mono uppercase tracking-widest block mb-1">PROJECT // SOLARIUM VILLA</span>
                    <h3 className="font-serif-luxury text-xl">Integrated Architectural Lighting &amp; Travertine Walls</h3>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-charcoal text-white p-6 rounded-sm shadow-2xl border border-gold/30 hidden md:block max-w-xs">
                  <span className="text-gold text-3xl font-serif-luxury block mb-1">14+</span>
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-300 block">Years of Architectural Mastery &amp; Heritage</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. SERVICES */}
        <section id="services" className="relative py-24 bg-luxury-sand text-charcoal overflow-hidden">
          <div className="ambient-orb ambient-orb-gold w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orb-float" />
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-gold text-xs font-mono tracking-widest uppercase block mb-2">02 // Our Services Suite</span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl">Bespoke Architectural <span className="gold-text">&amp; Interior Offerings.</span></h2>
              <p className="text-gray-600 text-sm md:text-base font-light mt-4">From luxury residential estates to high-end corporate flagships, we deliver uncompromised spatial design.</p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service, i) => (
                <ScrollReveal3D key={service.id} delay={i * 100} direction="up">
                  <TiltCard tiltAmount={8} depth={15}>
                    <motion.div variants={fadeUp} className="group relative bg-ivory rounded-sm overflow-hidden border border-gray-200/60 hover:border-gold/50 hover-3d-lift shimmer-line">
                      <div className="relative h-60 w-full overflow-hidden">
                        <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                        <span className="absolute top-4 left-4 bg-gold text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-sm">{service.tag}</span>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif-luxury text-2xl text-charcoal mb-2 group-hover:text-gold transition-colors">{service.title}</h3>
                        <p className="text-gray-600 text-xs leading-relaxed font-light mb-4">{service.description}</p>
                        <div className="border-t border-gray-100 pt-4 space-y-1.5">
                          {service.features.map((feat, fi) => (
                            <div key={fi} className="flex items-center gap-2 text-[11px] font-mono text-gray-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                        <a href="#contact" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold mt-6 hover:translate-x-1 transition-transform">
                          <span>Inquire Service</span><span>→</span>
                        </a>
                      </div>
                    </motion.div>
                  </TiltCard>
                </ScrollReveal3D>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. PORTFOLIO */}
        <Suspense fallback={<SectionSkeleton className="h-[600px] bg-charcoal" />}>
          <section id="portfolio" className="relative">
            <HorizontalGallery />
          </section>
        </Suspense>

        {/* 5. 360 INSPECTOR */}
        <Suspense fallback={<div className="h-screen bg-charcoal" />}>
          <section id="inspector" className="relative">
            <Room360Inspector />
          </section>
        </Suspense>

        {/* 6. BEFORE & AFTER */}
        <Suspense fallback={<SectionSkeleton className="h-[600px] bg-luxury-mid" />}>
          <section id="transformations" className="relative py-24 bg-luxury-mid overflow-hidden">
            <div className="ambient-orb ambient-orb-warm w-[400px] h-[400px] top-10 right-20 animate-orb-float-2" />
            <BeforeAfterSlider />
          </section>
        </Suspense>

        {/* 7. PROCESS TIMELINE */}
        <Suspense fallback={<SectionSkeleton className="h-[800px] bg-luxury-dark" />}>
          <section id="process" className="relative py-24 md:py-32 bg-luxury-dark text-white overflow-hidden">
            <div className="ambient-orb ambient-orb-gold w-[500px] h-[500px] top-20 -right-40 animate-orb-float" />
            <div className="ambient-orb ambient-orb-gold w-[300px] h-[300px] bottom-20 -left-20 animate-orb-float-2" />
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="text-gold text-xs font-mono tracking-widest uppercase block mb-2">03 // Execution Methodology</span>
                <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white">Our Architectural <span className="gold-text">Design Process</span></h2>
                <p className="text-gray-400 text-sm font-light mt-4">A structured journey from conceptual discovery to turnkey presentation.</p>
              </div>
              <ProcessTimeline />
            </div>
          </section>
        </Suspense>

        {/* 8. STATS */}
        <Suspense fallback={<SectionSkeleton className="h-[200px] bg-luxury-sand" />}>
          <section id="stats" className="bg-luxury-sand border-y border-gold/20 relative overflow-hidden">
            <div className="ambient-orb ambient-orb-gold w-[300px] h-[300px] top-0 left-1/4 animate-orb-float" />
            <StatsCounter />
          </section>
        </Suspense>

        {/* 9. TESTIMONIALS */}
        <section id="testimonials" className="relative py-24 bg-luxury-dark text-white overflow-hidden">
          <div className="ambient-orb ambient-orb-gold w-[400px] h-[400px] top-10 right-10 animate-orb-float" />
          <div className="ambient-orb ambient-orb-warm w-[300px] h-[300px] bottom-10 left-20 animate-orb-float-2" />
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-gold text-xs font-mono tracking-widest uppercase block mb-2">04 // Client Reverence</span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl">What Our <span className="gold-text">Patrons Express</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <ScrollReveal3D key={t.id} delay={i * 120} direction="rotate">
                  <TiltCard tiltAmount={10} depth={25}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="glass-dark p-8 rounded-sm border border-white/10 flex flex-col justify-between hover:border-gold/40 transition-colors"
                    >
                      <p className="text-gray-300 text-sm font-light leading-relaxed italic mb-8">&ldquo;{t.text}&rdquo;</p>
                      <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gold/40">
                          <Image src={t.image} alt={t.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-serif-luxury text-white text-base font-semibold">{t.name}</h4>
                          <span className="text-gold text-[11px] font-mono block">{t.role} • {t.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  </TiltCard>
                </ScrollReveal3D>
              ))}
            </div>
          </div>
        </section>

        {/* 10. GALLERY */}
        <Suspense fallback={<SectionSkeleton className="h-[600px] bg-luxury-light" />}>
          <section id="materials" className="relative py-24 bg-luxury-light overflow-hidden">
            <div className="ambient-orb ambient-orb-gold w-[400px] h-[400px] -top-20 left-1/3 animate-orb-float-2" />
            <div className="relative z-10">
              <LayoutGallery />
            </div>
          </section>
        </Suspense>

        {/* 11. FAQ */}
        <section id="faq" className="relative py-24 bg-luxury-sand text-charcoal overflow-hidden">
          <div className="ambient-orb ambient-orb-warm w-[350px] h-[350px] top-10 right-10 animate-orb-float" />
          <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="text-gold text-xs font-mono tracking-widest uppercase block mb-2">Questions &amp; Guidance</span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl">Frequently Asked <span className="gold-text">Queries</span></h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <ScrollReveal3D key={i} delay={i * 80} direction="left">
                  <div className="glass-luxury border border-gold/10 rounded-sm overflow-hidden hover-3d-lift">
                    <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between font-serif-luxury text-xl font-semibold">
                      <span>{faq.q}</span>
                      <span className="text-gold text-2xl">{faqOpen === i ? "−" : "+"}</span>
                    </button>
                    {faqOpen === i && (
                      <div className="px-6 pb-6 text-gray-600 text-xs md:text-sm font-light leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
                    )}
                  </div>
                </ScrollReveal3D>
              ))}
            </div>
          </div>
        </section>

        {/* 12. CONTACT */}
        <section id="contact" className="relative py-24 md:py-32 bg-luxury-dark text-white overflow-hidden">
          <div className="ambient-orb ambient-orb-gold w-[500px] h-[500px] top-1/3 -left-40 animate-orb-float" />
          <div className="ambient-orb ambient-orb-gold w-[300px] h-[300px] bottom-10 right-20 animate-orb-float-2" />
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <MouseParallax3D intensity={6} perspective={1200}>
                <div>
                  <span className="text-gold text-xs font-mono tracking-widest uppercase block mb-2">06 // Private Engagement</span>
                  <h2 className="font-serif-luxury text-3xl sm:text-5xl mb-6">Commission Your <span className="gold-text">Sanctuary.</span></h2>
                  <p className="text-gray-400 text-sm font-light mb-8 leading-relaxed">Request a private consultation with our principal architects. We accept a limited number of commissions annually to preserve exacting detail.</p>
                  {formSubmitted ? (
                    <div className="p-8 glass-dark rounded-sm border border-gold text-center">
                      <span className="text-gold text-3xl font-serif-luxury block mb-2">Inquiry Received</span>
                      <p className="text-gray-300 text-xs font-mono">Our studio concierge will reach out within 24 hours to schedule your private design session.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" required placeholder="Your Full Name *" className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors" />
                        <input type="email" required placeholder="Email Address *" className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="tel" required placeholder="Phone Number *" className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors" />
                        <select className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-sm text-xs text-gray-300 focus:outline-none focus:border-gold transition-colors">
                          <option value="residential" className="bg-charcoal text-white">Residential Villa</option>
                          <option value="commercial" className="bg-charcoal text-white">Commercial Suite</option>
                          <option value="renovation" className="bg-charcoal text-white">Architecture Renovation</option>
                          <option value="consultation" className="bg-charcoal text-white">Material Consultation</option>
                        </select>
                      </div>
                      <textarea rows={4} placeholder="Project Details (Location, Estimated Sq. Ft, Vision)..." className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors resize-none" />
                      <button type="submit" className="w-full gold-bg text-white py-4 rounded-sm text-xs font-mono tracking-widest uppercase hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300">Submit Consultation Request</button>
                    </form>
                  )}
                </div>
              </MouseParallax3D>

              <div className="flex flex-col justify-between space-y-8">
                <div className="glass-dark p-8 rounded-sm border border-white/10 space-y-6">
                  <h3 className="font-serif-luxury text-2xl text-gold">Studio Concierge</h3>
                  <div>
                    <span className="text-[11px] font-mono text-gray-500 uppercase block mb-1">Direct Phone</span>
                    <a href={`tel:${businessInfo.phone}`} className="text-white text-lg hover:text-gold transition-colors">{businessInfo.phone}</a>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-gray-500 uppercase block mb-1">Studio Address</span>
                    <p className="text-gray-300 text-xs leading-relaxed font-mono">{businessInfo.address.full}</p>
                  </div>
                  <div className="pt-2">
                    <a href={businessInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-emerald-700/80 hover:bg-emerald-600 text-white px-6 py-3 rounded-sm text-xs font-mono tracking-widest uppercase transition-all">
                      <span>Instant WhatsApp Chat</span><span>→</span>
                    </a>
                  </div>
                </div>
                <div className="h-64 rounded-sm overflow-hidden border border-white/10">
                  <iframe src={businessInfo.mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Studio Map" />
                </div>
              </div>
            </div>
          </div>
        </section>

        </div>

        <Footer />
      </div>
    </SmoothScrollWrapper>
  );
}
