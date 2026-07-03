"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import SectionTitle from "@/components/SectionTitle";
import PageHeader from "@/components/PageHeader";
import { designProcess } from "@/lib/data";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

function TimelineProgress() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-px"
    >
      <motion.div
        initial={{ height: 0 }}
        animate={isInView ? { height: "100%" } : { height: 0 }}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        className="w-full bg-gold"
      />
    </div>
  );
}

const features = [
  {
    title: "Personalized Approach",
    description:
      "Every project is uniquely tailored to your vision, lifestyle, and budget. We believe no two spaces — or clients — are alike, and your design should reflect that.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Transparent Communication",
    description:
      "We keep you informed at every stage with regular updates, open channels, and clear timelines. No surprises — just honest collaboration from start to finish.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: "Quality Guaranteed",
    description:
      "We source only the finest materials and work with skilled craftsmen to ensure every detail meets our exacting standards — delivering timeless elegance that endures.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function DesignProcessPage() {
  return (
    <>
      <PageHeader
        title="Our Design Process"
        subtitle="From Vision to Reality — A Journey of Creative Excellence"
      />

      <SectionWrapper className="section-padding bg-charcoal" id="timeline">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="How We Bring Your Vision to Life"
            subtitle="A meticulous journey from concept to completion, guided by expertise and passion."
            light
          />
          <div className="relative">
            <TimelineProgress />
            <div className="space-y-16 md:space-y-24">
              {designProcess.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.15 }}
                    className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="hidden md:block md:w-1/2" />
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                      className={`absolute left-4 md:left-1/2 w-10 h-10 rounded-full border-2 border-gold bg-charcoal z-10 -translate-x-1/2 mt-2 flex items-center justify-center text-gold text-sm font-bold`}
                    >
                      {step.step}
                    </motion.div>
                    <div
                      className={`md:w-1/2 pl-16 md:pl-0 ${
                        isLeft ? "md:pr-16 md:text-right" : "md:pl-16"
                      }`}
                    >
                      <motion.span
                        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.15 + 0.1 }}
                        className="text-gold text-xs tracking-[0.2em] uppercase"
                      >
                        Step {step.step}
                      </motion.span>
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 + 0.2 }}
                        className="text-white font-playfair text-2xl md:text-3xl mt-2"
                      >
                        {step.title}
                      </motion.h3>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 40 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
                        className={`h-[2px] bg-gold mt-3 mb-3 ${
                          isLeft ? "md:ml-auto" : ""
                        }`}
                      />
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.15 + 0.35 }}
                        className="text-gold-light/70 text-sm font-medium"
                      >
                        {step.subtitle}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 + 0.45 }}
                        className="text-gray-400 text-sm leading-relaxed mt-3 max-w-md"
                      >
                        {step.description}
                      </motion.p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.15 + 0.2 }}
                      className={`md:w-1/2 pl-16 md:pl-0 w-full ${
                        isLeft ? "" : "md:flex md:justify-end"
                      }`}
                    >
                      <div className="relative h-52 md:h-64 w-full max-w-lg rounded-sm overflow-hidden border border-white/5 group">
                        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                        <div className="absolute top-0 left-0 w-[3px] h-0 bg-gold group-hover:h-full transition-all duration-700 z-10" />
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-padding bg-off-white" id="features">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Why Work With Us?"
            subtitle="We combine creativity with commitment to deliver exceptional design experiences."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="group p-8 md:p-10 bg-white border border-gray-100 rounded-sm hover:border-gold/30 hover-luxury"
              >
                <div className="w-14 h-14 rounded-sm bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="font-playfair text-xl text-charcoal mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

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
            Ready to Begin{" "}
            <span className="gold-text">Your Journey?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto"
          >
            Let's bring your dream space to life. From the first conversation to
            the final reveal, we're with you every step of the way.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="gold-bg text-white px-10 py-4 rounded-sm text-sm font-medium tracking-widest uppercase inline-block hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
            >
              Start Your Project
            </Link>
            <Link
              href="/portfolio"
              className="border border-white/30 text-white px-10 py-4 rounded-sm text-sm font-medium tracking-widest uppercase hover:bg-white hover:text-charcoal transition-all duration-300"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
