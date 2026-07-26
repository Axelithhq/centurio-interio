"use client";

import { useEffect, useRef, useState } from "react";

export default function Background3D() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const rafRef = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const mx = (mousePos.x - 0.5) * 2;
  const my = (mousePos.y - 0.5) * 2;

  return (
    <div
      className="pointer-events-none"
      style={{ position: "fixed", inset: 0, zIndex: 0, perspective: "1200px" }}
    >
      <div style={{ position: "absolute", inset: 0 }}>

        {/* ═══ GRADIENT MESHES — visible glow on all backgrounds ═══ */}
        <div style={{
          position: "absolute", width: "1000px", height: "1000px", borderRadius: "50%",
          top: "5%", left: "10%",
          background: "radial-gradient(circle, rgba(200,169,106,0.22) 0%, rgba(200,169,106,0.08) 40%, transparent 65%)",
          filter: "blur(80px)",
          transform: `translate(${mx * -40}px, ${my * -40}px)`,
          transition: "transform 1s cubic-bezier(.03,.98,.52,.99)",
          animation: "meshFloat1 18s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: "800px", height: "800px", borderRadius: "50%",
          top: "35%", right: "5%",
          background: "radial-gradient(circle, rgba(232,211,167,0.18) 0%, rgba(232,211,167,0.06) 45%, transparent 60%)",
          filter: "blur(70px)",
          transform: `translate(${mx * 30}px, ${my * 30}px)`,
          transition: "transform 1.2s cubic-bezier(.03,.98,.52,.99)",
          animation: "meshFloat2 22s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: "900px", height: "900px", borderRadius: "50%",
          bottom: "0%", left: "25%",
          background: "radial-gradient(circle, rgba(200,169,106,0.16) 0%, rgba(200,169,106,0.05) 50%, transparent 70%)",
          filter: "blur(90px)",
          transform: `translate(${mx * -25}px, ${my * -25}px)`,
          transition: "transform 1.4s cubic-bezier(.03,.98,.52,.99)",
          animation: "meshFloat3 20s ease-in-out infinite",
        }} />

        {/* ═══ PERSPECTIVE GRID ═══ */}
        <div style={{
          position: "absolute", inset: 0,
          transform: `perspective(600px) rotateX(65deg) translateY(${(-scrollY * 0.15) % 80}px)`,
          transformOrigin: "center bottom",
          opacity: 0.1,
        }}>
          <div style={{
            width: "250%", height: "250%", marginLeft: "-75%",
            backgroundImage: "linear-gradient(rgba(200,169,106,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,106,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>

        {/* ═══ WIREFRAME SPHERE — top right ═══ */}
        <div style={{
          position: "absolute", top: "8%", right: "6%",
          width: "200px", height: "200px",
          perspective: "600px", opacity: 0.2,
          transform: `translate(${mx * 15}px, ${my * 15}px)`,
          transition: "transform 0.6s ease",
          filter: "drop-shadow(0 0 20px rgba(200,169,106,0.3))",
        }}>
          <div style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" as const, animation: "rotateSphere 25s linear infinite" }}>
            {[0, 30, 60, 90, 120, 150].map(d => (
              <div key={d} style={{
                position: "absolute", inset: 0,
                border: "1.5px solid rgba(200,169,106,0.7)",
                borderRadius: "50%",
                transform: `rotateY(${d}deg)`,
              }} />
            ))}
          </div>
        </div>

        {/* ═══ WIREFRAME CUBE — bottom left ═══ */}
        <div style={{
          position: "absolute", bottom: "15%", left: "4%",
          width: "120px", height: "120px",
          perspective: "500px", opacity: 0.18,
          transform: `translate(${mx * -20}px, ${my * -20}px)`,
          transition: "transform 0.6s ease",
          filter: "drop-shadow(0 0 15px rgba(200,169,106,0.25))",
        }}>
          <div style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" as const, animation: "rotateCube 18s linear infinite" }}>
            {[
              "translateZ(60px)", "translateZ(-60px) rotateY(180deg)",
              "translateX(60px) rotateY(90deg)", "translateX(-60px) rotateY(-90deg)",
              "translateY(-60px) rotateX(90deg)", "translateY(60px) rotateX(-90deg)",
            ].map((t, i) => (
              <div key={i} style={{
                position: "absolute", width: "120px", height: "120px",
                border: "1.5px solid rgba(200,169,106,0.6)",
                transform: t,
              }} />
            ))}
          </div>
        </div>

        {/* ═══ INTERSECTING RINGS — center left ═══ */}
        <div style={{
          position: "absolute", top: "55%", left: "3%",
          width: "160px", height: "160px",
          perspective: "500px", opacity: 0.18,
          transform: `translateY(${-scrollY * 0.08}px)`,
          transition: "transform 0.3s ease",
          filter: "drop-shadow(0 0 12px rgba(200,169,106,0.2))",
        }}>
          <div style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" as const, animation: "rotateRings 14s ease-in-out infinite" }}>
            {[0, 60, 120].map(d => (
              <div key={d} style={{
                position: "absolute", inset: 0,
                border: "1.5px solid rgba(200,169,106,0.6)",
                borderRadius: "50%",
                transform: `rotateX(${d}deg) rotateY(${d / 2}deg)`,
              }} />
            ))}
          </div>
        </div>

        {/* ═══ DIAMOND OCTAHEDRON — right middle ═══ */}
        <div style={{
          position: "absolute", top: "65%", right: "10%",
          width: "140px", height: "140px",
          perspective: "500px", opacity: 0.18,
          transform: `translateY(${-scrollY * 0.06}px) translate(${mx * 10}px, ${my * 10}px)`,
          transition: "transform 0.5s ease",
          filter: "drop-shadow(0 0 12px rgba(200,169,106,0.2))",
        }}>
          <div style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" as const, animation: "rotateOctahedron 16s ease-in-out infinite" }}>
            <div style={{ position: "absolute", inset: 0, border: "1.5px solid rgba(200,169,106,0.6)", transform: "rotateX(60deg)" }} />
            <div style={{ position: "absolute", inset: 0, border: "1.5px solid rgba(200,169,106,0.5)", transform: "rotateY(60deg)" }} />
            <div style={{ position: "absolute", inset: 0, border: "1.5px solid rgba(200,169,106,0.45)", transform: "rotateZ(60deg) rotateX(30deg)" }} />
            <div style={{ position: "absolute", inset: 0, border: "1.5px solid rgba(200,169,106,0.4)", transform: "rotateZ(45deg) rotateY(45deg)" }} />
          </div>
        </div>

        {/* ═══ LARGE ROTATING SQUARE — top center ═══ */}
        <div style={{
          position: "absolute", top: "-5%", left: "40%",
          width: "280px", height: "280px",
          perspective: "800px", opacity: 0.1,
          transform: `translateY(${-scrollY * 0.12}px)`,
          transition: "transform 0.3s ease",
          filter: "drop-shadow(0 0 10px rgba(200,169,106,0.15))",
        }}>
          <div style={{
            width: "100%", height: "100%",
            border: "1.5px solid rgba(200,169,106,0.4)",
            animation: "rotateSquare 30s linear infinite",
            transformStyle: "preserve-3d" as const,
          }} />
        </div>

        {/* ═══ FLOATING CROSS — bottom right ═══ */}
        <div style={{
          position: "absolute", bottom: "10%", right: "20%",
          opacity: 0.15,
          transform: `translateY(${-scrollY * 0.05}px)`,
          filter: "drop-shadow(0 0 8px rgba(200,169,106,0.2))",
        }}>
          <div style={{
            width: "100px", height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(200,169,106,0.7), transparent)",
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "rotateCross 10s linear infinite",
          }} />
          <div style={{
            width: "2px", height: "100px",
            background: "linear-gradient(180deg, transparent, rgba(200,169,106,0.7), transparent)",
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "rotateCross 10s linear infinite",
          }} />
        </div>

        {/* ═══ FLOATING TRIANGLE — mid-left ═══ */}
        <div style={{
          position: "absolute", top: "40%", left: "8%",
          opacity: 0.14, perspective: "400px",
          transform: `translateY(${-scrollY * 0.09}px)`,
          transition: "transform 0.3s ease",
          filter: "drop-shadow(0 0 10px rgba(200,169,106,0.2))",
        }}>
          <div style={{
            width: 0, height: 0,
            borderLeft: "35px solid transparent",
            borderRight: "35px solid transparent",
            borderBottom: "60px solid rgba(200,169,106,0.4)",
            animation: "rotateTriangle 12s ease-in-out infinite",
          }} />
        </div>

        {/* ═══ PARTICLE ORBIT — center ═══ */}
        <div style={{
          position: "absolute", top: "30%", left: "55%",
          width: "240px", height: "240px", opacity: 0.18,
          transform: `translateY(${-scrollY * 0.07}px)`,
          transition: "transform 0.3s ease",
        }}>
          <div style={{ width: "100%", height: "100%", position: "relative" as const, animation: "orbitSpin 20s linear infinite" }}>
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <div key={i} style={{
                position: "absolute", top: "50%", left: "50%",
                width: "10px", height: "10px", borderRadius: "50%",
                background: "rgba(200,169,106,0.6)",
                boxShadow: "0 0 18px rgba(200,169,106,0.5)",
                transform: `rotate(${deg}deg) translateX(110px) rotate(-${deg}deg)`,
                animation: `dotPulse ${2 + i * 0.4}s ease-in-out ${i * 0.2}s infinite`,
              }} />
            ))}
            <div style={{
              position: "absolute", inset: 0,
              border: "1.5px dashed rgba(200,169,106,0.3)",
              borderRadius: "50%",
            }} />
          </div>
        </div>

        {/* ═══ DOUBLE PULSE RING — bottom center ═══ */}
        <div style={{
          position: "absolute", bottom: "5%", left: "45%",
          opacity: 0.14, perspective: "400px",
          transform: `translateY(${-scrollY * 0.04}px)`,
          transition: "transform 0.3s ease",
        }}>
          <div style={{
            width: "120px", height: "120px",
            border: "1.5px solid rgba(200,169,106,0.5)",
            borderRadius: "50%", position: "absolute",
            boxShadow: "0 0 15px rgba(200,169,106,0.2)",
            animation: "pulseRing 4s ease-in-out infinite",
          }} />
          <div style={{
            width: "160px", height: "160px",
            border: "1.5px solid rgba(200,169,106,0.35)",
            borderRadius: "50%", position: "absolute",
            top: "-20px", left: "-20px",
            boxShadow: "0 0 12px rgba(200,169,106,0.15)",
            animation: "pulseRing 4s ease-in-out 1s infinite",
          }} />
        </div>

        {/* ═══ SCATTERED DOTS ═══ */}
        {[
          { x: 15, y: 20, s: 8, d: 0.15, o: 0.5 },
          { x: 80, y: 35, s: 7, d: 0.08, o: 0.4 },
          { x: 35, y: 70, s: 10, d: 0.12, o: 0.45 },
          { x: 65, y: 15, s: 6, d: 0.2, o: 0.35 },
          { x: 90, y: 60, s: 9, d: 0.06, o: 0.42 },
          { x: 10, y: 85, s: 7, d: 0.18, o: 0.38 },
          { x: 50, y: 45, s: 11, d: 0.1, o: 0.25 },
          { x: 75, y: 80, s: 6, d: 0.22, o: 0.4 },
          { x: 25, y: 50, s: 8, d: 0.14, o: 0.45 },
          { x: 45, y: 90, s: 9, d: 0.07, o: 0.35 },
        ].map((dot, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${dot.x}%`, top: `${dot.y}%`,
            width: `${dot.s}px`, height: `${dot.s}px`,
            borderRadius: "50%",
            background: `rgba(200,169,106,${dot.o})`,
            boxShadow: `0 0 ${dot.s * 3}px rgba(200,169,106,${dot.o * 0.6})`,
            transform: `translateY(${-scrollY * dot.d}px)`,
            transition: "transform 0.3s ease",
            animation: `dotPulse ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
          }} />
        ))}

        {/* ═══ HORIZONTAL GOLD LINES ═══ */}
        {[
          { y: 25, w: 220, d: 0.1 },
          { y: 50, w: 180, d: 0.06 },
          { y: 75, w: 250, d: 0.14 },
        ].map((line, i) => (
          <div key={i} style={{
            position: "absolute",
            top: `${line.y}%`, left: "50%",
            width: `${line.w}px`, height: "1.5px",
            background: "linear-gradient(90deg, transparent, rgba(200,169,106,0.4), transparent)",
            boxShadow: "0 0 8px rgba(200,169,106,0.2)",
            transform: `translateX(-50%) translateY(${-scrollY * line.d}px) scaleX(${0.8 + mx * 0.2})`,
            transition: "transform 0.4s ease",
          }} />
        ))}

        {/* ═══ MOUSE GLOW ═══ */}
        <div style={{
          position: "absolute",
          width: "500px", height: "500px", borderRadius: "50%",
          left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(200,169,106,0.18) 0%, rgba(200,169,106,0.06) 40%, transparent 60%)",
          filter: "blur(50px)",
          transition: "left 0.4s ease, top 0.4s ease",
        }} />
      </div>
    </div>
  );
}
