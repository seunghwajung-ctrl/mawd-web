"use client";

import { useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

const FAQS: FaqItem[] = [
  {
    q: "참가 자격이 어떻게 되나요?",
    a: "아이디어를 결과물로 만들고 싶은 사람이라면 누구나 가능합니다. 팀 단위 신청도 가능합니다.",
  },
  {
    q: "개발을 못 해도 참가할 수 있나요?",
    a: "가능합니다. 개발 실력보다 문제를 찾고 AI로 결과물을 만드는 과정을 봅니다.",
  },
  {
    q: "AI 도구는 어떤 걸 쓰나요?",
    a: "참가자가 편한 생성형 AI, 바이브 코딩 도구, 자동화 도구를 자유롭게 씁니다.",
  },
  {
    q: "진행 방식은 어떻게 되나요?",
    a: "오리엔테이션, 1라운드 제출, 2라운드 MVP 제작, 최종 공유 순서로 진행됩니다.",
  },
  {
    q: "가상머니는 실제 현금인가요?",
    a: "아닙니다. 결과물의 가능성을 평가하기 위한 심사용 포인트입니다.",
  },
  {
    q: "팀 인원은 몇 명까지 가능한가요?",
    a: "1인부터 5인까지 참가 가능합니다. 1라운드는 비대면으로 진행되며, 2라운드 대면 MVP 빌딩은 선발된 팀이 1박 2일간 진행합니다.",
  },
  {
    q: "참가하면 어떤 결과물을 얻게 되나요?",
    a: "PRD, 프로토타입, MVP, 배포 링크, 포트폴리오에 담을 제작 기록을 남깁니다.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq">
      <div className="wrap">
        <p className="section-kicker">FAQ</p>
        <h2>자주 묻는 질문</h2>
        <p className="section-lead">
          참가 자격, 진행 방식, 평가 구조까지. 궁금한 점을 미리
          정리했습니다. 추가 문의는 문의하기로 남겨주세요.
        </p>

        <ul className="faq-list faq-list--page">
          {FAQS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <li
                key={i}
                className={`faq-item faq-item--page${isOpen ? " open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-q faq-q--page"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  <span className="faq-num">Q.{String(i + 1).padStart(2, "0")}</span>
                  <span>{item.q}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    {isOpen ? "\u2212" : "+"}
                  </span>
                </button>
                <div className="faq-a faq-a--page">
                  <p>{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
