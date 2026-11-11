# 홈페이지 기업·기관·학교용 구역 개편 기획

- 작업 이슈: Epic https://github.com/seunghwajung-ctrl/mawd-web/issues/1 (하위 #2~#12). 이슈가 기준이다.
- 작업 분기: `feat/b2b-homepage-inquiry`. 대표가 미리보기 주소에서 승인하기 전에는 main에 합치지 않는다.
- 문구 출처: 다봉 초안 `mawd-work/handoffs/b2b-zone-copy.md`, `privacy-notice-and-policy.md` (대표 승인 전, 코드에 `TODO(copy)`로 표시)
- 메일 발송 설정: [`docs/inquiry-apps-script/README.md`](inquiry-apps-script/README.md)

## 수용 기준 (Epic #1)

1. VIBE CODING ERA 아래가 TEAM MAWD → 행사 운영 서비스 → TEAM Gallery → 스폰서·제휴 혜택 → FAQ → CTA 순서로 보인다.
2. 삭제 대상 5개 컴포넌트(MawdDetailStory, ProgramSection, BenefitsSection, PrizeSection, ReasonSection) 파일이 없고 src 어디에서도 참조되지 않는다.
3. CTA에 '도입하기'와 '스폰서·제휴 문의' 버튼만 있고, '도입하기'는 문의 페이지(/inquiry)로 이동하며 '스폰서·제휴 문의'는 기존 팝업을 연다.
4. 양식을 올바르게 채워 한 번 제출하면 team.mawd@cyz.today에 메일이 정확히 1통 도착하고, 접수 완료 안내는 발송이 확인된 뒤에만 보인다. 연달아 눌러도 1통만 온다.
5. 필수 항목 누락, 이메일 형식 오류, reCAPTCHA 미확인, 숨김 필드 입력, 15초 무응답이면 메일이 오지 않고 완료 안내도 보이지 않는다. 발송 실패와 시간 초과 때는 오류 안내와 직접 문의 안내가 보이고 입력 내용이 남는다.
6. 동의 체크박스 옆에 안내문이 있고 개인정보처리방침 페이지(/privacy)가 열린다.
7. 수정한 파일(Nav, Footer, HackathonCatalog, page.tsx)에 #program, #benefits 앵커가 남지 않는다.
8. 메뉴·푸터의 '프로그램', '스폰서·제휴', '도입하기', 'TEAM Gallery' 링크가 정해진 곳으로 이동하고 CHOOSE YOUR QUEST에 '참가 혜택' 링크가 없다.
9. 위쪽 구역은 링크 수정 외에 바뀌지 않고, 폭 375px 화면에서 새 구역·양식 페이지·처리방침 페이지에 가로 스크롤과 겹침이 없다.
10. 기획 문서가 저장소 docs/ 아래 마크다운으로 있다.
11. 마케터 최종 문구가 반영되고 대표가 미리보기 주소에서 승인하기 전에는 공개되지 않는다.

## 구현 요약

| 부분 | 파일 |
|---|---|
| 새 섹션 3개 | `src/components/B2bSections.tsx` |
| 문의 페이지·양식 | `src/app/inquiry/page.tsx`, `src/components/InquiryForm.tsx` |
| 입력 검사·서버 전송 로직(브라우저·서버 공용, 테스트 `npm test`) | `src/lib/inquiry.ts`, `src/lib/inquiry.test.mjs` |
| 서버 경로 | `src/app/api/inquiry/route.ts` |
| 처리방침 | `src/app/privacy/page.tsx` |
| Apps Script | `docs/inquiry-apps-script/Code.gs` |

전송 경로: 브라우저 → `/api/inquiry`(입력 재검사 → reCAPTCHA 비밀 키 검증 → 공유 비밀값을 붙여 Apps Script 호출, `{ ok: true }`만 성공) → Apps Script가 team.mawd@cyz.today로 메일 1통. 메일 외 저장 없음.

서버 환경변수(Vercel Production·Preview): `RECAPTCHA_SECRET_KEY`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `INQUIRY_APPS_SCRIPT_URL`, `INQUIRY_APPS_SCRIPT_SECRET`.

---

## 실행 계획 (PM 다빈 작성 원문)

# 실행 계획: 마우드 홈페이지 기업·기관·학교용 구역 개편

작성일 2026-11-11 · PM 다빈 · Seed `seed_b97eedf8df17` (`C:\Users\Administrator\mawd-work\seed-mawd-b2b-homepage.yaml`)

작업 목록은 GitHub 이슈로 관리한다: https://github.com/seunghwajung-ctrl/mawd-web/issues/1

## 개요

홈페이지에서 VIBE CODING ERA까지는 메뉴·푸터 링크 수정 외에는 그대로 두고, 그 아래를 기업·기관·학교용 구역으로 바꾼다. 순서는 TEAM MAWD → 행사 운영 서비스 → TEAM Gallery → 스폰서·제휴 혜택 → FAQ → CTA('도입하기', '스폰서·제휴 문의')이다. '도입하기'는 해커톤·AI 행사 운영 문의 양식 페이지로 연결되고 제출 내용은 team.mawd@cyz.today로 메일로 온다. 마케터 최종 문구와 대표 승인(미리보기 주소) 후에 공개한다.

## 주요 결정

- **삭제:** 챌린지 소개, 진행일정, 혜택, 상금, '학력보다 강한 스펙' 5개 섹션을 파일까지 지운다.
- **메일 전달:** 브라우저 → 사이트 서버 → 팀 구글 계정의 Apps Script → team.mawd@cyz.today. 메일 외 저장은 없다.
- **스팸·실패 대비:** 숨김 필드, 중복 제출 방지, 구글 reCAPTCHA(서버에서 검증), 15초 시간 제한, 실패 시 직접 문의 안내와 입력 유지.
- **개인정보:** 체크박스 옆 짧은 안내문과 별도 처리방침 페이지. 보관 기간은 '문의 처리 완료 시까지'.
- **공개 절차:** 별도 분기에서 작업하고 Vercel 미리보기 주소에서 대표가 승인한 뒤 main에 합친다. main에 올리면 바로 공개된다.
- **완료 기준:** 수치 목표 없이 동작 확인만 한다.

## 하지 않는 것

문의 건수 목표, 방문·클릭 집계 도구, 메일 외 저장, 위쪽 구역의 링크 수정 외 변경, 다른 페이지(/programs, /gallery, /cardnews, /countdown) 수정, 영문 버전, 자동 회신 메일.

## 작업 순서

### 1단계: 준비와 뼈대
- #2 [개발] 착수 확인: 작업 분기, Vercel 미리보기, reCAPTCHA 조건
- #3 [개발] 삭제 대상 5개 섹션 제거
- #4 [개발] 새 섹션 3개, TEAM Gallery 이름 변경, FAQ 임시 내용
- #10 [마케팅] 기업·기관·학교용 구역 문구 (개발과 동시에 진행)
- #11 [마케팅] 개인정보 동의 안내문과 처리방침 초안 (개발과 동시에 진행)

**확인 지점 1:** 미리보기 주소에서 새 구역 순서가 보이고 빌드가 성공한다.

### 2단계: 문의 양식
- #6 [개발] 도입하기 문의 페이지와 양식 화면
- #5 [개발] CTA 버튼과 메뉴·푸터·CHOOSE YOUR QUEST 링크 재편
- #8 [개발] 개인정보처리방침 페이지와 동의 안내문
- #7 [개발] 양식 전송 경로와 Apps Script 배포 안내서

**확인 지점 2:** 서버 검증 자동 테스트가 통과한다. 대표가 Apps Script를 배포하면 미리보기에서 시험 문의 1건이 메일함에 1통으로 도착한다.

### 3단계: 문구 반영과 승인
- #12 [대표] 계정 권한 전달, Apps Script 배포, 문구·미리보기 승인
- #9 [개발] 최종 문구 반영, 모바일 점검, 기획 문서 등록

**확인 지점 3:** Epic(#1)의 수용 기준 11개를 미리보기 주소에서 확인하고 대표가 승인한다. 그 뒤 main에 합쳐 공개한다.

## 담당별 넘김 목록

| 담당 | 만드는 것 |
|---|---|
| 개발자(다비) | 섹션 삭제·신설, 링크 재편, 문의 페이지와 전송 경로, 처리방침 페이지, Apps Script 코드와 배포 안내서, reCAPTCHA 키 발급, 저장소 docs/의 기획 문서 |
| 마케터(다봉) | 새 구역·FAQ·CTA·양식 페이지 문구, 개인정보 안내문과 처리방침 초안(법정 필수 항목 확인 포함) |
| 대표 | 팀 구글 계정 권한 전달, Apps Script 배포, 문구 승인, 미리보기 확인과 공개 승인 |

## 위험과 대응

| 위험 | 영향 | 대응 |
|---|---|---|
| reCAPTCHA를 무료로 쓸 수 없거나 조건이 맞지 않음 | 높음 | #2에서 먼저 확인하고, 안 되면 작업을 멈추고 대표에게 알린다 |
| Vercel 분기별 미리보기가 꺼져 있음 | 중간 | #2에서 확인한다. 꺼져 있으면 승인 방법을 대표와 다시 정한다 |
| Apps Script 배포나 계정 권한 전달이 늦어짐 | 중간 | 전송 경로는 자동 테스트로 먼저 검증하고, 실제 메일 확인만 배포 뒤로 미룬다 |
| 임시 문구가 그대로 공개됨 | 높음 | main에 합치지 않는다. #9에서 임시 문구가 남지 않았는지 확인한다 |
| 개인정보 안내에 법정 필수 항목이 빠짐 | 높음 | #11에서 초안 작성 전에 항목과 출처를 확인한다 |

## 열린 질문

- reCAPTCHA의 현재 무료 한도와 약관 (개발자가 #2에서 확인)
- 개인정보 안내에 법적으로 꼭 들어가야 하는 항목 (마케터가 #11에서 확인)
- 품질 점검(QA)은 다듬기 전 0.64점이었고, 다듬은 뒤에는 다시 돌리지 않았다.
