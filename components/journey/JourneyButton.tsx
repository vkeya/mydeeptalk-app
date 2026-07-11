"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface JourneyButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function JourneyButton({
  children,
  className = "",
  ...props
}: JourneyButtonProps) {
  return (
    <button
      {...props}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        bg-[#8A6E4B]
        px-10
        py-4
        text-lg
        font-semibold
        text-white
        transition
        duration-300
        hover:bg-[#73593C]
        disabled:cursor-not-allowed
        disabled:bg-gray-300
        disabled:text-gray-500
        ${className}
      `}
    >
      {children}
    </button>
  );
}