/**
 * MAWD 도입 문의 메일 발송 (Google Apps Script 웹앱)
 *
 * 사이트 서버(/api/inquiry)만 호출한다. 받은 문의를 team.mawd@cyz.today로 메일 1통 보내고
 * { ok: true }를 돌려준다. 메일 외에는 아무 데도 저장하지 않는다
 * (중복 방지용 무작위 접수 번호만 10분 동안 캐시에 둔다. 문의 내용은 두지 않는다).
 *
 * 스크립트 속성(프로젝트 설정 → 스크립트 속성)에 SHARED_SECRET을 넣어야 한다.
 * 같은 값을 Vercel 환경변수 INQUIRY_APPS_SCRIPT_SECRET에 넣는다.
 */

var TO = 'team.mawd@cyz.today';
var EVENT_TYPES = ['해커톤', 'AI 행사', '미정'];
var FIELDS = [
  ['org', '회사·기관·학교명', 100, true],
  ['name', '담당자 이름', 50, true],
  ['email', '이메일', 254, true],
  ['phone', '연락처', 30, false],
  ['eventType', '행사 유형', 10, true],
  ['timing', '예상 시기', 50, false],
  ['headcount', '예상 참가 인원', 30, false],
  ['message', '문의 내용', 2000, false],
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
    if (!secret || data.secret !== secret) return reply({ ok: false, error: 'forbidden' });

    // 사이트 서버가 이미 검사했지만, 이 주소가 새어 나가도 이상한 값으로 메일이 가지 않도록 한 번 더 본다.
    for (var i = 0; i < FIELDS.length; i++) {
      var f = FIELDS[i];
      var v = data[f[0]];
      if (v === undefined || v === null) v = '';
      if (typeof v !== 'string' || v.length > f[2] || (f[3] && !v)) return reply({ ok: false, error: 'invalid' });
    }
    if (EVENT_TYPES.indexOf(data.eventType) < 0) return reply({ ok: false, error: 'invalid' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return reply({ ok: false, error: 'invalid' });
    var id = data.submissionId;
    if (typeof id !== 'string' || !/^[A-Za-z0-9-]{8,64}$/.test(id)) return reply({ ok: false, error: 'invalid' });

    // 중복 방지: 문의 내용이 아닌 무작위 접수 번호만 10분 동안 캐시에 둔다.
    // 같은 번호가 다시 오면(시간 초과 뒤 재시도) 메일을 보내지 않고 성공으로 답한다.
    var cache = CacheService.getScriptCache();
    var lock = LockService.getScriptLock();
    lock.waitLock(5000);
    try {
      if (cache.get(id)) return reply({ ok: true, duplicate: true });
      cache.put(id, '1', 600);
    } finally {
      lock.releaseLock();
    }

    var lines = FIELDS.map(function (f) {
      return f[1] + ': ' + (data[f[0]] || '-');
    });
    try {
      MailApp.sendEmail({
        to: TO,
        replyTo: data.email,
        subject: '[도입 문의] ' + data.org + ' / ' + data.eventType,
        body: lines.join('\n') + '\n\n(마우드 홈페이지 도입하기 양식에서 보낸 문의입니다.)',
      });
    } catch (sendErr) {
      cache.remove(id); // 못 보냈으면 재시도 때 다시 보낼 수 있게 번호를 지운다
      throw sendErr;
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: 'server' });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
