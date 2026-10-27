---
name: "mawd-ui-design-system"
description: "MAWD Challenge UI rules as deployed on mawd.cyz.today: pixel type, circuit field, hairline gallery panels, lime accent, and the Syne/Sora portal hero. Use when building or revising any MAWD website UI."
---

# MAWD UI Design System

Use this skill when building or revising MAWD Challenge UI. It describes the site as deployed on https://mawd.cyz.today/ (measured 2026-10-27, commit `a1de083`). When this file and the live site disagree, the live site wins; update this file.

The look has two layers:

1. **Brand layer:** pixel typeface, circuit background, pixel starfall, lime accent. Always on.
2. **Gallery layer:** quiet, monochrome hairline panels and outline buttons. No neon cards, no hard offset shadows.

The first screen (portal hero) is a separate, intentional exception with its own type and palette.

## Source of truth

All styles live in `src/app/globals.css` (one file, ~4.8k lines). Later blocks override earlier ones, so read from the bottom up:

| Lines (approx.) | Block | Status |
|---|---|---|
| 1–1070 | Original retro-arcade system: tokens, nav, old hero, sections | Base; many rules overridden below |
| 3952–4300 | "Endless-tools gallery skin": hairline panels, outline buttons | **Active** for panels and buttons |
| 4302–4327 | "MAWD retro defaults": pixel font on everything, circuit background | **Active**, `!important` |
| 4329–4790 | Sticky portal hero | **Active**, first screen only |
| 4792–4832 | Re-enables starfall and forces pixel font on named classes | **Active** |
| 4833–end | "Reading copy": Pretendard on long paragraphs; `--violet-2` remapped to grey | **Active**, `!important`, must stay last |

Add new rules near the block they belong to. Do not add a third competing token set.

## Typography

- **Headings, labels, numbers, buttons, tags:** `NeoDunggeunmoPro` (pixel). Enforced by `body, body * { font-family: "NeoDunggeunmoPro" !important; letter-spacing: 0 !important; }`.
- **Long reading copy** (section leads, FAQ answers, card body paragraphs, benefit lists): `Pretendard` (already loaded from CDN), line-height 1.6, letter-spacing -0.01em; section leads and FAQ answers 17px (16px on mobile). Set in the "Reading copy" block at the end of `globals.css`. Add new long-paragraph selectors there. Don't add Inter or another web font.
- **Portal hero only:** `Syne` 800 uppercase for the wordmark and beat titles; `Sora` 500–600 for labels, body copy, and hero buttons. They're loaded in `layout.tsx` as `--font-syne` and `--font-sora`, and reach the hero through `!important`.
- **Sizes seen live:** section titles 54–72px desktop (`clamp`), kicker 12px, body 15px (html is 93.75%), nav 14px, tags 12px, footer 13px.

## Color

Tokens in `:root` (top of `globals.css`) plus the gallery tokens:

```css
/* surfaces (gallery layer) */
--color-obsidian-canvas: #080808;   /* section background */
--color-onyx-card: #181818;         /* panel fill */
--color-graphite-layer: #1e1e1e;    /* input fill */
--color-slate-border: #373737;      /* default hairline */
--color-iron-border: #505050;       /* hover hairline */
--color-ash-mute: #959595;          /* secondary text */
--color-paper-white: #fff;          /* primary text */
--color-signal-blue: #1d9bf0;       /* nav/link hover only */

/* brand accents */
--lime: #4dff00;  --lime-bright: #66ff00;
--violet: #9d00ff; --violet-2: #c78cff;
```

How color is used:

- **Panels, borders, buttons:** neutral only (onyx / slate / white).
- **Lime:** accent text and small marks. Section kickers, stat values, years, FAQ toggles, sponsor logo links, the scroll-top button, the active carousel dot, and pull quotes (`.reason-pull`).
- **Violet:** shadows only (mobile nav toggle, scroll-top button). `--violet-2` is remapped to `--color-ash-mute`, so tags and labels that used it (`.tag`, `.faq-num`, `.stat-source`, `.message-tag`) read as grey. Lime is the only accent colour for text. Don't add new violet text.
- **Glow:** only as `text-shadow` on accent text (kicker, stat value, some headings). Never as a panel `box-shadow`.

## Surfaces

**Panel / card** (`.hackathon-card`, `.detail-story-card`, `.program-panel`, `.benefit`, `.faq-item`, `.prize-rule`, `.vibe-card`, and others):

```css
border: 1px solid var(--color-slate-border);
border-radius: 10px;
background: var(--color-onyx-card);
box-shadow: none;
/* hover */
border-color: var(--color-iron-border);
transform: translateY(-3px);   /* catalog cards; others only change border */
```

New panels join the existing `:is(...)` list in the "hairline-led panels" block (around line 4211) instead of restyling from scratch.

**Tags / chips:** `1px solid rgba(255,255,255,.38)`, radius 7px, transparent fill, 12px.

**Modals and inputs:** onyx panel, slate border, radius 10px. Inputs use `--color-graphite-layer` with a slate border. Backdrop `rgba(0,0,0,.82)` with `blur(12px)`.

**Section background:** `--color-obsidian-canvas` over the body's circuit field (`/hero-bg-circuit.svg` plus a violet/lime radial wash). `body::before/::after` (grid and scanline) and `.background-pixel-stars` stay visible; don't hide them.

## Buttons

`.btn` is an outline button:

| State | Style |
|---|---|
| Default | transparent fill, `1px solid --color-slate-border`, radius 10px, white text |
| `.btn.primary` | same, with a white border |
| Hover | onyx fill, white border, `translateY(-1px)` |
| `.btn.primary:hover` | inverts: white fill, `#080808` text |

Don't bring back the old lime-filled CTA with a violet offset shadow. Lime is accent text, not a button fill.

## Portal hero (first screen)

`Hero.tsx` plus the `.portal-*` CSS. It's a sticky, scroll-driven stage about 1120vh tall: split panels open, and the `MAWD | CHALLENGE` wordmark separates while text "beats" fade in. It has its own scoped palette:

```css
--portal-ground: #0a0c0e;  --portal-ink: #ede7dc;  --portal-ink-2: #9ea5a8;
--portal-amber: #e8913c;   /* left labels and dot */
--portal-teal: #2e6b72;    /* right/center labels and dot */
--portal-hairline: rgba(237,231,220,.13);
```

- Hero buttons: radius 4px, `1px` hairline, translucent fill with `backdrop-filter: blur(10px)`, Sora 12px/600.
- Keep the portal palette, Syne, and Sora inside `.portal-hero`. Don't leak amber/teal into the sections below, and don't put lime/violet in the hero.
- The `prefers-reduced-motion` branch flattens the hero into a static stack. Keep it working when you change beats.

## Motion

- Section entrance: `ScrollReveal` (opacity and transform, 520ms ease).
- Hover: at most 1–3px lift with a border-color change, 180–220ms.
- Mobile program carousel: `transform` track, 360ms `cubic-bezier(.22,.8,.25,1)`.
- Respect `prefers-reduced-motion` for anything scroll-driven.

## Layout and responsive

- Container: `.wrap` = `min(1280px, calc(100% - 40px))`.
- Section padding: about 96–100px desktop, 52–58px mobile.
- Breakpoint: `max-width: 760px`. Grids collapse to one column. Hero buttons stack full-width.
- No horizontal overflow from 320px up. Interactive targets are at least 44px tall.

## Known leftovers (don't copy)

- The Inter declarations in the gallery skin and mobile blocks: the pixel font or the Reading copy block overrides them.
- `--font-display` (used by `.depth-text`) is never defined, and `DepthText` isn't on the homepage. Ask before reviving it.
- The old hero rules (`.hero-logo`, `.challenge`, `.headline`) and hard offset-shadow recipes in the first ~1000 lines are superseded.

## Workflow

1. Start from latest `origin/main` (see `AGENTS.md`) and follow its surgical-fix scope rules.
2. Find the active rule for the element. Search `globals.css` from the bottom, or check computed styles on the live site.
3. Reuse tokens and the existing panel and button recipes. Don't add a dependency or a font.
4. Run `npm run lint` and `npm run build`.
5. Check desktop (1440px) and mobile (390px): pixel font on headings and labels outside the hero, Pretendard on long paragraphs, no overflow, visible focus.

## QA checklist

- [ ] Headings and labels outside the hero use NeoDunggeunmoPro; long paragraphs use Pretendard.
- [ ] Panels are onyx with a slate hairline, radius 10px, and no box-shadow.
- [ ] Buttons are outline style; primary hover inverts to white.
- [ ] Lime is the only accent text colour; violet appears only in small shadows.
- [ ] Portal hero palette and fonts stay inside `.portal-hero`.
- [ ] Circuit background and pixel stars are still visible.
- [ ] No horizontal overflow at 320–390px; focus is visible.
- [ ] `lint` and `build` pass.
