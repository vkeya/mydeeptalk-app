import type { ReactNode } from "react";

export default function JourneyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-gray-800">
      {children}
    </main>
  );
}