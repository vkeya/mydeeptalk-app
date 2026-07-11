import { ReactNode } from "react";
import { JourneyProvider } from "@/context/JourneyContext";

interface JourneyLayoutProps {
  children: ReactNode;
}

export default function JourneyLayout({
  children,
}: JourneyLayoutProps) {
  return (
    <JourneyProvider>
      {children}
    </JourneyProvider>
  );
}