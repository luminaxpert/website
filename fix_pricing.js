const fs = require('fs');

let pricing = fs.readFileSync('app/pricing/page.tsx', 'utf8');

pricing = pricing.split('!bg-[#050914]/80').join('!bg-[#FFFFFF]/90');
pricing = pricing.split('!bg-[#050914]/60').join('!bg-[#FFFFFF]');
pricing = pricing.split('bg-[#050914]/30').join('bg-[#F0F4F8]');
pricing = pricing.split('!border-white/[0.08]').join('!border-[rgba(139,63,255,0.15)]');
pricing = pricing.split('!border-white/[0.06]').join('!border-[rgba(139,63,255,0.15)]');
pricing = pricing.split('border-white/[0.06]').join('border-[rgba(139,63,255,0.15)]');
pricing = pricing.split('border-white/10').join('border-[rgba(139,63,255,0.15)]');
pricing = pricing.split('border-white/15').join('border-[rgba(139,63,255,0.15)]');
pricing = pricing.split('hover:border-[#ffffff20]').join('hover:border-[#050DEB]');
pricing = pricing.split('hover:border-white/30').join('hover:border-[#050DEB]');
pricing = pricing.split('bg-white/5').join('bg-[#F0F4F8]');
pricing = pricing.split('hover:bg-white/10').join('hover:bg-[#E2E8F0]');
pricing = pricing.split('shadow-[0_0_40px_rgba(245,200,66,0.15)]').join('shadow-lg');
pricing = pricing.replace(/text-white/g, 'text-[#0D0D1F]');
pricing = pricing.replace(/text-gray-200/g, 'text-[#4A5568]');
pricing = pricing.replace(/text-gray-300/g, 'text-[#4A5568]');
pricing = pricing.replace(/text-gray-400/g, 'text-[#718096]');
pricing = pricing.replace(/text-gray-500/g, 'text-[#718096]');

fs.writeFileSync('app/pricing/page.tsx', pricing);
console.log('Pricing updated');
