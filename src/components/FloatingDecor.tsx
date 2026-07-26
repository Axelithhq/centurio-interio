"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FloatingDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {/* 3D Floating Brass Ring */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[18%] left-[6%] w-24 h-24 rounded-full border border-gold/30 backdrop-blur-[2px] hidden md:block"
        style={{
          boxShadow: "0 0 30px rgba(200,169,106,0.15)",
        }}
      >
        <div className="absolute inset-2 rounded-full border border-gold/15" />
      </motion.div>

      {/* 3D Floating Marble Slab Silhouette */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-[60%] right-[5%] w-32 h-44 rounded-sm border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-[4px] hidden lg:block"
      >
        <div className="absolute top-3 left-3 right-3 h-[1px] bg-gold/20" />
        <div className="absolute bottom-4 right-4 text-[9px] tracking-widest text-gold/40 font-mono">
          01 // ARCH
        </div>
      </motion.div>

      {/* 3D Floating Golden Cube Wireframe */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotateX: [0, 360],
          rotateY: [0, 180],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[20%] left-[8%] w-16 h-16 border border-gold/25 hidden md:block"
        style={{ transformStyle: "preserve-3d" }}
      />
    </div>
  );
}
