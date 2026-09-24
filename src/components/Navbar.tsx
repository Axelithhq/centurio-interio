"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { path: "/about", label: "Philosophy" },
  { path: "/services", label: "Services" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/inspector", label: "360° Studio" },
  { path: "/revelations", label: "Revelations" },
  { path: "/design-process", label: "Process" },
  { path: "/gallery", label: "Gallery" },
  { path: "/testimonials", label: "Clients" },
  { path: "/faq", label: "Guidance" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ─── Desktop / Tablet: Floating Pill Bar ─── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 transition-all duration-700 ${
          scrolled ? "pt-3" : "pt-5"
        }`}
      >
        <div
          className={`relative flex items-center justify-between gap-2 transition-all duration-500 max-w-7xl w-full ${
            scrolled
              ? "bg-[#141210]/95 backdrop-blur-xl border border-gold/30 shadow-2xl shadow-black/40 rounded-full px-3 py-2"
              : "bg-[#141210]/70 backdrop-blur-md border border-white/10 rounded-full px-3 py-2.5"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group pl-2 sm:pl-3 shrink-0"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gold/50 shadow-md group-hover:border-gold group-hover:scale-105 transition-all duration-300 bg-[#141210]">
              <Image
                src="/logo.png"
                alt="CENTURIO DESIGNS Emblem Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-serif-luxury text-base font-bold text-white tracking-wide block leading-none group-hover:text-gold transition-colors">
                CENTURIO
              </span>
              <span className="text-[7.5px] font-mono font-medium tracking-[0.28em] text-gold/90 uppercase block mt-0.5">
                DESIGNS
              </span>
            </div>
          </Link>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 hidden xl:block shrink-0" />

          {/* Desktop Page Navigation Buttons */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.label}
                  href={item.path}
                  className={`text-[10.5px] font-mono tracking-wider uppercase transition-all duration-300 px-3 py-1.5 rounded-full shrink-0 ${
                    isActive
                      ? "bg-gold text-white font-semibold shadow-md shadow-gold/20"
                      : "text-gray-300 hover:text-gold hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Get Quote Action Button */}
          <div className="hidden md:flex items-center shrink-0">
            <Link
              href="/contact"
              className="gold-bg text-white px-5 py-2.5 rounded-full text-[10px] font-mono tracking-widest uppercase hover:shadow-xl hover:shadow-gold/30 hover:scale-105 transition-all duration-300"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 focus:outline-none rounded-full hover:bg-white/10 transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="w-4 h-[1.5px] bg-gold block origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="w-4 h-[1.5px] bg-gold block"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="w-4 h-[1.5px] bg-gold block origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-0 top-[72px] z-50 flex justify-center px-4 sm:px-6 lg:hidden pointer-events-none"
          >
            <div className="bg-[#141210]/98 backdrop-blur-2xl border border-gold/30 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden w-full max-w-sm pointer-events-auto">
              <div className="p-5 space-y-1 max-h-[75vh] overflow-y-auto">
                {navItems.map((item, i) => {
                  const isActive = pathname === item.path;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`block py-2.5 px-4 text-xs font-mono tracking-widest rounded-2xl uppercase transition-all flex items-center justify-between ${
                          isActive
                            ? "bg-gold text-white font-bold"
                            : "text-gray-300 hover:text-gold hover:bg-white/5"
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && <span>✓</span>}
                      </Link>
                    </motion.div>
                  );
                })}
                <div className="pt-3 px-2">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full py-3.5 text-center gold-bg text-white text-xs font-mono tracking-widest uppercase rounded-full shadow-lg"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
