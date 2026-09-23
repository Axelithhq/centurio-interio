"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, animate } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { roomHotspots } from "@/lib/data";

const cameraPresets = [
  {
    id: "full",
    num: "0",
    hotspotId: null,
    label: "Overview 360°",
    pos: { x: 0, y: 3.2, z: 8.0 },
    target: { x: 0, y: 0.5, z: 0 },
  },
  {
    id: "lounge",
    num: "1",
    hotspotId: "h1",
    label: "1. Living Sanctuary",
    pos: { x: 2.5, y: 1.5, z: 4.2 },
    target: { x: 0.8, y: 0.2, z: 0.5 },
  },
  {
    id: "suite",
    num: "2",
    hotspotId: "h2",
    label: "2. Master Suite",
    pos: { x: -2.8, y: 1.8, z: 3.8 },
    target: { x: -1.2, y: 0.4, z: -0.2 },
  },
  {
    id: "kitchen",
    num: "3",
    hotspotId: "h3",
    label: "3. Gourmet Kitchen",
    pos: { x: 1.5, y: 1.4, z: -3.0 },
    target: { x: 0.5, y: 0.3, z: -1.2 },
  },
  {
    id: "study",
    num: "4",
    hotspotId: "h4",
    label: "4. Executive Balcony",
    pos: { x: -1.8, y: 1.6, z: -3.8 },
    target: { x: -0.8, y: 0.5, z: -1.8 },
  },
];

export default function Room360Inspector() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<typeof roomHotspots[0] | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState("full");
  const [isModelReady, setIsModelReady] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0); // 0: overview, 1..4: hotspots
  const [azimuthDeg, setAzimuthDeg] = useState(0);
  const [polarDeg, setPolarDeg] = useState(70);

  const sceneRef = useRef<{
    modelGroup: THREE.Group;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
  } | null>(null);

  const controlsRef = useRef<OrbitControls | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // 3D Entrance transform matching upper sections
  const frameX = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const frameY = useTransform(scrollYProgress, [0, 1], [-140, 0]);
  const frameRotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const frameScale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1]);

  /* ─── Three.js Scene Setup with OrbitControls ─── */
  useEffect(() => {
    if (!canvasContainerRef.current) return;
    const container = canvasContainerRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0908, 0.04);

    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 3.2, 8.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    /* ── OrbitControls ── */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.15; // pitch ceiling/floor constraint
    controls.minPolarAngle = 0.05;
    controls.minDistance = 1.5; // close zoom in
    controls.maxDistance = 16; // zoom out view
    controls.target.set(0, 0.5, 0);
    controls.autoRotate = false;
    controls.autoRotateSpeed = 1.5;
    controlsRef.current = controls;

    /* ── Studio Lighting ── */
    scene.add(new THREE.AmbientLight(0xfff5e6, 0.45));

    const sun = new THREE.DirectionalLight(0xffe8c8, 2.8);
    sun.position.set(6, 10, 4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0005;
    scene.add(sun);

    const goldSpot = new THREE.SpotLight(0xc8a96a, 9, 16, Math.PI / 5, 0.5, 1);
    goldSpot.position.set(0, 5, 0);
    goldSpot.castShadow = true;
    scene.add(goldSpot);

    const rimLight = new THREE.PointLight(0x4a6fa5, 1.8, 12);
    rimLight.position.set(-5, 3, -3);
    scene.add(rimLight);

    /* ── Model Group ── */
    const modelGroup = new THREE.Group();

    // Circular Floor Platform & Outer Gold Ring
    const floorY = -0.55;
    const floorHeight = 0.15;
    const floorTopY = floorY + floorHeight / 2; // -0.475

    const floorGeo = new THREE.CylinderGeometry(5.2, 5.2, floorHeight, 80);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x141210, roughness: 0.12, metalness: 0.08 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = floorY;
    floor.receiveShadow = true;
    modelGroup.add(floor);

    const ringGeo = new THREE.TorusGeometry(5.2, 0.035, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xc8a96a, metalness: 0.95, roughness: 0.12 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = floorTopY + 0.005;
    modelGroup.add(ring);

    /* ── Load User's GLB Apartment Model ── */
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/appartement/source/appartement.glb",
      (gltf) => {
        const model = gltf.scene;

        // Auto-center horizontally & normalize scale
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 6.8 / maxDim; // Fit nicely within viewport
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // Center on X and Z axis
        model.position.x = -center.x * scaleFactor;
        model.position.z = -center.z * scaleFactor;

        // Align the bottom of the model EXACTLY flush onto the floor platform surface
        model.position.y = floorTopY - (box.min.y * scaleFactor);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        modelGroup.add(model);
        setIsModelReady(true);
      },
      undefined,
      (error) => {
        console.error("GLB Load Error:", error);
        setIsModelReady(true);
      }
    );

    scene.add(modelGroup);
    sceneRef.current = { modelGroup, camera, renderer, scene };

    let animId: number;
    let frameCounter = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();

      // Throttle UI degree updates for performance
      frameCounter++;
      if (frameCounter % 6 === 0) {
        const rawAzimuth = Math.round((controls.getAzimuthalAngle() * 180) / Math.PI);
        const normalizedAzimuth = (rawAzimuth % 360 + 360) % 360;
        const pitch = Math.round((controls.getPolarAngle() * 180) / Math.PI);
        setAzimuthDeg(normalizedAzimuth);
        setPolarDeg(pitch);
      }

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
      controls.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  /* ── Auto Rotate Sync ── */
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate || (isTourActive && tourStep === 0);
    }
  }, [autoRotate, isTourActive, tourStep]);

  /* ── Camera & Corner Navigation Handler ── */
  const applyPreset = useCallback((presetId: string) => {
    setActivePreset(presetId);
    const preset = cameraPresets.find((p) => p.id === presetId);
    if (!preset || !controlsRef.current || !sceneRef.current) return;

    const { camera } = sceneRef.current;
    const controls = controlsRef.current;

    // Smoothly fly camera position & orbit target to corner destination
    animate(camera.position.x, preset.pos.x, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (camera.position.x = v) });
    animate(camera.position.y, preset.pos.y, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (camera.position.y = v) });
    animate(camera.position.z, preset.pos.z, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (camera.position.z = v) });

    animate(controls.target.x, preset.target.x, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (controls.target.x = v) });
    animate(controls.target.y, preset.target.y, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (controls.target.y = v) });
    animate(controls.target.z, preset.target.z, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (controls.target.z = v) });

    // Open active hotspot card if linked
    if (preset.hotspotId) {
      const spot = roomHotspots.find((h) => h.id === preset.hotspotId);
      setActiveHotspot(spot || null);
    } else {
      setActiveHotspot(null);
    }
  }, []);

  /* ── Trigger Hotspot Click (Navigates camera to corner + displays info drawer) ── */
  const handleHotspotClick = (spotId: string) => {
    const preset = cameraPresets.find((p) => p.hotspotId === spotId);
    if (preset) {
      applyPreset(preset.id);
    } else {
      const spot = roomHotspots.find((h) => h.id === spotId);
      setActiveHotspot(spot || null);
    }
  };

  /* ── Automated Guided 3D Tour Timer ── */
  useEffect(() => {
    if (!isTourActive) return;

    const tourOrder = ["lounge", "suite", "kitchen", "study", "full"];
    const interval = setInterval(() => {
      setTourStep((prevStep) => {
        const nextStep = (prevStep + 1) % tourOrder.length;
        const targetPresetId = tourOrder[nextStep];
        applyPreset(targetPresetId);
        return nextStep;
      });
    }, 6500); // Spend 6.5s per corner during automated tour

    return () => clearInterval(interval);
  }, [isTourActive, applyPreset]);

  /* ── Start / Stop Guided Tour ── */
  const toggleGuidedTour = () => {
    if (isTourActive) {
      setIsTourActive(false);
      applyPreset("full");
    } else {
      setIsTourActive(true);
      setTourStep(0);
      applyPreset("lounge");
    }
  };

  /* ── Manual Zoom Controls ── */
  const zoomIn = () => {
    if (!controlsRef.current || !sceneRef.current) return;
    const { camera } = sceneRef.current;
    const controls = controlsRef.current;

    const currentDist = camera.position.distanceTo(controls.target);
    const targetDist = Math.max(controls.minDistance, currentDist * 0.75);
    const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
    const newPos = new THREE.Vector3().addVectors(controls.target, dir.multiplyScalar(targetDist));

    animate(camera.position.x, newPos.x, { duration: 0.5, onUpdate: (v) => (camera.position.x = v) });
    animate(camera.position.y, newPos.y, { duration: 0.5, onUpdate: (v) => (camera.position.y = v) });
    animate(camera.position.z, newPos.z, { duration: 0.5, onUpdate: (v) => (camera.position.z = v) });
  };

  const zoomOut = () => {
    if (!controlsRef.current || !sceneRef.current) return;
    const { camera } = sceneRef.current;
    const controls = controlsRef.current;

    const currentDist = camera.position.distanceTo(controls.target);
    const targetDist = Math.min(controls.maxDistance, currentDist * 1.35);
    const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
    const newPos = new THREE.Vector3().addVectors(controls.target, dir.multiplyScalar(targetDist));

    animate(camera.position.x, newPos.x, { duration: 0.5, onUpdate: (v) => (camera.position.x = v) });
    animate(camera.position.y, newPos.y, { duration: 0.5, onUpdate: (v) => (camera.position.y = v) });
    animate(camera.position.z, newPos.z, { duration: 0.5, onUpdate: (v) => (camera.position.z = v) });
  };

  return (
    <section
      ref={sectionRef}
      id="inspector"
      className="relative py-28 sm:py-36 md:py-44 bg-gradient-to-b from-[#0C0B0A] via-[#121110] to-[#0A0908] text-white overflow-hidden select-none border-t border-gold/15"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-white/10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs font-mono tracking-[0.28em] uppercase font-semibold">
                05 // INTERACTIVE 360° INSPECTOR
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.15] font-semibold"
            >
              360° Architectural <br />
              <span className="gold-text italic">Spatial Inspection.</span>
            </motion.h2>
          </div>

          {/* 1, 2, 3, 4 Corner Navigation & Automated Tour Button */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={toggleGuidedTour}
              className={`px-4 py-2.5 text-xs font-mono uppercase tracking-widest rounded-full border transition-all duration-300 flex items-center gap-2 shadow-lg ${
                isTourActive
                  ? "border-amber-400 bg-amber-400 text-black font-bold shadow-amber-400/30 animate-pulse"
                  : "border-gold/60 text-gold bg-gold/10 hover:bg-gold hover:text-black font-semibold"
              }`}
            >
              <span>{isTourActive ? "⏸ PAUSE GUIDED TOUR" : "🎬 START AUTOMATED 3D TOUR"}</span>
            </button>

            {cameraPresets.map((preset) => {
              const isActive = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setIsTourActive(false);
                    applyPreset(preset.id);
                  }}
                  className={`px-3.5 py-2 text-xs font-mono uppercase tracking-widest rounded-full border transition-all duration-300 ${
                    isActive
                      ? "border-gold bg-gold text-black font-semibold shadow-lg shadow-gold/20"
                      : "border-white/15 text-gray-400 hover:text-white hover:border-gold/40 bg-white/[0.02]"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3D CANVAS FRAME WITH SCROLL ENTRANCE ── */}
        <motion.div
          style={{
            x: frameX,
            y: frameY,
            rotateX: frameRotateX,
            scale: frameScale,
            opacity: frameOpacity,
          }}
          className="perspective-1000 relative"
        >
          <div className="relative h-[500px] sm:h-[600px] lg:h-[650px] w-full rounded-2xl overflow-hidden border border-gold/40 bg-[#141210] shadow-2xl shadow-black">

            {/* Interactive Canvas */}
            <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
              <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full" />

              {!isModelReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#141210] z-30">
                  <div className="text-center space-y-3">
                    <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto" />
                    <p className="text-gold text-xs font-mono tracking-widest uppercase">Loading 3D Apartment Model...</p>
                  </div>
                </div>
              )}

              {/* Interactive 1, 2, 3, 4 Model Hotspot Pins */}
              {isModelReady && (
                <div className="absolute inset-0 pointer-events-none">
                  {roomHotspots.map((spot, i) => {
                    const isActive = activeHotspot?.id === spot.id;
                    const isHovered = hoveredHotspot === spot.id;
                    return (
                      <div
                        key={spot.id}
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2"
                      >
                        <button
                          onClick={() => handleHotspotClick(spot.id)}
                          onMouseEnter={() => setHoveredHotspot(spot.id)}
                          onMouseLeave={() => setHoveredHotspot(null)}
                          className="relative group focus:outline-none"
                        >
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                            isActive
                              ? "bg-gold text-black scale-125 shadow-xl shadow-gold/60 font-extrabold ring-4 ring-gold/30"
                              : "bg-black/80 border-2 border-gold/70 text-gold hover:scale-110 hover:bg-gold hover:text-black"
                          }`}>
                            <span className="text-sm font-mono font-bold">{i + 1}</span>
                          </div>

                          {/* Hover Tooltip */}
                          {isHovered && !isActive && (
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-black/90 text-gold text-[10px] font-mono whitespace-nowrap rounded-md border border-gold/40 shadow-lg pointer-events-none">
                              Fly to Corner {i + 1}: {spot.title}
                            </div>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Guided Tour Status Floating Indicator */}
            {isTourActive && (
              <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <div className="bg-black/85 backdrop-blur-md border border-amber-400/50 px-4 py-2.5 rounded-full text-xs font-mono text-amber-300 flex items-center gap-3 shadow-xl animate-fade-in">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="font-semibold tracking-wider uppercase">
                    AUTOMATED 3D TOUR IN PROGRESS: {cameraPresets.find((p) => p.id === activePreset)?.label || "Overview"}
                  </span>
                </div>
              </div>
            )}

            {/* Top-Right Control Toolbar (Zoom In/Out, Reset, Auto-Rotate) */}
            <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
              <button
                onClick={zoomIn}
                title="Zoom In"
                className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 hover:border-gold text-white hover:text-gold flex items-center justify-center text-lg transition-all duration-300 shadow-lg"
              >
                +
              </button>
              <button
                onClick={zoomOut}
                title="Zoom Out"
                className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 hover:border-gold text-white hover:text-gold flex items-center justify-center text-lg transition-all duration-300 shadow-lg"
              >
                −
              </button>
              <button
                onClick={() => {
                  setIsTourActive(false);
                  applyPreset("full");
                }}
                title="Reset Overview"
                className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 hover:border-gold text-white hover:text-gold flex items-center justify-center text-sm transition-all duration-300 shadow-lg font-mono"
              >
                ↺
              </button>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                title="Toggle Auto Spin"
                className={`px-3 h-10 rounded-full backdrop-blur-md border text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all duration-300 shadow-lg ${
                  autoRotate
                    ? "bg-gold text-black border-gold font-semibold"
                    : "bg-black/70 border-white/20 text-gray-300 hover:text-white hover:border-gold/50"
                }`}
              >
                <span>{autoRotate ? "⏸ SPIN" : "▶ SPIN"}</span>
              </button>
            </div>

            {/* Bottom Telemetry & Navigation Hints */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-20 pointer-events-none">
              <div className="bg-black/70 backdrop-blur-md border border-gold/30 px-4 py-2 rounded-full text-xs font-mono text-gold flex items-center gap-3 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                <span>YAW: {azimuthDeg}° | PITCH: {polarDeg}°</span>
              </div>
              <div className="bg-black/70 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-[11px] font-mono text-gray-300 shadow-lg hidden md:flex items-center gap-3">
                <span>CLICK 1-4: Corner Tour</span>
                <span className="text-gold/50">•</span>
                <span>DRAG: 360° Orbit</span>
                <span className="text-gold/50">•</span>
                <span>SCROLL/PINCH: Zoom</span>
              </div>
            </div>

            {/* Material Inspection Drawer */}
            <AnimatePresence>
              {activeHotspot && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-20 right-6 md:right-10 md:w-[380px] z-30 pointer-events-auto"
                >
                  <div className="p-6 bg-black/90 backdrop-blur-xl rounded-xl border border-gold/40 shadow-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gold text-[10px] font-mono tracking-widest uppercase font-semibold">
                        {activeHotspot.category}
                      </span>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="text-white/60 hover:text-white text-xs font-mono"
                      >
                        ✕
                      </button>
                    </div>

                    <h3 className="font-serif-luxury text-xl text-white font-semibold">
                      {activeHotspot.title}
                    </h3>
                    <p className="text-gray-300 text-xs font-light leading-relaxed">
                      {activeHotspot.desc}
                    </p>

                    <div className="pt-3 border-t border-white/10 space-y-1.5">
                      {activeHotspot.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-mono text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
