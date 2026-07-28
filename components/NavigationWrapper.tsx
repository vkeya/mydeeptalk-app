"use client";

import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const NO_LAYOUT_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/verify-email",
  "/onboarding",
];
export default function NavigationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = NO_LAYOUT_ROUTES.some(
  (route) => pathname === route || pathname.startsWith(route + "/")
);

if (hideLayout) {
  return <>{children}</>;
}

  return (
    <>
      <TopBar />
      <Navbar />
      {children}
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
