import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const heroSource = await readFile(new URL("../src/components/Hero.tsx", import.meta.url), "utf8");
const navSource = await readFile(new URL("../src/components/Nav.tsx", import.meta.url), "utf8");
const depthTextSource = await readFile(new URL("../src/components/DepthText.tsx", import.meta.url), "utf8");
const cssSource = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");

test("hero scroll updates CSS variables without React progress state", () => {
  assert.equal(heroSource.includes("setIntroProgress"), false);
  assert.equal(heroSource.includes("setHeroRevealProgress"), false);
  assert.match(heroSource, /style\.setProperty\("--intro-title-opacity"/);
});

test("mobile intro logo fade is visibly stronger and cheaper to render", () => {
  assert.match(heroSource, /viewport \* 0\.85/);
  assert.match(heroSource, /--intro-title-scale/);
  assert.match(cssSource, /hero-logo-intro[\s\S]*--intro-title-scale/);
  assert.match(cssSource, /@media \(max-width: 760px\)[\s\S]*\.hero-logo::before[\s\S]*display: none/);
});

test("depth text starts in mobile mode before the first effect", () => {
  assert.match(depthTextSource, /useState\(\s*\(\) =>/);
  assert.match(depthTextSource, /window\.matchMedia\("\(max-width: 767px\)"\)\.matches/);
});

test("mobile nav reveal does not depend on the hidden second hero panel", () => {
  assert.match(navSource, /matchMedia\(`\(max-width: \$\{MOBILE_BREAKPOINT - 1\}px\)`\)/);
  assert.match(navSource, /setIntroRevealed\(window\.scrollY > viewport \* 0\.85\)/);
});
