"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "Philosophy" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Works" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 transition-all duration-700 ${
          scrolled ? "pt-3" : "pt-5"
        }`}
      >
        <div
          className={`relative flex items-center justify-between gap-2 transition-all duration-500 ${
            scrolled
              ? "bg-charcoal/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/30 rounded-full px-2 py-2"
              : "bg-charcoal/40 backdrop-blur-md border border-white/10 rounded-full px-2 py-2.5"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group pl-3 sm:pl-4 shrink-0"
          >
            <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center font-playfair text-gold text-sm font-bold group-hover:bg-gold group-hover:text-charcoal transition-all duration-300">
              C
            </div>
            <div className="hidden sm:block">
              <span className="font-playfair text-base text-white tracking-wide block leading-none">
                CENTURIO
              </span>
              <span className="text-[7px] font-poppins tracking-[0.25em] text-gold/80 uppercase block mt-0.5">
                DESIGNS
              </span>
            </div>
          </Link>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 hidden md:block shrink-0" />

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] font-poppins tracking-widest text-gray-300 uppercase hover:text-gold transition-colors duration-300 px-3 py-2 rounded-full hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center shrink-0">
            <a
              href="#contact"
              className="gold-bg text-white px-5 py-2.5 rounded-full text-[10px] font-poppins tracking-widest uppercase hover:shadow-lg hover:shadow-gold/30 hover:scale-105 transition-all duration-300"
            >
              Get Quote
            </a>
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
            className="fixed inset-x-0 top-[68px] z-50 flex justify-center px-4 sm:px-6 lg:hidden pointer-events-none"
          >
            <div className="bg-charcoal/98 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/40 overflow-hidden w-full max-w-sm pointer-events-auto">
              <div className="p-5 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-4 text-sm font-poppins tracking-widest text-gray-300 hover:text-gold hover:bg-white/5 rounded-2xl uppercase transition-all"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="pt-2 px-4">
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full py-3.5 text-center gold-bg text-white text-xs font-poppins tracking-widest uppercase rounded-full"
                  >
                    Get Quote
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
