"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { designProcess } from "@/lib/data";
import { createTimeline } from "animejs";

function TimelineStep({
  proc,
  index,
  isLast,
  onReady,
}: {
  proc: (typeof designProcess)[number];
  index: number;
  isLast: boolean;
  onReady: (els: { step: HTMLDivElement; circle: HTMLDivElement; content: HTMLDivElement; image: HTMLDivElement; line: HTMLDivElement | null }) => void;
}) {
  const isEven = index % 2 === 0;
  const stepRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stepRef.current && circleRef.current && contentRef.current && imageRef.current) {
      onReady({
        step: stepRef.current,
        circle: circleRef.current,
        content: contentRef.current,
        image: imageRef.current,
        line: lineRef.current,
      });
    }
  }, [onReady]);

  return (
    <div
      ref={stepRef}
      className={`relative flex items-start gap-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div
        ref={circleRef}
        className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20"
        style={{ opacity: 0, transform: "scale(0.3)" }}
      >
        <div className="relative">
          <div className="absolute inset-0 -m-3 rounded-full bg-gold/10 blur-md" />
          <div className="relative w-12 h-12 rounded-full bg-charcoal border-2 border-gold flex items-center justify-center shadow-lg shadow-gold/30">
            <span className="font-mono text-gold text-sm font-bold">{proc.step}</span>
          </div>
        </div>
      </div>

      <div
        ref={contentRef}
        className={`w-full md:w-[calc(50%-3rem)] pl-20 md:pl-0 ${
          isEven ? "md:pr-16 md:text-right" : "md:pl-16"
        }`}
        style={{ opacity: 0, filter: "blur(6px)" }}
      >
        <span className="text-gold text-[10px] font-mono uppercase tracking-[0.25em] block mb-2">
          {proc.subtitle}
        </span>
        <h3 className="font-serif-luxury text-xl md:text-2xl lg:text-3xl text-white mb-3 leading-tight">
          {proc.title}
        </h3>
        <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light max-w-md inline-block">
          {proc.description}
        </p>
      </div>

      <div
        ref={imageRef}
        className={`w-full md:w-[calc(50%-3rem)] pl-20 md:pl-0 ${
          isEven ? "md:pl-16" : "md:pr-16 md:text-right"
        }`}
        style={{ opacity: 0, transform: "scale(0.85) translateY(25px)" }}
      >
        <div className="relative h-48 sm:h-56 md:h-64 w-full rounded-md overflow-hidden border border-white/10 shadow-xl shadow-black/30 group">
          <Image
            src={proc.image}
            alt={proc.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-px bg-gold" />
            <div className="absolute top-0 left-0 w-px h-full bg-gold" />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-full h-px bg-gold" />
            <div className="absolute bottom-0 right-0 w-px h-full bg-gold" />
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
            <span className="text-gold text-[10px] font-mono tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Phase {proc.step}
            </span>
          </div>
        </div>
      </div>

      {!isLast && (
        <div
          ref={lineRef}
          className="absolute left-6 md:left-1/2 -translate-x-px top-12 w-px origin-top"
          style={{ height: "100%", opacity: 0, transform: "scaleY(0)" }}
        >
          <div className="w-full h-full bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />
        </div>
      )}
    </div>
  );
}

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const endDotRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const elementsRef = useRef<
    { step: HTMLDivElement; circle: HTMLDivElement; content: HTMLDivElement; image: HTMLDivElement; line: HTMLDivElement | null }[]
  >([]);

  const handleStepReady = useCallback(
    (els: { step: HTMLDivElement; circle: HTMLDivElement; content: HTMLDivElement; image: HTMLDivElement; line: HTMLDivElement | null }, index?: number) => {
      const idx = index !== undefined ? index : elementsRef.current.length;
      elementsRef.current[idx] = els;
      if (elementsRef.current.filter(Boolean).length === designProcess.length) {
        setReady(true);
      }
    },
    [],
  );

  useEffect(() => {
    if (!ready || !containerRef.current || !barRef.current) return;

    const els = elementsRef.current;
    if (els.length !== designProcess.length) return;

    const tl = createTimeline({
      defaults: { duration: 800, ease: "outQuad" },
      autoplay: false,
    });

    els.forEach((el, i) => {
      const pos = i === 0 ? 0 : "<+=200";

      tl.add(el.circle, {
        opacity: 1,
        scale: 1,
        ease: "outElastic(1, 0.6)",
        duration: 600,
      }, pos);

      tl.add(el.content, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 700,
      }, "<-=400");

      tl.add(el.image, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 750,
        ease: "outCubic",
      }, "<-=500");

      if (el.line) {
        tl.add(el.line, {
          opacity: 1,
          scaleY: 1,
          duration: 600,
          ease: "inOutQuad",
        } as any, "<-=200");
      }
    });

    if (endDotRef.current) {
      tl.add(endDotRef.current, {
        opacity: 1,
        scale: 1,
        duration: 500,
        ease: "outElastic(1, 0.5)",
      }, "+=100");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play();
        } else {
          tl.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(containerRef.current);

    // Scroll-driven gold bar
    const handleScroll = () => {
      if (!containerRef.current || !barRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (viewH - rect.top) / (rect.height + viewH)));
      barRef.current.style.transform = `scaleY(${progress})`;
      barRef.current.style.opacity = `${Math.min(1, progress * 3)}`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      tl.cancel();
    };
  }, [ready]);

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-px z-10">
        <div className="w-full h-full bg-gradient-to-b from-gold/5 via-gold/10 to-gold/5" />
        <div
          ref={barRef}
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold via-gold/80 to-gold/20 shadow-[0_0_12px_2px_rgba(200,169,106,0.3)]"
          style={{ height: "100%", transformOrigin: "top", transform: "scaleY(0)", opacity: 0 }}
        />
      </div>

      <div className="space-y-16 md:space-y-28">
        {designProcess.map((proc, i) => (
          <TimelineStep
            key={proc.step}
            proc={proc}
            index={i}
            isLast={i === designProcess.length - 1}
            onReady={(els) => handleStepReady(els, i)}
          />
        ))}
      </div>

      <div
        ref={endDotRef}
        className="absolute bottom-0 left-6 md:left-1/2 -translate-x-1/2 z-20"
        style={{ opacity: 0, transform: "scale(0)" }}
      >
        <div className="w-4 h-4 rounded-full bg-gold shadow-lg shadow-gold/40" />
      </div>
    </div>
  );
}
