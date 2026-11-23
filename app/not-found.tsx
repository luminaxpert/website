import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 ambient-center z-0 opacity-40"></div>
      
      <div className="relative z-10 text-center px-5">
        <h1 className="font-plus-jakarta-sans font-black text-[120px] md:text-[200px] leading-none text-gradient drop-shadow-[0_0_40px_rgba(224,64,251,0.25)]">
          404
        </h1>
        <h2 className="font-plus-jakarta-sans font-bold text-[32px] md:text-[48px] text-[#0D0D1F] mb-6 -mt-8 md:-mt-12 relative z-10">
          Page not found
        </h2>
        <p className="font-inter text-[18px] text-[#4A5568] mb-10 max-w-[400px] mx-auto">
          The intelligence you're looking for seems to have drifted into the void.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={18} /> Back to home
          </Link>
          <Link href="/blog" className="btn-ghost">Browse insights</Link>
          <Link href="/contact" className="btn-ghost">Contact us</Link>
        </div>
      </div>
      
      {/* Orbiting particles simulation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] border border-[#8B3FFF]/15 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none z-0">
        <div className="w-4 h-4 bg-[#00D9FF] rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_#00D9FF]"></div>
        <div className="w-2 h-2 bg-[#E040FB] rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-[0_0_20px_#E040FB]"></div>
      </div>
    </div>
  );
}
