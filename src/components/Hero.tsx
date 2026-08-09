"use client";

import DepthText from "./DepthText";
import ScrollExpand from "./ScrollExpand";
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

export function Hero() {
  const { openSponsorModal } = useSponsorModal();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <ScrollExpand
        src="/hero-bg-circuit.svg"
        alt="MAWD background"
        title="MAWD"
        useWindowScroll
        mediaZoom={1}
      >
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
      </ScrollExpand>

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
