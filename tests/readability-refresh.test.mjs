import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('hero keeps the intro clean without summary cards or flow cards', () => {
  const hero = read('src/components/Hero.tsx');
  for (const removedClass of ['hero-summary', 'flow-band', 'flow-card']) {
    assert.doesNotMatch(hero, new RegExp(removedClass));
  }
  for (const removedLabel of ['진행일정', '혜택']) {
    assert.doesNotMatch(hero, new RegExp(removedLabel));
  }
});

test('hero restores the sticky portal intro and centers the TEAM MAWD split mark', () => {
  const hero = read('src/components/Hero.tsx');
  const css = read('src/app/globals.css');

  assert.match(hero, /PORTAL_BEATS/);
  assert.match(hero, /portal-panel portal-panel-left/);
  assert.match(hero, /portal-panel portal-panel-right/);
  assert.equal((hero.match(/side: "(left|right|center)"/g) || []).length, 5);
  assert.match(hero, /className="portal-wordmark"/);
  assert.match(hero, /aria-label="TEAM MAWD"/);
  assert.match(hero, />TEAM</);
  assert.match(hero, />MAWD</);
  assert.doesNotMatch(hero, /DepthText/);
  for (const text of [
    'MAWD CHALLENGE',
    '자신의 분야에서 문제를 해결하는 개발 챌린지',
    '비전공자도',
    '시작할 수 있게.',
    '더 많은 아이디어는 비전공자에게 있다.',
    'PRD, Prototype, MVP, Portfolio.',
    '결과물을 남겨 경력이 되도록',
    'Every Hackathon',
    '다양한 주제의 해커톤으로 모두가 참여 가능',
    'Build your future yourself',
    '미래를 직접 빌딩하세요',
    '모든 프로그램 보기',
    '도입하기',
  ]) {
    assert.match(hero, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(css, /\.portal-stage[\s\S]*position: sticky/);
  assert.match(css, /\.portal-panel[\s\S]*width: 50vw/);
  assert.match(css, /\.portal-panel-left[\s\S]*border-right: 0/);
  assert.match(css, /\.portal-panel-right[\s\S]*border-left: 1px solid var\(--portal-hairline\)/);
  assert.match(css, /\.portal-wordmark[\s\S]*grid-template-columns: minmax\(0, 1fr\) minmax\(0, 1fr\)/);
  assert.match(css, /\.portal-wordmark[\s\S]*top: 50%/);
  assert.match(css, /\.portal-wordmark[\s\S]*translateY\(-50%\) scale/);
  assert.match(css, /\.portal-wordmark span:first-child[\s\S]*justify-content: flex-end/);
  assert.match(css, /\.portal-wordmark span:last-child[\s\S]*justify-content: flex-start/);
  assert.match(css, /\.portal-beat[\s\S]*--beat-opacity/);
  assert.match(css, /\.portal-title-nowrap[\s\S]*white-space: nowrap/);
  assert.match(css, /\.portal-beat\[data-label="TARGET"\] h2[\s\S]*line-height: 1\.08/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.portal-beat\[data-label="FLOW"\] h2[\s\S]*font-size: clamp\(1\.78rem, 9\.6vw, 3\.15rem\)/);
  assert.match(css, /\.portal-beat\[data-label="FLOW"\][\s\S]*right: clamp\(36px, 6vw, 84px\)/);
  assert.match(css, /\.portal-beat\[data-label="FLOW"\][\s\S]*width: min\(680px, 53vw\)/);
  assert.match(css, /\.portal-beat\[data-label="FLOW"\] h2[\s\S]*font-size: clamp\(3rem, 6vw, 4\.8rem\)/);
  assert.match(css, /\.portal-hero[\s\S]*height: 1120vh/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.portal-hero[\s\S]*height: 1080vh/);
  assert.match(hero, /const BEAT_SPREAD = 0\.14/);
  assert.match(hero, /const BEAT_CLEAR_RANGE = 0\.07/);
  assert.match(hero, /distance <= BEAT_CLEAR_RANGE \? 1/);
});

test('mobile output beat has a narrower type treatment', () => {
  const hero = read('src/components/Hero.tsx');
  const css = read('src/app/globals.css');

  assert.match(hero, /data-label=\{beat\.label\}/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.portal-beat\[data-label="OUTPUT"\] h2[\s\S]*font-size: clamp\(1\.82rem, 9\.3vw, 3\.05rem\)/);
});

test('mobile challenge title fits inside the viewport', () => {
  const hero = read('src/components/Hero.tsx');
  const css = read('src/app/globals.css');

  assert.match(hero, /<h1 id="hero-title" aria-label=\{beat\.title\}>/);
  assert.match(hero, /MAWD\s*<br \/>[\s\S]*<span className="portal-title-nowrap">CHALLENGE<\/span>/);
  assert.match(css, /\.portal-beat :is\(h1, h2\) \*[\s\S]*font-family: var\(--font-syne\), system-ui, sans-serif !important/);
  assert.match(css, /\.portal-beat\[data-label="MAWD CHALLENGE"\] \.portal-title-nowrap[\s\S]*transform: scaleX\(0\.62\)/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.portal-beat\[data-label="MAWD CHALLENGE"\] h1[\s\S]*font-size: clamp\(2\.75rem, 14vw, 4\.15rem\)/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.portal-beat\[data-label="MAWD CHALLENGE"\] h1[\s\S]*max-width: min\(100%, 21rem\)/);
});

test('output-first page is removed from the landing flow', () => {
  const page = read('src/app/page.tsx');
  assert.equal(page.includes('ExperienceSection'), false);
  assert.equal(existsSync(new URL('../src/components/ExperienceSection.tsx', import.meta.url)), false);
});

test('program timeline is four short steps and benefits copy is participant centered', () => {
  const program = read('src/components/ProgramSection.tsx');
  assert.equal((program.match(/tag:/g) || []).length, 4);
  for (const text of ['오리엔테이션', '1라운드', '2라운드', '최종 공유']) {
    assert.match(program, new RegExp(text));
  }

  const benefits = read('src/components/BenefitsSection.tsx');
  assert.doesNotMatch(benefits, /스폰서 혜택/);
  assert.match(benefits, /참가자/);
});

test('mawd detail story follows the catalog with readable business-plan copy', () => {
  const page = read('src/app/page.tsx');
  const story = read('src/components/MawdDetailStory.tsx');
  const css = read('src/app/globals.css');

  assert.ok(page.indexOf('<HackathonCatalog />') < page.indexOf('<MawdDetailStory />'));
  assert.ok(page.indexOf('<MawdDetailStory />') < page.indexOf('<ProgramSection />'));
  assert.ok(page.indexOf('<HackathonCatalog />') < page.indexOf('<SponsorSection />'));
  assert.ok(page.indexOf('<SponsorSection />') < page.indexOf('<MawdDetailStory />'));
  assert.equal(page.includes('NoBarrierSection'), false);

  for (const text of [
    'AI로 아이디어를 실제 결과물까지 만드는 챌린지',
    '집에서 편하게 아이디어 설명서를 제출',
    '가상머니 투자 평가',
    '포트폴리오로 남는 결과물',
    '스폰서는 AI 활용 인재와 초기 아이디어를 발견',
  ]) {
    assert.match(story, new RegExp(text));
  }

  for (const removed of [
    'MAWD Challenge는 코딩을 잘하는 사람만 나가는 어려운 해커톤이 아니라',
    '무엇이 다른가',
    '개발자 중심 해커톤과 발표 중심 창업 경진대회 사이에서',
  ]) {
    assert.doesNotMatch(story, new RegExp(removed));
  }

  assert.match(css, /\.mawd-detail-story/);
  assert.match(css, /\.detail-story-flow/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.detail-story-grid/);
});

test('public login is hidden behind #admin and share image metadata exists', () => {
  const nav = read('src/components/Nav.tsx');
  assert.doesNotMatch(nav, />\s*로그인\s*</);

  const catalog = read('src/components/HackathonCatalog.tsx');
  assert.match(catalog, /#admin/);
  assert.match(catalog, /hashchange/);

  const layout = read('src/app/layout.tsx');
  assert.match(layout, /openGraph/);
  assert.match(layout, /twitter/);
  assert.match(layout, /mawd-og\.png/);
  assert.equal(existsSync(new URL('../public/mawd-og.png', import.meta.url)), true);
});

test('faq and barrier copy stays short, and catalog cards are recruitment programs', () => {
  const faq = read('src/components/FaqSection.tsx');
  const longAnswer = faq.match(/a: "([^"]+)"/g)?.find((answer) => answer.length > 190);
  assert.equal(longAnswer, undefined);

  const barrier = read('src/components/NoBarrierSection.tsx');
  assert.doesNotMatch(barrier, /방향성을 못잡는/);

  const catalog = read('data/website-catalog.json');
  for (const text of ['로컬 임팩트', 'AI 워크플로', '크리에이터 AI', 'MAWD START-UP CHALLENGE']) {
    assert.match(catalog, new RegExp(text));
  }
  assert.match(catalog, /기획,개발,마케팅,디자인 전공 대학생들이 팀이 되어 1인 기업 자동화 챌린지를 진행합니다\./);
  assert.match(catalog, /11월 14일 \/ 장소 공개 예정/);
  assert.match(catalog, /#스타트업/);
  assert.match(catalog, /#디자인/);
  assert.match(catalog, /\/programs\/mawd-startup-challenge\.jpg/);
  assert.match(catalog, /https:\/\/luma\.com\/ml5gw54p/);
  assert.equal(existsSync(new URL('../public/programs/mawd-startup-challenge.jpg', import.meta.url)), true);

  const catalogComponent = read('src/components/HackathonCatalog.tsx');
  assert.match(catalogComponent, /createPortal/);
  assert.match(catalogComponent, /document\.body/);
  assert.match(catalogComponent, /applyUrl\?: string/);
  assert.match(catalogComponent, /selected\.applyUrl/);
  assert.match(catalogComponent, /아직 준비중인 헤커톤입니다\./);
  assert.match(catalogComponent, /window\.alert/);
  assert.match(catalogComponent, /unoptimized/);
});
