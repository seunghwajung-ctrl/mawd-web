import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const heroSource = await readFile(new URL("../src/components/Hero.tsx", import.meta.url), "utf8");

test("hero scroll updates CSS variables without React progress state", () => {
  assert.equal(heroSource.includes("setIntroProgress"), false);
  assert.equal(heroSource.includes("setHeroRevealProgress"), false);
  assert.match(heroSource, /style\.setProperty\("--intro-title-opacity"/);
});
