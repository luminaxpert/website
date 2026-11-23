"use client";

import { useEffect } from "react";

/**
 * Feeds the cursor position into the hovered card as CSS variables (--mx/--my),
 * powering the spotlight glow + gradient border defined in globals.css.
 * One passive listener for the whole site; touch devices are skipped.
 */
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    let last: PointerEvent | null = null;
    const update = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const card = (e.target as Element | null)?.closest?.(".glass-card, .glass-brand") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
