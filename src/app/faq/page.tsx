"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import SectionTitle from "@/components/SectionTitle";
import PageHeader from "@/components/PageHeader";
import { faqs, businessInfo } from "@/lib/data";

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Everything You Need to Know Before Getting Started"
      />

      {/* ===== 2. FAQ ACCORDION ===== */}
      <SectionWrapper className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionTitle
            title="FAQs"
            subtitle="Find answers to common questions about our services and process."
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openId === i;
              return (
                <div
                  key={i}
                  className={`border-l-2 transition-all duration-500 ${
                    isOpen
                      ? "border-gold bg-off-white"
                      : "border-transparent bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between text-left px-6 md:px-8 py-5 md:py-6 gap-4"
                  >
                    <span
                      className={`font-playfair text-base md:text-lg transition-colors duration-300 ${
                        isOpen ? "gold-text" : "text-charcoal"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "text-gold rotate-45"
                          : "text-gray-400 rotate-0"
                      }`}
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-5 md:pb-6">
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== 3. STILL HAVE QUESTIONS? ===== */}
      <section className="bg-charcoal py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
            <span className="text-gold text-xs tracking-[0.2em] uppercase font-medium">
              Get in Touch
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-white mt-3 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
              We're here to help. Reach out to us anytime.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-14 h-14 mx-auto rounded-sm bg-gold/10 flex items-center justify-center text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h3 className="font-playfair text-white text-lg mb-2">Phone</h3>
              <a
                href={`tel:${businessInfo.phone}`}
                className="text-gray-400 hover:text-gold transition-colors text-sm"
              >
                {businessInfo.phoneDisplay}
              </a>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 mx-auto rounded-sm bg-gold/10 flex items-center justify-center text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="font-playfair text-white text-lg mb-2">Email</h3>
              <a
                href={`mailto:${businessInfo.email}`}
                className="text-gray-400 hover:text-gold transition-colors text-sm"
              >
                {businessInfo.email}
              </a>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 mx-auto rounded-sm bg-gold/10 flex items-center justify-center text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="font-playfair text-white text-lg mb-2">Address</h3>
              <p className="text-gray-400 text-sm">
                {businessInfo.address.line1}
                <br />
                {businessInfo.address.line2}, {businessInfo.address.city}
              </p>
            </div>
          </div>
          <div className="text-center mt-12 md:mt-14">
            <Link
              href="/contact"
              className="gold-bg text-white px-10 py-4 rounded-sm text-sm font-medium tracking-widest uppercase inline-block hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
