"use client";

export default function Watermark() {
  return (
    <>
      {/* Bottom-right watermark */}
      <div
        className="fixed bottom-4 right-4 z-[9999] pointer-events-none select-none"
        style={{ opacity: 0.2 }}
      >
        <span className="text-xs tracking-[0.3em] text-black uppercase font-poppins">
          AXELITH DEMO WEBSITE
        </span>
      </div>

      {/* Right side vertical watermark */}
      <div
        className="fixed right-3 top-1/2 -translate-y-1/2 z-[9999] pointer-events-none select-none"
        style={{ opacity: 0.08 }}
      >
        <span
          className="text-[11px] tracking-[0.5em] uppercase font-mono text-black whitespace-nowrap"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          AXELITH
        </span>
      </div>

      {/* Left side vertical watermark */}
      <div
        className="fixed left-3 top-1/2 -translate-y-1/2 z-[9999] pointer-events-none select-none"
        style={{ opacity: 0.08 }}
      >
        <span
          className="text-[11px] tracking-[0.5em] uppercase font-mono text-black whitespace-nowrap"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
        >
          AXELITH
        </span>
      </div>
    </>
  );
}
