"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface GenesisPanelProps {
  children: ReactNode;
  className?: string;
}

export default function GenesisPanel({
  children,
  className,
}: GenesisPanelProps) {
  return (
    <section
      className={clsx(
        "rounded-3xl bg-gradient-to-br from-indigo-50 to-white",
        "border border-indigo-100 p-8 shadow-sm",
        className
      )}
    >
      {children}
    </section>
  );
}