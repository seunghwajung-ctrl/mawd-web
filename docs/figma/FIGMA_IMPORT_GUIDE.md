# MAWD Challenge → Figma Import Guide

> **목적**: 기존 Next.js + Tailwind 기반 MAWD 랜딩 페이지를 Figma로 옮기기 위한 참고 자료

---

## 방법 1: html.to.design (Figma Plugin) — 추천

### 준비
1. Figma 플러그인 **"html.to.design"** (by Builder.io) 설치
2. 로컬 서버 실행: `npm run dev` → `http://localhost:3000`

### Import 방법
- Figma에서 `Plugins → html.to.design` 실행
- URL 입력창에 `http://localhost:3000` 입력
- 또는 **`mawd-fullpage.html`** 파일을 직접 붙여넣기
- 플러그인이 HTML/CSS를 파싱해 Figma 레이어로 변환

### 제공 파일
| 파일 | 설명 |
|---|---|
| `mawd-fullpage.html` | 전체 페이지 HTML (html.to.design에 붙여넣기) |
| `mawd-fullpage.png` | 전체 페이지 스크린샷 (1440px, 참고용) |
| `DESIGN_TOKENS.md` | 컬러, 타이포, 간격 등 디자인 시스템 명세 |
| `section-*.png` | 섹션별 스크린샷 (참고용) |
| `mobile-hero.png` | 모바일 히어로 스크린샷 (375px, 참고용) |

---

## 방법 2: 수동 Figma 셋업

DESIGN_TOKENS.md를 보고 아래 순서로 Figma에 디자인 시스템을 만드세요:

1. **Color Styles** — 12개 컬러 변수 등록 (DESIGN_TOKENS.md 참조)
2. **Text Styles** — 7개 타이포그래피 스타일 등록
3. **Section by section** — 스크린샷을 참고해 각 섹션 제작
4. **Auto Layout**에서 `4px` border-radius, 네온 그림자 효과 적용

---

## 구성 섹션 (총 10개)

| # | 섹션 | ID | 설명 |
|---|---|---|---|
| 1 | **Nav** | `header` | 고정 네비게이션, 로고 + 링크 + 버튼 |
| 2 | **Hero** | (첫 section) | MAWD 로고, 헤드라인, CTA 버튼, flow-band |
| 3 | **VibeCoding** | `#vibe-coding` | 바이브코딩 시대, 3개 카드 |
| 4 | **NoBarrier** | `#no-barrier` | 창업 부담 제거, 3개 배리어 카드 |
| 5 | **Experience** | `#experience` | MAWD 경험, 4개 카드 |
| 6 | **Problem** | `#problem` | AI 통계 + 문제 인식 |
| 7 | **Reason** | `#reason` | 기업 사례 + 메시지 |
| 8 | **Program** | `#program` | 프로그램 라운드 5단계 |
| 9 | **Benefits** | `#benefits` | 참가자/스폰서 혜택 |
| 10 | **FAQ** | `#faq` | 아코디언 FAQ (7문항) |
| — | **Footer** | `footer` | 링크 + 소셜 + 카피라이트 |

---

## Breakpoints

| 구분 | 너비 | 적용 |
|---|---|---|
| Desktop | 1440px+ | 기본 레이아웃 |
| Tablet | ≤1060px | 2열→1열, 햄버거 메뉴 |
| Mobile | ≤760px | 1열, 폰트 축소, 버튼 full-width |

---

## 폰트

| 이름 | 종류 | Figma 셋업 |
|---|---|---|
| **NeoDunggeunmoPro** | 본문/버튼/네온 (monospace 느낌) | `public/fonts/NeoDunggeunmoPro-Regular.woff` |
| **Pretendard Variable** | 보조 텍스트 | Google Fonts CDN |
| **Black Han Sans** | heading 대체 | layout.tsx에 설정 |
| **Press Start 2P** | 픽셀 느낌 | layout.tsx에 설정 |
