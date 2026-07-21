"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface GenesisButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
}

export default function GenesisButton({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  ...props
}: GenesisButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20",
        "disabled:cursor-not-allowed disabled:opacity-50",

        {
          "bg-[#0F4C5C] text-white hover:bg-[#0C3D4A]":
            variant === "primary",

          "border border-slate-200 bg-white text-slate-700 hover:border-[#0F4C5C] hover:text-[#0F4C5C]":
            variant === "secondary",

          "bg-transparent text-slate-600 hover:bg-slate-100":
            variant === "ghost",
        },

        fullWidth && "w-full",

        className
      )}
    >
      {children}
    </button>
  );
}