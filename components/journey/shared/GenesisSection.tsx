"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface GenesisSectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
}

export default function GenesisSection({
  title,
  subtitle,
  children,
  className,
  centered = true,
}: GenesisSectionProps) {
  return (
    <section
      className={clsx(
        "mx-auto w-full max-w-5xl space-y-8",
        className
      )}
    >
      {(title || subtitle) && (
        <div
          className={clsx(
            "space-y-3",
            centered ? "text-center" : "text-left"
          )}
        >
          {title && (
            <h2 className="text-3xl font-bold text-slate-900">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}