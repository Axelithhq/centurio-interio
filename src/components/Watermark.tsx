"use client";

export default function Watermark() {
  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] pointer-events-none select-none"
      style={{ opacity: 0.2 }}
    >
      <span className="text-xs tracking-[0.3em] text-black uppercase font-poppins">
        AXELITH DEMO WEBSITE
      </span>
    </div>
  );
}
