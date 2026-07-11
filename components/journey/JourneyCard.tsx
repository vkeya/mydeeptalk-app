import { ReactNode } from "react";

interface JourneyCardProps {
  children: ReactNode;
  className?: string;
}

export default function JourneyCard({
  children,
  className = "",
}: JourneyCardProps) {
  return (
    <div
      className={`
        rounded-3xl
        bg-white
        p-10
        shadow-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
}