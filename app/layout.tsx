import type { Metadata } from "next";
import { Fraunces, Nunito, Dancing_Script } from "next/font/google";
import "./globals.css";

import NavigationWrapper from "@/components/NavigationWrapper";
import { Analytics } from "@vercel/analytics/react";
import JsonLd from "@/components/JsonLd";

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
   title: "MyDeepTalk | Connect With Professional Therapists Online",
  description:
    "MyDeepTalk connects you with verified therapists for confidential online counselling, relationship therapy, mental wellness support, and personal growth.",
  keywords: [
    "online therapy",
    "counselling",
    "mental health",
    "relationship therapy",
    "therapists",
    "Africa therapy platform",
    "professional counsellors",
	"marriage counselling",
	"parenting",
	"addictions",
	"substance abuse",
	"pornography addiction",
	"teenage parenting",
	"cheating partner",
	"polygamy therapy",
  ],
  
    metadataBase: new URL("https://mydeeptalk.com"),
	
  openGraph: {
    title: "MyDeepTalk | Professional Online Therapy Platform",
    description:
      "Find verified therapists and access confidential mental health support through MyDeepTalk.",
    url: "https://mydeeptalk.com",
    siteName: "MyDeepTalk",
	images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MyDeepTalk Online Therapy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
   twitter: {
    card: "summary_large_image",
    title: "MyDeepTalk | Online Therapy Platform",
    description:
      "Connect with verified therapists through MyDeepTalk.",
    images: ["/og-image.png"],
  },
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
	  
	   <JsonLd />

        <NavigationWrapper>
          <main className="min-h-screen">
            {children}
          </main>
        </NavigationWrapper>
		
		<Analytics />

      </body>
    </html>
  );
}