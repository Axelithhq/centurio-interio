"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import * as THREE from "three";
import { roomHotspots } from "@/lib/data";

export default function Room360Inspector() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<typeof roomHotspots[0] | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isModelReady, setIsModelReady] = useState(false);
  const manualRotationY = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const pointerContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ modelGroup: THREE.Group; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer; scene: THREE.Scene } | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scrollRotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

  const progressPercent = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const progressAngle = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useMotionValueEvent(progressPercent, "change", (v) => setRotationDeg(Math.round(v)));

  /* ─── Three.js Scene ─── */
  useEffect(() => {
    if (!canvasContainerRef.current) return;
    const container = canvasContainerRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.06);

    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 2.2, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    /* ── Lighting ── */
    scene.add(new THREE.AmbientLight(0xfff5e6, 0.4));

    const sun = new THREE.DirectionalLight(0xffe8c8, 2.5);
    sun.position.set(6, 10, 4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 30;
    sun.shadow.camera.left = -8;
    sun.shadow.camera.right = 8;
    sun.shadow.camera.top = 8;
    sun.shadow.camera.bottom = -8;
    sun.shadow.bias = -0.0005;
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0xc8a96a, 0.6);
    fill.position.set(-4, 3, -2);
    scene.add(fill);

    const goldSpot = new THREE.SpotLight(0xc8a96a, 8, 15, Math.PI / 6, 0.6, 1);
    goldSpot.position.set(0, 5, 0);
    goldSpot.castShadow = true;
    scene.add(goldSpot);

    const rimLight = new THREE.PointLight(0x4a6fa5, 1.5, 12);
    rimLight.position.set(-5, 3, -3);
    scene.add(rimLight);

    /* ── Model Group ── */
    const modelGroup = new THREE.Group();

    // Circular Floor Platform
    const floorGeo = new THREE.CylinderGeometry(5, 5, 0.15, 80);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.15, metalness: 0.05 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.85;
    floor.receiveShadow = true;
    modelGroup.add(floor);

    // Outer Gold Ring
    const ringGeo = new THREE.TorusGeometry(5, 0.025, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xc8a96a, metalness: 0.95, roughness: 0.15 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.78;
    modelGroup.add(ring);

    // Inner concentric ring
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.5, 0.015, 12, 80),
      new THREE.MeshStandardMaterial({ color: 0xc8a96a, metalness: 0.9, roughness: 0.2, transparent: true, opacity: 0.5 })
    );
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = -0.77;
    modelGroup.add(ring2);

    // ── Center Rug (subtle) ──
    const rugGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.03, 64);
    const rugMat = new THREE.MeshStandardMaterial({ color: 0x2a2520, roughness: 0.95 });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.position.y = -0.76;
    rug.receiveShadow = true;
    modelGroup.add(rug);

    // ── Luxury Curved Sofa ──
    const sofaGroup = new THREE.Group();
    const sofaBaseGeo = new THREE.CylinderGeometry(1.4, 1.5, 0.5, 48, 1, false, 0, Math.PI);
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0xd4cfc5, roughness: 0.85 });
    const sofaBase = new THREE.Mesh(sofaBaseGeo, sofaMat);
    sofaBase.position.y = -0.35;
    sofaBase.castShadow = true;
    sofaGroup.add(sofaBase);

    // Sofa back
    const sofaBackGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.8, 48, 1, false, 0, Math.PI);
    const sofaBack = new THREE.Mesh(sofaBackGeo, sofaMat);
    sofaBack.position.set(0, 0.15, 0);
    sofaBack.rotation.y = Math.PI;
    sofaBack.castShadow = true;
    sofaGroup.add(sofaBack);

    // Sofa cushion detail
    const cushionGeo = new THREE.CylinderGeometry(1.1, 1.15, 0.12, 48, 1, false, 0, Math.PI);
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0xc8a96a, roughness: 0.7 });
    const cushion = new THREE.Mesh(cushionGeo, cushionMat);
    cushion.position.y = -0.05;
    sofaGroup.add(cushion);
    modelGroup.add(sofaGroup);

    // ── Coffee Table ──
    const tableGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.04, 32);
    const tableMat = new THREE.MeshStandardMaterial({ color: 0xc8a96a, metalness: 0.85, roughness: 0.15 });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.set(0, -0.15, 1.2);
    table.castShadow = true;
    modelGroup.add(table);

    const tableLegGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.65, 12);
    const tableLegMat = new THREE.MeshStandardMaterial({ color: 0xc8a96a, metalness: 0.9, roughness: 0.2 });
    const tableLeg = new THREE.Mesh(tableLegGeo, tableLegMat);
    tableLeg.position.set(0, -0.5, 1.2);
    modelGroup.add(tableLeg);

    // ── Fluted Wall Panel (back) ──
    const wallGroup = new THREE.Group();
    wallGroup.position.set(0, 0.8, -2.8);
    for (let x = -3; x <= 3; x += 0.18) {
      const slatGeo = new THREE.BoxGeometry(0.1, 3.5, 0.08);
      const slatMat = new THREE.MeshStandardMaterial({ color: 0x6b5a42, roughness: 0.45, metalness: 0.1 });
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.x = x;
      slat.castShadow = true;
      slat.receiveShadow = true;
      wallGroup.add(slat);
    }
    // Gold accent strip across wall
    const accentGeo = new THREE.BoxGeometry(6.2, 0.03, 0.12);
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xc8a96a, metalness: 0.9, roughness: 0.2 });
    const accent = new THREE.Mesh(accentGeo, accentMat);
    accent.position.set(0, 0.5, 0.06);
    wallGroup.add(accent);
    modelGroup.add(wallGroup);

    // ── Side Wall Panel (left) ──
    const sideWall = new THREE.Group();
    sideWall.position.set(-3.2, 0.8, -0.5);
    sideWall.rotation.y = Math.PI / 2;
    for (let x = -2; x <= 2; x += 0.18) {
      const slatGeo = new THREE.BoxGeometry(0.08, 3.5, 0.06);
      const slatMat = new THREE.MeshStandardMaterial({ color: 0x5a4a38, roughness: 0.5 });
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.x = x;
      slat.castShadow = true;
      sideWall.add(slat);
    }
    modelGroup.add(sideWall);

    // ── Architectural Chandelier (dual ring) ──
    const chandelierOuter = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.02, 16, 48),
      new THREE.MeshStandardMaterial({ color: 0xc8a96a, metalness: 0.95, roughness: 0.15, emissive: 0xc8a96a, emissiveIntensity: 0.3 })
    );
    chandelierOuter.rotation.x = Math.PI / 2;
    chandelierOuter.position.set(0, 2.6, 0);
    modelGroup.add(chandelierOuter);

    const chandelierInner = new THREE.Mesh(
      new THREE.TorusGeometry(0.9, 0.015, 12, 36),
      new THREE.MeshStandardMaterial({ color: 0xc8a96a, metalness: 0.95, roughness: 0.15, emissive: 0xc8a96a, emissiveIntensity: 0.2 })
    );
    chandelierInner.rotation.x = Math.PI / 2;
    chandelierInner.position.set(0, 2.45, 0);
    modelGroup.add(chandelierInner);

    // Chandelier suspension lines
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const lineGeo = new THREE.CylinderGeometry(0.005, 0.005, 1.2, 6);
      const lineMat = new THREE.MeshStandardMaterial({ color: 0xc8a96a, metalness: 0.9, roughness: 0.2 });
      const line = new THREE.Mesh(lineGeo, lineMat);
      line.position.set(Math.cos(angle) * 1.6, 3.2, Math.sin(angle) * 1.6);
      modelGroup.add(line);
    }

    // ── Decorative Vase ──
    const vaseGeo = new THREE.LatheGeometry([
      new THREE.Vector2(0, -0.5),
      new THREE.Vector2(0.18, -0.4),
      new THREE.Vector2(0.22, -0.1),
      new THREE.Vector2(0.2, 0.1),
      new THREE.Vector2(0.12, 0.25),
      new THREE.Vector2(0.14, 0.35),
      new THREE.Vector2(0.13, 0.4),
    ], 24);
    const vaseMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.6 });
    const vase = new THREE.Mesh(vaseGeo, vaseMat);
    vase.position.set(1.8, -0.42, 0.5);
    vase.castShadow = true;
    modelGroup.add(vase);

    // ── Floor Accent Plant ──
    const potGeo = new THREE.CylinderGeometry(0.25, 0.2, 0.5, 16);
    const potMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.6 });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(-2, -0.55, 1.5);
    pot.castShadow = true;
    modelGroup.add(pot);

    // Abstract leaf shapes
    for (let i = 0; i < 5; i++) {
      const leafGeo = new THREE.PlaneGeometry(0.3, 0.6);
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x3a5a3a, roughness: 0.8, side: THREE.DoubleSide });
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      const angle = (i / 5) * Math.PI * 2;
      leaf.position.set(
        -2 + Math.cos(angle) * 0.15,
        0.05,
        1.5 + Math.sin(angle) * 0.15
      );
      leaf.rotation.set(
        -0.3 + Math.random() * 0.6,
        angle,
        Math.random() * 0.3
      );
      modelGroup.add(leaf);
    }

    // ── Floating Ambient Particles ──
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 4 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xc8a96a, size: 0.02, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(particleGeo, particleMat);
    modelGroup.add(particles);

    scene.add(modelGroup);

    sceneRef.current = { modelGroup, camera, renderer, scene };
    setIsModelReady(true);

    /* ── Animation Loop ── */
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Gentle floating for particles
      const posAttr = particleGeo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        posAttr.setY(i, posAttr.getY(i) + Math.sin(t * 0.5 + i) * 0.0003);
      }
      posAttr.needsUpdate = true;

      // Chandelier subtle wobble
      chandelierInner.rotation.z = Math.sin(t * 0.3) * 0.02;
      chandelierOuter.rotation.z = Math.sin(t * 0.25) * 0.015;

      camera.lookAt(0, 0.5, 0);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  /* ── Scroll sync ── */
  useEffect(() => {
    if (!sceneRef.current) return;
    let lastScrollRotation = 0;
    const unsub = scrollRotationY.on("change", (v) => {
      lastScrollRotation = v;
      sceneRef.current!.modelGroup.rotation.y = v + manualRotationY.current;
    });
    // Also sync momentum deceleration
    let rafId: number;
    const syncMomentum = () => {
      if (sceneRef.current && !isDraggingRef.current && Math.abs(velocityRef.current) > 0.00005) {
        sceneRef.current.modelGroup.rotation.y = lastScrollRotation + manualRotationY.current;
      }
      rafId = requestAnimationFrame(syncMomentum);
    };
    syncMomentum();
    return () => { unsub(); cancelAnimationFrame(rafId); };
  }, [scrollRotationY]);

  /* ── Momentum decay when drag ends ── */
  useEffect(() => {
    let rafId: number;
    const decay = () => {
      if (Math.abs(velocityRef.current) > 0.00005) {
        manualRotationY.current += velocityRef.current;
        velocityRef.current *= 0.94;
        rafId = requestAnimationFrame(decay);
      } else {
        velocityRef.current = 0;
      }
    };
    if (!isDragging) {
      decay();
    }
    return () => cancelAnimationFrame(rafId);
  }, [isDragging]);

  /* ── Drag Handlers (use pointer capture for smooth tracking) ── */
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    velocityRef.current = dx * 0.006;
    manualRotationY.current += dx * 0.006;
    lastXRef.current = e.clientX;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = false;
    setIsDragging(false);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  /* ── Ring progress SVG ── */
  const ringRadius = 18;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = useTransform(scrollYProgress, [0, 1], [ringCircumference, 0]);

  return (
    <div ref={sectionRef} className="relative h-screen bg-charcoal text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Background ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(200,169,106,0.06) 0%, transparent 60%)",
        }} />

        {/* ── Header ── */}
        <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-10 pt-8 pb-6 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, transparent 100%)" }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-gold text-[10px] font-mono tracking-[0.4em] uppercase block mb-2"
              >
                Interactive Experience
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
              >
                360° <span className="gold-text">Architectural</span> Inspector
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-playfair italic text-lg md:text-2xl text-white/60 mt-1"
              >
                Explore Every Crafted Angle.
              </motion.p>
            </div>

            {/* Progress Ring + Degree */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="text-right hidden md:block">
                <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Rotation</p>
                <p className="text-gold font-mono text-2xl tabular-nums font-medium">{rotationDeg}°</p>
              </div>
              <svg width="48" height="48" className="drop-shadow-lg">
                <circle cx="24" cy="24" r={ringRadius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <motion.circle
                  cx="24" cy="24" r={ringRadius} fill="none" stroke="#c8a96a" strokeWidth="2"
                  strokeLinecap="round" strokeDasharray={ringCircumference} style={{ strokeDashoffset: ringOffset }}
                  transform="rotate(-90 24 24)"
                />
                <text x="24" y="27" textAnchor="middle" fill="#c8a96a" fontSize="9" fontFamily="monospace" fontWeight="600">
                  {rotationDeg}°
                </text>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* ── 3D Canvas ── */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`absolute inset-0 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ touchAction: "none" }}
        >
          <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full" />

          {/* Loading State */}
          {!isModelReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal z-30">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white/40 text-xs font-mono tracking-widest uppercase">Loading 3D Scene</p>
              </div>
            </div>
          )}

          {/* ── Hotspot Pins ── */}
          {isModelReady && (
            <div className="absolute inset-0 pointer-events-none">
              {roomHotspots.map((spot, i) => {
                const isActive = activeHotspot?.id === spot.id;
                const isHovered = hoveredHotspot === spot.id;
                return (
                  <motion.div
                    key={spot.id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2"
                  >
                    <button
                      onClick={() => setActiveHotspot(isActive ? null : spot)}
                      onMouseEnter={() => setHoveredHotspot(spot.id)}
                      onMouseLeave={() => setHoveredHotspot(null)}
                      className="relative group focus:outline-none"
                    >
                      {/* Ping ring */}
                      <span className={`absolute -inset-3 rounded-full transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
                        style={{ background: "radial-gradient(circle, rgba(200,169,106,0.3) 0%, transparent 70%)", animation: "pulseRing 2s ease-in-out infinite" }} />

                      {/* Outer glow */}
                      <span className="absolute -inset-1.5 rounded-full bg-gold/20 blur-sm group-hover:bg-gold/30 transition-all" />

                      {/* Pin dot */}
                      <div className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                        isActive
                          ? "bg-gold text-charcoal scale-125 shadow-[0_0_20px_rgba(200,169,106,0.5)]"
                          : isHovered
                            ? "bg-gold/20 border-2 border-gold text-gold scale-110"
                            : "bg-charcoal/80 border border-gold/50 text-gold/80 hover:border-gold"
                      }`}>
                        <span className="text-[10px] font-mono font-bold">{i + 1}</span>
                      </div>

                      {/* Tooltip label on hover */}
                      {isHovered && !isActive && (
                        <div className="absolute left-1/2 -translate-x-1/2 -top-10 whitespace-nowrap px-3 py-1.5 rounded-sm bg-charcoal/90 border border-gold/30 backdrop-blur-sm">
                          <span className="text-gold text-[9px] font-mono tracking-wider uppercase">{spot.title}</span>
                        </div>
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Bottom gradient fade ── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 100%)" }} />

        {/* ── Interaction Hint ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 pointer-events-none"
        >
          <div className="flex items-center gap-2 text-white/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2v20M2 12h20M12 2l3 3M12 2l-3 3M12 22l3-3M12 22l-3-3M2 12l3 3M2 12l3-3M22 12l-3 3M22 12l-3-3" />
            </svg>
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase">Drag to rotate</span>
          </div>
          <div className="w-px h-3 bg-white/15" />
          <div className="flex items-center gap-2 text-white/30">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase">Scroll to orbit</span>
          </div>
          <div className="w-px h-3 bg-white/15" />
          <div className="flex items-center gap-2 text-white/30">
            <div className="w-3 h-3 rounded-full border border-gold/40 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-gold" />
            </div>
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase">Click pins to inspect</span>
          </div>
        </motion.div>

        {/* ── Material Specification Drawer ── */}
        <AnimatePresence mode="wait">
          {activeHotspot && (
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-20 left-6 right-6 md:left-auto md:right-10 md:w-[380px] z-30"
            >
              <div className="relative overflow-hidden rounded-sm border border-gold/25 backdrop-blur-xl"
                style={{ background: "linear-gradient(135deg, rgba(20,18,15,0.92) 0%, rgba(30,27,22,0.88) 100%)" }}>
                {/* Gold accent line at top */}
                <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

                <div className="p-6">
                  {/* Category pill */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                      <span className="text-gold text-[9px] font-mono uppercase tracking-[0.25em]">{activeHotspot.category}</span>
                    </div>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-gold/40 hover:bg-gold/10 transition-all text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair text-xl md:text-2xl text-white mb-2 leading-tight">
                    {activeHotspot.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-xs leading-relaxed mb-5 font-light">
                    {activeHotspot.desc}
                  </p>

                  {/* Specs Grid */}
                  <div className="border-t border-white/8 pt-4">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] block mb-3">Specifications</span>
                    <div className="space-y-2.5">
                      {activeHotspot.specs.map((spec, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.08 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 h-5 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                            <span className="text-gold text-[8px] font-mono">{i + 1}</span>
                          </div>
                          <span className="text-gray-300 text-[11px] font-mono">{spec}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mobile rotation degree display ── */}
        <div className="absolute top-8 right-6 z-20 md:hidden">
          <div className="text-right">
            <p className="text-gold font-mono text-xl tabular-nums font-medium">{rotationDeg}°</p>
          </div>
        </div>
      </div>
    </div>
  );
}
