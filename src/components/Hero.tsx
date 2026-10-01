"use client";

import { useEffect, useRef } from "react";
import { useSponsorModal } from "@/components/SponsorModalProvider";

const PORTAL_BEATS = [
  {
    side: "left",
    label: "MAWD CHALLENGE",
    title: "MAWD CHALLENGE",
    text: "자신의 분야에서 문제를 해결하는 개발 챌린지",
  },
  {
    side: "right",
    label: "TARGET",
    title: "비전공자도",
    titleNowrap: "시작할 수 있게.",
    text: "더 많은 아이디어는 비전공자에게 있다.",
  },
  {
    side: "left",
    label: "OUTPUT",
    title: "PRD, Prototype, MVP, Portfolio.",
    text: "결과물을 남겨 경력이 되도록",
  },
  {
    side: "right",
    label: "FLOW",
    title: "Every Hackathon",
    text: "다양한 주제의 해커톤으로 모두가 참여 가능",
  },
  {
    side: "center",
    label: "START",
    title: "Build before you explain.",
    text: "아래 기존 페이지로 자연스럽게 이어진다",
  },
] as const;

const BEAT_SPREAD = 0.14;
const BEAT_CLEAR_RANGE = 0.07;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Hero() {
  const { openSponsorModal } = useSponsorModal();
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      document.body.classList.remove("hero-intro-active");
      return undefined;
    }

    document.body.classList.add("hero-intro-active");
    const beats = Array.from(hero.querySelectorAll<HTMLElement>(".portal-beat"));
    let animationFrame = 0;

    const update = () => {
      const viewport = window.innerHeight || 1;
      const rect = hero.getBoundingClientRect();
      const travel = Math.max(rect.height - viewport, 1);
      const progress = clamp(-rect.top / travel, 0, 1);
      const portalOpen = clamp(progress / 0.28, 0, 1);
      const contentOpacity = clamp((progress - 0.18) / 0.16, 0, 1);

      hero.style.setProperty("--portal-progress", progress.toFixed(4));
      hero.style.setProperty("--portal-open", portalOpen.toFixed(4));
      hero.style.setProperty("--portal-content-opacity", contentOpacity.toFixed(4));
      hero.style.setProperty("--portal-bg-scale", String(1.055 - progress * 0.045));
      hero.style.setProperty("--portal-veil", String(0.04 + portalOpen * 0.22));
      hero.style.setProperty("--portal-dot-shift", `${Math.round(portalOpen * 42)}vw`);
      document.body.classList.toggle("hero-intro-active", progress < 0.82);
      hero.classList.toggle("portal-content-ready", contentOpacity > 0.88);

      beats.forEach((beat, index) => {
        const center = 0.34 + (index / (PORTAL_BEATS.length - 1)) * 0.58;
        const distance = Math.abs(progress - center);
        const alpha = distance <= BEAT_CLEAR_RANGE ? 1 : clamp(
          1 - (distance - BEAT_CLEAR_RANGE) / (BEAT_SPREAD - BEAT_CLEAR_RANGE),
          0,
          1,
        );
        const y = Math.round((1 - alpha) * 36);
        const blur = ((1 - alpha) * 9).toFixed(2);
        const tracking = (0.03 + (1 - alpha) * 0.045).toFixed(3);

        beat.style.setProperty("--beat-opacity", alpha.toFixed(3));
        beat.style.setProperty("--beat-y", `${y}px`);
        beat.style.setProperty("--beat-blur", `${blur}px`);
        beat.style.setProperty("--beat-tracking", `${tracking}em`);
      });
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        update();
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.body.classList.remove("hero-intro-active");
      hero.classList.remove("portal-content-ready");
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero portal-hero" aria-labelledby="hero-title">
      <div className="portal-stage">
        <div className="portal-backdrop" aria-hidden="true" />
        <div className="portal-duotone" aria-hidden="true" />
        <div className="portal-lines" aria-hidden="true" />
        <div className="portal-panel portal-panel-left" aria-hidden="true" />
        <div className="portal-panel portal-panel-right" aria-hidden="true" />
        <div className="portal-dot portal-dot-left" aria-hidden="true" />
        <div className="portal-dot portal-dot-right" aria-hidden="true" />

        <div className="portal-wordmark" aria-label="TEAM MAWD">
          <span aria-hidden="true">TEAM</span>
          <span aria-hidden="true">MAWD</span>
        </div>

        <div className="portal-copy" aria-live="off">
          {PORTAL_BEATS.map((beat, index) => {
            const title = "titleNowrap" in beat ? (
              <>
                {beat.title}
                <br />
                <span className="portal-title-nowrap">{beat.titleNowrap}</span>
              </>
            ) : beat.title;

            return (
              <article
                className={`portal-beat portal-beat-${beat.side}`}
                data-index={index + 1}
                data-label={beat.label}
                key={beat.label}
              >
                <p className="portal-label">{beat.label}</p>
                {index === 0 ? (
                  <h1 id="hero-title">{title}</h1>
                ) : (
                  <h2>{title}</h2>
                )}
                <p className="portal-text">{beat.text}</p>
              </article>
            );
          })}
        </div>

        <div className="portal-actions" role="group" aria-label="주요 행동">
          <a className="btn primary" href="#hackathons">
            모든 프로그램 보기 <span className="arrow">›</span>
          </a>
          <button type="button" className="btn" onClick={openSponsorModal}>
            도입하기 <span className="arrow">›</span>
          </button>
        </div>
      </div>
      <div className="hero-page-second portal-nav-trigger" aria-hidden="true" />
    </section>
  );
}
