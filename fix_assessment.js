const fs = require('fs');

// --- Fix app/assessment/page.tsx ---
let assessment = fs.readFileSync('app/assessment/page.tsx', 'utf8');

// Colors & Backgrounds
assessment = assessment.split('!bg-[#050914]/80').join('!bg-[#FFFFFF]/90');
assessment = assessment.split('!bg-[#050914]/90').join('!bg-[#FFFFFF]/90');
assessment = assessment.split('bg-white/[0.02]').join('bg-[#F8F9FA]');
assessment = assessment.split('border-white/[0.06]').join('border-[rgba(139,63,255,0.15)]');
assessment = assessment.split('border-white/[0.08]').join('border-[rgba(139,63,255,0.15)]');
assessment = assessment.split('!border-white/[0.08]').join('!border-[rgba(139,63,255,0.15)]');
assessment = assessment.split('border-white/20').join('border-[rgba(139,63,255,0.3)]');
assessment = assessment.split('border-white/10').join('border-[rgba(139,63,255,0.15)]');
assessment = assessment.split('bg-white/5').join('bg-[#F0F4F8]');
assessment = assessment.split('bg-white/10').join('bg-[#E2E8F0]');
assessment = assessment.replace(/text-white/g, 'text-[#0D0D1F]');
assessment = assessment.replace(/text-gray-300/g, 'text-[#4A5568]');
assessment = assessment.replace(/text-gray-400/g, 'text-[#718096]');
assessment = assessment.replace(/text-gray-500/g, 'text-[#718096]');

// Form inputs
assessment = assessment.replace(/h-\\[44px\\] px-3/g, 'h-[52px] px-5 py-3 rounded-xl');
assessment = assessment.split('!bg-white/5').join('!bg-[#F0F4F8]');
assessment = assessment.split('!text-white').join('!text-[#0D0D1F]');
assessment = assessment.split('!border-white/10').join('!border-[rgba(139,63,255,0.15)]');

fs.writeFileSync('app/assessment/page.tsx', assessment);
console.log('Assessment updated');

// --- Fix app/case-studies/page.tsx ---
let caseStudies = fs.readFileSync('app/case-studies/page.tsx', 'utf8');

caseStudies = caseStudies.split('!bg-[#050914]/80').join('!bg-[#FFFFFF]/90');
caseStudies = caseStudies.split('!bg-[#0A0F1E]').join('!bg-[#F8F9FA]');
caseStudies = caseStudies.split('!border-white/[0.08]').join('!border-[rgba(139,63,255,0.15)]');
caseStudies = caseStudies.split('border-white/10').join('border-[rgba(139,63,255,0.15)]');
caseStudies = caseStudies.split('bg-white/5').join('bg-[#F0F4F8]');
caseStudies = caseStudies.split('hover:bg-white/5').join('hover:bg-[#E2E8F0]');
caseStudies = caseStudies.replace(/text-white/g, 'text-[#0D0D1F]');
caseStudies = caseStudies.replace(/text-gray-300/g, 'text-[#4A5568]');
caseStudies = caseStudies.replace(/text-gray-400/g, 'text-[#718096]');
caseStudies = caseStudies.replace(/text-gray-500/g, 'text-[#718096]');
caseStudies = caseStudies.split('!text-white').join('!text-[#0D0D1F]');

fs.writeFileSync('app/case-studies/page.tsx', caseStudies);
console.log('Case studies updated');
