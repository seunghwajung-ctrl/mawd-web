"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LumaCheckoutButton } from "@/components/LumaCheckoutButton";

const DISMISS_KEY = "mawd-challenge-start-modal-dismissed-v1";
const START_DATE_KST = "2026-08-16T00:00:00+09:00";

function getDdayLabel() {
  const start = new Date(START_DATE_KST).getTime();
  const now = Date.now();
  const diffDays = Math.ceil((start - now) / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `D-${diffDays}`;
  if (diffDays === 0) return "D-DAY";
  return `D+${Math.abs(diffDays)}`;
}

function getNextKstMidnightDelay() {
  const now = new Date();
  const kstDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  const nextKstMidnight = new Date(kstDate);
  nextKstMidnight.setHours(24, 0, 0, 0);

  return Math.max(1, nextKstMidnight.getTime() - kstDate.getTime());
}

export function ChallengeStartModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [ddayLabel, setDdayLabel] = useState(getDdayLabel);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const closeModal = useCallback(() => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // Ignore storage failures in private or restricted browsing contexts.
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === "true";
    } catch {
      dismissed = false;
    }

    const timer = window.setTimeout(() => setIsOpen(!dismissed), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeModal]);

  useEffect(() => {
    let timeoutId: number;

    const scheduleNextUpdate = () => {
      timeoutId = window.setTimeout(() => {
        setDdayLabel(getDdayLabel());
        scheduleNextUpdate();
      }, getNextKstMidnightDelay());
    };

    scheduleNextUpdate();

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop challenge-start-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="challenge-start-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="modal-panel challenge-start-panel">
        <div className="challenge-start-grid" aria-hidden="true" />
        <button
          ref={closeRef}
          type="button"
          className="modal-close challenge-start-close"
          aria-label="닫기"
          onClick={closeModal}
        >
          x
        </button>

        <div className="challenge-start-copy">
          <p className="section-kicker">MAWD CHALLENGE</p>
          <h2 id="challenge-start-title">마우드 챌린지</h2>
          <p className="challenge-start-date">8월 16일 1라운드 START</p>
        </div>

        <div className="challenge-start-dday" aria-label={`8월 16일까지 ${ddayLabel}`}>
          <span className="challenge-start-dday-label">COUNTDOWN</span>
          <strong>{ddayLabel}</strong>
        </div>

        <div className="challenge-start-actions">
          <LumaCheckoutButton className="btn primary">
            참가하기 <span className="arrow">{"\u203A"}</span>
          </LumaCheckoutButton>
          <button type="button" className="btn ghost" onClick={closeModal}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
