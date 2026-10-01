"use client";

import { useEffect, useRef } from "react";
import DepthText from "./DepthText";
import { useSponsorModal } from "@/components/SponsorModalProvider";

const MOBILE_BREAKPOINT = 768;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Hero() {
  const { openSponsorModal } = useSponsorModal();
  const introRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.classList.add("hero-intro-active");
    let animationFrame = 0;
    const mobileViewport = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Mobile keeps only the landing wordmark; the full hero panel is desktop-only.
    if (mobileViewport.matches) {
      document.body.classList.remove("hero-intro-active");
      return undefined;
    }

    const update = () => {
      if (!introRef.current || !mainRef.current) return;

      const viewport = window.innerHeight || 1;
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      const revealStart = isMobile ? 0.9 : 0.5;
      const revealDistance = isMobile ? 0.1 : 0.58;
      const nextProgress = clamp(
        -introRef.current.getBoundingClientRect().top / (viewport * 1.35),
        0,
        1,
      );
      const nextRevealProgress = clamp(
        (viewport * revealStart - mainRef.current.getBoundingClientRect().top) /
          (viewport * revealDistance),
        0,
        1,
      );

      introRef.current.style.setProperty("--intro-title-opacity", String(clamp(1 - nextProgress, 0, 1)));
      mainRef.current.style.setProperty("--hero-reveal-opacity", String(nextRevealProgress));
      mainRef.current.style.setProperty("--hero-reveal-y", `${Math.round((1 - nextRevealProgress) * 18)}px`);
      document.body.classList.toggle("hero-intro-active", nextRevealProgress < 0.85);
    };

    const scheduleUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(() => {
          animationFrame = 0;
          update();
        });
      }
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.body.classList.remove("hero-intro-active");
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div
        ref={introRef}
        className="hero-intro"
      >
        <div className="hero-intro-stage">
          <h1 id="hero-title" className="hero-logo hero-logo-intro hero-logo-intro-split" aria-label="TEAM MAWD">
            <span className="hero-logo-intro-half hero-logo-intro-half-left" aria-hidden="true">
              <DepthText
                text="TEAM"
                layers={34}
                depth={2.4}
                faceColor="#f8fafc"
                depthColor="#7c3aed"
                tilt={7.5}
                pointerTracking
                smoothing={0.14}
                perspective={900}
                autoOrbit
                orbitSpeed={0.35}
                fontSize="clamp(4.6rem, 13vw, 10.5rem)"
                fontWeight={900}
                shadow
              />
            </span>
            <span className="hero-logo-intro-half hero-logo-intro-half-right" aria-hidden="true">
              <DepthText
                text="MAWD"
                layers={34}
                depth={2.4}
                faceColor="#f8fafc"
                depthColor="#7c3aed"
                tilt={7.5}
                pointerTracking
                smoothing={0.14}
                perspective={900}
                autoOrbit
                orbitSpeed={0.35}
                fontSize="clamp(4.6rem, 13vw, 10.5rem)"
                fontWeight={900}
                shadow
              />
            </span>
          </h1>
        </div>
      </div>

      <div className="hero-gap" aria-hidden="true" />

      <div
        ref={mainRef}
        className="hero-page hero-page-second"
      >
        <div className="burst" aria-hidden="true" />
        <div className="wrap hero-layout">
          <div className="hero-main">
            <h2 className="hero-logo">
              <DepthText
                text="MAWD"
                layers={34}
                depth={2.4}
                faceColor="#f8fafc"
                depthColor="#7c3aed"
                tilt={7.5}
                pointerTracking
                smoothing={0.14}
                perspective={900}
                autoOrbit
                orbitSpeed={0.35}
                fontSize="clamp(6.5rem, 24vw, 15.5rem)"
                fontWeight={900}
                shadow
              />
            </h2>
            <p className="challenge" aria-label="CHALLENGE">
              <DepthText
                text="CHALLENGE"
                layers={24}
                depth={1.5}
                faceColor="#f8fafc"
                depthColor="#7c3aed"
                tilt={7.5}
                pointerTracking
                smoothing={0.14}
                perspective={900}
                autoOrbit
                orbitSpeed={0.35}
                fontSize="clamp(1.6rem, 5.4vw, 4rem)"
                fontWeight={900}
                shadow
              />
            </p>
            <p className="headline">
              <em>비전공자</em>들의 아이디어가 <em>바이브 코딩</em>을 만나{" "}
              <em>세상밖</em>으로 나올 차례입니다.
            </p>
            <div className="btn-row" role="group" aria-label="주요 행동">
              <a className="btn primary" href="#hackathons">
                모든 프로그램 보기 <span className="arrow">›</span>
              </a>
              <button
                type="button"
                className="btn"
                onClick={openSponsorModal}
              >
                도입하기 <span className="arrow">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
