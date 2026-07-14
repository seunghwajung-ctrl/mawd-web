/**
 * MAWD Challenge 참가 신청 Google Form 자동 생성 스크립트
 *
 * 사용 방법:
 * 1. https://drive.google.com 접속
 * 2. [새로 만들기] → [더보기] → [Google Apps Script]
 * 3. 이 코드 전체를 복사해서 붙여넣기
 * 4. [실행] 버튼 클릭 (최초 실행 시 권한 승인 필요)
 * 5. 실행 완료 후 [로그]에서 Form URL과 필드 ID 확인
 */

function createMawdApplyForm() {
  // 폼 생성
  var form = FormApp.create('MAWD Challenge 참가 신청');
  form.setDescription(
    'MAWD Challenge에 참가신청해주셔서 감사합니다.\n\n' +
    '영업일 기준 2일 내에 안내 메일을 발송해드립니다.\n' +
    '오리엔테이션 일정과 준비 사항은 메일로 안내됩니다.'
  );

  // ── 1. 참가 형태 (개인/팀) ──────────────────────────
  form.addMultipleChoiceItem()
    .setTitle('참가 형태')
    .setChoiceValues(['개인 참가', '팀 참가'])
    .setRequired(true);

  // ── 2. 이름 ──────────────────────────────────────────
  form.addTextItem()
    .setTitle('이름')
    .setRequired(true);

  // ── 3. 생년월일 ──────────────────────────────────────
  form.addDateItem()
    .setTitle('생년월일')
    .setRequired(true);

  // ── 4. 이메일 ────────────────────────────────────────
  form.addTextItem()
    .setTitle('이메일')
    .setValidation(FormApp.createTextValidation()
      .requireTextIsEmail()
      .build())
    .setRequired(true);

  // ── 5. 전화번호 ──────────────────────────────────────
  form.addTextItem()
    .setTitle('전화번호')
    .setValidation(FormApp.createTextValidation()
      .requireTextMatchesPattern('^[0-9\\-\\+\\s]+$')
      .setHelpText('숫자, 하이픈, + 기호만 입력 가능합니다.')
      .build())
    .setRequired(true);

  // ── 6. 전공 ──────────────────────────────────────────
  form.addTextItem()
    .setTitle('전공')
    .setRequired(true);

  // ── 7. 소속 / 직업 ───────────────────────────────────
  form.addTextItem()
    .setTitle('소속 / 직업')
    .setHelpText('학생, 직장인, 프리랜서, 창업자 등')
    .setRequired(true);

  // ── 8. 팀명 (선택) ───────────────────────────────────
  form.addTextItem()
    .setTitle('팀명 (선택)')
    .setHelpText('팀이 정해지지 않았다면 비워두세요.');

  // ── 9. 팀원 (선택) ───────────────────────────────────
  form.addParagraphTextItem()
    .setTitle('팀원 (선택)')
    .setHelpText('개인 지원일 시 작성하지 않으셔도 됩니다.\n팀원의 이름과 이메일을 적어주세요.');

  // ── 10. 아이디어 한 줄 ───────────────────────────────
  form.addTextItem()
    .setTitle('아이디어 한 줄')
    .setHelpText('어떤 AI 서비스를 만들고 싶나요?')
    .setRequired(true);

  // ── 11. 참가 동기 / 만들고 싶은 것 ───────────────────
  form.addParagraphTextItem()
    .setTitle('참가 동기 / 만들고 싶은 것')
    .setHelpText('이 아이디어를 왜 만들고 싶은지, AI로 어떤 문제를 해결하고 싶은지 적어주세요.')
    .setRequired(true);

  // ── 12. 사용해본 AI 도구 (선택) ──────────────────────
  form.addCheckboxItem()
    .setTitle('사용해본 AI 도구 (선택)')
    .setChoiceValues([
      'ChatGPT / Claude 등 채팅형 AI',
      'Cursor / GitHub Copilot 등 코딩 AI',
      'v0 / Bolt / Lovable 등 바이브 코딩 도구',
      'Zapier / Make 등 자동화 플랫폼',
      'GPTs / Dify 등 에이전트 빌더',
      '사용 경험 없음',
    ]);

  // ── 13. 포트폴리오 링크 (선택) ───────────────────────
  form.addTextItem()
    .setTitle('포트폴리오 링크 (선택)')
    .setHelpText('노션, 깃허브, 블로그, 링크드인 등');

  // ── 14. 어떻게 알게 되었나요 ─────────────────────────
  form.addMultipleChoiceItem()
    .setTitle('MAWD를 어떻게 알게 되었나요?')
    .setChoiceValues([
      '인스타그램',
      '링크드인',
      '지인 추천',
      '커뮤니티 / 오픈카톡',
      '블로그 / 미디어',
      '기타',
    ])
    .setRequired(true);

  // ── 15. 개인정보 수집·이용 동의 (필수) ─────────────
  // 근거: 개인정보보호법 제15조, 제17조, 제22조, 제24조
  form.addCheckboxItem()
    .setTitle('[필수] 개인정보 수집·이용 동의')
    .setHelpText(
      '개인정보보호법 제15조, 제17조, 제22조 및 제24조에 따라 ' +
      '다음과 같이 개인정보를 수집·이용합니다.\n\n' +
      '▪ 수집 항목: 이름, 생년월일, 이메일, 전화번호, 전공, 소속/직업, 팀원 정보\n' +
      '▪ 수집·이용 목적: MAWD Challenge 참가 신청 접수, 본인 확인, 심사·수상 안내, ' +
      '오리엔테이션 및 행사 진행을 위한 의사소통\n' +
      '▪ 보유·이용 기간: 행사 종료 후 1년 (수상자의 경우 행사 종료일로부터 5년)\n' +
      '▪ 동의 거부권: 본 동의를 거부할 수 있으나, 거부 시 참가 신청이 제한됩니다.\n' +
      '▪ 제3자 제공: 상금 지급을 위해 최소한의 정보(성명, 연락처)를 제공할 수 있습니다.\n' +
      '▪ 처리 위탁: 해당 없음'
    )
    .setChoiceValues([
      '위 개인정보 수집·이용에 동의합니다. (필수)',
    ])
    .setRequired(true);

  // ── 16. 참가 서약서 (필수) ─────────────────────────
  form.addCheckboxItem()
    .setTitle('[필수] 참가 서약서')
    .setHelpText(
      '본인은 MAWD Challenge에 참가함에 있어 다음 사항을 충분히 숙지하였으며, ' +
      '성실히 준수할 것을 서약합니다.\n\n' +
      '1. 신청서 및 서약서의 내용이 모두 사실임을 확인하며, 허위 기재 등으로 인하여 ' +
      '발생하는 모든 책임은 본인에게 있음을 인지합니다.\n' +
      '2. 대회 규정 및 운영 지침을 충분히 숙지하였으며, 이를 성실히 준수합니다.\n' +
      '3. 심사위원의 심사 결과에 이의를 제기하지 않으며, 심사 결과를 수용합니다.\n' +
      '4. 타 참가자 및 운영진을 존중하며, 폭언·차별·비방 등 행사 운영을 저해하는 ' +
      '행위를 하지 않을 것을 약속합니다.\n' +
      '5. 제출물이 타 대회 수상작이거나 표절·도용한 것으로 판명될 경우, ' +
      '수상 이후라도 수상이 취소되며 상금을 반환할 것에 동의합니다.\n' +
      '6. 제출물이 제3자의 저작권·지식재산권·영업비밀·초상권·개인정보 등을 ' +
      '침해하지 않음을 보증하며, 관련 분쟁 발생 시 모든 책임은 본인에게 있음을 인지합니다.'
    )
    .setChoiceValues([
      '위 참가 서약서 내용을 모두 확인하였으며 이에 동의합니다. (필수)',
    ])
    .setRequired(true);

  // ── 17. 지식재산권 귀속 동의 (필수) ─────────────────
  // 근거: 저작권법 제10조, 제14조, 제45조, 제46조 / 약관규제법 제6조
  form.addCheckboxItem()
    .setTitle('[필수] 지식재산권 귀속 동의')
    .setHelpText(
      'MAWD Challenge에서 생성된 결과물의 지식재산권에 대해 다음과 같이 동의합니다.\n\n' +
      '1. 저작권 귀속: 해커톤에서 생성된 결과물의 저작권(저작재산권 및 저작인격권)은 ' +
      '원칙적으로 참가자에게 귀속됩니다. (저작권법 제10조, 제14조)\n' +
      '2. 주최자 이용 권한: 주최자는 수상작을 행사 홍보·전시·아카이빙 등 ' +
      '비영리 목적으로 사용할 수 있습니다. 이 경우 결과물의 내용을 목적에 맞게 ' +
      '수정·편집할 수 있습니다.\n' +
      '3. 통상실시권: 주최자가 수상작에 대해 상금을 지급하는 경우, ' +
      '주최자는 해당 수상작에 대한 통상실시권을 가질 수 있습니다. ' +
      '사용 대가·실시 범위·사용 기간 등은 상호 협의하여 결정합니다.\n' +
      '4. 우선협상권: 주최자는 수상작의 지식재산권 양도에 대해 ' +
      '결과 발표일로부터 4개월간 우선적으로 협상할 수 있는 권리를 가집니다.\n' +
      '5. 비밀유지의무: 주최자는 참가자의 동의 없이 응모된 아이디어를 ' +
      '제3자에게 제공하지 않으며, 결과 발표일로부터 1년간 관련 자료를 보관 후 폐기합니다. ' +
      '다만 수상작의 경우 참가자 동의를 얻어 보관할 수 있습니다.\n' +
      '6. 주최자 제공 자료: 주최자가 대회를 위해 제공한 자료(데이터셋, 가이드 등)의 ' +
      '권리는 주최자에게 있으며, 참가자는 대회 목적 내에서만 사용할 수 있습니다. ' +
      '대회 종료 후 모든 자료를 반환 또는 폐기할 것에 동의합니다.'
    )
    .setChoiceValues([
      '위 지식재산권 귀속 동의서 내용을 모두 확인하였으며 이에 동의합니다. (필수)',
    ])
    .setRequired(true);

  // ── 스프레드시트 연결 ────────────────────────────────
  var ss = SpreadsheetApp.create('MAWD Challenge 신청 현황');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ── 결과 출력 ────────────────────────────────────────
  var formUrl = form.getPublishedUrl();
  var editUrl = form.getEditUrl();
  var ssUrl = ss.getUrl();

  // 필드 ID 추출 (웹사이트 연동에 필요)
  var items = form.getItems();
  var fieldIds = {};
  items.forEach(function(item, i) {
    fieldIds['field_' + (i + 1)] = {
      title: item.getTitle(),
      id: item.getId(),
      type: item.getType(),
    };
  });

  Logger.log('========================================');
  Logger.log('MAWD Challenge 폼 생성 완료!');
  Logger.log('========================================');
  Logger.log('');
  Logger.log('📋 폼 URL (참가자용): ' + formUrl);
  Logger.log('✏️ 폼 편집 URL: ' + editUrl);
  Logger.log('📊 스프레드시트 URL: ' + ssUrl);
  Logger.log('');
  Logger.log('━━━ 필드 ID (웹사이트 연동용) ━━━');
  Logger.log(JSON.stringify(fieldIds, null, 2));
  Logger.log('');
  Logger.log('💡 웹사이트 연동을 위해 위 JSON을 복사해두세요.');
}
