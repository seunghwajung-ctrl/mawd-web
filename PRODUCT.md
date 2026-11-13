# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: Korean college students, young adults, non-majors, and aspiring founders (planning, development, design, and marketing backgrounds) deciding whether to join a MAWD hackathon. Many have never written code. They arrive mostly from Instagram cardnews and shared links, often on mobile and inside in-app browsers.

Secondary: sponsors (companies, DevRel teams) and public institutions evaluating TEAM MAWD as a partner. They reach the site through proposals and the sponsor-inquiry flow.

## Product Purpose
mawd.cyz.today is the home of TEAM MAWD's hackathons. It lists every MAWD hackathon (data/website-catalog.json), with MAWD START-UP CHALLENGE (Nov 14, venue TBA) as the current headline event. Success means a participant understands they can take part without a development background and signs up through the event's apply link.

## Positioning
- **Non-majors ship a real MVP.** With AI vibe coding, people who have never coded build a working product within 48 hours (one night and two days), not a document.
- **Virtual-capital funding (PEL, Prototyping Evaluation Level).** Instead of score-based judging, judges and participants invest virtual capital in projects, and investment converts into prize money. "Build. Prove. Earn."
- **One-person AI company theme.** A single run covers planning (problem/market fit), product (MVP and brand), and go-to-market plus workflow automation.

## Operating Context
- Signup: participant CTAs (참가하기 / 참가 신청) link to the event's Luma page (src/lib/luma-config.ts, per-event `applyUrl` in the catalog). A Google Form remains as a fallback config (src/lib/form-config.ts).
- Contact: 문의하기 and 스폰서 문의 show team.mawd@cyz.today and Instagram @team_mawd.
- Promotion runs through Instagram cardnews (/cardnews, docs/instagram-cardnews-plan-2026-10-27.md).
- Other routes: /programs, /gallery, /countdown (live event countdown with /countdown/admin).
- Teams are formed across four roles: planning, development, design, marketing.

## Capabilities and Constraints
- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4; deployed on Vercel from `main` only (see AGENTS.md).
- Content language is Korean, with English labels used as section markers.
- Baseline tag `v0.6-startup-challenge-baseline` must stay in history; changes default to minimal, scope-locked patches (AGENTS.md).
- Login/signup accounts do not exist; do not show them until a real account flow exists.
- Upcoming catalog hackathons (local impact, AI workflow, creator AI) have no confirmed dates or venues.
- Prize amounts are not public yet (shown as ??????); do not invent figures.

## Brand Commitments
- Names: TEAM MAWD (operator), MAWD Challenge, MAWD START-UP CHALLENGE.
- Tagline: Build. Prove. Earn.
- Logo assets: public/mawd-logo.png, public/branding/mawd-cube-logo*.png.

## Evidence on Hand
- Track record (docs/mawd_startup_challenge_master_handbook.md): ran OBA weekendthon (main sponsor OpenAI Korea); held the August 2026 MAWD Challenge, where non-majors deployed MVPs; confirmed as main operator of the November 2026 Replit hackathon; sponsors include 아정당, 채널톡, Vapi AI, Zetic AI; mentors from Hanyang University and Hanyang ERICA computer science.
- Field photos: public/gallery/mawd-field-0{1,2,3}.jpg. Event image: public/programs/mawd-startup-challenge.jpg. Sponsor logos: public/sponsors/.
- Program description and sponsorship proposal PDFs in docs/.
- No participant testimonials, outcome metrics, or published prize amounts exist; do not fabricate them.

## Product Principles
1. No-barrier first: every page answers "can I do this without coding?" before anything else.
2. Proof over promises: show built results, real events, and real sponsors; never claimed outcomes.
3. One clear path to signup: every participant CTA goes to the same event apply link.
4. Hub, not a one-off: new hackathons slot into the catalog without reworking the site.
