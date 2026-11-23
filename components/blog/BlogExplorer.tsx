"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Search, Tag, X } from "lucide-react";

export interface PostCard {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  author: string;
  image: string;
}

const PAGE_SIZE = 6;
const ALL = "All Topics";

function pageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

export default function BlogExplorer({ posts, categories }: { posts: PostCard[]; categories: string[] }) {
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hydrated, setHydrated] = useState(false);
  const gridTop = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const inCat = category === ALL || p.category === category;
      const inQuery = !q || `${p.title} ${p.excerpt} ${p.category} ${p.author}`.toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [posts, category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const counts = useMemo(() => {
    const c: Record<string, number> = { [ALL]: posts.length };
    for (const p of posts) c[p.category] = (c[p.category] || 0) + 1;
    return c;
  }, [posts]);

  // Restore filters from a shared URL (?category=…&q=…&page=…). The default view is
  // rendered statically, so crawlers and first paint get real article cards.
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect -- one-time sync from the URL on mount */
    if (sp.get("category")) setCategory(sp.get("category")!);
    if (sp.get("q")) setQuery(sp.get("q")!);
    if (Number(sp.get("page")) > 1) setPage(Number(sp.get("page")));
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Keep the URL in sync (shareable) without a navigation round-trip.
  useEffect(() => {
    if (!hydrated) return;
    const sp = new URLSearchParams();
    if (category !== ALL) sp.set("category", category);
    if (query.trim()) sp.set("q", query.trim());
    if (current > 1) sp.set("page", String(current));
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [category, query, current, hydrated]);

  const goTo = (p: number) => {
    setPage(p);
    gridTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseCategory = (c: string) => {
    setCategory(c);
    setPage(1);
  };

  return (
    <div>
      <div ref={gridTop} className="scroll-mt-28" />

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div className="flex gap-2.5 overflow-x-auto lg:flex-wrap pb-2 no-scrollbar -mx-5 px-5 lg:mx-0 lg:px-0" role="tablist" aria-label="Filter by topic">
          {[ALL, ...categories].map((tag) => {
            const active = category === tag;
            return (
              <button
                key={tag}
                role="tab"
                aria-selected={active}
                onClick={() => chooseCategory(tag)}
                className={`px-4 py-2 rounded-full font-plus-jakarta-sans text-[14px] whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                  active
                    ? "bg-[#0D0D1F] text-white border-[#0D0D1F] shadow-[0_8px_24px_rgba(13,13,31,0.18)]"
                    : "bg-white/70 border-[rgba(139,63,255,0.18)] text-[#4A5568] hover:text-[#0D0D1F] hover:border-[#8B3FFF]/50"
                }`}
              >
                {tag}
                <span className={`ml-1.5 text-[11px] font-space-mono ${active ? "text-white/70" : "text-[#718096]"}`}>{counts[tag] ?? 0}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-[320px] shrink-0">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#718096] pointer-events-none" size={18} />
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <input
            id="blog-search"
            type="search"
            placeholder="Search articles…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            className="glass-input w-full h-[50px] !pl-12 !pr-10 !rounded-full"
          />
          {query && (
            <button onClick={() => { setQuery(""); setPage(1); }} aria-label="Clear search" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#718096] hover:text-[#0D0D1F]">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <p className="font-space-mono text-[12px] text-[#718096] mb-6" aria-live="polite">
        {filtered.length === 0
          ? "No articles match your filters."
          : `Showing ${(current - 1) * PAGE_SIZE + 1}–${Math.min(current * PAGE_SIZE, filtered.length)} of ${filtered.length} article${filtered.length === 1 ? "" : "s"}`}
      </p>

      {/* Grid */}
      {visible.length > 0 ? (
        <div key={`${category}-${query}-${current}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 page-enter">
          {visible.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-card !p-0 overflow-hidden h-full group flex flex-col hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(139,63,255,0.14)] hover:border-[#8B3FFF]/40 transition-all duration-500"
            >
              <div className="w-full h-[200px] overflow-hidden relative">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                  priority={current === 1 && i < 3}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 flex items-center gap-1.5 text-white bg-[#0D0D1F]/75 backdrop-blur-md px-3 py-1 rounded-full font-space-mono text-[10px] uppercase tracking-wider">
                  <Tag size={10} /> {post.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-space-mono text-[11px] text-[#0891B2]">{post.date}</span>
                  <span className="font-inter text-[#718096] text-[12px]">{post.readTime}</span>
                </div>
                <h3 className="font-plus-jakarta-sans font-bold text-[18px] text-[#0D0D1F] leading-[1.4] mb-3 group-hover:text-[#6D28D9] transition-colors">
                  {post.title}
                </h3>
                <div className="flex-1 mb-6"><p className="font-inter text-[#4A5568] text-[15px] leading-[1.6] line-clamp-3">{post.excerpt}</p></div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[rgba(139,63,255,0.1)]">
                  <span className="font-space-mono text-[11px] text-[#4A5568]">{post.author}</span>
                  <ArrowRight size={18} className="text-[#0D0D1F] group-hover:text-[#6D28D9] group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-card">
          <p className="font-inter text-[#4A5568] mb-4">Nothing found for your search.</p>
          <button onClick={() => { setQuery(""); chooseCategory(ALL); }} className="btn-ghost">Reset filters</button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Pagination">
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 1}
            className="w-11 h-11 rounded-full border border-[rgba(139,63,255,0.2)] bg-white flex items-center justify-center text-[#0D0D1F] hover:border-[#8B3FFF] disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          {pageList(current, totalPages).map((p, idx) =>
            p === "…" ? (
              <span key={`gap-${idx}`} className="px-2 text-[#718096]">…</span>
            ) : (
              <button
                key={p}
                onClick={() => goTo(p)}
                aria-current={p === current ? "page" : undefined}
                className={`min-w-11 h-11 px-3 rounded-full font-space-mono text-[14px] transition-all ${
                  p === current
                    ? "bg-gradient-to-r from-[#050DEB] via-[#8B3FFF] to-[#FB00DF] text-white shadow-[0_8px_24px_rgba(139,63,255,0.35)]"
                    : "border border-[rgba(139,63,255,0.2)] bg-white text-[#0D0D1F] hover:border-[#8B3FFF]"
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => goTo(current + 1)}
            disabled={current === totalPages}
            className="w-11 h-11 rounded-full border border-[rgba(139,63,255,0.2)] bg-white flex items-center justify-center text-[#0D0D1F] hover:border-[#8B3FFF] disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </nav>
      )}
    </div>
  );
}
