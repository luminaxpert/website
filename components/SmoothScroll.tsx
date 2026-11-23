"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

/**
 * Inertial smooth scrolling for mouse/trackpad users. Touch devices keep their
 * native momentum scrolling, and users who prefer reduced motion are untouched.
 * Add `data-lenis-prevent` to any scrollable overlay (modals, menus).
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let destroyed = false;

    import("lenis").then(({ default: LenisCtor }) => {
      if (destroyed) return;
      const lenis = new LenisCtor({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: { offset: -96 },
        smoothWheel: true,
        wheelMultiplier: 0.95,
      });
      lenisRef.current = lenis;
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // New page: jump to the top (or to the #hash target) without an animated drift.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;
    if (target instanceof HTMLElement) lenis.scrollTo(target, { offset: -96, immediate: true, force: true });
    else lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
