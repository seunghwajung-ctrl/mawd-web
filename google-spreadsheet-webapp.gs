/**
 * MAWD Challenge — 웹사이트 폼 제출 → 구글 스프레드시트 직접 기록
 *
 * 배포 방법:
 * 1. 구글 드라이브에서 스프레드시트 생성 (또는 구글 폼에 연결된 스프레드시트 사용)
 * 2. [확장 프로그램] → [Apps Script] 클릭
 * 3. 이 코드 전체를 붙여넣기
 * 4. [배포] → [새 배포] → 유형: [웹 앱] 선택
 * 5. 설정:
 *    - 설명: MAWD 폼 제출 API
 *    - 실행 사용자: 본인
 *    - 액세스 권한이 있는 사용자: [모든 사용자]
 * 6. [배포] 클릭 → 권한 승인
 * 7. 생성된 웹앱 URL 복사 (https://script.google.com/macros/s/xxxx/exec)
 * 8. 이 URL을 웹사이트에 입력
 */

/** 시트 헤더 (첫 행에 자동 생성됨) */
var HEADERS = [
  '제출시간',
  '참가형태',
  '이름',
  '생년월일',
  '이메일',
  '전화번호',
  '전공',
  '소속/직업',
  '팀명',
  '팀원',
  '아이디어 한 줄',
  '참가 동기',
  '사용해본 AI 도구',
  '포트폴리오 링크',
  '유입 경로',
  '개인정보 동의',
  '참가 서약서 동의',
  '지식재산권 동의',
];

/** GET — 헬스체크용 (배포 확인) */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'MAWD Challenge API' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/** POST — 웹사이트에서 폼 제출 받기 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = getOrCreateSheet();
    var row = [
      new Date(),
      data.participationType || '',
      data.name || '',
      data.birthDate || '',
      data.email || '',
      data.phone || '',
      data.major || '',
      data.affiliation || '',
      data.teamName || '',
      data.teamMembers || '',
      data.idea || '',
      data.motivation || '',
      (data.aiTools || []).join(', '),
      data.portfolio || '',
      data.referral || '',
      data.consentPrivacy ? '동의' : '미동의',
      data.consentPledge ? '동의' : '미동의',
      data.consentIP ? '동의' : '미동의',
    ];

    sheet.appendRow(row);

    return jsonResponse({ success: true, message: '신청이 완료되었습니다.' });
  } catch (err) {
    return jsonResponse({ success: false, message: '오류: ' + err.message });
  }
}

/** 시트가 없으면 생성하고 헤더 추가 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('신청현황');

  if (!sheet) {
    sheet = ss.insertSheet('신청현황');
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/** JSON 응답 반환 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
