# MAWD Challenge — Design System Tokens

> Figma에 등록할 디자인 토큰 (CSS 변수 기반)

---

## 🎨 Colors

### Core
| Token | Hex | 용도 | Figma Style Name |
|---|---|---|---|
| `--black` | `#050505` | 배경 | `bg-black` |
| `--ink` | `#101010` | 보조 배경 | `bg-ink` |
| `--paper` | `#f4f1e8` | 스티커 배경 | `bg-paper` |
| `--white` | `#f8f8f2` | 기본 텍스트 | `text-white` |

### Brand
| Token | Hex | 용도 | Figma Style Name |
|---|---|---|---|
| `--lime` | `#4dff00` | 강조, 액션, 네온 그린 | `lime` |
| `--lime-2` | `#b8ff3d` | 보조 라임 | `lime-2` |
| `--lime-bright` | `#66ff00` | 라임 밝은 톤 | `lime-bright` |
| `--violet` | `#9d00ff` | 보라 강조 | `violet` |
| `--violet-2` | `#c78cff` | 보라 연한 톤 | `violet-2` |
| `--violet-bright` | `#b026ff` | 보라 밝은 톤 | `violet-bright` |

### Neutral
| Token | Hex | 용도 | Figma Style Name |
|---|---|---|---|
| `--steel` | `#9ca3af` | 선택사항/메타 | `steel` |
| `--panel` | rgba(8,8,8,0.78) | 카드 배경 | `panel` |
| `--line` | rgba(248,248,242,0.2) | 테두리 | `line` |
| `--lime-line` | rgba(102,255,0,0.82) | 라임 테두리 | `lime-line` |
| `--violet-line` | rgba(157,0,255,0.78) | 보라 테두리 | `violet-line` |

### Glows (Drop Shadow in Figma)
| Token | Value |
|---|---|
| `--glow-lime-sm` | `0 0 8px rgba(102,255,0,0.55)` |
| `--glow-lime-md` | `0 0 18px rgba(102,255,0,0.6), 0 0 32px rgba(102,255,0,0.32)` |
| `--glow-lime-lg` | `0 0 22px rgba(102,255,0,0.78), 0 0 44px rgba(102,255,0,0.42), 0 0 70px rgba(102,255,0,0.22)` |
| `--glow-violet-sm` | `0 0 8px rgba(157,0,255,0.55)` |
| `--glow-violet-md` | `0 0 18px rgba(157,0,255,0.6), 0 0 32px rgba(157,0,255,0.32)` |
| `--glow-violet-lg` | `0 0 22px rgba(157,0,255,0.78), 0 0 44px rgba(157,0,255,0.42), 0 0 70px rgba(157,0,255,0.22)` |

### Background Gradients (in 코드)
- `body`: radial violet at 18% 12% + radial lime at 78% 4% + linear dark overlay
- `section:not(.hero)`: linear 180deg black fade
- `.apply`: dual linear gradient lime+violet
- `.vibe-message`: linear 135deg violet
- `.program-panel`: linear 135deg violet transparent

---

## 🔤 Typography

### Font Families
| Name | Usage | Weight |
|---|---|---|
| **NeoDunggeunmoPro** | 본문, 버튼, 숫자, 태그, 네온 텍스트 | 400 (Regular) |
| **Pretendard Variable** | 긴 문단, FAQ 본문 | variable |
| **Black Han Sans** | heading 대체 폰트 (CSS variable) | 400 |
| **Press Start 2P** | 레트로 느낌 (CSS variable) | 400 |

### Text Styles (clamp 기준)
| Element | Size | Line Height | Weight | Color |
|---|---|---|---|---|
| `h1.hero-logo` | clamp(380px, 54vw, 1050px) w/ 이미지 | auto | — | 이미지 |
| `.challenge` | clamp(24px, 4vw, 62px) | 0.83 | 400 | white |
| `.headline` | clamp(22px, 3vw, 38px) | 1.2 | 400 | white + lime em |
| `h2` | clamp(34px, 5vw, 68px) | 1.05 | 950 | white |
| `.lead`, `p` 본문 | 15–19px | 1.55–1.72 | — | rgba(white, 0.7) |
| `.btn` | 20px (mobile 13–16px) | 1 | 400 | white / #050505 |
| `.section-kicker` | 12px | 1.6 | 400 | lime |
| `.flow-card span` | 15px | — | 850 | white |
| `.stat-value` | clamp(36px, 4.5vw, 52px) | 1 | 400 | lime |
| `.faq-q` | 17px | — | 800 | white |

---

## 📐 Spacing & Grid

### Layout
| Token | Value |
|---|---|
| `.wrap` max-width | 1180px |
| Desktop gap | `calc(100% - 40px)` margin auto |
| Mobile gap | `calc(100% - 28px)` margin auto |

### Section Padding
| Device | Padding |
|---|---|
| Desktop | 72px top/bottom |
| Mobile (≤760px) | 52px top/bottom |

### Card Grids
| Grid | Columns | Gap |
|---|---|---|
| `.mission-grid` | 3 | 16px |
| `.company-grid` | auto-fit, minmax(280px,1fr) | 16px |
| `.vibe-grid` | auto-fit, minmax(280px,1fr) | 18px |
| `.barrier-grid` | auto-fit, minmax(280px,1fr) | 18px |
| `.exp-grid` | auto-fit, minmax(280px,1fr) | 18px |
| `.flow-band` | 6 (mobile 2) | 12px |
| `.benefits` | 2 (mobile 1) | 18px |
| `.stat-grid` | auto-fit, minmax(200px,1fr) | 16px |
| `.message-grid` | 2 (tablet 1) | 18px |

### Card Padding
| Card | Padding |
|---|---|
| `.mission-card` | 22px |
| `.benefit` | 26px |
| `.vibe-card` | 28px 24px |
| `.barrier-card` | 28px 24px |
| `.exp-card` | 28px 24px |
| `.stat-card` | 24px 22px |
| `.company-card` | 24px 22px |
| `.message-card` | 28px 24px |
| `.flow-card` | 14px 10px |

---

## 🧩 Components

### Button (`.btn`)
| Property | Default | Primary | Ghost |
|---|---|---|---|
| BG | rgba(5,5,5,0.92) | `#4dff00` | rgba(5,5,5,0.6) |
| Text | white | `#050505` | white |
| Border | 2px solid white | 2px solid lime | rgba(white,0.42) |
| Shadow | 4px 4px violet | 4px 4px violet + lime glow | 3px 3px violet |
| Min-height | 52px | 52px | 44px |
| Border-radius | 4px | 4px | 4px |
| Hover | translate(-1,-1), stronger shadow | brightness 1.06 | violet border |
| Active | translate(2,2), inset shadow | translate(2,2) | translate(2,2) |

### Card (일반 패턴)
- Border: 1px solid `var(--line)` or `var(--lime-line)` or `var(--violet-line)`
- Background: `rgba(5,5,5,0.78)` with subtle gradient overlay
- Box-shadow: `6px 6px 0 rgba(lime/violet, 0.14)`
- Border-radius: `4px`
- Hover: translate(-2px, -2px), stronger shadow

### Modal
- Backdrop: fixed inset, rgba(3,2,6,0.78), blur(6px)
- Panel: max 560px, lime border, violet shadow (14px 14px)
- Animation: fade + translateY

---

## 📱 Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| **Desktop** | >1060px | Full layout, horizontal nav |
| **Tablet** | ≤1060px | 2-col→1-col, hamburger menu visible |
| **Mobile** | ≤760px | Fonts clamped, buttons full-width, 1-col grids, card padding reduced |

---

## 🖼 필수 에셋 (리소스 링크)

| 에셋 | 경로 |
|---|---|
| MAWD 로고 | `public/mawd-logo.png` |
| 히어로 배경 (SVG) | `public/hero-bg-circuit.svg` |
| NeoDunggeunmoPro 폰트 | `public/fonts/NeoDunggeunmoPro-Regular.woff` |
| 히어로 배경 (PNG) | `public/hero-bg.png` |
| 카드 이미지 | `public/cards/` |
