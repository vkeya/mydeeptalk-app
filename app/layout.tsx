import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body className="bg-[#F7F3EC] text-gray-800">

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