"use client";

import { useModal } from "@/components/ModalProvider";

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
  const { open } = useModal();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="burst" aria-hidden="true" />
      <div className="wrap hero-layout">
        <div className="hero-main">
          <h1 id="hero-title" className="hero-logo">
            <img
              src="/mawd-logo.png"
              alt="MAWD"
              className="mawd-logo-img"
              width={1050}
              height={789}
            />
          </h1>
          <p className="challenge">CHALLENGE</p>
          <p className="headline">
            <em>AI</em>로 만들고, <em>투자</em>로 검증받고, <em>기회</em>를 잡아라
          </p>
          <p className="lead">
            비전공자들의 아이디어가 바이브 코딩을 만나 세상밖으로 나올
            차례입니다. 자신의 아이디어를 현실로 만들고 결과로 증명하세요.
          </p>
          <div className="btn-row" role="group" aria-label="주요 행동">
            <button
              type="button"
              className="btn primary"
              onClick={() => open("apply")}
            >
              참가 신청 <span className="arrow">›</span>
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => open("sponsor")}
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
    </section>
  );
}
