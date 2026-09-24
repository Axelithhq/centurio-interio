import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Watermark from "@/components/Watermark";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://centurio-interior.com"),
  title: "CENTURIO INTERIOR STUDIO | Ultra-Modern Luxury Architecture & Interiors",
  description:
    "Award-winning luxury interior design & architecture studio crafting ultra-modern residential residences and prestigious commercial environments.",
  keywords:
    "luxury interior design, architecture studio, modern architecture, 3D interior rendering, Jaipur, Rajasthan, bespoke furniture, TURNKEY luxury",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    title: "CENTURIO INTERIOR STUDIO | Ultra-Modern Luxury Architecture & Interiors",
    description:
      "Award-winning luxury interior design & architecture studio crafting ultra-modern residential residences and commercial environments.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/logo.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ivory text-charcoal antialiased flex flex-col min-h-screen">
        {/* Global Floating Top Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow">{children}</main>

        {/* Global Bottom Luxury Footer */}
        <Footer />

        {/* Global Floating Action Buttons */}
        <FloatingButtons />

        {/* Watermark */}
        <Watermark />
      </body>
    </html>
  );
}
