// Shared by the /inquiry form (browser) and the inquiry API route (server).
// Keep it dependency-free: tests run it directly with `node --test`.

export const EVENT_TYPES = ["해커톤", "AI 행사", "미정"] as const;

export const LIMITS = {
  org: 100,
  name: 50,
  email: 254,
  phone: 30,
  timing: 50,
  headcount: 30,
  message: 2000,
} as const;

type TextField = keyof typeof LIMITS;
const REQUIRED: TextField[] = ["org", "name", "email"];
const LABELS: Record<TextField, string> = {
  org: "회사·기관·학교명",
  name: "담당자 이름",
  email: "이메일",
  phone: "연락처",
  timing: "예상 시기",
  headcount: "예상 참가 인원",
  message: "문의 내용",
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type Inquiry = Record<TextField, string> & { eventType: string };
export type InquiryErrors = Partial<Record<TextField | "eventType" | "consent" | "website", string>>;
export type InquiryResult = { ok: true; data: Inquiry } | { ok: false; errors: InquiryErrors };

export function validateInquiry(raw: Record<string, unknown>): InquiryResult {
  const errors: InquiryErrors = {};
  const data = {} as Inquiry;

  for (const key of Object.keys(LIMITS) as TextField[]) {
    const value = raw[key] ?? "";
    if (typeof value !== "string") {
      errors[key] = `${LABELS[key]}을(를) 다시 입력해 주세요.`;
      continue;
    }
    const v = value.trim();
    data[key] = v;
    if (REQUIRED.includes(key) && !v) errors[key] = `${LABELS[key]}을(를) 입력해 주세요.`;
    else if (v.length > LIMITS[key]) errors[key] = `${LABELS[key]}은(는) ${LIMITS[key]}자 이하로 입력해 주세요.`;
  }
  if (data.email && !errors.email && !EMAIL_RE.test(data.email)) errors.email = "이메일 형식이 올바르지 않습니다.";

  const eventType = raw.eventType;
  if (typeof eventType !== "string" || !(EVENT_TYPES as readonly string[]).includes(eventType)) {
    errors.eventType = "행사 유형을 선택해 주세요.";
  } else {
    data.eventType = eventType;
  }

  if (raw.consent !== true) errors.consent = "개인정보 수집·이용에 동의해 주세요.";
  // Honeypot: hidden from people, so any value means a bot filled it.
  if (raw.website) errors.website = "잘못된 요청입니다.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
