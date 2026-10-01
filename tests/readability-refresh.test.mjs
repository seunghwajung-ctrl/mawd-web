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
    'Make ideas visible.',
    '비전공자도 시작할 수 있게.',
    'PRD, Prototype, MVP, Portfolio.',
    '4 short steps.',
    'Build before you explain.',
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
  for (const text of ['바이브코딩 입문', 'AI 창업 MVP', '로컬 문제해결']) {
    assert.match(catalog, new RegExp(text));
  }
});
