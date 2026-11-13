# /countdown 겨울 리디자인 (short design)

- **의도:** 행사장 스크린에 띄우는 카운트다운. 기존 디자인 대신 레퍼런스(UIGO "Merry Christmas" 포스터: 검정 배경, 픽셀 도트, 큰 산세리프, 보라 마침표)처럼 겨울 느낌과 눈 내리는 모션을 낸다.
- **목표:** 순수 검정 배경, 흰 네모 도트 눈(3겹 깊이, 좌우 흔들림), 화면을 가득 채우는 큰 숫자 + 보라 마침표, 좌하단 정렬 타이포.
- **비목표:** 관리자 화면 변경, 설정 저장 방식(localStorage) 변경, 중앙 픽셀 그림.
- **안티골:** 새 의존성, 프레임 드랍, 움직임 줄이기 무시.
- **접근:** A `<canvas>` 픽셀 눈 (선택: 의존성 0, 4K에서도 부드러움) / B CSS div 눈 (반복적으로 보임) / C 파티클 라이브러리 (의존성 추가로 제외).
- **동작:** 시간이 0이 되면 숫자 대신 `STARTED.` 표시. `prefers-reduced-motion`이면 눈 정지 상태로 1회만 그림.
- **파일:** `src/components/CountdownExperience.tsx`, `src/app/globals.css`(countdown-* 영역).
