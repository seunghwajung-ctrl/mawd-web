# MAWD Web

MAWD Challenge marketing site — Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4.

Migrated from [`CuriousPaul/mawd-marketing-site`](https://github.com/CuriousPaul/mawd-marketing-site) (static HTML) to a modern component-based architecture while preserving the original retro-arcade / game-HUD design system.

## Product Direction

The source of truth for MAWD Challenge planning and product direction is the final PRD:

- [MAWD Challenge PRD Final](docs/mawd-challenge-prd-final.md)
- [Original Word document](docs/mawd-challenge-prd-final.docx)

Future copy, UX, feature prioritization, and application flow decisions should stay aligned with this PRD.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + ported MAWD design system CSS |
| Fonts | Pretendard Variable (CDN), Black Han Sans + Press Start 2P (`next/font/google`) |

## Pages

- `/` — Landing page (hero HUD, challenge intro, program rounds, benefits, apply CTA)
- `/cardnews` — 8-card print-ready cardnews (1080×1080)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Application And Contact Flow

- All participant CTAs labeled `참가하기`, `참가 하기`, or `참가 신청` use one shared action.
- If `NEXT_PUBLIC_GOOGLE_FORM_URL` is configured, participant CTAs open that Google Form in a new tab.
- If `NEXT_PUBLIC_GOOGLE_FORM_URL` is empty, participant CTAs use the default public Google Form from the repo example env.
- If the Google Form URL is intentionally removed from code and env, participant CTAs show a `신청 준비 중` modal instead of collecting demo data.
- Login and signup are not shown in the production landing page until a real account flow exists.
- `문의하기` and `스폰서 문의` show the current contact routes: `team.mawd@gmail.com` and `@team_mawd`.

## Build

```bash
npm run build
npm run start
```

## Deploy

Vercel-ready. Connect the repo at [vercel.com/new](https://vercel.com/new) — no config needed.

For static export (GitHub Pages), add `output: "export"` to `next.config.ts` and run `npm run build`.

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── globals.css         # MAWD design system (ported from original)
│   ├── page.tsx            # Landing page
│   └── cardnews/
│       ├── page.tsx        # Cardnews route
│       └── page.module.css # Cardnews styles
└── components/
    ├── Nav.tsx
    ├── Hero.tsx
    ├── ChallengeSection.tsx
    ├── ProgramSection.tsx
    ├── BenefitsSection.tsx
    ├── ApplySection.tsx
    └── Footer.tsx
public/
├── hero-bg.png             # Hero background (retro-arcade design ref)
└── cards/                  # 8 exported cardnews PNGs
docs/
├── mawd-challenge-prd-final.md
└── mawd-challenge-prd-final.docx
```

## About MAWD

MAWD Challenge is an AI build challenge where participants create self-agents and industry-specific services, then get virtual-money investments from judges and companies. Build. Prove. Earn.
