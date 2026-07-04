import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Watermark from "@/components/Watermark";
import FloatingButtons from "@/components/FloatingButtons";
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  title: "CENTURIO DESIGNS | Premium Interior Design & Architecture in Jaipur",
  description:
    "Premium interior design and architectural solutions in Jaipur, Rajasthan. Luxury residential, commercial, and turnkey projects by CENTURIO DESIGNS.",
  keywords:
    "interior design, architecture, Jaipur, Rajasthan, residential interiors, commercial interiors, luxury design, turnkey projects, CENTURIO DESIGNS",
  openGraph: {
    title: "CENTURIO DESIGNS | Premium Interior Design & Architecture in Jaipur",
    description:
      "Premium interior design and architectural solutions in Jaipur, Rajasthan.",
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
