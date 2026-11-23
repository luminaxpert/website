"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Thin gradient bar at the top of the viewport that starts the instant an
 * internal link is clicked and completes when the new route has rendered.
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  // Path we were on when navigation started; null when idle.
  const [pendingFrom, setPendingFrom] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      setPendingFrom(window.location.pathname);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  const finished = pendingFrom !== null && pendingFrom !== pathname;

  // Once the new route is on screen, let the bar fill & fade, then reset.
  useEffect(() => {
    if (!finished) return;
    const t = setTimeout(() => setPendingFrom(null), 450);
    return () => clearTimeout(t);
  }, [finished]);

  if (pendingFrom === null) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[300] pointer-events-none" aria-hidden>
      <div
        className="h-full origin-left bg-gradient-to-r from-[#050DEB] via-[#8B3FFF] to-[#FB00DF] shadow-[0_0_12px_rgba(139,63,255,0.6)]"
        style={
          finished
            ? { transform: "scaleX(1)", opacity: 0, transition: "transform 0.2s ease, opacity 0.3s ease 0.15s" }
            : { animation: "nav-progress 2.5s cubic-bezier(0.16,1,0.3,1) forwards" }
        }
      />
    </div>
  );
}
