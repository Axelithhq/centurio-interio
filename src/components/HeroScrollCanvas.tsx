"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const TOTAL_FRAMES = 180;
const FRAME_PATH = "/Hero-Sequence/ezgif-frame-";
const BATCH_SIZE = 30;
const SCROLL_HEIGHT = 500;

export default function HeroScrollCanvas() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const padFrame = (n: number) => String(n).padStart(3, "0");

  /* ─── Image Loading ─── */
  const loadImage = useCallback(
    (index: number): Promise<void> =>
      new Promise((resolve) => {
        if (framesRef.current.has(index)) { resolve(); return; }
        const img = new Image();
        img.onload = () => {
          framesRef.current.set(index, img);
          setLoadProgress(Math.round((framesRef.current.size / TOTAL_FRAMES) * 100));
          resolve();
        };
        img.onerror = () => resolve();
        img.src = `${FRAME_PATH}${padFrame(index + 1)}.webp`;
      }),
    []
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (let i = 0; i < TOTAL_FRAMES; i += BATCH_SIZE) {
        if (cancelled) break;
        const end = Math.min(i + BATCH_SIZE, TOTAL_FRAMES);
        await Promise.all(Array.from({ length: end - i }, (_, j) => loadImage(i + j)));
      }
      if (!cancelled) setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, [loadImage]);

  /* ─── Canvas Drawing ─── */
  const drawToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const dw = canvas.clientWidth;
    const dh = canvas.clientHeight;
    if (canvas.width !== Math.floor(dw * dpr) || canvas.height !== Math.floor(dh * dpr)) {
      canvas.width = Math.floor(dw * dpr);
      canvas.height = Math.floor(dh * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canAspect = dw / dh;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (imgAspect > canAspect) { sw = sh * canAspect; sx = (img.naturalWidth - sw) / 2; }
    else { sh = sw / canAspect; sy = (img.naturalHeight - sh) / 2; }
    ctx.clearRect(0, 0, dw, dh);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh);
  }, []);

  const drawFrame = useCallback((frameNum: number) => {
    const img = framesRef.current.get(frameNum);
    if (img) { drawToCanvas(img); return; }
    for (let back = frameNum - 1; back >= 0; back--) {
      const fb = framesRef.current.get(back);
      if (fb) { drawToCanvas(fb); return; }
    }
  }, [drawToCanvas]);

  /* ─── Scroll Progress ─── */
  useEffect(() => {
    const getProgress = () => {
      const el = spacerRef.current;
      if (!el) return 0;
      const elTop = el.offsetTop;
      const elHeight = el.offsetHeight;
      const winH = window.innerHeight;
      const totalScroll = elHeight - winH;
      if (totalScroll <= 0) return 0;
      const scrolled = window.scrollY - elTop;
      return Math.max(0, Math.min(1, scrolled / totalScroll));
    };

    const onScroll = () => {
      const progress = getProgress();
      setScrollProgress(progress);
      const holding = progress >= 0.98;
      setIsHolding(holding);
      const frameNum = Math.round(progress * (TOTAL_FRAMES - 1));
      const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameNum));
      if (clamped !== currentFrameRef.current) {
        currentFrameRef.current = clamped;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(clamped));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  useEffect(() => {
    if (!loaded) return;
    const el = spacerRef.current;
    if (!el) return;
    const elTop = el.offsetTop;
    const elHeight = el.offsetHeight;
    const winH = window.innerHeight;
    const totalScroll = elHeight - winH;
    const scrolled = window.scrollY - elTop;
    const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
    const frameNum = Math.round(progress * (TOTAL_FRAMES - 1));
    currentFrameRef.current = frameNum;
    drawFrame(frameNum);
  }, [loaded, drawFrame]);

  /* ─── Compute overlay values ─── */
  const p = scrollProgress;

  /* Phase 1: Main Title ("Designing Spaces That Inspire") */
  const textOpacity = p < 0.02 ? 0 : p < 0.07 ? (p - 0.02) / 0.05 : p < 0.32 ? 1 : p < 0.40 ? 1 - (p - 0.32) / 0.08 : 0;
  const textY = p < 0.08 ? 100 - (p / 0.08) * 100 : p < 0.32 ? 0 : -40 * Math.min(1, (p - 0.32) / 0.08);
  const textRotateX = p < 0.08 ? 15 - (p / 0.08) * 15 : p < 0.32 ? 0 : -8 * Math.min(1, (p - 0.32) / 0.08);
  const textScale = p < 0.08 ? 0.85 + (p / 0.08) * 0.15 : p < 0.32 ? 1 : 1 + Math.min(0.06, (p - 0.32) / 0.08 * 0.06);

  const subOpacity = p < 0.07 ? 0 : p < 0.15 ? (p - 0.07) / 0.08 : p < 0.32 ? 1 : p < 0.40 ? 1 - (p - 0.32) / 0.08 : 0;
  const subY = p < 0.07 ? 60 : p < 0.15 ? 60 - ((p - 0.07) / 0.08) * 60 : 0;

  const btnOpacity = p < 0.15 ? 0 : p < 0.23 ? (p - 0.15) / 0.08 : p < 0.32 ? 1 : p < 0.40 ? 1 - (p - 0.32) / 0.08 : 0;
  const btnY = p < 0.15 ? 40 : p < 0.23 ? 40 - ((p - 0.15) / 0.08) * 40 : 0;

  const scrollHintOpacity = p < 0.015 ? 1 : p < 0.07 ? 1 - (p - 0.015) / 0.055 : 0;
  const lineWidth = p < 0.07 ? 0 : p < 0.17 ? ((p - 0.07) / 0.1) * 120 : 120;

  /* Phase 2: Mid Tagline ("Crafted with Passion & Precision") */
  const tagOpacity = p < 0.38 ? 0 : p < 0.46 ? (p - 0.38) / 0.08 : p < 0.58 ? 1 : p < 0.65 ? 1 - (p - 0.58) / 0.07 : 0;
  const tagY = p < 0.38 ? 70 : p < 0.48 ? 70 - ((p - 0.38) / 0.1) * 70 : p < 0.58 ? 0 : -40 * ((p - 0.58) / 0.07);
  const tagScale = p < 0.38 ? 0.85 : p < 0.48 ? 0.85 + ((p - 0.38) / 0.1) * 0.15 : 1;
  const tagRotateZ = p < 0.38 ? -3 : p < 0.48 ? -3 + ((p - 0.38) / 0.1) * 3 : 0;

  /* Phase 3: Background Opening Cover (Matching last frame background color #0C0B0A) */
  const coverBgOpacity = p < 0.58 ? 0 : p < 0.68 ? (p - 0.58) / 0.10 : 1;
  const coverClipRadius = p < 0.58 ? 0 : Math.min(150, ((p - 0.58) / 0.10) * 150);

  /* Phase 3 Staggered Element Reveals (unveils sequentially on scroll) */
  // 1. Overline Badge ("LUXURY ARCHITECTURAL & INTERIORS")
  const badgeOpacity = p < 0.64 ? 0 : p < 0.71 ? (p - 0.64) / 0.07 : 1;
  const badgeY = p < 0.64 ? 40 : p < 0.71 ? 40 - ((p - 0.64) / 0.07) * 40 : 0;

  // 2. CENTURIO Stencil Title
  const stencilOpacity = p < 0.69 ? 0 : p < 0.77 ? (p - 0.69) / 0.08 : 1;
  const stencilY = p < 0.69 ? 50 : p < 0.77 ? 50 - ((p - 0.69) / 0.08) * 50 : 0;
  const stencilScale = p < 0.69 ? 0.85 : p < 0.77 ? 0.85 + ((p - 0.69) / 0.08) * 0.15 : 1;

  // 3. Sub-headline ("INTERIOR DESIGNS • JAIPUR")
  const subTagOpacity = p < 0.76 ? 0 : p < 0.83 ? (p - 0.76) / 0.07 : 1;
  const subTagY = p < 0.76 ? 35 : p < 0.83 ? 35 - ((p - 0.76) / 0.07) * 35 : 0;

  // 4. Glass Description Panel ("Your Vision, Our Creation...")
  const descOpacity = p < 0.81 ? 0 : p < 0.88 ? (p - 0.81) / 0.07 : 1;
  const descY = p < 0.81 ? 30 : p < 0.88 ? 30 - ((p - 0.81) / 0.07) * 30 : 0;

  // 5. CTA Buttons (Enlarged & Prominent)
  const buttonsOpacity = p < 0.86 ? 0 : p < 0.94 ? (p - 0.86) / 0.08 : 1;
  const buttonsY = p < 0.86 ? 40 : p < 0.94 ? 40 - ((p - 0.86) / 0.08) * 40 : 0;
  const buttonsScale = p < 0.86 ? 0.9 : p < 0.94 ? 0.9 + ((p - 0.86) / 0.08) * 0.1 : 1;

  const cornerOpacity = p < 0.08 ? 0 : p < 0.14 ? (p - 0.08) / 0.06 : p < 0.32 ? 0.7 : p < 0.40 ? 0.7 * (1 - (p - 0.32) / 0.08) : 0;
  const cornerEndOpacity = p < 0.72 ? 0 : p < 0.80 ? (p - 0.72) / 0.08 : 0.7;

  const canvasOpacity = 1;

  /* ─── Shared 3D text style ─── */
  const perspective = "perspective(1200px)";

  return (
    <>
      <div
        className="fixed inset-0 bg-charcoal overflow-hidden"
        style={{
          willChange: "transform",
          zIndex: isHolding ? 0 : 40,
          transition: "z-index 0s",
        }}
      >

          {/* Loading Screen */}
          <AnimatePresence>
            {!loaded && (
              <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white">
                <div className="text-center">
                  <h1 className="font-playfair text-5xl md:text-7xl text-charcoal mb-1 tracking-tight">
                    CENTURIO<span className="text-gold"> DESIGNS</span>
                  </h1>
                  <p className="text-gray-400 text-xs tracking-[0.35em] uppercase font-poppins mt-2">Loading Experience</p>
                  <div className="mt-10 w-56 h-[2px] bg-gray-200 mx-auto relative overflow-hidden rounded-full">
                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full transition-all duration-300" style={{ width: `${loadProgress}%` }} />
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="text-gold font-poppins text-sm font-medium tabular-nums">{loadProgress}</span>
                    <span className="text-gray-400 font-poppins text-sm">%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Frame Sequence Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"
            style={{ imageRendering: "auto", opacity: canvasOpacity, transition: "opacity 0.4s ease" }} />

          {/* Heavy Vignette */}
          <div className="absolute inset-0 pointer-events-none z-10" style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.85) 100%)"
          }} />

          {/* ═══ Smooth Background Cover (Matching last frame color #0C0B0A, opening after Passion & Precision) ═══ */}
          <div
            className="absolute inset-0 pointer-events-none z-20 transition-all ease-out"
            style={{
              backgroundColor: "#0C0B0A",
              opacity: coverBgOpacity,
              clipPath: `circle(${coverClipRadius}% at 50% 50%)`,
            }}
          />

          {/* Gold Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] z-50 bg-white/5">
            <div className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light origin-left" style={{ transform: `scaleX(${p})` }} />
          </div>

          {/* ═══ Corner Decorations (Phase 1) ═══ */}
          <div style={{ opacity: cornerOpacity }} className="absolute inset-0 z-40 pointer-events-none">
            <div className="absolute top-8 left-8 md:top-12 md:left-12">
              <div className="w-16 h-[1.5px] bg-gradient-to-r from-gold to-transparent" />
              <div className="w-[1.5px] h-16 bg-gradient-to-b from-gold to-transparent" />
            </div>
            <div className="absolute top-8 right-8 md:top-12 md:right-12">
              <div className="w-16 h-[1.5px] bg-gradient-to-l from-gold to-transparent ml-auto" />
              <div className="w-[1.5px] h-16 bg-gradient-to-b from-gold to-transparent ml-auto" />
            </div>
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
              <div className="w-[1.5px] h-16 bg-gradient-to-t from-gold to-transparent" />
              <div className="w-16 h-[1.5px] bg-gradient-to-r from-gold to-transparent" />
            </div>
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
              <div className="w-[1.5px] h-16 bg-gradient-to-t from-gold to-transparent ml-auto" />
              <div className="w-16 h-[1.5px] bg-gradient-to-l from-gold to-transparent ml-auto" />
            </div>
          </div>

          {/* ═══ Corner Decorations (End Phase) ═══ */}
          <div style={{ opacity: cornerEndOpacity }} className="absolute inset-0 z-40 pointer-events-none">
            <div className="absolute top-8 left-8 md:top-12 md:left-12">
              <div className="w-16 h-[1.5px] bg-gradient-to-r from-gold to-transparent" />
              <div className="w-[1.5px] h-16 bg-gradient-to-b from-gold to-transparent" />
            </div>
            <div className="absolute top-8 right-8 md:top-12 md:right-12">
              <div className="w-16 h-[1.5px] bg-gradient-to-l from-gold to-transparent ml-auto" />
              <div className="w-[1.5px] h-16 bg-gradient-to-b from-gold to-transparent ml-auto" />
            </div>
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
              <div className="w-[1.5px] h-16 bg-gradient-to-t from-gold to-transparent" />
              <div className="w-16 h-[1.5px] bg-gradient-to-r from-gold to-transparent" />
            </div>
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
              <div className="w-[1.5px] h-16 bg-gradient-to-t from-gold to-transparent ml-auto" />
              <div className="w-16 h-[1.5px] bg-gradient-to-l from-gold to-transparent ml-auto" />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* PHASE 1: MAIN TITLE — Clean & Dramatic Intro (No Buttons)  */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 45 }}>

            {/* Decorative top line */}
            <div style={{ opacity: textOpacity, width: `${lineWidth}px` }}
              className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mb-6 transition-all" />

            {/* Overline */}
            <div style={{ opacity: subOpacity, transform: `translateY(${subY}px)` }}
              className="text-center px-4 mb-4">
              <span className="inline-block px-5 py-2 border border-gold/40 rounded-full text-gold text-[10px] sm:text-xs tracking-[0.45em] uppercase font-poppins backdrop-blur-md bg-black/40 shadow-lg shadow-black/50">
                <span className="inline-block w-1.5 h-1.5 bg-gold rounded-full mr-3 animate-pulse" />
                Premium Interior Design Studio
              </span>
            </div>

            {/* Main Title */}
            <div className="text-center px-4"
              style={{
                opacity: textOpacity,
                transform: `translateY(${textY}px) ${perspective} rotateX(${textRotateX}deg) scale(${textScale})`,
                transformStyle: "preserve-3d",
              }}>
              <h1 className="font-playfair text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] text-white leading-[0.95] tracking-tight"
                style={{
                  textShadow: "0 0 80px rgba(200,169,106,0.4), 0 4px 30px rgba(0,0,0,0.8), 0 0 120px rgba(200,169,106,0.2)",
                  WebkitTextStroke: "0.5px rgba(255,255,255,0.15)",
                }}>
                <span className="block" style={{ transform: "translateZ(40px)" }}>Designing</span>
                <span className="block" style={{ transform: "translateZ(60px)" }}>Spaces</span>
                <span className="gold-text block mt-2 italic font-bold" style={{ transform: "translateZ(80px)", fontSize: "1.05em" }}>That Inspire.</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="text-center px-4 mt-8"
              style={{ opacity: subOpacity, transform: `translateY(${subY}px)` }}>
              <div className="inline-block backdrop-blur-md bg-black/40 rounded-2xl px-8 py-4 border border-gold/20 shadow-xl">
                <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl font-poppins font-light tracking-wider leading-relaxed max-w-2xl">
                  Premium Interior Design &amp; Architectural Solutions in
                  <span className="text-gold font-medium"> Jaipur</span>
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* PHASE 2: MID TAGLINE — Perspective Tilt + Stagger Reveal    */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{
            zIndex: 45,
            opacity: tagOpacity,
            transform: `translateY(${tagY}px) scale(${tagScale}) rotate(${tagRotateZ}deg)`,
          }}>
            <div className="text-center px-4">
              {/* Decorative badge */}
              <div className="inline-flex items-center gap-3 mb-8 px-6 py-2.5 rounded-full border border-gold/30 backdrop-blur-md bg-black/40">
                <div className="w-8 h-[1px] bg-gold/60" />
                <span className="text-gold text-[10px] tracking-[0.5em] uppercase font-poppins font-medium">Since 2015</span>
                <div className="w-8 h-[1px] bg-gold/60" />
              </div>

              <h2 className="font-playfair text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] text-white leading-[1.05]"
                style={{
                  transform: `perspective(1000px) rotateX(${5 - tagScale * 5}deg)`,
                  textShadow: "0 0 60px rgba(200,169,106,0.35), 0 8px 40px rgba(0,0,0,0.5), 0 2px 0 rgba(200,169,106,0.1)",
                }}>
                <span className="block font-light tracking-wide" style={{ transform: "translateZ(20px)" }}>Crafted with</span>
                <span className="gold-text block mt-3 italic font-bold" style={{ transform: "translateZ(50px)", fontSize: "1.08em" }}>
                  Passion &amp; Precision
                </span>
              </h2>

              {/* Decorative bottom elements */}
              <div className="flex items-center justify-center gap-4 mt-10">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold" />
                <div className="w-2 h-2 rounded-full border border-gold/60" />
                <div className="w-2 h-2 bg-gold/40 rotate-45" />
                <div className="w-2 h-2 rounded-full border border-gold/60" />
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold" />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* PHASE 3: END REVEAL — SCROLL-STAGGERED REVEALS & ULTRA-PROMINENT CTAS */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 45 }}>
            <div className="text-center px-4 max-w-5xl">

              {/* 1. Overline Badge */}
              <div
                className="inline-flex items-center gap-3 mb-2 transition-all duration-300"
                style={{ opacity: badgeOpacity, transform: `translateY(${badgeY}px)` }}
              >
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold" />
                <span className="text-gold text-[10px] sm:text-xs tracking-[0.6em] uppercase font-poppins font-semibold">
                  LUXURY ARCHITECTURAL &amp; INTERIORS
                </span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold" />
              </div>

              {/* 2. DYNAMIC STENCIL WORD "CENTURIO" WITH PARALLAX FRAME 180 REVEAL */}
              <div
                className="relative my-2 inline-block transition-all duration-300"
                style={{
                  opacity: stencilOpacity,
                  transform: `translateY(${stencilY}px) scale(${stencilScale})`,
                }}
              >
                <h1
                  className="font-playfair font-black text-[3.8rem] sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12.5rem] tracking-tight uppercase leading-none select-none transition-all duration-500"
                  style={{
                    backgroundImage: "url('/Hero-Sequence/ezgif-frame-180.webp')",
                    backgroundSize: "115% 115%",
                    backgroundPosition: `center ${50 + (p - 0.7) * 60}%`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextStroke: "2.5px #D4AF37",
                    filter: "drop-shadow(0 0 50px rgba(200,169,106,0.5)) drop-shadow(0 20px 40px rgba(0,0,0,0.95))",
                  }}
                >
                  CENTURIO
                </h1>
                {/* Subtle metallic gold shimmer bar */}
                <div className="absolute -inset-2 pointer-events-none rounded-2xl border border-gold/20 opacity-40 blur-[1px]" />
              </div>

              {/* 3. Sub-headline Location */}
              <div
                className="mt-1 mb-5 transition-all duration-300"
                style={{ opacity: subTagOpacity, transform: `translateY(${subTagY}px)` }}
              >
                <span className="text-gray-300 text-xs sm:text-sm md:text-base tracking-[0.5em] uppercase font-poppins font-light">
                  INTERIOR DESIGNS &bull; <span className="text-gold font-medium">JAIPUR</span>
                </span>
              </div>

              {/* 4. Glass Description Panel */}
              <div
                className="inline-block backdrop-blur-md bg-black/40 rounded-2xl px-8 py-4 border border-gold/20 mb-8 shadow-2xl transition-all duration-300"
                style={{ opacity: descOpacity, transform: `translateY(${descY}px)` }}
              >
                <p className="text-gray-200 text-xs sm:text-sm md:text-base font-poppins font-light tracking-wide max-w-xl mx-auto leading-relaxed">
                  Your Vision, Our Creation. Where every space radiates unmatched <span className="text-gold font-medium">luxury and elegance</span>.
                </p>
              </div>

              {/* 5. ATTRACTIVE & ENLARGED LUXURY CTA BUTTONS */}
              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pointer-events-auto mt-2 transition-all duration-300"
                style={{
                  opacity: buttonsOpacity,
                  transform: `translateY(${buttonsY}px) scale(${buttonsScale})`,
                }}
              >
                {/* Primary CTA: START YOUR PROJECT -> */}
                <Link href="/contact"
                  className="group relative px-12 py-5 sm:px-14 sm:py-5.5 rounded-full text-xs sm:text-sm md:text-base font-poppins font-bold tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 border border-gold/40"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #FFF3D6 45%, #AA7C11 100%)",
                    color: "#0C0B0A",
                    boxShadow: "0 0 50px rgba(200,169,106,0.55), inset 0 2px 0 rgba(255,255,255,0.6)",
                  }}>
                  {/* Animated Light Sweep Line */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <span className="relative z-10 flex items-center gap-3 drop-shadow-sm">
                    Start Your Project
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 text-[#0C0B0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>

                {/* Secondary CTA: VIEW PORTFOLIO */}
                <Link href="/portfolio"
                  className="group relative px-12 py-5 sm:px-14 sm:py-5.5 rounded-full text-xs sm:text-sm md:text-base font-poppins font-bold tracking-[0.25em] uppercase border-2 border-gold/50 text-white hover:border-gold hover:text-gold hover:scale-105 active:scale-95 transition-all duration-500 backdrop-blur-md bg-black/60 shadow-2xl hover:shadow-gold/30 overflow-hidden">
                  <span className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="relative z-10 flex items-center gap-2">
                    View Portfolio
                    <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>

            </div>
          </div>

          {/* Scroll Hint */}
          {scrollHintOpacity > 0.01 && !isHolding && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3"
              style={{ opacity: scrollHintOpacity }}>
              <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-poppins">Scroll to Explore</span>
              <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center backdrop-blur-sm">
                <div className="w-1.5 h-3 bg-gold rounded-full mt-2" style={{ animation: "scrollBounce 2s ease-in-out infinite" }} />
              </div>
            </div>
          )}
        </div>

      <div ref={spacerRef} className="relative" style={{ height: `${SCROLL_HEIGHT}vh` }} />
    </>
  );
}
