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
  hp_field: "",
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
  const r = validateInquiry({ ...valid, hp_field: "http://spam.example" });
  assert.equal(r.ok, false);
  assert.ok(r.errors.hp_field);
});

test("rejects non-string values and a non-true consent", () => {
  const r = validateInquiry({ ...valid, org: 42, consent: "true" });
  assert.equal(r.ok, false);
  assert.ok(r.errors.org);
  assert.ok(r.errors.consent);
});

// ── submitInquiry (server path) ──────────────────────────────
import { submitInquiry, SITEVERIFY_TIMEOUT_MS, APPS_SCRIPT_TIMEOUT_MS, CLIENT_TIMEOUT_MS } from "./inquiry.ts";

const config = { recaptchaSecret: "rc-secret", scriptUrl: "https://script.example/exec", scriptSecret: "s-secret" };
const body = { ...valid, recaptchaToken: "tok", submissionId: "3b241101-e2bb-4255-8caf-4136c566a962" };

// Fake fetch: records calls, answers siteverify and Apps Script separately.
function fakeFetch({ captcha = true, script = { ok: true }, scriptStatus = 200, hang = false } = {}) {
  const calls = [];
  const fn = async (url, init) => {
    calls.push({ url: String(url), init });
    if (String(url).includes("siteverify")) return Response.json({ success: captcha });
    if (hang) {
      return new Promise((_, reject) => init.signal.addEventListener("abort", () => reject(init.signal.reason)));
    }
    return new Response(JSON.stringify(script), { status: scriptStatus });
  };
  fn.calls = calls;
  fn.scriptCalls = () => calls.filter((c) => c.url === config.scriptUrl).length;
  return fn;
}

test("sends once and reports success when Apps Script confirms", async () => {
  const f = fakeFetch();
  const r = await submitInquiry(body, { ...config, fetch: f });
  assert.equal(r.status, 200);
  assert.equal(r.body.ok, true);
  assert.equal(f.scriptCalls(), 1);
  const sent = JSON.parse(f.calls.find((c) => c.url === config.scriptUrl).init.body);
  assert.equal(sent.secret, "s-secret");
  assert.equal(sent.org, "마우드대학교");
  assert.equal(sent.hp_field, undefined);
  assert.equal(sent.submissionId, body.submissionId);
  const verify = f.calls.find((c) => c.url.includes("siteverify")).init.body.toString();
  assert.match(verify, /secret=rc-secret/);
  assert.match(verify, /response=tok/);
});

test("invalid values never reach reCAPTCHA or Apps Script", async () => {
  const f = fakeFetch();
  const r = await submitInquiry({ ...body, email: "bad" }, { ...config, fetch: f });
  assert.equal(r.status, 400);
  assert.equal(r.body.ok, false);
  assert.equal(f.calls.length, 0);
});

test("filled honeypot never reaches Apps Script", async () => {
  const f = fakeFetch();
  const r = await submitInquiry({ ...body, hp_field: "x" }, { ...config, fetch: f });
  assert.equal(r.body.ok, false);
  assert.equal(f.scriptCalls(), 0);
});

test("missing or failed reCAPTCHA never reaches Apps Script", async () => {
  for (const [input, opts] of [[{ ...body, recaptchaToken: "" }, {}], [body, { captcha: false }]]) {
    const f = fakeFetch(opts);
    const r = await submitInquiry(input, { ...config, fetch: f });
    assert.equal(r.status, 400);
    assert.equal(r.body.ok, false);
    assert.equal(f.scriptCalls(), 0);
  }
});

test("Apps Script failure or a non-ok answer is reported as failure", async () => {
  for (const opts of [{ scriptStatus: 500 }, { script: { ok: false } }]) {
    const r = await submitInquiry(body, { ...config, fetch: fakeFetch(opts) });
    assert.equal(r.status, 502);
    assert.equal(r.body.ok, false);
  }
});

test("Apps Script timeout is reported as failure", async () => {
  const r = await submitInquiry(body, { ...config, fetch: fakeFetch({ hang: true }), timeoutMs: 50 });
  assert.equal(r.status, 504);
  assert.equal(r.body.ok, false);
});

test("missing server config fails closed without sending", async () => {
  const f = fakeFetch();
  const r = await submitInquiry(body, { ...config, scriptUrl: "", fetch: f });
  assert.equal(r.status, 500);
  assert.equal(r.body.ok, false);
  assert.equal(f.calls.length, 0);
});

test("server finishes both steps before the browser gives up", () => {
  // Otherwise the browser shows failure while the server may still send, and a retry duplicates.
  assert.ok(SITEVERIFY_TIMEOUT_MS + APPS_SCRIPT_TIMEOUT_MS + 1_000 < CLIENT_TIMEOUT_MS);
});

test("unreachable reCAPTCHA is a failure and never reaches Apps Script", async () => {
  const calls = [];
  const f = async (url) => { calls.push(String(url)); throw new TypeError("network"); };
  const r = await submitInquiry(body, { ...config, fetch: f });
  assert.equal(r.status, 502);
  assert.equal(r.body.ok, false);
  assert.equal(calls.filter((u) => u === config.scriptUrl).length, 0);
});

test("a missing or malformed submission id is rejected before sending", async () => {
  for (const submissionId of [undefined, "", "x".repeat(65), "not an id!"]) {
    const f = fakeFetch();
    const r = await submitInquiry({ ...body, submissionId }, { ...config, fetch: f });
    assert.equal(r.status, 400, String(submissionId));
    assert.equal(f.calls.length, 0);
  }
});
