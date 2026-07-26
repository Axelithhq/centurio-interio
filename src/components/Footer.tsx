"use client";

import Link from "next/link";
import { businessInfo } from "@/lib/data";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-charcoal text-white border-t border-gold/20 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm border border-gold/50 flex items-center justify-center font-serif-luxury text-gold font-bold">
                C
              </div>
              <span className="font-serif-luxury text-2xl tracking-wider text-white">
                CENTURIO
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed font-light">
              Award-winning architectural interior studio crafting bespoke residential sanctuaries and ultra-modern commercial headquarters across Jaipur & Rajasthan.
            </p>
            <div className="pt-2 flex gap-3">
              {["ig", "wa", "fb"].map((social) => (
                <a
                  key={social}
                  href={
                    social === "ig"
                      ? businessInfo.social.instagram
                      : social === "wa"
                      ? businessInfo.social.whatsapp
                      : businessInfo.social.facebook
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm border border-white/10 flex items-center justify-center text-gray-400 hover:border-gold hover:text-gold hover:scale-110 transition-all duration-300"
                >
                  <span className="text-xs uppercase font-mono">{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-mono text-xs text-gold uppercase tracking-widest mb-6">
              Studio Navigation
            </h4>
            <ul className="space-y-3 text-xs font-mono">
              {[
                { href: "#hero", label: "01 // Home Sanctuary" },
                { href: "#about", label: "02 // Design Philosophy" },
                { href: "#services", label: "03 // Services Suite" },
                { href: "#portfolio", label: "04 // Featured Portfolio" },
                { href: "#inspector", label: "05 // 360° Inspector" },
                { href: "#contact", label: "06 // Private Consultation" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-mono text-xs text-gold uppercase tracking-widest mb-6">
              Private Concierge
            </h4>
            <ul className="space-y-4 text-xs font-mono text-gray-400">
              <li className="leading-relaxed">
                <span className="block text-gray-200">Jaipur Studio:</span>
                {businessInfo.address.full}
              </li>
              <li>
                <span className="block text-gray-200">Direct Inquiries:</span>
                <a href={`tel:${businessInfo.phone}`} className="hover:text-gold">
                  {businessInfo.phone}
                </a>
              </li>
              <li>
                <span className="block text-gray-200">Email:</span>
                <a href={`mailto:${businessInfo.email}`} className="hover:text-gold">
                  {businessInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Journal Newsletter */}
          <div>
            <h4 className="font-mono text-xs text-gold uppercase tracking-widest mb-6">
              Architectural Journal
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Receive quarterly insights into European interior trends and rare material curation.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter private email"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="w-full gold-bg text-white py-2.5 rounded-sm text-xs font-mono tracking-widest uppercase hover:shadow-lg hover:shadow-gold/20"
              >
                Subscribe Journal
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>&copy; {new Date().getFullYear()} CENTURIO INTERIOR STUDIO. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gold hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
