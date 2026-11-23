"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

// One IntersectionObserver shared by every reveal element on the page — far
// cheaper than a framer-motion instance per element.
let observer: IntersectionObserver | null = null;
function getObserver() {
  if (observer || typeof window === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          observer?.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
  );
  return observer;
}

export default function ScrollReveal({ children, delay = 0, className = "", id }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const obs = getObserver();
    if (!el || !obs) return;
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  const style = { "--reveal-delay": `${Math.min(delay, 0.45)}s` } as CSSProperties;

  return (
    <div ref={ref} id={id} data-reveal="" className={className} style={style}>
      {children}
    </div>
  );
}
