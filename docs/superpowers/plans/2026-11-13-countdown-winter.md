# Countdown Winter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** /countdown을 검정 배경 + 픽셀 도트 눈 + 큰 좌하단 숫자로 리디자인.
**Architecture:** `CountdownExperience.tsx` 안에 `SnowCanvas` 컴포넌트(캔버스 1개, rAF 루프) 추가, 마크업을 좌하단 레이아웃으로 바꾸고 `globals.css`의 countdown-* 페이지 스타일 교체.
**Tech Stack:** Next 16, React 19, CSS. 새 의존성 없음.
**Spec:** `docs/superpowers/specs/2026-11-13-countdown-winter-design.md`

## Global Constraints
- 새 의존성 금지. 관리자 화면(`CountdownAdmin.tsx`, `.countdown-admin-*`, `.countdown-back-link`) 동작·스타일 유지.
- `prefers-reduced-motion: reduce`면 눈은 한 번만 그리고 정지.

## Review Focus
- 창 크기 변경(스크린 연결/전체화면 전환): 캔버스가 새 크기·DPR로 다시 맞춰져야 함.
- 목표 시각 경과: 숫자 대신 `STARTED.` 표시.
- 탭 숨김 후 복귀: rAF 정지/재개로 눈이 한꺼번에 튀지 않아야 함(dt 상한).
- 언마운트: rAF·resize 리스너 해제.
- 좁은 화면(640px 이하)에서도 숫자가 넘치지 않음.

---

### Task 1: 눈 캔버스 + 레이아웃

**Files:** Modify `src/components/CountdownExperience.tsx`, `src/app/globals.css` (countdown-page ~ countdown-target, 640px 미디어쿼리)

- [ ] `SnowCanvas()` 추가: 화면 면적 비례 플레이크(3개 깊이층: 크기 2/3/4px 정사각형, 속도·불투명도 층마다 다름, sin 흔들림), DPR 대응, dt 상한 50ms, reduced-motion이면 1프레임만.
- [ ] 마크업: 좌상단 `MAWD` 워드마크, 우상단 ADMIN, 좌하단 제목 → 숫자(보라 마침표) → 라벨 행 + 목표일. 남은 시간 0이면 `STARTED.`.
- [ ] CSS: 순수 검정 배경, 숫자 `clamp(…, 15vw, …)`, 기존 SVG 배경 제거.
- [ ] 검증: `npm run lint`, `npm run build` 통과, 브라우저로 /countdown 스크린샷(데스크톱·모바일).
- [ ] 리뷰: general-purpose 서브에이전트 코드 리뷰 → Critical/Important 수정 → 커밋.
