"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import SectionTitle from "@/components/SectionTitle";
import PageHeader from "@/components/PageHeader";
import { services } from "@/lib/data";

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

const whyIcons: Record<string, React.ReactNode> = {
  bespoke: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
      <path d="M9 9l6-3M9 15l6 3" />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

const whyChooseItems = [
  {
    icon: "bespoke",
    title: "Bespoke Designs",
    description: "Every project uniquely crafted to reflect your personality and lifestyle—no templates, no repetition.",
  },
  {
    icon: "quality",
    title: "Premium Quality",
    description: "Finest materials and finishes sourced globally, ensuring enduring quality and timeless elegance.",
  },
  {
    icon: "delivery",
    title: "Timely Delivery",
    description: "We respect your time with strict project timelines and transparent communication throughout the process.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive Interior Design & Architecture Solutions"
      />

      {/* ===== 2. SERVICES GRID ===== */}
      <SectionWrapper className="section-padding bg-off-white" id="services-grid">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="What We Offer"
            subtitle="From concept to completion, we deliver exceptional design solutions across every domain."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-sm cursor-pointer"
              >
                <div className="relative h-72 md:h-80 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent transition-all duration-500 group-hover:from-charcoal/95" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-all duration-500 group-hover:mb-2">
                  <h3 className="text-white font-playfair text-xl md:text-2xl mb-3 transition-all duration-500 group-hover:-translate-y-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="w-0 h-[2px] bg-gold transition-all duration-500 group-hover:w-16" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== 3. WHY CHOOSE US ===== */}
      <SectionWrapper className="section-padding bg-white" id="why-choose-us">
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {whyChooseItems.map((item) => (
              <motion.div
                key={item.title}
                variants={scaleIn}
                className="group p-8 md:p-10 bg-off-white border border-gray-100 hover:border-gold/30 rounded-sm hover-luxury text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-sm bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                  {whyIcons[item.icon]}
                </div>
                <h3 className="font-playfair text-xl md:text-2xl text-charcoal mb-4">
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

      {/* ===== 4. CTA SECTION ===== */}
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
            Ready to Start{" "}
            <span className="gold-text">Your Project?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto"
          >
            Let's bring your vision to life. Schedule a free consultation with our expert team today.
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
