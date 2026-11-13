"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

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

function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Three depth layers: far flakes are small, slow and dim.
    const layers = [
      { size: 2, speed: 22, alpha: 0.35 },
      { size: 3, speed: 42, alpha: 0.6 },
      { size: 4, speed: 70, alpha: 0.95 },
    ];
    type Flake = { x: number; y: number; layer: number; phase: number; sway: number };
    let flakes: Flake[] = [];
    let width = 0;
    let height = 0;
    let frameId = 0;
    let last = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      flakes = Array.from({ length: Math.round((width * height) / 5200) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        layer: Math.floor(Math.random() * layers.length),
        phase: Math.random() * Math.PI * 2,
        sway: 6 + Math.random() * 18,
      }));
    };

    const draw = (time: number) => {
      // Cap the step so flakes don't jump after the tab was hidden.
      const dt = last ? Math.min(0.05, (time - last) / 1000) : 0;
      last = time;
      context.clearRect(0, 0, width, height);
      for (const flake of flakes) {
        const { size, speed, alpha } = layers[flake.layer];
        flake.y += speed * dt;
        if (flake.y > height) {
          flake.y = -size;
          flake.x = Math.random() * width;
        }
        // Snap to a pixel grid so flakes read as dots, like the reference poster.
        const x = Math.round((flake.x + Math.sin(time / 1600 + flake.phase) * flake.sway) / size) * size;
        const y = Math.round(flake.y / size) * size;
        context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        context.fillRect(x, y, size, size);
      }
      if (!still) frameId = window.requestAnimationFrame(draw);
    };

    const restart = () => {
      window.cancelAnimationFrame(frameId);
      resize();
      last = 0;
      frameId = window.requestAnimationFrame(draw);
    };

    restart();
    window.addEventListener("resize", restart);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", restart);
    };
  }, []);

  return <canvas ref={canvasRef} className="countdown-snow" aria-hidden="true" />;
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
      <SnowCanvas />
      <p className="countdown-mark">MAWD</p>
      <Link className="countdown-admin-link" href="/countdown/admin" aria-label="관리자 설정으로 이동">
        ADMIN
      </Link>
      <section className="countdown-stage" aria-live="polite">
        <p className="countdown-eyebrow">{settings.title}</p>
        {!loaded ? null : finished ? (
          <p className="countdown-done">
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
        <p className="countdown-target">{targetText}</p>
      </section>
    </main>
  );
}
