import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Watermark from "@/components/Watermark";
import FloatingButtons from "@/components/FloatingButtons";
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  title: "Centurio Design Studio | Premium Interior Design & Architecture",
  description:
    "Premium interior design and architectural solutions in Makrana, Rajasthan. Luxury residential, commercial, and turnkey projects by Centurio Design Studio.",
  keywords:
    "interior design, architecture, Makrana, Rajasthan, residential interiors, commercial interiors, luxury design, turnkey projects",
  openGraph: {
    title: "Centurio Design Studio | Premium Interior Design & Architecture",
    description:
      "Premium interior design and architectural solutions in Makrana, Rajasthan.",
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
    <html lang="en">
      <body className="font-poppins">
        <Loader />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Watermark />
        <FloatingButtons />
      </body>
    </html>
  );
}
