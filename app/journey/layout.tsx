import { ReactNode } from "react";
import { JourneyProvider } from "@/context/JourneyContext";

interface JourneyLayoutProps {
  children: ReactNode;
}

export default function JourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JourneyProvider>
      {children}
    </JourneyProvider>
  );
}