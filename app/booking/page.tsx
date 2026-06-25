import Script from "next/script";

export const metadata = {
  title: "Book a Consultation | LuminaXpert",
  description: "Schedule a 30-minute consultation with our AI experts.",
};

export default function BookingPage() {
  return (
    <main className="pt-32 pb-16 min-h-screen relative overflow-hidden bg-[#F0F4F8]">
      <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
        <h1 className="font-plus-jakarta-sans font-bold text-[36px] md:text-[48px] text-[#0D0D1F] mb-6 text-center">
          Book a Consultation
        </h1>
        <p className="text-center text-[#4A5568] mb-12 max-w-2xl mx-auto font-inter text-[18px]">
          Schedule a 30-minute discovery call to discuss how LuminaXpert can help accelerate your AI initiatives.
        </p>
        
        <div className="bg-white rounded-[28px] shadow-xl overflow-hidden border border-[rgba(139,63,255,0.15)] max-w-5xl mx-auto">
          {/* Calendly inline widget begin */}
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/luminaxpert/30min?hide_gdpr_banner=1" 
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
          <Script 
            type="text/javascript" 
            src="https://assets.calendly.com/assets/external/widget.js" 
            strategy="lazyOnload"
          />
          {/* Calendly inline widget end */}
        </div>
      </div>
    </main>
  );
}
