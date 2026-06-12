# LuminaXpert — UI/UX Implementation Plan

**Audit Date:** June 12, 2026
**Pages Audited:** 12 (Home, About, Services, Solutions, Pricing, Blog, Contact, Get Started, Case Studies, Team, Assessment, Legal/Privacy)
**Prepared by:** Claude (Anthropic) — Automated Site Audit

---

## Executive Summary

LuminaXpert is a well-conceived AI consultancy website with strong content strategy and brand positioning. However, a thorough cross-page audit reveals **9 confirmed bugs** (including broken navigation, dead links, and a blog routing mismatch) and **12 UX improvement opportunities** affecting conversion, credibility, and SEO. The issues stem primarily from two sources: (1) inconsistent use of a shared layout component across pages, and (2) placeholder development artifacts that were not replaced before launch. All issues are fixable within a focused 6–10 week sprint plan detailed below.

---

## Scope of Audit

| Page | URL | Status |
|---|---|---|
| Homepage | `/` | ✅ Audited |
| About Us | `/about` | ✅ Audited |
| Services | `/services` | ✅ Audited |
| Solutions | `/solutions` | ✅ Audited |
| Pricing | `/pricing` | ✅ Audited |
| Blog Index | `/blog` | ✅ Audited |
| Blog Post | `/blog/future-generative-ai` | ✅ Audited |
| Contact | `/contact` | ✅ Audited |
| Get Started | `/get-started` | ✅ Audited |
| Case Studies | `/case-studies` | ✅ Audited |
| Team | `/team` | ✅ Audited |
| AI Maturity Assessment | `/assessment` | ✅ Audited |
| Legal / Privacy | `/legal/privacy` | ✅ Audited |

---

## Part 1 — Critical Bugs

These issues break core functionality, cause navigation failure, or represent legal/compliance risks. They must be resolved in **Phase 1 (Week 1–2)**.

---

### B1 · "Pricing" link missing from 3 navigation bars

**Severity:** Critical
**Affected Pages:** Services, Solutions, Blog
**Category:** Navigation

**Description:**
The top navigation on the Services, Solutions, and Blog pages is missing the "Pricing" nav item. Every other page on the site (Home, About, Pricing, Contact, Case Studies, Team, Assessment, Legal) correctly includes it. This means a significant portion of the site — the service detail pages users spend the most time on — provide no path to the Pricing section without the user going back to the homepage.

**Root Cause:**
The Services, Solutions, and Blog pages appear to use a different or outdated Navbar component variant that predates the addition of the Pricing link.

**Fix:**
Identify the Navbar component instance used on these three pages and add the Pricing link in the correct position (after Solutions, before Blog). Ensure a single shared `<Navbar />` component is used site-wide to prevent this divergence from recurring.

```jsx
// Correct nav order:
// Home | About | Services ▾ | Solutions ▾ | Pricing | Blog | Contact
```

---

### B2 · Two different logo files used across the site

**Severity:** Critical
**Affected Pages:** Services, Solutions, Blog (use `logo-bg.png`); all others (use `FFLogo.png`)
**Category:** Navigation / Brand

**Description:**
The Services, Solutions, and Blog pages load `/images/logo-bg.png` in both the header and footer, while every other page uses `/images/FFLogo.png`. This causes a visible logo change as the user navigates between pages — a jarring brand inconsistency.

**Root Cause:**
Same root cause as B1 — a second Navbar/Footer component variant is being used on these three pages without the correct logo reference.

**Fix:**
Consolidate to a single shared Navbar component using one canonical logo file. Audit whether `logo-bg.png` and `FFLogo.png` are different images or the same image with different backgrounds. Settle on one file and delete or archive the other.

---

### B3 · "Sign In" button links to `#` on every page

**Severity:** Critical
**Affected Pages:** All pages
**Category:** Navigation / Authentication

**Description:**
The "Sign In" button in the top navigation has `href="#"` on every page of the site. Clicking it scrolls the page to the top but does not navigate anywhere. This is a broken CTA for any existing user or client trying to access their account.

**Fix (choose one based on project stage):**
- If a client portal exists: route to the correct login URL.
- If auth is under development: route to a `/signin` page with a "Coming Soon" or waitlist message.
- If no auth is planned: remove the "Sign In" button from the navigation entirely to avoid confusion.

---

### B4 · Footer has dead `#` links on Services, Solutions, and Blog pages

**Severity:** Critical
**Affected Pages:** Services, Solutions, Blog
**Category:** Footer / Navigation

**Description:**
On these three pages, the footer contains multiple broken links:
- All 4 social icons link to `#`
- Company links: Our Team, Careers, Press & Media, Partners all link to `#`
- Resources links: Case Studies, Documentation, Newsletter, Events all link to `#`
- Legal links: Terms of Service and Cookie Policy link to `#`

Meanwhile the same footer on Home, About, Pricing, Contact, and Case Studies pages has all correct URLs. The two footers are clearly different component instances.

**Fix:**
Replace the partial footer component on Services, Solutions, and Blog with the complete footer component used on all other pages. This is a one-line change per page if using a shared component, or a copy-paste if using static templates.

---

### B5 · "Terms of Service" and "Cookie Policy" both link to Privacy Policy

**Severity:** Critical (Legal Compliance)
**Affected Pages:** All pages (footer)
**Category:** Legal

**Description:**
In the site footer, all three legal links point to the same page:
- Privacy Policy → `/legal/privacy` ✅
- Terms of Service → `/legal/privacy` ❌ (should be `/legal/terms`)
- Cookie Policy → `/legal/privacy` ❌ (should be `/legal/cookies`)

There are no `/legal/terms` or `/legal/cookies` pages. The site claims GDPR compliance and SOC 2 Type II certification — both of which require a separate, accessible Cookie Policy and Terms of Service. This is a compliance risk.

**Fix:**
1. Create `/legal/terms` — a Terms of Service page covering scope of engagement, IP, liability limitations, and dispute resolution.
2. Create `/legal/cookies` — a Cookie Policy page covering what cookies are set, their purpose, duration, and opt-out mechanism.
3. Update the three footer `href` values to point to their respective routes.

---

### B6 · Blog URL `/future-generative-ai` serves the wrong article

**Severity:** High
**Affected Pages:** Blog, Homepage (Featured Intelligence section)
**Category:** Content / Routing

**Description:**
The homepage Featured Intelligence section shows an article titled **"The Future of Generative AI in Enterprise"** and links it to `/blog/future-generative-ai`. However, visiting that URL displays the article **"The Invisible ROI of AI: Measuring What Traditional Metrics Miss"** — a completely different article by a different author. The URL slug and the article content do not match.

The second featured article ("Scaling AI Infrastructure Globally" → `/blog/ai-infrastructure`) was not separately verified and should be checked.

**Fix:**
Audit the blog content routing table. Either:
- Rename the slug from `future-generative-ai` to the correct slug (e.g. `invisible-roi-of-ai`) and update all internal links
- Or reassign the route to load the correct "Future of Generative AI" content file

Also review all homepage article links and blog post slugs for additional mismatches.

---

### B7 · Footer links to 3 service sections that don't exist on the Services page

**Severity:** High
**Affected Pages:** Footer (all pages), Services page
**Category:** Content / Navigation

**Description:**
The footer's Services column lists 9 services with anchor links:
- `#service-1` through `#service-6` correspond to existing sections on the Services page ✅
- `#service-7` (AI Agents — New), `#service-8` (MLOps & Governance), `#service-9` (Responsible AI — New) anchor to nothing ❌

The Services page only has sections 1–6. Clicking these footer links results in no scroll action.

**Fix (choose one):**
- **Preferred:** Add service sections 7, 8, and 9 to the Services page with full content for AI Agents, MLOps & Governance, and Responsible AI. These are tagged "New" which suggests they are planned but not yet built.
- **Temporary:** Update the three footer links to point to the Services page root (`/services`) without an anchor, until the new sections are built.

---

### B8 · Hero section "UX" text rendering as raw plain text

**Severity:** High
**Affected Pages:** Homepage
**Category:** UI / Visual

**Description:**
The homepage hero contains the raw repeated text "UX UX UX UX UX" visible in the DOM. These appear to be floating badge/label components (a common agency design pattern showing floating UI elements in a hero illustration) that have lost their styling, background, or container element — leaving only the raw text content visible.

**Fix:**
Restore the intended floating badge components. Each "UX" label should have:
- A styled container `div` with background, border-radius, padding, and shadow
- Correct absolute/relative positioning within the hero visual
- `aria-hidden="true"` if purely decorative

If these components are broken beyond quick repair, remove them from the DOM entirely until they can be properly rebuilt, rather than leaving raw text visible.

---

### B9 · About page and `/team` page list completely different people

**Severity:** High
**Affected Pages:** About, Team
**Category:** Content / Credibility

**Description:**
The About page team section lists:
- Sibtain Syed (CEO & Co-founder) — with real photo and LinkedIn
- Faizan Ahmed (CTO & Co-founder) — with real photo
- Sarah Jenkins (Head of Strategy) — initials avatar only
- Marcus Thorne (VP of Global Delivery) — initials avatar only

The `/team` page lists:
- Dr. Sarah Chen (Chief AI Officer) — initials avatar
- Marcus Reid (Head of Strategy) — initials avatar
- Aisha Patel (VP of Engineering) — initials avatar
- Thomas Vogel (Head of Data Science) — initials avatar

These are completely different people. The two pages cannot both accurately represent the same team. This undermines trust significantly.

**Fix:**
1. Establish the canonical team list (likely: the real founders from the About page, extended with real specialist profiles).
2. Update both pages to show the same consistent information.
3. For placeholder team members (Sarah Jenkins, Marcus Thorne on About page) — either replace with real data or remove until real bios are available.
4. On `/team`, real photos should replace the initials avatars for all leadership profiles.

---

## Part 2 — UX Improvements

These are not broken features but significant usability, conversion, and content quality improvements. Implement in **Phase 2–3**.

---

### U1 · Contact form missing input fields

**Severity:** Critical
**Affected Pages:** Contact (`/contact`)
**Category:** Forms / Conversion

**Description:**
The contact form renders three engagement type tabs (General Inquiry, Consultation, Enterprise), a Service Interest dropdown, and a "Send Message →" button — but there are no visible input fields for name, email, phone, or message body. A form with no inputs cannot function.

**Fix:**
Add the following fields inside each tab (or shared across tabs where appropriate):
- Full Name (required)
- Work Email (required, with format validation)
- Phone Number (optional)
- Company Name (optional)
- Message / Project Description (required, textarea)
- Service Interest (existing dropdown — keep)

Add client-side validation before submission and a success/error feedback state after the API call.

---

### U2 · ROI calculator defaults to all-zero output state

**Severity:** High
**Affected Pages:** Homepage (ROI Calculator section)
**Category:** Interactive Tools / Conversion

**Description:**
The ROI calculator shows "Projected Annual Savings: $0 / Year 1 ROI: 0% / Break-Even: 0.0 months / Productivity: 1.00x" as soon as the page loads. This cold empty state looks broken and misses the entire purpose of the section — which is to immediately demonstrate value to a prospective client.

**Fix:**
Initialise the calculator with a representative default scenario:
- Company Size: 250 employees
- Monthly Process Spend: $75,000
- Use Case: Customer Support Automation
- AI Maturity: Exploring

This should immediately render a live, non-zero estimate. The user can then adjust the sliders from a meaningful baseline. Add a small "reset to defaults" link if needed.

---

### U3 · Get Started multi-step form hides steps 2 and 3 from users

**Severity:** High
**Affected Pages:** Get Started (`/get-started`)
**Category:** Forms / Conversion

**Description:**
The Get Started page shows a step counter "1 — 2 — 3" at the top but only renders Step 1 inputs. Users cannot see what steps 2 and 3 involve before committing to filling out Step 1. This uncertainty is a known cause of form abandonment.

**Fix:**
Add a step preview strip beneath the step counter showing the names of all three steps, e.g.:
```
① Build your profile  →  ② Tell us your challenge  →  ③ Book a discovery call
```
Keep the current step expanded and show the upcoming step labels as muted/inactive. This communicates the full journey upfront and sets appropriate expectations.

---

### U4 · About page team member cards are visually inconsistent

**Severity:** Medium
**Affected Pages:** About
**Category:** Visual Design / Trust

**Description:**
The two founders (Sibtain Syed, Faizan Ahmed) have large real photos, multi-paragraph bios, and social/web links. The two other team members (Sarah Jenkins, Marcus Thorne) appear as coloured initial avatars with a single-sentence description and no social links. The inconsistency within a 4-card grid makes the page look unfinished.

**Fix (choose one approach):**
1. **Parity up:** Add real photos and full bios for Sarah Jenkins and Marcus Thorne.
2. **Parity down:** Standardise all four cards to the same initials-avatar format, same bio length, same link structure.
3. **Separate sections:** Show founders in a featured section with richer cards, and other team members in a smaller secondary grid.

---

### U5 · Services page shows literal bracket placeholder text

**Severity:** Medium
**Affected Pages:** Services
**Category:** Content / Visual

**Description:**
Each of the 6 service sections on the Services page includes the literal text `[Interactive 3D Visual for AI Consulting]`, `[Interactive 3D Visual for Digital Transformation]`, etc. These are clearly development-time placeholder labels that were never replaced with actual visual assets.

**Fix:**
Replace each placeholder with one of:
- A real 3D/animated visual asset matching the service theme
- A relevant high-quality illustration or icon composition
- A styled data visualisation or metric display relevant to the service
- Nothing (simply remove the placeholder container if assets aren't ready)

Leaving bracket text visible in a finished product significantly damages first impressions.

---

### U6 · "SCROLL" appears as unstyled raw text in the hero

**Severity:** Medium
**Affected Pages:** Homepage
**Category:** Visual Design / UI

**Description:**
The word "SCROLL" appears as a plain text node inside the hero section. This is typically implemented as a vertically-oriented scroll indicator with an animated icon/line. The component's CSS is either missing or the element is missing its wrapper.

**Fix:**
Restore the scroll indicator as a properly styled component:
```css
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  writing-mode: vertical-lr;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--color-text-tertiary);
  display: flex;
  align-items: center;
  gap: 8px;
}
```
Add an animated bouncing arrow (`↓`) or dot below the text.

---

### U7 · Homepage has only one testimonial under a plural section heading

**Severity:** Medium
**Affected Pages:** Homepage
**Category:** Social Proof / Conversion

**Description:**
The section is labelled "WHAT OUR CLIENTS SAY" (plural) but contains exactly one quote from "James Whitmore, CTO, Global Fintech Company." A single testimonial under a "clients say" heading undermines credibility. The company claims 3,200+ enterprise clients — showing only one quote is a missed conversion opportunity.

**Fix:**
Add 3–5 testimonials in a rotating carousel or static grid. Good sources:
- Match testimonials to the industry solutions page (one from Finance, one from Healthcare, one from Retail, one from Logistics)
- Use outcomes from the Case Studies page as the basis (real metrics make testimonials more convincing)
- Include the client's company type (even if anonymised), role, and a specific measurable result

---

### U8 · All inner page meta titles are identical to the homepage

**Severity:** Medium
**Affected Pages:** Services, Solutions, Blog, and others
**Category:** SEO / Browser UX

**Description:**
The following pages all use the title `LuminaXpert — AI Expertise Redefined`:
- Services
- Solutions
- Blog
- (likely others)

This is the same as the homepage. Duplicate page titles harm SEO rankings for inner pages and make browser tabs indistinguishable when multiple pages are open.

**Fix:**
Assign unique, descriptive titles to each page:

| Page | Recommended Title |
|---|---|
| Services | AI Services & Consulting — LuminaXpert |
| Solutions | Industry AI Solutions — LuminaXpert |
| Blog | Insights & Intelligence — LuminaXpert |
| Pricing | Engagement Models & Pricing — LuminaXpert |
| Contact | Contact Us — LuminaXpert |
| Case Studies | Client Results & Case Studies — LuminaXpert |
| Team | Our Team — LuminaXpert |
| Assessment | AI Maturity Assessment — LuminaXpert |

Update both `<title>` and `<meta property="og:title">` per page.

---

### U9 · Blog category filter tabs have no visible active state or function

**Severity:** Medium
**Affected Pages:** Blog
**Category:** Navigation / Interactivity

**Description:**
The blog page shows tabs for All, Strategy, Engineering, Data, Compliance, Ethics & Ops, and Future Trends. None of the tabs appear to have an active/selected visual state, and there is no indication whether clicking them actually filters the article list.

**Fix:**
1. Implement client-side category filtering — on click, show only articles whose category matches the selected tab.
2. Add a clear active state style to the selected tab (e.g. a bottom border accent, bold font weight, or background fill).
3. Add an empty state message ("No articles in this category yet") for filters with zero results.
4. Consider adding article counts in parentheses: "Strategy (4)", "Engineering (2)" etc.

---

### U10 · Blog posts have no author bio section at the end

**Severity:** Low
**Affected Pages:** Blog posts
**Category:** Content / Trust

**Description:**
Blog articles end abruptly after the content with no author bio. The founders (Sibtain Syed, Faizan Ahmed) are named as authors but readers have no way to learn about them from within an article. This is a missed credibility and engagement opportunity, especially for first-time readers arriving from search.

**Fix:**
Add an author bio card at the bottom of every article:
- Author photo (same as used on About/Team pages)
- Name and title (e.g. "Co-Founder & CEO, LuminaXpert")
- 2–3 sentence biography
- LinkedIn link
- Link to other articles by the same author

This data already exists on the `/team` page — reuse it.

---

### U11 · Contact page lists 3 city offices with no details

**Severity:** Low
**Affected Pages:** Contact
**Category:** Content / Trust

**Description:**
The Contact page lists "London · Singapore · Tokyo" as office locations but provides no addresses, phone numbers, or timezone information for any of them. Only the New York office (123 Innovation Drive, Suite 500) has a real address. Listing city names without details signals placeholder content.

**Fix:**
Either:
- Add real address, local phone, and timezone for each city office
- Or remove the city labels until real office details are available

Do not list cities with no associated contact information.

---

### U12 · No custom 404 page

**Severity:** Low
**Affected Pages:** Site-wide
**Category:** UX / SEO

**Description:**
There is no custom 404 error page on the site. Users who land on broken, misspelled, or outdated URLs will see either a generic Netlify 404 or a blank page — with no branded experience or path back into the site. This is a lost retention opportunity and hurts SEO (Google prefers sites with explicit 404 handling).

**Fix:**
Create a branded `/404` or `not-found.js` page (Next.js) that includes:
- Site header and footer
- A friendly "Page not found" message consistent with the brand voice
- Links to the homepage, Services, and Contact pages
- Optionally: a site search bar
- HTTP 404 status code (not 200, which causes "soft 404" issues in search indexing)

---

## Part 3 — Implementation Roadmap

### Phase 1 — Fix & Stabilise (Week 1–2)
*Ship zero regressions. Close all critical bugs.*

| # | Task | Effort |
|---|---|---|
| 1 | Unify Navbar: single shared component, add Pricing link everywhere | S |
| 2 | Unify logo: one canonical file across all pages | XS |
| 3 | Fix "Sign In" button — create route or remove | S |
| 4 | Replace partial footer with full footer on Services, Solutions, Blog | S |
| 5 | Create `/legal/terms` and `/legal/cookies` pages | M |
| 6 | Fix blog slug routing mismatch (`/future-generative-ai`) | XS |
| 7 | Fix footer anchor links for service-7, 8, 9 (temp redirect to /services) | XS |
| 8 | Restore hero floating badge components / remove raw "UX" text | S |
| 9 | Audit and fix all remaining dead `#` links site-wide | S |

**Effort key:** XS = < 1hr, S = 1–4hr, M = half day, L = 1–2 days

---

### Phase 2 — Polish & Improve (Week 3–5)
*Improve conversion, trust, and content quality.*

| # | Task | Effort |
|---|---|---|
| 1 | Add all contact form input fields (name, email, message, etc.) | M |
| 2 | Set ROI calculator default to a non-zero sample scenario | S |
| 3 | Add Get Started step-preview strip (step names for steps 2 and 3) | S |
| 4 | Reconcile team data: About page vs /team page — pick one source of truth | M |
| 5 | Standardise About page team cards (all photos or all initials — pick one) | S |
| 6 | Replace `[Interactive 3D Visual]` placeholder text with real assets or remove | L |
| 7 | Style the "SCROLL" hero indicator properly | XS |
| 8 | Add London/Singapore/Tokyo office details (or remove city labels) | XS |
| 9 | Build Services page sections 7, 8, 9 (AI Agents, MLOps, Responsible AI) | L |

---

### Phase 3 — Elevate & Grow (Week 6–10)
*SEO, social proof, and content depth.*

| # | Task | Effort |
|---|---|---|
| 1 | Unique `<title>` and `og:title` per page | S |
| 2 | Add 3–5 more testimonials to homepage; build carousel | M |
| 3 | Implement functional blog category filter with active states | M |
| 4 | Add author bio card to bottom of all blog posts | S |
| 5 | Add blog post search bar | M |
| 6 | Add pricing feature comparison table to Pricing page | M |
| 7 | Create custom 404 page | S |
| 8 | Expand Privacy Policy with full GDPR-compliant sections | M |
| 9 | Add breadcrumb navigation on Services, Blog, and Case Studies pages | S |

---

## Appendix — Page-by-Page Quick Reference

| Page | Bugs | UX Issues | Priority |
|---|---|---|---|
| Homepage | B8 (UX text), B3 (sign in) | U2 (ROI calc), U6 (scroll), U7 (testimonials) | Phase 1 + 2 |
| About | B9 (team mismatch) | U4 (card inconsistency) | Phase 1 + 2 |
| Services | B1 (nav), B2 (logo), B4 (footer), B7 (anchor links), B8 | U5 (placeholder text) | Phase 1 |
| Solutions | B1 (nav), B2 (logo), B4 (footer) | — | Phase 1 |
| Pricing | — | U — consider feature comparison table | Phase 3 |
| Blog | B1 (nav), B2 (logo), B4 (footer), B6 (slug mismatch) | U9 (filter tabs) | Phase 1 + 2 |
| Blog Post | — | U10 (author bio) | Phase 3 |
| Contact | B3 (sign in) | U1 (missing form inputs), U11 (office details) | Phase 1 + 2 |
| Get Started | — | U3 (step preview) | Phase 2 |
| Case Studies | — | — | — |
| Team | B9 (data mismatch) | — | Phase 1 |
| Assessment | — | — | — |
| Legal/Privacy | B5 (missing pages) | — | Phase 1 |
| Site-wide | B3, B5 | U8 (meta titles), U12 (404 page) | Phase 1 + 3 |

---

*End of LuminaXpert UI/UX Implementation Plan*
*Generated by automated site audit — June 12, 2026*
