import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export const metadata = {
  title: "Sign In | LuminaXpert",
  description: "LuminaXpert client portal login.",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-5 bg-[#F8F9FA] relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#8b3fff]/5 via-transparent to-[#00d9ff]/5 pointer-events-none"></div>
      
      <div className="glass-card max-w-[500px] w-full p-10 text-center relative z-10 rounded-2xl border border-[rgba(139,63,255,0.15)] shadow-xl">
        <div className="w-16 h-16 bg-[#F0F4F8] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-[#8b3fff]">
          <Clock size={32} />
        </div>
        <h1 className="font-plus-jakarta-sans font-bold text-[32px] text-[#0D0D1F] mb-4">Client Portal</h1>
        <p className="font-inter text-[16px] text-[#4A5568] mb-8">
          We are currently upgrading our client portal experience. Access for existing partners will be restored shortly.
        </p>
        
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={18} />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
