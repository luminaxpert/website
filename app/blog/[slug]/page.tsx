import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { ReadingProgress, ShareButtons } from "@/components/blog/ArticleTools";
import { POSTS, AUTHORS, getPost, getRelatedPosts, postDate } from "@/lib/posts";
import { SITE, FOUNDER_LINKS, COFOUNDER_LINKS } from "@/lib/site";

// Every article is pre-rendered at build time; unknown slugs return a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: postDate(post).toISOString(),
      authors: [post.author],
      images: [{ url: post.image, width: 1600, height: 873, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const author = AUTHORS[post.author];
  const related = getRelatedPosts(post.slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE.url}${post.image}`,
    datePublished: postDate(post).toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
      ...(post.author === "Sibtain Syed"
        ? { url: FOUNDER_LINKS.portfolio, sameAs: [FOUNDER_LINKS.linkedin] }
        : { sameAs: [COFOUNDER_LINKS.linkedin] }),
    },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/images/logo.png` } },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <ReadingProgress />

      {/* HEADER */}
      <section className="pt-[140px] pb-[40px] relative">
        <div className="mx-auto px-5 max-w-[820px] relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 font-space-mono text-[12px] text-[#4A5568] hover:text-[#6D28D9] hover:-translate-x-1 transition-all duration-300 mb-10 animate-slide-up-1">
            <ArrowLeft size={14} /> ALL ARTICLES
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6 animate-slide-up-1">
            <span className="px-3 py-1 rounded-full bg-[#3B6FFF]/10 border border-[#3B6FFF]/25 text-[#2948D6] font-space-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Tag size={12} /> {post.category}
            </span>
            <span className="font-inter text-[#718096] text-[13px] flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
            <span className="font-inter text-[#718096] text-[13px] flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
          </div>

          <h1 className="font-plus-jakarta-sans font-bold text-[32px] md:text-[50px] leading-[1.1] tracking-tight text-[#0D0D1F] mb-8 animate-slide-up-2">
            {post.title}
          </h1>

          <div className="flex items-center justify-between gap-4 border-y border-[rgba(139,63,255,0.15)] py-5 animate-slide-up-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#3b6fff] to-[#e040fb] p-[2px] shrink-0">
                <Image src={author.image} alt={post.author} width={48} height={48} className="w-full h-full rounded-full object-cover object-top bg-white" />
              </div>
              <div>
                <div className="font-plus-jakarta-sans font-bold text-[15px] text-[#0D0D1F]">{post.author}</div>
                <div className="font-space-mono text-[11px] text-[#0891B2]">{author.title}</div>
              </div>
            </div>
            <ShareButtons title={post.title} />
          </div>
        </div>
      </section>

      {/* FEATURE IMAGE */}
      <section className="py-4 relative z-10">
        <div className="mx-auto px-5 max-w-[1040px] animate-slide-up-4">
          <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[24px] relative overflow-hidden border border-[rgba(139,63,255,0.15)] shadow-[0_30px_80px_rgba(13,13,31,0.12)]">
            <Image src={post.image} alt="" fill priority sizes="(min-width: 1040px) 1000px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#3b6fff]/15 to-[#e040fb]/15 mix-blend-multiply pointer-events-none" />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-[56px] pb-[100px] relative z-10">
        <div className="mx-auto px-5 max-w-[820px]">
          <article id="article-body" className="glass-card !bg-white/95 p-7 md:p-12 article font-inter">
            {post.content}
          </article>

          <ScrollReveal>
            <div className="mt-12 glass-card p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start border-l-4 !border-l-[#E040FB]">
              <div className="w-24 h-24 shrink-0 rounded-full bg-gradient-to-tr from-[#3b6fff] to-[#e040fb] p-[3px]">
                <Image src={author.image} alt={post.author} width={96} height={96} className="w-full h-full rounded-full object-cover object-top bg-white border-2 border-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="font-space-mono text-[10px] text-[#718096] uppercase tracking-widest mb-1">Written by</div>
                <h2 className="font-plus-jakarta-sans font-bold text-[20px] text-[#0D0D1F] mb-1">{post.author}</h2>
                <div className="font-space-mono text-[12px] text-[#0891B2] mb-3 uppercase tracking-wider">{author.title}</div>
                <p className="font-inter text-[#4A5568] text-[14px] leading-[1.7] mb-4">{author.bio}</p>
                <div className="flex justify-center sm:justify-start gap-4 font-space-mono text-[12px]">
                  <a href={post.author === "Sibtain Syed" ? FOUNDER_LINKS.linkedin : COFOUNDER_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:underline">LinkedIn ↗</a>
                  {post.author === "Sibtain Syed" && (
                    <a href={FOUNDER_LINKS.portfolio} target="_blank" rel="noopener noreferrer" className="text-[#6D28D9] hover:underline">Portfolio ↗</a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-12 glass-brand p-8 md:p-10 text-center">
              <h2 className="font-plus-jakarta-sans font-bold text-[24px] md:text-[28px] text-[#0D0D1F] mb-3">Want to apply this in your organisation?</h2>
              <p className="font-inter text-[#4A5568] mb-6 max-w-[520px] mx-auto">Talk to the team behind this article. 30 minutes, no commitment, practical next steps.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link href="/booking" className="btn-primary">Book a free consultation</Link>
                <Link href="/assessment" className="btn-ghost">Take the AI maturity quiz</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* RELATED */}
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] mt-20">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-plus-jakarta-sans font-bold text-[28px] text-[#0D0D1F]">Keep reading</h2>
            <Link href="/blog" className="btn-link !text-[14px]">All insights →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((op) => (
              <Link
                key={op.slug}
                href={`/blog/${op.slug}`}
                className="glass-card !p-0 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(139,63,255,0.14)] hover:border-[#8B3FFF]/40 transition-all duration-500 flex flex-col"
              >
                <div className="relative h-[160px] overflow-hidden">
                  <Image src={op.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="font-space-mono text-[11px] uppercase tracking-wider text-[#A21CAF] mb-2">{op.category}</span>
                  <h3 className="font-plus-jakarta-sans font-bold text-[16px] text-[#0D0D1F] leading-[1.4] group-hover:text-[#6D28D9] transition-colors mb-4">{op.title}</h3>
                  <span className="mt-auto flex items-center justify-between font-space-mono text-[11px] text-[#718096]">
                    {op.readTime} <ArrowRight size={16} className="text-[#0D0D1F] group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
