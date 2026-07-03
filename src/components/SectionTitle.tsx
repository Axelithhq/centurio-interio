"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  light = false,
  center = true,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={`mb-12 md:mb-16 ${center ? "text-center" : ""}`}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 60 } : { width: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`h-[2px] bg-gold mb-6 ${center ? "mx-auto" : ""}`}
      />
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`font-playfair text-3xl md:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`mt-4 text-base md:text-lg max-w-2xl ${
            center ? "mx-auto" : ""
          } ${light ? "text-gray-300" : "text-gray-600"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
