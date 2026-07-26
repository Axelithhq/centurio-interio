"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const TOTAL_FRAMES = 179;
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
        img.src = `${FRAME_PATH}${padFrame(index + 1)}.png`;
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

  const textOpacity = p < 0.02 ? 0 : p < 0.07 ? (p - 0.02) / 0.05 : p < 0.36 ? 1 : p < 0.43 ? 1 - (p - 0.36) / 0.07 : 0;
  const textY = p < 0.08 ? 100 - (p / 0.08) * 100 : p < 0.36 ? 0 : -40 * Math.min(1, (p - 0.36) / 0.07);
  const textRotateX = p < 0.08 ? 15 - (p / 0.08) * 15 : p < 0.36 ? 0 : -8 * Math.min(1, (p - 0.36) / 0.07);
  const textScale = p < 0.08 ? 0.85 + (p / 0.08) * 0.15 : p < 0.36 ? 1 : 1 + Math.min(0.06, (p - 0.36) / 0.07 * 0.06);

  const subOpacity = p < 0.07 ? 0 : p < 0.15 ? (p - 0.07) / 0.08 : p < 0.36 ? 1 : p < 0.43 ? 1 - (p - 0.36) / 0.07 : 0;
  const subY = p < 0.07 ? 60 : p < 0.15 ? 60 - ((p - 0.07) / 0.08) * 60 : 0;

  const btnOpacity = p < 0.15 ? 0 : p < 0.23 ? (p - 0.15) / 0.08 : p < 0.36 ? 1 : p < 0.43 ? 1 - (p - 0.36) / 0.07 : 0;
  const btnY = p < 0.15 ? 40 : p < 0.23 ? 40 - ((p - 0.15) / 0.08) * 40 : 0;

  const scrollHintOpacity = p < 0.015 ? 1 : p < 0.07 ? 1 - (p - 0.015) / 0.055 : 0;

  const lineWidth = p < 0.07 ? 0 : p < 0.17 ? ((p - 0.07) / 0.1) * 120 : 120;

  const tagOpacity = p < 0.45 ? 0 : p < 0.53 ? (p - 0.45) / 0.08 : p < 0.64 ? 1 : p < 0.73 ? 1 - (p - 0.64) / 0.09 : 0;
  const tagY = p < 0.45 ? 70 : p < 0.55 ? 70 - ((p - 0.45) / 0.1) * 70 : 0;
  const tagScale = p < 0.45 ? 0.85 : p < 0.55 ? 0.85 + ((p - 0.45) / 0.1) * 0.15 : 1;
  const tagRotateZ = p < 0.45 ? -3 : p < 0.55 ? -3 + ((p - 0.45) / 0.1) * 3 : 0;

  const endOpacity = p < 0.77 ? 0 : p < 0.85 ? (p - 0.77) / 0.08 : p < 0.91 ? 1 : p < 0.97 ? 1 : 1;
  const endY = p < 0.77 ? 80 : p < 0.85 ? 80 - ((p - 0.77) / 0.08) * 80 : 0;
  const endScale = p < 0.77 ? 0.8 : p < 0.87 ? 0.8 + ((p - 0.77) / 0.1) * 0.2 : 1;

  const cornerOpacity = p < 0.08 ? 0 : p < 0.14 ? (p - 0.08) / 0.06 : p < 0.36 ? 0.7 : p < 0.43 ? 0.7 * (1 - (p - 0.36) / 0.07) : 0;
  const cornerEndOpacity = p < 0.8 ? 0 : p < 0.88 ? (p - 0.8) / 0.08 : 0.7;

  const canvasOpacity = 1;

  /* ─── Shared 3D text style ─── */
  const perspective = "perspective(1200px)";

  return (
    <>
      <div
        className="fixed inset-0 bg-charcoal"
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

          {/* Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"
            style={{ imageRendering: "auto", opacity: canvasOpacity, transition: "opacity 0.4s ease" }} />

          {/* Heavy Vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.8) 100%)"
          }} />

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
          {/* PHASE 1: MAIN TITLE — 3D Rotating Reveal with Glass Panel  */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 45 }}>

            {/* Decorative top line */}
            <div style={{ opacity: textOpacity, width: `${lineWidth}px` }}
              className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mb-6 transition-all" />

            {/* Overline */}
            <div style={{ opacity: subOpacity, transform: `translateY(${subY}px)` }}
              className="text-center px-4 mb-4">
              <span className="inline-block px-5 py-2 border border-gold/30 rounded-full text-gold text-[10px] sm:text-xs tracking-[0.4em] uppercase font-poppins backdrop-blur-sm bg-white/5">
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
                  textShadow: "0 0 80px rgba(200,169,106,0.3), 0 4px 30px rgba(0,0,0,0.6), 0 0 120px rgba(200,169,106,0.15)",
                  WebkitTextStroke: "0.5px rgba(255,255,255,0.1)",
                }}>
                <span className="block" style={{ transform: "translateZ(40px)" }}>Designing</span>
                <span className="block" style={{ transform: "translateZ(60px)" }}>Spaces</span>
                <span className="gold-text block mt-2 italic" style={{ transform: "translateZ(80px)", fontSize: "1.05em" }}>That Inspire.</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="text-center px-4 mt-8"
              style={{ opacity: subOpacity, transform: `translateY(${subY}px)` }}>
              <div className="inline-block backdrop-blur-md bg-black/30 rounded-2xl px-8 py-4 border border-white/10">
                <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl font-poppins font-light tracking-wider leading-relaxed max-w-2xl">
                  Premium Interior Design &amp; Architectural Solutions in
                  <span className="text-gold font-medium"> Jaipur</span>
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10 pointer-events-auto"
              style={{ opacity: btnOpacity, transform: `translateY(${btnY}px)` }}>
              <Link href="/contact"
                className="group relative px-10 py-4.5 rounded-full text-xs font-poppins font-semibold tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gold/40"
                style={{
                  background: "linear-gradient(135deg, #C8A96A 0%, #E8D3A7 40%, #9E7B3B 100%)",
                  color: "#fff",
                  boxShadow: "0 0 30px rgba(200,169,106,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}>
                <span className="relative z-10 flex items-center gap-2">
                  Get Free Consultation
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </Link>
              <Link href="/portfolio"
                className="group px-10 py-4.5 rounded-full text-xs font-poppins font-medium tracking-[0.25em] uppercase border border-white/25 text-white/90 hover:border-gold hover:text-gold hover:shadow-lg hover:shadow-gold/20 transition-all duration-500 backdrop-blur-sm bg-white/5">
                View Portfolio
              </Link>
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
              <div className="inline-flex items-center gap-3 mb-8 px-6 py-2.5 rounded-full border border-gold/25 backdrop-blur-sm bg-white/5">
                <div className="w-8 h-[1px] bg-gold/60" />
                <span className="text-gold text-[10px] tracking-[0.5em] uppercase font-poppins">Since 2015</span>
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
          {/* PHASE 3: END CTA — Dramatic Reveal with Glass Card          */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{
            zIndex: 45,
            opacity: endOpacity,
            transform: `translateY(${endY}px) scale(${endScale})`,
          }}>
            <div className="text-center px-4 max-w-3xl">
              {/* Overline */}
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-10 h-[1px] bg-gold" />
                <span className="text-gold text-[10px] tracking-[0.5em] uppercase font-poppins font-medium">Jaipur, Rajasthan</span>
                <div className="w-10 h-[1px] bg-gold" />
              </div>

              {/* Title */}
              <h2 className="font-playfair text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem] text-white leading-[1] mb-4"
                style={{
                  transform: "perspective(1000px) rotateX(3deg)",
                  textShadow: "0 0 80px rgba(200,169,106,0.4), 0 10px 50px rgba(0,0,0,0.6), 0 2px 0 rgba(200,169,106,0.15)",
                }}>
                <span className="block font-light" style={{ transform: "translateZ(30px)" }}>Your Vision,</span>
                <span className="gold-text block mt-2 italic font-bold" style={{ transform: "translateZ(60px)", fontSize: "1.1em" }}>Our Creation.</span>
              </h2>

              {/* Glass description panel */}
              <div className="inline-block backdrop-blur-lg bg-white/5 rounded-2xl px-8 py-4 border border-white/10 mt-4 mb-10">
                <p className="text-gray-300 text-sm md:text-base font-poppins font-light tracking-wide max-w-md mx-auto leading-relaxed">
                  Transform your space with <span className="text-gold font-medium">CENTURIO DESIGNS</span> — where every detail speaks luxury.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pointer-events-auto">
                <Link href="/contact"
                  className="group relative px-12 py-5 rounded-full text-xs font-poppins font-bold tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gold/40"
                  style={{
                    background: "linear-gradient(135deg, #C8A96A 0%, #E8D3A7 40%, #9E7B3B 100%)",
                    color: "#fff",
                    boxShadow: "0 0 40px rgba(200,169,106,0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
                  }}>
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </Link>
                <Link href="/about"
                  className="px-12 py-5 rounded-full text-xs font-poppins font-medium tracking-[0.25em] uppercase border border-white/25 text-white/90 hover:border-gold hover:text-gold hover:shadow-lg hover:shadow-gold/20 transition-all duration-500 backdrop-blur-sm bg-white/5">
                  About Us
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
