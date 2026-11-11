"use client";

import { useRef, useState, type FormEvent } from "react";
import { EVENT_TYPES, LIMITS, validateInquiry, type InquiryErrors } from "@/lib/inquiry";

// TODO(copy): 다봉 초안(b2b-zone-copy.md §7, privacy-notice-and-policy.md §A). 대표 승인 전 임시 (#9).
const CONTACT_EMAIL = "team.mawd@cyz.today";
const TIMEOUT_MS = 15_000;

type Status = "idle" | "sending" | "success" | "error";

const TEXT_FIELDS = [
  { key: "org", label: "회사·기관·학교명", required: true, autoComplete: "organization" },
  { key: "name", label: "담당자 이름", required: true, autoComplete: "name" },
  { key: "email", label: "이메일", required: true, autoComplete: "email", type: "email" },
  { key: "phone", label: "연락처", autoComplete: "tel", type: "tel" },
  { key: "timing", label: "예상 시기", placeholder: "예: 2027년 3월" },
  { key: "headcount", label: "예상 참가 인원", placeholder: "예: 100명 내외" },
] as const;

export function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return; // duplicate-submit guard
    const fd = new FormData(e.currentTarget);
    const raw = { ...Object.fromEntries(fd), consent: fd.get("consent") === "on" };
    const result = validateInquiry(raw);
    if (!result.ok) {
      setErrors(result.errors);
      const first = Object.keys(result.errors).find((k) => k !== "website");
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raw),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      const body = await res.json().catch(() => null);
      setStatus(res.ok && body?.ok === true ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="apply-form-success" role="status">
        <span className="apply-form-check" aria-hidden="true">✓</span>
        <h2>문의가 접수되었습니다</h2>
        <p className="apply-form-success-desc">
          남겨 주신 내용은 팀 마우드에 전달되었습니다. 접수 확인 메일은 따로 발송되지 않습니다. 내용을 확인하는 대로 이메일로 연락드립니다.
        </p>
      </div>
    );
  }

  const describe = (key: string) => (errors[key as keyof InquiryErrors] ? `${key}-error` : undefined);
  const fieldError = (key: keyof InquiryErrors) =>
    errors[key] ? <p id={`${key}-error`} className="field-error">{errors[key]}</p> : null;

  return (
    <form ref={formRef} className="apply-form inquiry-form" noValidate onSubmit={onSubmit}>
      {TEXT_FIELDS.map((f) => (
        <div key={f.key} className="field">
          <label htmlFor={`inq-${f.key}`}>
            {f.label} {"required" in f ? null : <span className="optional">(선택)</span>}
          </label>
          <input
            id={`inq-${f.key}`}
            name={f.key}
            className="input"
            type={"type" in f ? f.type : "text"}
            required={"required" in f}
            maxLength={LIMITS[f.key]}
            autoComplete={"autoComplete" in f ? f.autoComplete : "off"}
            placeholder={"placeholder" in f ? f.placeholder : undefined}
            aria-invalid={!!errors[f.key]}
            aria-describedby={describe(f.key)}
          />
          {fieldError(f.key)}
        </div>
      ))}

      <fieldset className="field" aria-describedby={describe("eventType")}>
        <legend>행사 유형</legend>
        <div className="checkbox-group">
          {EVENT_TYPES.map((t) => (
            <label key={t} className="checkbox-label">
              <input type="radio" name="eventType" value={t} required /> {t}
            </label>
          ))}
        </div>
        {fieldError("eventType")}
      </fieldset>

      <div className="field">
        <label htmlFor="inq-message">
          문의 내용 <span className="optional">(선택)</span>
        </label>
        <textarea
          id="inq-message"
          name="message"
          className="input"
          rows={6}
          maxLength={LIMITS.message}
          aria-invalid={!!errors.message}
          aria-describedby={describe("message")}
        />
        {fieldError("message")}
      </div>

      {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
      <div className="inquiry-hp" aria-hidden="true">
        <label htmlFor="inq-website">웹사이트</label>
        <input id="inq-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="consent-group">
        <label className="consent-item">
          <input type="checkbox" name="consent" required aria-invalid={!!errors.consent} aria-describedby="consent-notice" />
          <span className="consent-text">
            <strong>[필수] 개인정보 수집·이용에 동의합니다.</strong>
          </span>
        </label>
        <div id="consent-notice" className="consent-text">
          <p><b>수집 항목</b> 회사·기관·학교명, 담당자 이름, 이메일, 행사 유형, 연락처·예상 시기·예상 참가 인원·문의 내용(선택)</p>
          <p><b>이용 목적</b> 도입 문의 상담</p>
          <p><b>보유 기간</b> 문의 처리 완료 시까지</p>
          <p>동의를 거부할 수 있습니다. 다만 거부하시면 도입 문의를 접수할 수 없습니다.</p>
          <p>문의 {CONTACT_EMAIL} · <a href="/privacy" target="_blank" rel="noopener">개인정보처리방침 보기</a></p>
        </div>
        {fieldError("consent")}
      </div>

      {status === "error" && (
        <div className="apply-form-error" role="alert">
          <strong>문의를 보내지 못했습니다</strong>
          <p>
            일시적인 문제로 접수되지 않았습니다. 입력하신 내용은 그대로 남아 있습니다. 잠시 뒤 다시 시도하시거나,{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>로 직접 보내 주세요.
          </p>
        </div>
      )}

      <div className="apply-form-actions">
        <button type="submit" className="btn primary apply-form-submit" disabled={status === "sending"}>
          {status === "sending" ? "보내는 중…" : "문의 보내기"} <span className="arrow">{"›"}</span>
        </button>
      </div>
    </form>
  );
}
