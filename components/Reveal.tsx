"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Wrapper element. Defaults to a div. */
  as?: ElementType;
  /** Entrance direction. */
  variant?: "up" | "left" | "right" | "zoom";
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
  /** Trigger only once (default) or every time it enters the viewport. */
  once?: boolean;
};

/**
 * Scroll-triggered reveal. Wraps server-rendered children and fades/slides
 * them in when they enter the viewport. Styling lives in globals.css
 * ([data-reveal] / .is-visible) so this stays tiny and motion-pref aware.
 */
export default function Reveal({
  children,
  as,
  variant = "up",
  delay = 0,
  className = "",
  once = true,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-reveal-variant={variant === "up" ? undefined : variant}
      className={`${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
