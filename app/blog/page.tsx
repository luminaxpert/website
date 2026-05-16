"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Tag } from "lucide-react";
import FloatingGeometries from "@/components/FloatingGeometries";
import ScrollReveal from "@/components/ScrollReveal";

export default function BlogPage() {
  const posts = [
    {
      title: "The Invisible ROI of AI: Measuring What Traditional Metrics Miss",
      excerpt: "Traditional ROI calculations fail to capture the exponential compounding value of AI integration. Discover a modern framework to measure the true, multifaceted impact of your AI investments.",
      category: "Strategy",
      date: "Oct 12, 2026",
      readTime: "6 min read",
      slug: "invisible-roi-of-ai",
      author: "Sibtain Syed",
      role: "CEO",
      image: "/images/blog/prompt3.png"
    },
    {
      title: "LLMs in Production: Transitioning from Playground to Enterprise",
      excerpt: "Moving large language models from prototype to secure, scalable, and compliant enterprise deployments requires a fundamental shift in architecture and data governance.",
      category: "Engineering",
      date: "Oct 05, 2026",
      readTime: "9 min read",
      slug: "llms-in-production",
      author: "Faizan Ahmed",
      role: "CTO",
      image: "/images/blog/prompt1.png"
    },
    {
      title: "The Human-in-the-Loop Imperative",
      excerpt: "Why fully autonomous systems aren't the ultimate goal, and how cultivating human-AI symbiosis ultimately drives the highest, most sustainable business value.",
      category: "Ethics & Ops",
      date: "Sep 28, 2026",
      readTime: "5 min read",
      slug: "human-in-the-loop",
      author: "Sibtain Syed",
      role: "CEO",
      image: "/images/blog/prompt4.png"
    },
    {
      title: "Navigating AI Regulation: A 2027 Compliance Primer",
      excerpt: "Anticipating upcoming global regulations and learning how to architect your enterprise data pipelines to be inherently secure and compliant.",
      category: "Compliance",
      date: "Sep 15, 2026",
      readTime: "7 min read",
      slug: "navigating-ai-regulation",
      author: "Faizan Ahmed",
      role: "CTO",
      image: "/images/blog/prompt2.png"
    },
    {
      title: "Agentic Workflows vs. Static Models",
      excerpt: "Exploring the profound paradigm shift from single-prompt interactions to robust, goal-oriented autonomous AI agents within complex B2B environments.",
      category: "Future Trends",
      date: "Sep 02, 2026",
      readTime: "8 min read",
      slug: "agentic-workflows",
      author: "Sibtain Syed",
      role: "CEO",
      image: "/images/blog/prompt5.png"
    },
    {
      title: "Data Debt: The Silent Killer of AI Transformation",
      excerpt: "Before building intelligent systems, enterprises must systematically pay off technical and data debt. Here is the operational framework to clean your data lakes.",
      category: "Data",
      date: "Aug 20, 2026",
      readTime: "6 min read",
      slug: "data-debt",
      author: "Faizan Ahmed",
      role: "CTO",
      image: "/images/blog/prompt6.png"
    }
  ];

  const [filter, setFilter] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPosts = posts.filter(post => {
    const matchesCategory = filter === "All Topics" || post.category === filter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen relative">
      
      {/* Background Geometries */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingGeometries />
      </div>

      {/* HEADER */}
      <section className="pt-[160px] pb-[80px] bg-transparent border-b border-[rgba(139, 63, 255, 0.15)] relative overflow-hidden">
        <div className="absolute inset-0 ambient-left z-0 opacity-40"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="w-full md:w-2/3">
            <ScrollReveal>
              <h1 className="font-plus-jakarta-sans font-bold text-[40px] md:text-[64px] leading-[1.05] tracking-tight mb-6 text-[#0D0D1F]">
                Insights & <span className="text-gradient">Intelligence</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="font-inter text-[19px] text-[#4A5568] max-w-[500px]">
                Expert perspectives on enterprise AI, digital transformation, and the future of work.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="w-full md:w-1/3 flex justify-end">
            <ScrollReveal delay={0.2} className="w-full">
              <div className="relative w-full max-w-[320px] ml-auto">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input w-full h-[50px] !pl-16 rounded-full relative z-[100] cursor-text"
                />
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4A5568] z-[101]" size={18} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      <section className="py-[80px] bg-transparent">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          <ScrollReveal>
            <div className="font-space-mono text-[11px] text-[#E040FB] tracking-widest uppercase mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E040FB] animate-pulse"></span>
              FEATURED INSIGHT
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="glass-card p-0 overflow-hidden flex flex-col md:flex-row group cursor-pointer hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(224,64,251,0.15)] hover:border-[#E040FB]/40 transition-all duration-500 hover:bg-[#FFFFFF]/80">
              <div className="w-full md:w-[55%] relative min-h-[300px] md:min-h-[400px] bg-[#FFFFFF] overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#3b6fff]/30 to-[#e040fb]/30 opacity-60 group-hover:opacity-100 z-10 mix-blend-overlay pointer-events-none transition-opacity duration-500"></div>
                 <img src="/images/blog/prompt1.png" alt="Featured Article Image" className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700" />
              </div>
              
              <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#3B6FFF]/10 text-[#3B6FFF] font-space-mono text-[11px] uppercase tracking-wider group-hover:bg-[#3B6FFF]/20 transition-colors">Architecture</span>
                  <span className="font-inter text-[#718096] text-[13px]">Oct 18, 2026</span>
                </div>
                
                <h3 className="font-plus-jakarta-sans font-bold text-[24px] md:text-[28px] text-[#0D0D1F] leading-[1.3] mb-4 group-hover:text-[#E040FB] transition-colors">
                  The Composable AI Enterprise: Building Modular Intelligence
                </h3>
                
                <p className="font-inter text-[#4A5568] text-[16px] leading-[1.6] mb-8 group-hover:text-[#b4b4d0] transition-colors">
                  Monolithic AI systems are rapidly becoming technical debt before they even reach production. Discover how forward-thinking technology leaders are adopting highly composable architectures to remain perfectly agile as underlying foundation models evolve.
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3b6fff] to-[#e040fb] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#F0F4F8] flex items-center justify-center overflow-hidden">
                      <img src="/images/team/faizan.jpg" alt="Faizan Ahmed" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <div className="font-plus-jakarta-sans font-bold text-[14px] text-[#0D0D1F]">Faizan Ahmed</div>
                    <div className="font-space-mono text-[11px] text-[#718096]">CTO, LuminaXpert</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="py-[80px] bg-transparent">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          
          <ScrollReveal>
            <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar relative z-[100]">
              <button 
                onClick={() => setFilter("All Topics")}
                className={`px-5 py-2 rounded-full font-plus-jakarta-sans text-[14px] transition-all duration-300 cursor-pointer ${filter === "All Topics" ? "glass-brand text-[#0D0D1F] shadow-[0_0_15px_rgba(224,64,251,0.3)]" : "border border-white/10 text-[#4A5568] hover:text-[#0D0D1F] hover:border-white/30 hover:bg-black/5"}`}>
                All Topics
              </button>
              {["Strategy", "Engineering", "Data", "Compliance", "Ethics & Ops", "Future Trends"].map((tag) => (
                <button 
                  key={tag} 
                  onClick={() => setFilter(tag)}
                  className={`px-5 py-2 rounded-full font-plus-jakarta-sans text-[14px] whitespace-nowrap transition-all duration-300 cursor-pointer ${filter === tag ? "glass-brand text-[#0D0D1F] shadow-[0_0_15px_rgba(224,64,251,0.3)]" : "border border-white/10 text-[#4A5568] hover:text-[#0D0D1F] hover:border-white/30 hover:bg-black/5"}`}>
                  {tag}
                </button>
              ))}
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="glass-card p-0 overflow-hidden h-full group flex flex-col hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,217,255,0.15)] hover:border-[#00D9FF]/40 hover:bg-[#1a1a3a]/80 transition-all duration-500">
                  <div className="w-full h-[200px] overflow-hidden relative border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] to-transparent z-10"></div>
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 z-20 flex items-center gap-1.5 text-[#0D0D1F] bg-[#00D9FF]/80 backdrop-blur-md px-3 py-1 rounded-full font-space-mono text-[10px] uppercase tracking-wider group-hover:bg-[#E040FB]/80 transition-colors">
                      <Tag size={10} /> {post.category}
                    </span>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-space-mono text-[11px] text-[#00D9FF] group-hover:text-[#E040FB] transition-colors">{post.date}</span>
                      <span className="font-inter text-[#718096] text-[12px]">{post.readTime}</span>
                    </div>
                    
                    <h3 className="font-plus-jakarta-sans font-bold text-[18px] text-[#0D0D1F] leading-[1.4] mb-3 group-hover:text-[#00D9FF] transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="font-inter text-[#4A5568] text-[15px] leading-[1.6] mb-6 flex-1 group-hover:text-[#b4b4d0] transition-colors">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-2">
                         <span className="font-space-mono text-[11px] text-[#4A5568] bg-white/5 px-3 py-1.5 rounded-lg group-hover:bg-[#E040FB]/10 group-hover:text-[#0D0D1F] transition-colors">{post.author}</span>
                      </div>
                      <span className="text-[#0D0D1F] group-hover:text-[#00D9FF] transition-colors group-hover:translate-x-1 transform duration-300">
                        <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal delay={0.3}>
            <div className="mt-16 flex justify-center">
              <button className="btn-ghost hover:scale-105 transition-transform">Load More Articles</button>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
    </div>
  );
}
