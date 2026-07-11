import { ReactNode } from "react";

interface JourneyLayoutProps {
  children: ReactNode;
}

export default function JourneyLayout({
  children,
}: JourneyLayoutProps) {
  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-16">
      <div className="mx-auto max-w-4xl">
        {children}
      </div>
    </main>
  );
}