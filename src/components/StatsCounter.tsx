"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { studioStats } from "@/lib/data";

function CounterItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds count up
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center group p-6 glass-card rounded-sm border border-gold/20 hover-luxury">
      <div className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-charcoal font-bold mb-2">
        <span className="gold-text">{count}</span>
        <span className="text-gold font-light">{suffix}</span>
      </div>
      <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-widest font-mono">
        {label}
      </p>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {studioStats.map((stat, idx) => (
          <CounterItem
            key={idx}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>
    </div>
  );
}
