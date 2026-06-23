import type { Metadata } from "next";
import { Fraunces, Nunito, Dancing_Script } from "next/font/google";
import "./globals.css";

import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MyDeepTalk",
  description:
    "AI-powered emotional wellness and therapist support built in Africa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${nunito.variable} ${dancingScript.variable}`}
    >
      <body className="bg-[#F7F3EC] text-gray-800">

        {/* Top contact bar */}

        <TopBar />

        {/* Navbar */}

        <Navbar />

        {/* Main Content */}

        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}

        <Footer />

      </body>
    </html>
  );
}