"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";

/** Gradient bar showing how far through the article the reader is. */
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.getElementById("article-body");
      if (!el || !bar.current) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
      bar.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="fixed top-[76px] left-0 right-0 h-[3px] z-40 pointer-events-none" aria-hidden>
      <div ref={bar} className="h-full origin-left bg-gradient-to-r from-[#050DEB] via-[#8B3FFF] to-[#FB00DF]" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

/** Native share sheet where available, plus LinkedIn and copy-link fallbacks. */
export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- feature detection after mount
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const url = () => window.location.href.split("?")[0];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };
  const btn = "w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#4A5568] hover:text-[#0D0D1F] hover:border-[#8B3FFF]/60 transition-all duration-300";

  return (
    <div className="flex items-center gap-2">
      {canShare && (
        <button className={btn} aria-label="Share article" onClick={() => navigator.share({ title, url: url() }).catch(() => {})}>
          <Share2 size={16} />
        </button>
      )}
      <button
        className={`${btn} hover:!text-[#0A66C2]`}
        aria-label="Share on LinkedIn"
        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`, "_blank", "noopener,noreferrer,width=620,height=640")}
      >
        <LinkedInIcon size={15} />
      </button>
      <button className={btn} aria-label={copied ? "Link copied" : "Copy link"} onClick={copy}>
        {copied ? <Check size={16} className="text-[#059669]" /> : <Link2 size={16} />}
      </button>
    </div>
  );
}
