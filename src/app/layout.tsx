import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CENTURIO INTERIOR STUDIO | Ultra-Modern Luxury Architecture & Interiors",
  description:
    "Award-winning luxury interior design & architecture studio crafting ultra-modern residential residences and prestigious commercial environments.",
  keywords:
    "luxury interior design, architecture studio, modern architecture, 3D interior rendering, Jaipur, Rajasthan, bespoke furniture, TURNKEY luxury",
  openGraph: {
    title: "CENTURIO INTERIOR STUDIO | Ultra-Modern Luxury Architecture & Interiors",
    description:
      "Award-winning luxury interior design & architecture studio crafting ultra-modern residential residences and commercial environments.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ivory text-charcoal antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
