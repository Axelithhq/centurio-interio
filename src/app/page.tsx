"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import SectionTitle from "@/components/SectionTitle";
import {
  services,
  portfolioItems,
  galleryImages,
  testimonials,
  faqs,
  designProcess,
  whyChooseUs,
  businessInfo,
} from "@/lib/data";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const icons: Record<string, React.ReactNode> = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M9 18h2M13 18h2" />
    </svg>
  ),
  arch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M2 22L12 2l10 20" />
      <path d="M6 22L12 10l6 12" />
      <path d="M10 22L12 16l2 6" />
    </svg>
  ),
  turnkey: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  luxury: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  modular: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
      <path d="M18 14l-.5 2.5L15 17l2.5.5.5 2.5.5-2.5L21 17l-2.5-.5L18 14z" />
    </svg>
  ),
  gem: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M6 2L2 8l10 12L22 8l-4-6H6z" />
      <path d="M2 8h20" />
      <path d="M12 20L7 8" />
      <path d="M12 20l5-12" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${i < rating ? "text-gold" : "text-gray-300"}`}
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const textReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function HomePage() {
  return (
    <>
      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block w-16 h-[2px] bg-gold mb-8"
          />
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-6"
          >
            Designing Spaces{" "}
            <span className="gold-text">That Inspire.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto mb-10"
          >
            Premium Interior Design & Architectural Solutions in Jaipur.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="gold-bg text-white px-8 py-3.5 rounded-sm text-sm font-medium tracking-widest uppercase hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/portfolio"
              className="border border-white/40 text-white px-8 py-3.5 rounded-sm text-sm font-medium tracking-widest uppercase hover:bg-white hover:text-charcoal transition-all duration-300"
            >
              View Portfolio
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
            >
              <motion.div className="w-1 h-2 bg-gold rounded-full mt-2" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. PORTFOLIO GRID ===== */}
      <SectionWrapper className="section-padding bg-off-white" id="portfolio">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Our Portfolio"
            subtitle="A curated selection of our finest projects, showcasing luxury and craftsmanship."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
          >
            {portfolioItems.slice(0, 4).map((item, i) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                className={`group relative overflow-hidden cursor-pointer ${
                  i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <div className="relative w-full h-[300px] sm:h-full min-h-[280px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-gold text-xs tracking-widest uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-white font-playfair text-xl mt-1">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-charcoal font-medium tracking-wide border-b-2 border-gold pb-1 hover:text-gold transition-colors duration-300"
            >
              View All Projects
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== 3. SERVICES CARDS ===== */}
      <SectionWrapper className="section-padding bg-white" id="services">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Our Services"
            subtitle="Comprehensive interior design and architectural solutions tailored to your vision."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-sm hover-luxury"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-gold mb-3">{icons[service.icon]}</div>
                  <h3 className="text-white font-playfair text-xl mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== 4. DESIGN PROCESS TIMELINE ===== */}
      <SectionWrapper className="section-padding bg-charcoal" id="design-process">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Our Design Process"
            subtitle="A meticulous journey from vision to reality, guided by expertise and passion."
            light
          />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gold/30 md:-translate-x-px" />
            <div className="space-y-12 md:space-y-20">
              {designProcess.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="hidden md:flex w-1/2" />
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                      className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-gold border-4 border-charcoal z-10 -translate-x-1/2 mt-1 flex items-center justify-center text-charcoal text-sm font-bold`}
                    >
                      {step.step}
                    </motion.div>
                    <div className={`md:w-1/2 pl-14 md:pl-0 ${isLeft ? "md:pr-14 md:text-right" : "md:pl-14"}`}>
                      <span className="text-gold text-xs tracking-widest uppercase">
                        Step {step.step}
                      </span>
                      <h3 className="text-white font-playfair text-2xl md:text-3xl mt-1">
                        {step.title}
                      </h3>
                      <p className="text-gold-light/80 text-sm mt-1">{step.subtitle}</p>
                      <p className="text-gray-400 text-sm leading-relaxed mt-3">
                        {step.description}
                      </p>
                    </div>
                    <div className={`md:w-1/2 pl-14 md:pl-0 ${isLeft ? "" : ""}`}>
                      <div className="relative h-48 md:h-56 w-full rounded-sm overflow-hidden">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== 5. BEFORE/AFTER COMPARISON ===== */}
      <SectionWrapper className="section-padding bg-off-white" id="transformations">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Transformations"
            subtitle="Witness the power of great design through our before-and-after transformations."
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            <div className="relative group overflow-hidden rounded-sm">
              <div className="absolute top-4 left-4 z-10 bg-charcoal/80 text-white px-4 py-1 text-xs tracking-widest uppercase rounded-sm">
                Before
              </div>
              <div className="relative h-80 md:h-96 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
                  alt="Before transformation"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-sm">
              <div className="absolute top-4 left-4 z-10 bg-gold text-white px-4 py-1 text-xs tracking-widest uppercase rounded-sm">
                After
              </div>
              <div className="relative h-80 md:h-96 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="After transformation"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== 6. WHY CHOOSE US ===== */}
      <SectionWrapper className="section-padding bg-white" id="why-us">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Why CENTURIO DESIGNS?"
            subtitle="What sets us apart is our unwavering commitment to excellence and client satisfaction."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {whyChooseUs.map((item) => (
              <motion.div
                key={item.title}
                variants={scaleIn}
                className="group p-8 border border-gray-100 hover:border-gold/30 rounded-sm hover-luxury bg-white"
              >
                <div className="w-14 h-14 rounded-sm bg-gold/10 flex items-center justify-center text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                  {icons[item.icon]}
                </div>
                <h3 className="font-playfair text-xl text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== 7. TESTIMONIALS ===== */}
      <SectionWrapper className="section-padding bg-charcoal" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="What Our Clients Say"
            subtitle="Hear from our clients across Jaipur and Rajasthan about their experience with us."
            light
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin"
          >
            <div className="flex gap-6 w-max">
              {testimonials.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-[340px] md:w-[400px] shrink-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-6 md:p-8 hover:border-gold/30 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">
                        {t.name}
                      </h4>
                      <p className="text-gray-400 text-xs">{t.location}</p>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={t.rating} />
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== 8. GALLERY ===== */}
      <SectionWrapper className="section-padding bg-off-white" id="gallery">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Our Gallery"
            subtitle="A visual journey through our finest interior design and architectural projects."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            {galleryImages.slice(0, 6).map((img) => (
              <motion.div
                key={img.id}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-sm cursor-pointer"
              >
                <div className="relative h-48 md:h-64 w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-3">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gold">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                    <p className="text-white text-sm font-medium">{img.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-charcoal font-medium tracking-wide border-b-2 border-gold pb-1 hover:text-gold transition-colors duration-300"
            >
              View Full Gallery
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== 9. FAQ ===== */}
      <SectionWrapper className="section-padding bg-white" id="faq">
        <div className="max-w-3xl mx-auto">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about working with CENTURIO DESIGNS."
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== 10. CONTACT FORM ===== */}
      <SectionWrapper className="section-padding bg-off-white" id="contact">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Let's Create Something Beautiful"
            subtitle="Ready to transform your space? Get in touch with us for a free consultation."
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
          >
            <div className="bg-white p-8 md:p-10 shadow-sm border border-gray-100 rounded-sm">
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gold transition-colors duration-300 bg-off-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gold transition-colors duration-300 bg-off-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gold transition-colors duration-300 bg-off-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gold transition-colors duration-300 bg-off-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="gold-bg text-white px-8 py-3.5 rounded-sm text-sm font-medium tracking-widest uppercase w-full hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="flex flex-col justify-center space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-playfair text-lg text-charcoal mb-1">
                    Phone
                  </h4>
                  <a
                    href={`tel:${businessInfo.phone}`}
                    className="text-gray-600 text-sm hover:text-gold transition-colors"
                  >
                    {businessInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-playfair text-lg text-charcoal mb-1">
                    Email
                  </h4>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="text-gray-600 text-sm hover:text-gold transition-colors"
                  >
                    {businessInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-playfair text-lg text-charcoal mb-1">
                    Address
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {businessInfo.address.line1},{" "}
                    {businessInfo.address.line2},{" "}
                    {businessInfo.address.city},{" "}
                    {businessInfo.address.state}
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <a
                  href={businessInfo.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 gold-bg text-white px-6 py-3 rounded-sm text-sm font-medium tracking-wide hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== 11. GOOGLE MAP ===== */}
      <SectionWrapper className="w-full">
        <iframe
          src={businessInfo.mapSrc}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="CENTURIO DESIGNS - Jaipur Location"
        />
      </SectionWrapper>

      {/* ===== 12. CTA BANNER ===== */}
      <section className="relative bg-charcoal py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white mb-6"
          >
            Ready to Transform{" "}
            <span className="gold-text">Your Space?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto"
          >
            Let's bring your vision to life. Schedule a free consultation with
            our expert team today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="gold-bg text-white px-10 py-4 rounded-sm text-sm font-medium tracking-widest uppercase inline-block hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
            >
              Get Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border border-gray-200 rounded-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-off-white transition-colors duration-300"
      >
        <span className="font-playfair text-base md:text-lg text-charcoal pr-4">
          {question}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5 text-gold shrink-0"
        >
          <path d="M12 5v14M5 12h14" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
