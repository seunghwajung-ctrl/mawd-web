---
name: "mawd-ui-design-system"
description: "MAWD retro-arcade UI rules"
---

# MAWD UI Design System

Use this skill when building or revising MAWD Challenge UI. Preserve the existing retro-arcade / game-HUD identity rather than introducing a generic SaaS or glassmorphism style.

## Source of truth

Before editing, inspect the target component and its direct CSS dependencies. Reuse the existing variables and classes in `src/app/globals.css`; do not introduce a competing token set or external font.

## Visual contract

- Typography: use `NeoDunggeunmoPro` for all visible UI copy, including navigation, buttons, form controls, modal copy, and footer. The sole exception is an explicitly approved image/logo treatment.
- Base: near-black background; off-white text; lime is the primary action/status color; violet is the secondary/accent color.
- Depth: favor hard 4–14px offset shadows, thin outlined borders, subtle inset highlights, and restrained lime/violet glow. Avoid soft, neutral card shadows.
- Pixel language: favor squared corners (4px maximum for primary UI), crisp borders, pixel-grid or scanline texture, and `image-rendering: pixelated` for pixel assets.
- Contrast: primary lime actions use near-black text. Preserve readable body copy and visible focus outlines.
- Motion: keep it short and purposeful. Hover may lift 1px; pressed controls move down/right to visually consume the offset shadow. Respect `prefers-reduced-motion`.

## Tokens

Use the existing variables before adding values:

```css
--black: #050505; --ink: #101010; --paper: #f4f1e8; --white: #f8f8f2;
--lime: #4dff00; --lime-2: #b8ff3d; --lime-bright: #66ff00;
--violet: #9d00ff; --violet-2: #c78cff; --violet-bright: #b026ff;
--line: rgba(248, 248, 242, 0.2);
--lime-line: rgba(102, 255, 0, 0.82);
--violet-line: rgba(157, 0, 255, 0.78);
```

## Component recipes

### CTA

Use `.btn` as the base. Primary CTA: lime fill, 2px border, violet hard shadow, dark label, and a visible `:focus-visible` outline. Do not make a one-off CTA with a different font, rounded pill geometry, or soft shadow.

### Cards and panels

Use a dark translucent panel, one clear accent border (lime for participant/action; violet for sponsor/secondary), and a matching offset shadow. Keep card contents sparse and aligned to the same spacing rhythm. A dense UI needs hierarchy, not more decoration.

### Sections

Use the existing `.wrap` width convention and full-bleed backgrounds. Use a distinct visual beat only where it helps the story: grid/scanline field, terminal-like HUD module, prize visual, or split accent. Avoid stacking unrelated gradients.

### Inputs and dialogs

Match the dark panel, pixel font, high-contrast field border, and lime focus state. Modal/overlay controls must remain keyboard reachable and legible over the backdrop.

## Responsive rules

- Keep all text and CTAs inside the viewport from 320px upward.
- Collapse multi-column layouts before content becomes narrow; preserve at least 44px interactive height.
- Never hide the only meaningful hero asset or CTA on mobile.
- Test desktop and mobile after any visible change; check that glow, shadows, and horizontal overflow do not clip content.

## Build workflow

1. Read the target component and direct CSS dependencies. State the minimal file scope.
2. Reuse existing tokens, font, and component patterns.
3. Make the smallest coherent change; do not globally restyle unrelated pages.
4. Run `npm run lint` and `npm run build`.
5. Visually inspect desktop and mobile. Verify CTA labels, navigation, last-page application CTA, inputs, and footer all retain pixel typography.
6. Report changed files, validation result, and whether the production deployment was performed separately.

## QA checklist

- [ ] Every visible UI string uses the pixel font unless it is an approved image/logo treatment.
- [ ] CTA hierarchy is lime-primary / dark-secondary with violet depth.
- [ ] Colors use existing tokens and contrast stays readable.
- [ ] No horizontal overflow at mobile width.
- [ ] Keyboard focus is visible.
- [ ] `lint` and `build` pass.
- [ ] Desktop and mobile visual checks pass.
