"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import SectionTitle from "@/components/SectionTitle";
import PageHeader from "@/components/PageHeader";
import { businessInfo, teamMembers, whyChooseUs } from "@/lib/data";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const stats = [
  { value: "200+", label: "Projects" },
  { value: "8+", label: "Years" },
  { value: "50+", label: "Happy Clients" },
  { value: "6+", label: "Awards" },
];

const whyIcons: Record<string, React.ReactNode> = {
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

export default function AboutPage() {
  return (
    <>
      {/* ===== 1. PAGE HEADER ===== */}
      <PageHeader
        title="About Us"
        subtitle="Crafting Luxury Spaces Since 2015"
      />

      {/* ===== 2. STORY SECTION ===== */}
      <SectionWrapper className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80"
                  alt="Centurio Design Studio - Interior Design"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-gold rounded-sm hidden lg:block" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-gold rounded-sm hidden lg:block" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-gold text-xs tracking-[0.2em] uppercase font-medium">
                About {businessInfo.name}
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-charcoal mt-3 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  {businessInfo.name} is a premier interior architecture and
                  design firm based in Makrana, Rajasthan. Since our inception in
                  2015, we have been dedicated to crafting spaces that blend
                  timeless elegance with modern functionality.
                </p>
                <p>
                  Our journey began with a simple belief: that great design has
                  the power to transform lives. Every project we undertake is
                  driven by a deep passion for aesthetics, an uncompromising
                  commitment to quality, and a client-centric approach that
                  ensures your vision remains at the heart of everything we do.
                </p>
                <p>
                  From luxury residences to sophisticated commercial
                  environments, our team brings together decades of collective
                  expertise, blending traditional craftsmanship with contemporary
                  design sensibilities to create spaces that inspire.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-20 pt-12 border-t border-gray-100"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center"
              >
                <span className="block font-playfair text-3xl md:text-4xl lg:text-5xl gold-text mb-2">
                  {stat.value}
                </span>
                <span className="text-gray-500 text-sm tracking-wide uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== 3. MISSION / VISION ===== */}
      <SectionWrapper className="section-padding bg-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-8 md:p-10 lg:p-12 bg-white border border-gray-100 rounded-sm hover:border-gold/30 transition-colors duration-500 group"
            >
              <div className="w-14 h-14 rounded-sm bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl md:text-3xl text-charcoal mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To transform spaces into inspiring environments that enrich
                lives through thoughtful design, meticulous craftsmanship, and
                an unwavering dedication to excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative p-8 md:p-10 lg:p-12 bg-white border border-gray-100 rounded-sm hover:border-gold/30 transition-colors duration-500 group"
            >
              <div className="w-14 h-14 rounded-sm bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl md:text-3xl text-charcoal mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be Rajasthan's most trusted interior design and architecture
                firm, recognized for uncompromising quality, innovative design
                solutions, and lasting client relationships.
              </p>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== 4. TEAM SECTION ===== */}
      <SectionWrapper className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Meet Our Team"
            subtitle="Talented individuals united by a passion for exceptional design."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-sm"
              >
                <div className="relative h-72 md:h-80 w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white font-playfair text-lg">
                    {member.name}
                  </h3>
                  <p className="text-gold text-xs tracking-widest uppercase mt-1">
                    {member.role}
                  </p>
                  <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
                <div className="p-5 bg-white border border-gray-100 border-t-0 group-hover:border-transparent transition-colors duration-500">
                  <h3 className="font-playfair text-lg text-charcoal">
                    {member.name}
                  </h3>
                  <p className="text-gold text-xs tracking-widest uppercase mt-1">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== 5. WHY CHOOSE US ===== */}
      <SectionWrapper className="section-padding bg-off-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Why Work With Us?"
            subtitle="What makes Centurio Design Studio the preferred choice across Rajasthan."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyChooseUs.slice(0, 4).map((item) => (
              <motion.div
                key={item.title}
                variants={scaleIn}
                className="group p-6 md:p-8 bg-white border border-gray-100 hover:border-gold/30 rounded-sm hover-luxury text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-sm bg-gold/10 flex items-center justify-center text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                  {whyIcons[item.icon]}
                </div>
                <h3 className="font-playfair text-lg md:text-xl text-charcoal mb-3">
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

      {/* ===== 6. CTA SECTION ===== */}
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
            Let's Discuss{" "}
            <span className="gold-text">Your Project</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto"
          >
            Ready to create something extraordinary? Reach out to us and let's
            turn your vision into reality.
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
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
