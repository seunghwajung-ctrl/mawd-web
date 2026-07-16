---
name: mawd-web
description: "마우드 챌린지 시작 — GitHub 저장소, MAWD Challenge 웹사이트, 구글 폼 신청현황 스프레드시트를 자동으로 열어준다."
license: MIT
metadata:
  category: productivity
  locale: ko-KR
  phase: v1
---

# MAWD Web

## What this skill does

유저가 **"마우드 챌린지 시작"** 이라고 말하면 아래 3개를 macOS 기본 브라우저로 자동 오픈한다:

1. **GitHub 저장소** — `seunghwajung-ctrl/mawd-web` 소스 코드
2. **MAWD Challenge 웹사이트** — Vercel에 배포된 라이브 사이트
3. **신청현황 스프레드시트** — 구글 폼 응답이 기록되는 스프레드시트

추가로 구글 폼 참가신청 페이지도 필요하면 함께 안내한다.

## When to use

- "마우드 챌린지 시작"
- "MAWD 챌린지 시작"
- "mawd 웹사이트 열어줘"
- "MAWD 대시보드 열기"
- "참가 현황 봐야돼"

## URLs (source of truth)

변경이 필요하면 이 섹션만 수정하면 된다.

| 항목 | URL |
|---|---|
| GitHub 저장소 | `https://github.com/seunghwajung-ctrl/mawd-web` |
| 웹사이트 | `https://mawd-web.vercel.app/` |
| 구글 폼 (참가신청) | `https://docs.google.com/forms/d/e/1FAIpQLSd_6_tYFLZbwDP-KytHumlfoul1ane7t54zHAe_AAhCNUU9PA/viewform?usp=header` |
| 신청현황 스프레드시트 | `https://docs.google.com/spreadsheets/d/1_RJx0Q03VaPFvtIbnny9ezWjLhV1btnDHDCitqjH-Jk/edit` |

## Workflow

### 1. Trigger: "마우드 챌린지 시작"

유저가 위 trigger 문구를 말하면 즉시 아래를 실행한다.

**절대 추가 질문 하지 말 것.** 유저가 "마우드 챌린지 시작"이라고 말하면 곧바로 실행한다.

### 2. Open all three URLs in parallel

macOS `open` 명령어를 사용해 병렬로 연다:

```bash
open "https://github.com/seunghwajung-ctrl/mawd-web"
open "https://mawd-web.vercel.app/"
open "https://docs.google.com/spreadsheets/d/1_RJx0Q03VaPFvtIbnny9ezWjLhV1btnDHDCitqjH-Jk/edit"
```

### 3. Confirm

URL을 모두 열었다는 짧은 확인 메시지를 남긴다.

```
✅ MAWD Challenge 대시보드를 열었습니다.
- GitHub 저장소
- MAWD Challenge 웹사이트
- 신청현황 스프레드시트
```

### 4. Optional: 구글 폼 참가신청 페이지

유저가 추가로 "참가신청 폼"이나 "구글 폼"을 요청하면 구글 폼 URL도 추가로 열어준다.

```bash
open "https://docs.google.com/forms/d/e/1FAIpQLSd_6_tYFLZbwDP-KytHumlfoul1ane7t54zHAe_AAhCNUU9PA/viewform?usp=header"
```

## Prerequisites

- macOS (open 명령어 사용)
- 기본 브라우저가 설치되어 있어야 함
- 인터넷 연결

## Done when

- [ ] GitHub 저장소가 브라우저에 열렸다
- [ ] MAWD Challenge 웹사이트가 브라우저에 열렸다
- [ ] 신청현황 스프레드시트가 브라우저에 열렸다
- [ ] 유저에게 확인 메시지를 출력했다
- [ ] 추가 질문 없이 즉시 실행했다 (trigger에 한해)

## Notes

- 이 스킬은 **런처형 스킬**이다. 조회/검색이 아니라 브라우저 탭을 여는 것이 전부다.
- trigger가 정확히 "마우드 챌린지 시작"이 아니더라도 유사 표현("MAWD 시작", "mawd-web 열어줘")에도 반응할 수 있다.
- 스프레드시트는 구글 폼 응답이 실시간으로 기록되는 시트이므로, 유저는 이 스프레드시트에서 신청 현황을 모니터링할 수 있다.
