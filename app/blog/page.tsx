import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import BlogExplorer, { type PostCard } from "@/components/blog/BlogExplorer";
import { SORTED_POSTS, AUTHORS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Insights & Intelligence — AI Strategy, Engineering & Governance",
  description: "Expert perspectives on enterprise AI, MLOps, AI agents, regulation and the future of work from the LuminaXpert founders.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const featured = SORTED_POSTS.find((p) => p.featured) ?? SORTED_POSTS[0];
  const cards: PostCard[] = SORTED_POSTS.filter((p) => p.slug !== featured.slug).map(
    ({ title, excerpt, category, date, readTime, slug, author, image }) => ({ title, excerpt, category, date, readTime, slug, author, image })
  );
  const author = AUTHORS[featured.author];

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* HEADER */}
      <section className="pt-[150px] pb-[60px] relative">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] relative z-10">
          <div className="font-space-mono text-[11px] text-[#E040FB] tracking-[0.3em] uppercase mb-5 animate-slide-up-1">Insights</div>
          <h1 className="font-plus-jakarta-sans font-bold text-[40px] md:text-[64px] leading-[1.05] tracking-tight mb-6 text-[#0D0D1F] animate-slide-up-2">
            Insights &amp; <span className="text-gradient">Intelligence</span>
          </h1>
          <p className="font-inter text-[19px] text-[#4A5568] max-w-[560px] animate-slide-up-3">
            Field-tested perspectives on enterprise AI, engineering, governance and the future of work.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="pb-[40px]">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px]">
          <div className="font-space-mono text-[11px] text-[#E040FB] tracking-widest uppercase mb-6 flex items-center gap-2 animate-slide-up-4">
            <span className="w-2 h-2 rounded-full bg-[#E040FB] animate-pulse" />
            Featured insight
          </div>
          <Link
            href={`/blog/${featured.slug}`}
            className="glass-card !p-0 overflow-hidden flex flex-col md:flex-row group hover:shadow-[0_30px_80px_rgba(139,63,255,0.15)] hover:border-[#8B3FFF]/40 transition-all duration-500 animate-fade-in-delayed"
          >
            <div className="w-full md:w-[55%] relative min-h-[260px] md:min-h-[420px] overflow-hidden">
              <Image
                src={featured.image}
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3b6fff]/25 to-[#e040fb]/20 mix-blend-multiply pointer-events-none" />
            </div>
            <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#3B6FFF]/10 text-[#2948D6] font-space-mono text-[11px] uppercase tracking-wider">{featured.category}</span>
                <span className="font-inter text-[#718096] text-[13px]">{featured.date} · {featured.readTime}</span>
              </div>
              <h2 className="font-plus-jakarta-sans font-bold text-[24px] md:text-[30px] text-[#0D0D1F] leading-[1.25] mb-4 group-hover:text-[#6D28D9] transition-colors">
                {featured.title}
              </h2>
              <p className="font-inter text-[#4A5568] text-[16px] leading-[1.7] mb-8">{featured.excerpt}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3b6fff] to-[#e040fb] p-[2px]">
                    <Image src={author.image} alt={featured.author} width={40} height={40} className="w-full h-full rounded-full object-cover object-top bg-white" />
                  </div>
                  <div>
                    <div className="font-plus-jakarta-sans font-bold text-[14px] text-[#0D0D1F]">{featured.author}</div>
                    <div className="font-space-mono text-[11px] text-[#718096]">{author.title}</div>
                  </div>
                </div>
                <ArrowRight className="text-[#0D0D1F] group-hover:text-[#6D28D9] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* LIBRARY */}
      <section className="py-[80px]">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px]">
          <ScrollReveal>
            <h2 className="font-plus-jakarta-sans font-bold text-[32px] md:text-[40px] text-[#0D0D1F] mb-8">The library</h2>
          </ScrollReveal>
          <BlogExplorer posts={cards} categories={Array.from(new Set(cards.map((c) => c.category)))} />
        </div>
      </section>
    </div>
  );
}
