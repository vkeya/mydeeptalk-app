"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface GenesisCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export default function GenesisCard({
  children,
  className,
  interactive = false,
  selected = false,
  onClick,
}: GenesisCardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-3xl border bg-white transition-all duration-300",
        "shadow-sm",

        interactive &&
          "cursor-pointer hover:-translate-y-1 hover:shadow-xl",

        selected &&
          "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200 shadow-xl",

        !selected && "border-slate-200",

        className
      )}
    >
      {children}
    </div>
  );
}