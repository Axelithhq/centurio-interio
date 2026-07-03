"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import SectionTitle from "@/components/SectionTitle";
import PageHeader from "@/components/PageHeader";
import { testimonials } from "@/lib/data";

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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < rating ? "#C8A96A" : "#E5E7EB"}
          className="w-4 h-4"
        >
          <path d="M10 1l2.39 4.84L17.6 6.7l-3.8 3.7.9 5.24L10 13.2l-4.7 2.44.9-5.24-3.8-3.7 5.21-.86L10 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const avgRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="Testimonials"
        subtitle="Hear From Our Happy Clients"
      />

      {/* ===== 2. GOOGLE REVIEW STYLE CARDS ===== */}
      <SectionWrapper className="section-padding bg-off-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="What Our Clients Say"
            subtitle="Real feedback from real clients across Rajasthan."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeUp}
                className="bg-white border border-gray-100 rounded-sm p-6 md:p-8 hover-luxury shadow-sm hover:shadow-lg transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h3 className="font-playfair text-base text-charcoal">
                      {t.name}
                    </h3>
                    <p className="text-gray-500 text-xs">{t.location}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <StarRating rating={t.rating} />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="text-gold text-lg leading-none">&ldquo;</span>
                  {t.text}
                  <span className="text-gold text-lg leading-none">&rdquo;</span>
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== 3. REVIEW STATS ===== */}
      <SectionWrapper className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            <motion.div variants={fadeUp} className="text-center">
              <span className="block font-playfair text-4xl md:text-5xl lg:text-6xl gold-text mb-2">
                {avgRating.toFixed(1)}
              </span>
              <div className="flex justify-center gap-1 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 20 20"
                    fill={i < Math.round(avgRating) ? "#C8A96A" : "#4A4A4A"}
                    className="w-5 h-5"
                  >
                    <path d="M10 1l2.39 4.84L17.6 6.7l-3.8 3.7.9 5.24L10 13.2l-4.7 2.44.9-5.24-3.8-3.7 5.21-.86L10 1z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-400 text-sm tracking-wide uppercase">
                Average Rating
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="text-center">
              <span className="block font-playfair text-4xl md:text-5xl lg:text-6xl gold-text mb-2">
                {testimonials.length}
              </span>
              <span className="text-gray-400 text-sm tracking-wide uppercase">
                Total Reviews
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="text-center">
              <span className="block font-playfair text-4xl md:text-5xl lg:text-6xl gold-text mb-2">
                50+
              </span>
              <span className="text-gray-400 text-sm tracking-wide uppercase">
                Happy Clients
              </span>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== 4. CTA SECTION ===== */}
      <section className="relative bg-charcoal py-20 md:py-28 overflow-hidden border-t border-gold/10">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white mb-6"
          >
            Share{" "}
            <span className="gold-text">Your Experience</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto"
          >
            Your feedback inspires us to keep creating beautiful spaces. We'd
            love to hear about your Centurio experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="gold-bg text-white px-10 py-4 rounded-sm text-sm font-medium tracking-widest uppercase inline-block hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
            >
              Leave a Review
            </Link>
            <Link
              href="/contact"
              className="border border-gold/40 text-gold px-10 py-4 rounded-sm text-sm font-medium tracking-widest uppercase inline-block hover:bg-gold hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
