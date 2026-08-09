"use client";

import { useEffect, useRef, useState } from "react";
import DepthText from "./DepthText";
import { LumaCheckoutButton } from "@/components/LumaCheckoutButton";
import { useSponsorModal } from "@/components/SponsorModalProvider";

type FlowStep = {
  num: string;
  label: string;
  icon: string;
  final?: boolean;
};

const flowSteps: FlowStep[] = [
  { num: "01", label: "모집", icon: "▤" },
  { num: "02", label: "오리엔테이션", icon: "⚑" },
  { num: "03", label: "1라운드", icon: "♜" },
  { num: "04", label: "라이크 심사", icon: "♥" },
  { num: "05", label: "2라운드", icon: "⬡" },
  { num: "06", label: "시상", icon: "★", final: true },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Hero() {
  const { openSponsorModal } = useSponsorModal();
  const introRef = useRef<HTMLDivElement | null>(null);
  const [introProgress, setIntroProgress] = useState(0);

  useEffect(() => {
    document.body.classList.add("hero-intro-active");

    const update = () => {
      if (!introRef.current) return;

      const rect = introRef.current.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const nextProgress = clamp(-rect.top / viewport, 0, 1);
      setIntroProgress(nextProgress);
      document.body.classList.toggle("hero-intro-active", nextProgress < 0.92);
    };

    const frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.classList.remove("hero-intro-active");
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div
        ref={introRef}
        className="hero-intro"
        style={
          {
            "--intro-title-opacity": clamp(1 - introProgress * 1.25, 0, 1),
          } as React.CSSProperties
        }
      >
        <div className="hero-intro-stage">
          <h1 id="hero-title" className="hero-logo hero-logo-intro">
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
              fontSize="clamp(5rem, 19vw, 14rem)"
              fontWeight={900}
              shadow
            />
          </h1>
        </div>
      </div>

      <div className="hero-page hero-page-second">
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
                fontSize="clamp(4.8rem, 18vw, 13rem)"
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
              <LumaCheckoutButton
                className="btn primary"
              >
                참가 하기 <span className="arrow">›</span>
              </LumaCheckoutButton>
              <button
                type="button"
                className="btn"
                onClick={openSponsorModal}
              >
                스폰서 문의 <span className="arrow">›</span>
              </button>
            </div>
            <p className="sr-only">프로그램 흐름</p>
            <ul className="flow-band">
              {flowSteps.map((step) => (
                <li
                  key={step.num}
                  className={`flow-card${step.final ? " final" : ""}`}
                >
                  <b>{step.num}</b>
                  <span>{step.label}</span>
                  <span className="flow-icon">{step.icon}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
