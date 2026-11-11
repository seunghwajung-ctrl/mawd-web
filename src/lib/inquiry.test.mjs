import { test } from "node:test";
import assert from "node:assert/strict";
import { validateInquiry, LIMITS } from "./inquiry.ts";

const valid = {
  org: "마우드대학교",
  name: "홍길동",
  email: "hong@example.com",
  phone: "",
  eventType: "해커톤",
  timing: "",
  headcount: "",
  message: "",
  consent: true,
  website: "",
};

test("accepts a valid inquiry with only required fields", () => {
  const r = validateInquiry(valid);
  assert.equal(r.ok, true);
  assert.equal(r.data.org, "마우드대학교");
});

test("trims values", () => {
  const r = validateInquiry({ ...valid, name: "  홍길동  " });
  assert.equal(r.ok, true);
  assert.equal(r.data.name, "홍길동");
});

test("flags each missing required field", () => {
  const r = validateInquiry({ ...valid, org: " ", name: "", email: "", eventType: "", consent: false });
  assert.equal(r.ok, false);
  assert.deepEqual(Object.keys(r.errors).sort(), ["consent", "email", "eventType", "name", "org"]);
});

test("rejects a malformed email", () => {
  for (const email of ["hong", "hong@", "hong@example", "a b@example.com"]) {
    const r = validateInquiry({ ...valid, email });
    assert.equal(r.ok, false, email);
    assert.ok(r.errors.email, email);
  }
});

test("rejects an event type outside the three allowed values", () => {
  const r = validateInquiry({ ...valid, eventType: "콘서트" });
  assert.equal(r.ok, false);
  assert.ok(r.errors.eventType);
});

test("rejects values over the length limit", () => {
  const r = validateInquiry({ ...valid, message: "가".repeat(LIMITS.message + 1) });
  assert.equal(r.ok, false);
  assert.ok(r.errors.message);
  assert.equal(validateInquiry({ ...valid, message: "가".repeat(LIMITS.message) }).ok, true);
});

test("rejects a filled honeypot field", () => {
  const r = validateInquiry({ ...valid, website: "http://spam.example" });
  assert.equal(r.ok, false);
  assert.ok(r.errors.website);
});

test("rejects non-string values and a non-true consent", () => {
  const r = validateInquiry({ ...valid, org: 42, consent: "true" });
  assert.equal(r.ok, false);
  assert.ok(r.errors.org);
  assert.ok(r.errors.consent);
});
