const fs = require('fs');

let navbar = fs.readFileSync('components/Navbar.tsx', 'utf8');

// Header background
navbar = navbar.replace('bg-[#0A0F1E]/90 backdrop-blur-md border-b border-[#ffffff10] shadow-[0_4px_30px_rgba(0,0,0,0.4)]', 'bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[rgba(139,63,255,0.15)] shadow-sm');

// Text colors in Navbar links
navbar = navbar.replace(/text-white/g, 'text-[#0D0D1F]');
navbar = navbar.replace(/text-\\[#F5C842\\]/g, 'text-[#050DEB]');
navbar = navbar.replace(/hover:text-\\[#F5C842\\]/g, 'hover:text-[#050DEB]');

// Dropdown backgrounds
navbar = navbar.replace(/bg-\\[#0A0F1E\\]/g, 'bg-[#FFFFFF]');
navbar = navbar.replace(/border-\\[#ffffff10\\]/g, 'border-[rgba(139,63,255,0.15)]');
navbar = navbar.replace(/border-\\[#ffffff08\\]/g, 'border-[rgba(139,63,255,0.1)]');
navbar = navbar.replace(/text-gray-400/g, 'text-[#4A5568]');
navbar = navbar.replace(/text-gray-300/g, 'text-[#4A5568]');
navbar = navbar.split('bg-white/5').join('bg-[#F0F4F8]');
navbar = navbar.split('border-white/20').join('border-[#0D0D1F]/20');

// Sign In button (desktop)
navbar = navbar.replace(
  '<Link href="#" className="font-plus-jakarta-sans font-medium text-[14px] text-[#0D0D1F] hover:text-[#050DEB] transition-colors mr-2">Sign In</Link>',
  '<Link href="#" className="btn-ghost !px-5 !py-2.5 !text-[14px] mr-2">Sign In</Link>'
);

fs.writeFileSync('components/Navbar.tsx', navbar);
console.log('Navbar updated');

let page = fs.readFileSync('app/page.tsx', 'utf8');

// Section 2.5: Client Logos Marquee
page = page.replace('bg-[#080D1A] overflow-hidden border-b border-[#ffffff08]', 'bg-[#F8F9FA] overflow-hidden border-b border-[rgba(139,63,255,0.15)]');

// Section 6: ROI Calculator container
page = page.replace('bg-[#080D1A] overflow-hidden border-t border-[#ffffff10]', 'bg-[#FFFFFF] overflow-hidden border-t border-[rgba(139,63,255,0.15)]');
page = page.replace('text-white mb-6', 'text-[#0D0D1F] mb-6');

// Section 7: Testimonials container
page = page.replace('bg-[#0A0F1E] border-y border-[#ffffff10]', 'bg-[#F0F4F8] border-y border-[rgba(139,63,255,0.15)]');
page = page.replace('text-white">\n                Results', 'text-[#0D0D1F]">\n                Results');
page = page.replace(/text-white/g, 'text-[#0D0D1F]');
page = page.replace(/text-gray-200/g, 'text-[#4A5568]');
page = page.replace(/text-gray-400/g, 'text-[#718096]');
page = page.split('text-white/[0.03]').join('text-[#0D0D1F]/[0.03]');
page = page.split('bg-white/20').join('bg-gray-300');
page = page.split('border-white/10').join('border-gray-300');

// Section 9: Partners & Certifications container
page = page.replace('bg-[#F0F4F8] border-t border-[rgba(139,63,255,0.15)]', 'bg-[#F8F9FA] border-t border-[rgba(139,63,255,0.15)]'); // Just in case
page = page.replace('bg-[#0A0F1E] border-t border-[#ffffff10]', 'bg-[#F8F9FA] border-t border-[rgba(139,63,255,0.15)]');
page = page.replace('text-[#0D0D1F]">\n                Certified', 'text-[#0D0D1F]">\n                Certified');
page = page.split('bg-white/[0.03] border border-white/[0.08]').join('bg-[#FFFFFF]/80 border border-[rgba(139,63,255,0.15)] shadow-sm');
page = page.replace(/font-bold text-white/g, 'font-bold text-[#0D0D1F]');

fs.writeFileSync('app/page.tsx', page);
console.log('Page updated');
