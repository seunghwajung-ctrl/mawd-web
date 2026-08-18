"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type CountdownSettings = {
  title: string;
  target: string;
};

export const COUNTDOWN_STORAGE_KEY = "mawd-countdown-settings";

export const defaultCountdownSettings: CountdownSettings = {
  title: "MAWD CHALLENGE STARTS IN",
  target: "2026-09-12T10:00",
};

export function readCountdownSettings(): CountdownSettings {
  if (typeof window === "undefined") return defaultCountdownSettings;

  try {
    const saved = window.localStorage.getItem(COUNTDOWN_STORAGE_KEY);
    if (!saved) return defaultCountdownSettings;
    const parsed = JSON.parse(saved) as Partial<CountdownSettings>;
    if (!parsed.target || Number.isNaN(new Date(parsed.target).getTime())) return defaultCountdownSettings;
    return {
      title: parsed.title?.trim() || defaultCountdownSettings.title,
      target: parsed.target,
    };
  } catch {
    return defaultCountdownSettings;
  }
}

function getRemaining(target: string) {
  const difference = Math.max(0, new Date(target).getTime() - Date.now());
  const seconds = Math.floor(difference / 1000);
  return {
    days: Math.floor(seconds / 86_400),
    hours: Math.floor((seconds % 86_400) / 3_600),
    minutes: Math.floor((seconds % 3_600) / 60),
    seconds: seconds % 60,
  };
}

function CountdownUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="countdown-unit">
      <strong>{String(value).padStart(2, "0")}</strong>
      <span>{label}</span>
    </div>
  );
}

export function CountdownExperience() {
  const [settings, setSettings] = useState(defaultCountdownSettings);
  const [remaining, setRemaining] = useState(() => getRemaining(defaultCountdownSettings.target));

  useEffect(() => {
    const syncSettings = () => setSettings(readCountdownSettings());
    syncSettings();
    window.addEventListener("storage", syncSettings);
    return () => window.removeEventListener("storage", syncSettings);
  }, []);

  useEffect(() => {
    const update = () => setRemaining(getRemaining(settings.target));
    update();
    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, [settings.target]);

  const targetText = useMemo(
    () => new Intl.DateTimeFormat("ko-KR", { dateStyle: "long", timeStyle: "short" }).format(new Date(settings.target)),
    [settings.target],
  );

  return (
    <main className="countdown-page">
      <div className="countdown-grain" aria-hidden="true" />
      <Link className="countdown-admin-link" href="/countdown/admin" aria-label="관리자 설정으로 이동">
        ADMIN
      </Link>
      <section className="countdown-stage" aria-live="polite">
        <p className="countdown-eyebrow">{settings.title}</p>
        <div className="countdown-clock" aria-label={`${targetText}까지 남은 시간`}>
          <CountdownUnit label="DAYS" value={remaining.days} />
          <span className="countdown-separator">:</span>
          <CountdownUnit label="HOURS" value={remaining.hours} />
          <span className="countdown-separator">:</span>
          <CountdownUnit label="MINS" value={remaining.minutes} />
          <span className="countdown-separator">:</span>
          <CountdownUnit label="SECS" value={remaining.seconds} />
        </div>
        <p className="countdown-target">TARGET · {targetText}</p>
      </section>
    </main>
  );
}
