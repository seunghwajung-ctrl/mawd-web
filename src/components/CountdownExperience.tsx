"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { SnowEngine } from "@/lib/snow-engine";

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

// Elements marked with this attribute become ledges the snow settles on.
const SNOW_LEDGE = "[data-snow-ledge]";

function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const page = canvas?.parentElement;
    if (!canvas || !context || !page) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let engine: SnowEngine | null = null;
    let frameId = 0;
    let lastStep = 0;

    const syncLedges = () => {
      if (!engine) return;
      const origin = page.getBoundingClientRect();
      engine.setObstacles(
        [...page.querySelectorAll(SNOW_LEDGE)].map((element, index) => {
          const rect = element.getBoundingClientRect();
          return {
            id: `ledge-${index}`,
            x: rect.left - origin.left,
            y: rect.top - origin.top,
            width: rect.width,
            height: rect.height,
            radius: 4,
          };
        }),
      );
    };

    const layout = () => {
      const { width, height } = page.getBoundingClientRect();
      // Same pixel budget as Snowy's website: cap the backing store around 6 MP.
      const ratio = Math.max(0.25, Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(6_000_000 / (width * height))));
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
      if (!engine) {
        engine = new SnowEngine({ width, height, mobile: width < 700, reducedMotion, seed: 1225 });
        // Snowy's "Flurry" preset so the caps build up within minutes on the venue screen.
        engine.setIntensity(2.2);
        syncLedges();
        engine.prime();
      } else {
        engine.resize(width, height);
        syncLedges();
      }
      engine.draw(context);
    };

    const tick = (time: number) => {
      frameId = window.requestAnimationFrame(tick);
      const fps = reducedMotion ? 15 : 30;
      if (lastStep && time - lastStep < 1000 / fps - 0.5) return;
      const dt = lastStep ? (time - lastStep) / 1000 : 1 / fps;
      lastStep = time;
      engine?.step(dt);
      engine?.draw(context);
    };

    layout();
    frameId = window.requestAnimationFrame(tick);
    // Ledges move when the clock gains a digit or the screen size changes.
    const observer = new ResizeObserver(layout);
    observer.observe(page);
    page.querySelectorAll(SNOW_LEDGE).forEach((element) => observer.observe(element));
    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="countdown-snow" aria-hidden="true" />;
}

function CountdownUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="countdown-unit">
      <strong data-snow-ledge>{String(value).padStart(2, "0")}</strong>
      <span>{label}</span>
    </div>
  );
}

export function CountdownExperience() {
  const [settings, setSettings] = useState(defaultCountdownSettings);
  const [remaining, setRemaining] = useState(() => getRemaining(defaultCountdownSettings.target));
  // Until saved settings are read, the default (past) target would flash "STARTED.".
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const syncSettings = () => {
      setSettings(readCountdownSettings());
      setLoaded(true);
    };
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

  const finished = Object.values(remaining).every((value) => value === 0);

  return (
    <main className="countdown-page">
      {/* Mount after the clock exists so its ledges are measured; remount when it swaps to STARTED. */}
      {loaded && <SnowCanvas key={String(finished)} />}
      <Link className="countdown-admin-link" href="/countdown/admin" aria-label="관리자 설정으로 이동">
        ADMIN
      </Link>
      <section className="countdown-stage" aria-live="polite">
        <p className="countdown-eyebrow" data-snow-ledge>
          {settings.title}
        </p>
        {!loaded ? null : finished ? (
          <p className="countdown-done" data-snow-ledge>
            STARTED<span className="countdown-dot">.</span>
          </p>
        ) : (
          <div className="countdown-clock" aria-label={`${targetText}까지 남은 시간`}>
            <CountdownUnit label="DAYS" value={remaining.days} />
            <span className="countdown-separator">:</span>
            <CountdownUnit label="HOURS" value={remaining.hours} />
            <span className="countdown-separator">:</span>
            <CountdownUnit label="MINS" value={remaining.minutes} />
            <span className="countdown-separator">:</span>
            <CountdownUnit label="SECS" value={remaining.seconds} />
            <span className="countdown-dot">.</span>
          </div>
        )}
        <p className="countdown-target" data-snow-ledge>
          {targetText}
        </p>
      </section>
    </main>
  );
}
