import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('hero keeps the intro clean without summary cards or flow cards', () => {
  const hero = read('src/components/Hero.tsx');
  for (const removedClass of ['hero-summary', 'flow-band', 'flow-card']) {
    assert.doesNotMatch(hero, new RegExp(removedClass));
  }
  for (const removedLabel of ['참가대상', '진행일정', '결과물', '혜택', '오리엔테이션', '최종 공유']) {
    assert.doesNotMatch(hero, new RegExp(removedLabel));
  }
});

test('outcomes section appears before program cards and highlights PRD prototype MVP portfolio', () => {
  const page = read('src/app/page.tsx');
  assert.ok(page.indexOf('<ExperienceSection />') < page.indexOf('<HackathonCatalog />'));
  const experience = read('src/components/ExperienceSection.tsx');
  for (const text of ['PRD', '프로토타입', 'MVP', '포트폴리오']) {
    assert.match(experience, new RegExp(text));
  }
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
