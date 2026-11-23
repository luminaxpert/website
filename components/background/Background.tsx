"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { SceneVariant } from "./BackgroundScene";

// three.js + R3F (~200 KB gz) are code-split and fetched only after the page is
// interactive, so they never compete with first paint or hydration.
const BackgroundScene = dynamic(() => import("./BackgroundScene"), { ssr: false });

// Routes that render their own full-bleed surface and don't need the scene.
const HIDDEN_ROUTES = ["/get-started", "/booking"];

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Background() {
  const pathname = usePathname() || "/";
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduced || saveData || !supportsWebGL()) return;

    const start = () => setEnabled(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 800);
    return () => clearTimeout(id);
  }, []);

  const hidden = HIDDEN_ROUTES.some((r) => pathname.startsWith(r));
  const variant: SceneVariant = pathname === "/" ? "hero" : "page";

  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* CSS aurora: renders instantly, and is the full experience for reduced-motion users */}
      <div className="aurora" />
      {enabled && !hidden && (
        <div className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${visible ? "opacity-100" : "opacity-0"}`}>
          <BackgroundScene variant={variant} routeKey={pathname} onReady={() => setVisible(true)} />
        </div>
      )}
    </div>
  );
}
