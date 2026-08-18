"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  COUNTDOWN_STORAGE_KEY,
  CountdownSettings,
  readCountdownSettings,
} from "./CountdownExperience";

export function CountdownAdmin() {
  const [settings, setSettings] = useState<CountdownSettings>(() => readCountdownSettings());
  const [saved, setSaved] = useState(false);

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem(COUNTDOWN_STORAGE_KEY, JSON.stringify(settings));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <main className="countdown-admin-page">
      <Link className="countdown-back-link" href="/countdown">← COUNTDOWN</Link>
      <section className="countdown-admin-card">
        <div className="countdown-admin-heading">
          <p>MAWD / CONTROL ROOM</p>
          <h1>카운트 시계 설정</h1>
          <span>이 브라우저에서 저장돼. 설정 후 메인 화면을 새로고침하면 바로 반영돼.</span>
        </div>
        <form onSubmit={save}>
          <label>
            상단 문구
            <input
              value={settings.title}
              maxLength={44}
              onChange={(event) => setSettings((current) => ({ ...current, title: event.target.value }))}
            />
          </label>
          <label>
            종료 일시
            <input
              type="datetime-local"
              value={settings.target}
              onChange={(event) => setSettings((current) => ({ ...current, target: event.target.value }))}
              required
            />
          </label>
          <div className="countdown-admin-actions">
            <button type="submit">타이머 저장</button>
            {saved && <span role="status">저장됨</span>}
          </div>
        </form>
      </section>
    </main>
  );
}
