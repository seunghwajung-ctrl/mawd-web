"use client";

import { useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

// TODO(copy): 임시 질문이다. 다봉 최종 문구(b2b-zone-copy.md)로 교체한다 (#9).
const FAQS: FaqItem[] = [
  {
    q: "어떤 행사를 맡길 수 있나요?",
    a: "해커톤과 AI 행사·교육 프로그램의 기획과 운영을 맡을 수 있습니다. 공동주최도 가능합니다.",
  },
  {
    q: "기획 단계부터 함께할 수 있나요?",
    a: "네. 행사 목적과 대상에 맞춰 형식과 진행 방식을 함께 정합니다.",
  },
  {
    q: "스폰서·제휴는 어떻게 참여하나요?",
    a: "아래 '스폰서·제휴 문의'로 연락 주시면 참여 방식을 안내해 드립니다.",
  },
  {
    q: "문의 후에는 어떻게 진행되나요?",
    a: "남겨 주신 연락처로 담당자가 회신해 일정과 내용을 협의합니다.",
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
          {/* TODO(copy): 임시 문구 */}
          행사 운영과 스폰서·제휴에 대해 자주 받는 질문을 정리했습니다.
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
