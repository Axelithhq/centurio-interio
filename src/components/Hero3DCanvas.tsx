"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // WebGL support check
    try {
      const testCanvas = document.createElement("canvas");
      if (!window.WebGLRenderingContext || (!testCanvas.getContext("webgl") && !testCanvas.getContext("experimental-webgl"))) {
        setWebGlSupported(false);
        return;
      }
    } catch (e) {
      setWebGlSupported(false);
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0d0d0d");
    scene.fog = new THREE.FogExp2("#0d0d0d", 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.8, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 0.6);
    scene.add(ambientLight);

    // Warm Sunbeam Light through window
    const sunLight = new THREE.DirectionalLight(0xffe8c6, 2.5);
    sunLight.position.set(6, 8, 4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    // Brass Lamp Point Light
    const lampLight = new THREE.PointLight(0xc8a96a, 2, 8);
    lampLight.position.set(0, 3.2, 0);
    scene.add(lampLight);

    // Soft Blue Fill Light
    const fillLight = new THREE.DirectionalLight(0x7bb3e8, 0.4);
    fillLight.position.set(-8, 4, -4);
    scene.add(fillLight);

    // 3. Materials
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.2,
      metalness: 0.1,
    });

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x161616,
      roughness: 0.8,
    });

    const woodPanelMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d3024,
      roughness: 0.5,
    });

    const velvetMaterial = new THREE.MeshStandardMaterial({
      color: 0x242424,
      roughness: 0.9,
    });

    const marbleMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f3ee,
      roughness: 0.15,
      metalness: 0.05,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc8a96a,
      roughness: 0.25,
      metalness: 0.85,
    });

    // 4. Room Construction
    const roomGroup = new THREE.Group();

    // Floor (Marble Tiles Grid)
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMesh = new THREE.Mesh(floorGeo, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1;
    floorMesh.receiveShadow = true;
    roomGroup.add(floorMesh);

    // Back Wall with Architectural Fluted Slats
    const backWallGeo = new THREE.PlaneGeometry(16, 8);
    const backWall = new THREE.Mesh(backWallGeo, wallMaterial);
    backWall.position.set(0, 3, -6);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    // Wood Fluted Paneling on left side of back wall
    for (let i = -6; i < -1; i += 0.22) {
      const slatGeo = new THREE.BoxGeometry(0.14, 8, 0.08);
      const slat = new THREE.Mesh(slatGeo, woodPanelMaterial);
      slat.position.set(i, 3, -5.92);
      slat.castShadow = true;
      roomGroup.add(slat);
    }

    // Modern Curved Sofa
    const sofaGroup = new THREE.Group();
    sofaGroup.position.set(0, -0.6, -1);

    // Main Base Cushion
    const sofaBaseGeo = new THREE.BoxGeometry(4.2, 0.55, 1.8);
    const sofaBase = new THREE.Mesh(sofaBaseGeo, velvetMaterial);
    sofaBase.position.y = 0.27;
    sofaBase.castShadow = true;
    sofaBase.receiveShadow = true;
    sofaGroup.add(sofaBase);

    // Backrest
    const backrestGeo = new THREE.BoxGeometry(4.2, 0.8, 0.45);
    const backrest = new THREE.Mesh(backrestGeo, velvetMaterial);
    backrest.position.set(0, 0.85, -0.65);
    backrest.castShadow = true;
    sofaGroup.add(backrest);

    // Throw Pillows
    const pillowGeo = new THREE.BoxGeometry(0.6, 0.6, 0.25);
    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xc8a96a, roughness: 0.7 });
    const pillow1 = new THREE.Mesh(pillowGeo, pillowMat);
    pillow1.position.set(-1.4, 0.75, -0.4);
    pillow1.rotation.y = 0.2;
    pillow1.castShadow = true;
    sofaGroup.add(pillow1);

    const pillow2 = new THREE.Mesh(pillowGeo, velvetMaterial);
    pillow2.position.set(1.4, 0.75, -0.4);
    pillow2.rotation.y = -0.25;
    pillow2.castShadow = true;
    sofaGroup.add(pillow2);

    roomGroup.add(sofaGroup);

    // Marble Coffee Table
    const tableGroup = new THREE.Group();
    tableGroup.position.set(0, -0.75, 1.2);

    const tableTopGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.08, 32);
    const tableTop = new THREE.Mesh(tableTopGeo, marbleMaterial);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    const tableRimGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 32);
    const tableRim = new THREE.Mesh(tableRimGeo, brassMaterial);
    tableRim.rotation.x = Math.PI / 2;
    tableGroup.add(tableRim);

    const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.5, 16);
    for (let angle = 0; angle < Math.PI * 2; angle += (Math.PI * 2) / 3) {
      const leg = new THREE.Mesh(legGeo, brassMaterial);
      leg.position.set(Math.cos(angle) * 0.9, -0.25, Math.sin(angle) * 0.9);
      leg.castShadow = true;
      tableGroup.add(leg);
    }

    roomGroup.add(tableGroup);

    // Brass Pendant Lamp
    const lampGroup = new THREE.Group();
    lampGroup.position.set(0, 3.2, 0);

    const rodGeo = new THREE.CylinderGeometry(0.015, 0.015, 2.5, 8);
    const rod = new THREE.Mesh(rodGeo, brassMaterial);
    rod.position.y = 1.25;
    lampGroup.add(rod);

    const shadeGeo = new THREE.ConeGeometry(0.7, 0.35, 32);
    const shade = new THREE.Mesh(shadeGeo, brassMaterial);
    shade.rotation.x = Math.PI;
    shade.castShadow = true;
    lampGroup.add(shade);

    roomGroup.add(lampGroup);

    // Floating Dust Particles in Light Beam
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = Math.random() * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe8d3a7,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    roomGroup.add(particleSystem);

    scene.add(roomGroup);

    // 5. Mouse Parallax Easing
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 1.8;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX = x;
      mouseY = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetCameraX = mouseX * 1.6;
      targetCameraY = 1.8 - mouseY * 0.8;

      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.lookAt(0, 0.4, 0);

      // Subtle slow room idle drift
      roomGroup.rotation.y = Math.sin(elapsedTime * 0.3) * 0.04;

      // Animate dust particles
      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += Math.sin(elapsedTime + i) * 0.002;
        if (positions[i] > 5) positions[i] = 0;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[600px] overflow-hidden">
      {webGlSupported ? (
        <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* Volumetric Ray Lighting Overlay Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-charcoal via-transparent to-gold/10 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal" />
    </div>
  );
}
